var map = L.map('mapid').on('load', onMapLoad).setView([41.400, 2.206], 9);
//map.locate({setView: true, maxZoom: 17});

var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

//en el clusters almaceno todos los markers
var markers = new L.markerClusterGroup();
var data_markers = [];

function onMapLoad() {

    console.log("Mapa cargado");
    /*
	FASE 3.1
		1) Relleno el data_markers con una petición a la api		
		2) Añado de forma dinámica en el select los posibles tipos de restaurantes
		3) Llamo a la función para --> render_to_map(data_markers, 'all'); <-- para mostrar restaurantes en el mapa
	*/
    /*-- 3.1.1 --*/
    fillDataMarkers();
}

/*-- rellena el data_markers --*/
function fillDataMarkers() {
    let api_url = './api/apiRestaurants.php';

    //jQuery se ejecuta DESPUES de haber ejecutado ESTE script, ignorando el orden de ejecución
    $.getJSON(api_url, function(data) {
        $.each(data, function(key, val) {
            //rellena el array de marcadores                
            data_markers.push(val);
        });
        /*-- 3.1.2 --*/
        fillSelect(data_markers);
        /*-- 3.1.3 --*/
        addMarkers(data_markers, "all");
    });
}

function addMarkers(data_markers, filter) {
    let myURL = $('script[src$="script.js"]').attr('src').replace('script.js', '');

    let myIcon = L.icon({
        iconUrl: myURL + 'images/pin24.png',
        iconRetinaUrl: myURL + 'images/pin48.png',
        iconSize: [29, 24],
        iconAnchor: [9, 21],
        popupAnchor: [0, -14]
    });

    /*-- 3.2.2 --*/ //el bucle 'for' contiene la elección del filtro para mostrar los marcadores adecuados
    for (let value of data_markers) {
        if (filter != "all") {
            let tempkind_food = value.kind_food.split(",");
            if (tempkind_food.includes(filter)) {
                addFilteredMarkers(value, myIcon);
            }
        } else {
            addFilteredMarkers(value, myIcon);
        }
    }

    map.addLayer(markers);
}

/*-- rellena el marcador con la info asociada a las coordenadas --*/
function addFilteredMarkers(value, myIcon) {
    let popup = `<h3><b>${value.name}</h3><hr>${value.address}</b>
            <br><i>${value.kind_food}</i>`;

    let m = L.marker([value.lat, value.lng], { icon: myIcon })
        .bindPopup(popup);

    markers.addLayer(m);
}

/*-- rellena el select con el tipo de comida eludiendo los duplicados --*/
function fillSelect(data_markers) {
    let kind_food = [];
    for (let value of data_markers) {
        if (kind_food.length < 1) {
            kind_food.push(value.kind_food);
        } else {
            let tempArr = value.kind_food.split(",");
            kind_food = [...new Set([...kind_food, ...tempArr])]; //crea el contenido del select sin duplicados
        }
    }
    let output = `<option value="none" style="color:grey;">Elige...</option>
                  <option value="all">Todos</option>`;
    for (let value of kind_food) {
        output += `<option value="${value}">${value}</option>`;
    }
    $("#kind_food_selector").html(output);
}

/*-- al cambiar el select, llama a la función que mostrará los marcadores según el nuevo valor del select --*/
$('#kind_food_selector').on('change', function() {
    if (this.value != "none") {
        render_to_map(data_markers, this.value);
    }
});



function render_to_map(data_markers, filter) {

    /*
    FASE 3.2
    	1) Limpio todos los marcadores
    	2) Realizo un bucle para decidir que marcadores cumplen el filtro, y los agregamos al mapa
    */
    /*-- 3.2.1 --*/
    markers = new L.markerClusterGroup(); //renueva el listado de marcadores
    $(".leaflet-marker-pane").empty(); //elimina del mapa los marcadores actuales

    addMarkers(data_markers, filter); //para el 3.2.2 se llama a esta función de nuevo
}