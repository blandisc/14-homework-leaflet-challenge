// create variable mymap

let mymap = L.map('map').setView([25.5352791, -102.1235539], 5);


// Create the tile layer that will be the background of our map
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: apiKey
}).addTo(mymap);


let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Grab data with D3
d3.json(url).then(response=>{

        // Create function to select colors based on property magnitude
        function getColor(response) {
        return response > 5 ? '#933b27' :
        response > 4 ? '#cf513d' :
        response > 3 ? '#ef7564' :
        response > 2 ? '#ec9488' :
        response > 1 ? '#efb3ab' :
               '#f5d3ce';
        }

        // Create function to bind popup to each marker
        function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" +"Location: "+ "</h3> " + feature.properties.title +
      "<hr>" + "<h3>Magnitude: "  + (feature.properties.mag) + "</h3>");
        }
    
    // Using geoJSON method to create markers and utilizing previously created functions to give specific colors and popups to each marker
    L.geoJSON(response, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: feature.properties.mag * 3.5,
            fillColor: getColor(feature.properties.mag),
            color: getColor(feature.properties.mag),
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        })
    },
    onEachFeature: onEachFeature

    }).addTo(mymap);
    // Creating required elements to insert legend
    let legend = L.control({position: "bottomright"})
    
    legend.onAdd = function (map) { 

    let div = L.DomUtil.create("div", "info legend"),

    
    magnitudes = [1,2,3,4,5]


    for (let i = 0; i < magnitudes.length; i++) {
    div.innerHTML += '<i style="background:' + getColor(magnitudes[i] + 1) + '"></i> ' + magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
    }
    return div}

    legend.addTo(mymap)


})

// Alternative way (only inserts markers)
// d3.json(url).then(response=>{
    
//     let earthquakes = response.features
    
//     let earthquakeMarkers = []

//     for (let i = 0; i < earthquakes.length; i++) {
        
//         let earthquake = earthquakes[i]

//         // console.log(earthquake[index])

//        let earthquakeMarker = L.marker([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]])
//                                 .bindPopup("<h3>Name: <h3>" + earthquake.properties.name + "<h3> Magnitude: </h3>" + earthquake.properties.mag).addTo(mymap)
//                                 .addTo(mymap)

//         earthquakeMarkers.push(earthquakeMarker)

//     }

//     // console.log(earthquakeMarkers)
// })

