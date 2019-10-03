function createMap(map_div, center, zoom) {
    let map;
    map = L.map('map', {
        center: center,
        zoom: zoom
    });
    return map;
}

function getBaseMaps() {
    const osm_base_map = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
    });
    const googleTraffic = L.tileLayer('https://{s}.google.com/vt/lyrs=m@221097413,traffic&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        minZoom: 2,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    });
    return {
        "osm": osm_base_map,
        "google_traffic": googleTraffic
    };
}

function style(feature) {
  return {
    fillColor: "#FCB81E",
    weight: 2,
    opacity: 1,
    color: "#CCCCCC",
    fillOpacity: 0.7
  };
}

function onEachFeature(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties ) {
    layer.bindPopup(feature.properties.admin1Name);
  }
}

function addLayer(layer_name) {
    $.getJSON(layer_name, function (data) {
        const datalayer = L.geoJson(data, {
            style:style,
            onEachFeature:onEachFeature
        });
        layerGroup.addLayer(datalayer);
        map.fitBounds(datalayer.getBounds());
    });
}


