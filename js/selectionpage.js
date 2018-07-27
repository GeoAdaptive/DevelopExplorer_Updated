
// var map = L.map('map-selpage', {
//   // center: [-23.617, -56.981],
//   center: [-10.604, -58.768],
//   zoom: 4
// });
//
// var lightmap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', {
//   maxZoom: 18,
//   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
//   subdomains: 'abcd'
// });
//
// map.addLayer(lightmap);


//scrapping section
// var scrape = 'http://www.mag.gov.py/index.php/geoportal/infraestructuras';
// $(document).ready(function(){
//   $.ajax(scrape).done(function(data) {
//     var parsedData000 = JSON.parse(data);
//     console.log(parsedData000);
//   })
// });

//reference from only polygons example
// here this example
var myGeoJSONPath = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/LatinAmerica.geo.json';
var ParaguayNationUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/Paraguay_m.geo.json';
var ParaguayNation = [];

var myCustomStyle = {
    color: '#ffffff',
    weight: 1,
    opacity: 1,
    // stroke: false,
    fill: true,
    // fillColor: '#AED6F1',
    fillColor: '#D4E6F1',
    fillOpacity: 1
};

var highlightStyle = {
    color: '#F5B041',
    weight: 3,
    opacity: 1,
    fillOpacity: 1,
    fillColor: '#F5B041'
};
var clickStyle = {
  color: '#F5B041',
  weight: 3,
  opacity: 1,
  fillOpacity: 1,
  fillColor: '#F5B041'
};
var pastclickStyle = {
    color: '#ffffff',
    weight: 1,
    opacity: 1,
    // stroke: false,
    fill: true,
    fillOpacity: 0.6,
    fillColor: '#D7DBDD'
};

// var map = L.map('map-mappage', {
//   center: [-23.414, -57.384],
//   zoom: 7,
//   minZoom: 6,
//   maxZoom: 9
// });



var map = L.map('map-selpage',{minZoom: 4, maxZoom: 6, zoomControl:false, attributionControl:false})
map.setView([-16.008, -70.177], 4);

    $(document).ready(function(){
      $.ajax(myGeoJSONPath).done(function(data) {
        var parsedData00 = JSON.parse(data);
        console.log(parsedData00);
        console.log("parsed00");
        var layerMappedPolygons = L.geoJson(parsedData00,
          {
            style: myCustomStyle,
            pointToLayer: function (feature, latlng) {
              return new L.Polygon(latlng, {
              });
            },

            onEachFeature: function(feature,layer){
              // layer.bindPopup(
              //   "<b>Name: </b>" +
              //   feature.properties.admin +
              //   "</br>"
              //
              //   "<b>GDP: </b>" +
              //   feature.properties.gdp_md_est +
              //   "</br>" +
              //
              //   "<b>Population: </b>" +
              //   feature.properties.pop_est +
              //   "</br>" +
              //
              //   "<b>Income level: </b>" +
              //   feature.properties.income_grp +
              //   "</br>"
              //   //
              //   // "<b>Road Density: </b>" +
              //   // feature.properties.rd_density.toFixed(3) + " per square km" +
              //   // "</br>" +
              //   //
              //   // "</br>" +
              //   // "<b>Data Collected Year: </b>" +
              //   // feature.properties.year
            // );

              //This following code has problems of flashing popups
              layer.on('mouseover', function(e){
                document.getElementById("results").style.display = "inline";
                $('#countryname').text(feature.properties.admin);
                $('#countrygdp').text("$" + (feature.properties.gdp_md_est/1000).toFixed(3) + " billion");
                $('#countrygdpper').text("$" + 1000000 * (feature.properties.gdp_md_est / feature.properties.pop_est).toFixed(3));
                $('#countrypop').text(feature.properties.pop_est);
                $('#countryincome').text(feature.properties.income_grp.substr(3));

                layer.setStyle(highlightStyle);
                //create a popup with a unique ID linked to it
                var popup = $("<div></div>", {
                  id: "popup-" + feature.properties.admin,
                  css: {
                    position: "absolute",
                    bottom: "100px",
                    left: "400px",
                    // height: "300px",
                    // z-index: 1002,
                    backgroundColor: "white",
                    padding: "8px",
                    border: "1px solid #ccc"
                  }
                });
                var headline = $("<div></div>", {
                    text:
                      "Name: " + feature.properties.admin,
                    css: {fontSize: "16px", marginBottom: "3px"}
                }).appendTo(popup);
                // popup.appendTo("html")
                // this.openPopup();
              });

              layer.on('mouseout', function(e){
                console.log("mouse left");
                layer.setStyle(myCustomStyle);
                $("#popup-" + feature.properties.admin).remove();
                console.log("popup removed.");
                // this.closePopup();
              });

              layer.on('click', function (event) {
                map.fitBounds(layer.getBounds(),{
                           padding: [80,80]
                         });
                layer.setStyle(clickStyle);
                _.each(ParaguayNation,function(layer){
                  map.addLayer(layer);
                });
                // _.each(layerMappedPolygons,function(layer){
                  map.removeLayer(layerMappedPolygons);
                // });

                layer.on('mouseout', function(e){
                  layer.setStyle(pastclickStyle);
                });
                // layer.bindPopup(
                //   "<b>Name: </b>" +
                //     feature.properties.admin +
                //     "</br>"
                // );
              });


              //reference this one on complete example
              // with the highlight popup appended as an HTML div element somerwhere off the map
              // http://palewi.re/posts/2012/03/26/leaflet-recipe-hover-events-features-and-polygons/


             }

            }).addTo(map);
            // layerMappedPolygons.eachLayer(eachFeatureFunction);
            // console.log(layerMappedPolygons[0].id);
          })
        });

//the online local host example
// $.getJSON(myGeoJSONPath,function(data){
//             var map = L.map('map').setView([39.74739, -105], 4);
//
//             L.geoJson(data, {
//                 clickable: false,
//                 style: myCustomStyle
//             }).addTo(map);
//         })


//THE SEARCH BUTTON WORKABLE EXAMPLE
//FIX THIS ISSUE!!!
// $('#sbutton-selpage').click(function(){
//   console.log("search clicked.");
// });

$(document).ready(function(){
  $.ajax(ParaguayNationUrl).done(function(data) {
    var parsedData00 = JSON.parse(data);
    console.log(parsedData00);
    console.log("parsed00");
    var itemB = L.geoJson(parsedData00,
      {
        style: highlightStyle,
        pointToLayer: function (feature, latlng) {
          return new L.Polygon(latlng, {
          });
        },

        });
      ParaguayNation.push(itemB);
      })
    });

$('#sbutton-selpage').click(function(){
  map.setView([-23.414, -57.384],5);
  _.each(ParaguayNation,function(layer){
    map.addLayer(layer);
  });
  console.log("nation bound added.");

});

  // var searchfunction = function(){
  // console.log("search button clicked.");
  // map.setView([-23.414, -57.384],5);
  // };

// $('#sbutton-selpage').click(function(){
//   console.log("search button clicked.")
//   // var searchval = $('#searchinput').val();
//   // console.log("your input is " + searchval);
//
//   // _.each(layerMappedPolygons, function(feature){
//   //   if (searchval == feature.properties.admin){
//   //     map.fitBounds(feature.layer.getBounds(),{
//   //                padding: [100,180]
//   //              });
//   //   }
//   //   else{
//   //         alert("Please type in the correct name.");
//   //   }
//   // })
// });
