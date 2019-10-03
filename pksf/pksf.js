
var map = createMap('map', [23.725012, 90.406494], 7);
var baseMaps = getBaseMaps();
L.control.layers(baseMaps).addTo(map);
baseMaps['osm'].addTo(map);
var layerGroup = L.layerGroup();
layerGroup.addTo(map);
function changeLayer(layer_name) {
    layerGroup.clearLayers();
    addLayer(layer_name);
}
addLayer("division_geojson.geojson");