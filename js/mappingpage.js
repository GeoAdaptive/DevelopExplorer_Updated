/* =============================================================

DEVELOPEXPLORER V1.0 MAPPING PAGE JS FILE @GEOADAPTIVE

============================================================== */
//The following software is a product of GeoAdaptive LLC, 100 Franklin St, Boston, MA. USA

//1. PREPARATORY SET-UP AND GLOBAL VARIABLES
//1.1 proportional scale for consistency across different screens
var w0;
var w1;
var h0;
var h1;
var w2;
var h2;

var scaleratio = Math.min(
  w1 / w0,
  h1 / h0
);

w2 = scaleratio*w0;
h2 = scaleratio*h0;

//1.2 creating global variables for each feature's tooltip.
var view = [];
var label = [];
var tooltip = [];


//1.3 setting up basemap
// var map = L.map('map-mappage', {
//   center: [-23.414, -57.384],
//   zoom: 7,
//   minZoom: 6,
//   maxZoom: 11,
//   zoomControl: false,
// });

var map = L.map('map-mappage', {
  center: [-23.414527, -56.506032],
  zoom: 7,
  minZoom: 6,
  maxZoom: 14,
  zoomControl: false,
});

var zoomcontrol = new L.Control.Zoom({ position: 'bottomleft' }).addTo(map);

var lightmap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
  subdomains: 'abcd'
});

var darkmap = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
  subdomains: 'abcd'
});

// var hybridmap = L.map('map-mappage').setView([-25.288145, -57.485214], 11);
var hybridmap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

//var satellite map
var mapLink =
    '<a href="http://www.esri.com/">Esri</a>';
var wholink =
    'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

var satellitemap = L.tileLayer(
    'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; '+mapLink+', '+wholink,
    minzoom: 5,
    maxZoom: 19,
});

// load light map first as the default basemap
// map.addLayer(hybridmap);
map.addLayer(lightmap);

//DISABLE THE SCROLL ZOOM FUNCTION TO AVOID UNNECESSARY REQUESTS
// map.scrollWheelZoom.disable();

//SHOW THE MAP DIV GRADUALLY
$('#map-mappage').show(10000);


//1.4 SWITCH THE BASEMAPS
$('#lightmap').click(function(){
  map.removeLayer(darkmap);
  map.removeLayer(hybridmap);
  map.addLayer(lightmap);
})
$('#darkmap').click(function(){
  map.removeLayer(lightmap);
  map.removeLayer(hybridmap);
  map.addLayer(darkmap);
})

$('#hybridmap').click(function(){
  map.removeLayer(lightmap);
  map.removeLayer(darkmap);
  map.addLayer(hybridmap);
})

$('#satellitemap').click(function(){
  map.removeLayer(lightmap);
  map.removeLayer(darkmap);
  map.removeLayer(hybridmap);
  map.addLayer(satellitemap);
  // $('#legend').css('background-color','white');
  // $('#legend').css('opacity','0.7');
  // var satellitemap = L.map('map').setView([-24.617, -56.981], 7);
  //       mapLink =
  //           '<a href="http://www.esri.com/">Esri</a>';
  //       wholink =
  //           'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
  //       L.tileLayer(
  //           'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  //           attribution: '&copy; '+mapLink+', '+wholink,
  //           minzoom: 5,
  //           maxZoom: 19,
  //         }).addTo(map);
});


//2.1 SETTING UP API REQUEST FOR DATA
//API request from Wikipedia:
//Wikipedia - Population API
//Reference $('input[type=checkbox]').each(function()
// $(document).ready(function(){
//
//     $.ajax({
//         type: "GET",
//         url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Paraguay&callback=?",
//         // url: "http://api.worldbank.org/v2/countries/br/indicators/NY.GNP.PCAP.CD/?date=2016:2016",
//         contentType: "application/json; charset=utf-8",
//         async: false,
//         dataType: "json",
//         success: function (data, textStatus, jqXHR) {
//
//             var markup = data.parse.text["*"];
//             var area = $('<div></div>').html(markup).find('td')[18];
//             // var area = blurb.find('td')[18];
//             // var area0 = $('<div></div>').html(area)[0];
//             var area1 = $('<div></div>').html(area)[0].innerText;
//             console.log(area);
//             // console.log(area0);
//             console.log(area1);
//             // $('#article').html($(blurb).find('td')[16]);
//             $('#poptext').html(area1.substr(0,9));
//
//         },
//         error: function (errorMessage) {
//         }
//     });
// });

//Wikipedia - Area API
// $(document).ready(function(){
//
//     $.ajax({
//         type: "GET",
//         url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Paraguay&callback=?",
//         // url: "http://api.worldbank.org/v2/countries/br/indicators/NY.GNP.PCAP.CD/?date=2016:2016",
//         contentType: "application/json; charset=utf-8",
//         async: false,
//         dataType: "json",
//         success: function (data, textStatus, jqXHR) {
//
//             var markup = data.parse.text["*"];
//             var area = $('<div></div>').html(markup).find('td')[16];
//             var area1 = $('<div></div>').html(area)[0].innerText;
//             console.log(area);
//             console.log(area1);
//             $('#areatext').html(area1.substr(0,7) + " km<sup>2</sup>");
//
//         },
//         error: function (errorMessage) {
//         }
//     });
// });

//Wikipedia - GDP API
// $(document).ready(function(){
//
//     $.ajax({
//         type: "GET",
//         url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Paraguay&callback=?",
//         // url: "http://api.worldbank.org/v2/countries/br/indicators/NY.GNP.PCAP.CD/?date=2016:2016",
//         contentType: "application/json; charset=utf-8",
//         async: false,
//         dataType: "json",
//         success: function (data, textStatus, jqXHR) {
//
//             var markup = data.parse.text["*"];
//             var area = $('<div></div>').html(markup).find('td')[24];
//             var area1 = $('<div></div>').html(area)[0].innerText;
//             console.log(area);
//             console.log(area1);
//             $('#gdptext').html(area1.substr(0,15));
//
//         },
//         error: function (errorMessage) {
//         }
//     });
// });

//Wikipedia - HDI API
// $(document).ready(function(){
//
//     $.ajax({
//         type: "GET",
//         url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Paraguay&callback=?",
//         // url: "http://api.worldbank.org/v2/countries/br/indicators/NY.GNP.PCAP.CD/?date=2016:2016",
//         contentType: "application/json; charset=utf-8",
//         async: false,
//         dataType: "json",
//         success: function (data, textStatus, jqXHR) {
//
//             var markup = data.parse.text["*"];
//             var area = $('<div></div>').html(markup).find('td')[27];
//             var area1 = $('<div></div>').html(area)[0].innerText;
//             console.log(area);
//             console.log(area1);
//             $('#hditext').html(area1.substr(0,6));
//
//         },
//         error: function (errorMessage) {
//         }
//     });
// });

//PREPARE THE FILES TO BE PLOTTED
var commit_id = '';

//3.1 BASIC INVENTORY DATA SET UP
//NATIONAL BOUNDARY
// var Paraguay_country_boundary = 'https://raw.githubusercontent.com/GeoAdaptive/DE_built_V1/master/data/Paraguay_m.geo.json?token=AgSQK75gXEHnQwkGLCGtT9NUluZ9Iw-Xks5aby5owA%3D%3D';

var Paraguay_country_boundary = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/ADM_Paraguay_NationalBoundary.geojson';
//DEPARTMENT BOUNDARY
var Paraguay_dep_boundary = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/DEMO_Pop_Dep_Paraguay.geojson';
//DISTRICT BOUNDARY
var Paraguay_muni_boundary = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/DEMO_Pop_Dist_Paraguay.geojson';

var parsedData_Country;
var parsedData_Department;
var parsedData_District;

var Country_boundary = [];
var Department_boundary = [];
var Muni_boundary = [];

var Country_boundary1 = [];
var Department_boundary1 = [];
var Muni_boundary1 = [];


//DEFINE THE SOURCES FOR THE LAYER FILES (POINT FILES)
var AirportsUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/INFR_airports_UNASUR_2015_PGY.geojson';
var PortsUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/INFR_ports_UNASUR_2015_PGY.geojson';
// var SchoolsUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_Built_V2/master/data/INFR_edu_media_MEC_2013_PGY.geojson?token=AgSQK5LwkN_EdAj0-_iNm6TORy4kLt_jks5acd0bwA%3D%3D';


// var HospitalsUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_Built_V2/master/data/INFR_Hospital_ServiceNumber_MSPBS_2015_PGY_2.geojson?token=AgSQK4h4KLUgBl8knDN4Rx-7HaYsQs_mks5acd00wA%3D%3D';

//NEW BREAKDOWN
var MaternalSchoolsUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/INFR_1MATERNAL_SCL.geojson';
var BasicSchoolsUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/INFR_2BASIC_SCL.geojson';
var MiddleSchoolsUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/INFR_3MEDIA_SCL.geojson';
var SupSchoolsUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/INFR_4SUPER_SCL.geojson';

var PmnSchoolsUrl = '';
var IncSchoolsUrl = '';

var PrimaryHealthcareUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/INFR_PRIMARY_HC.geojson';
var SecondaryHealthcareUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/INFR_SECONDARY_HC.geojson';
var TertiaryHealthcareUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/INFR_TERTIARY_HC.geojson';

//DEFINE THE SOURCES FOR THE POLYLINE FILES
var PrimaryRoadsUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/INFR_Primary_Roads_OSM_2017_PGY.geojson';
var SecondaryRoadsUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/INFR_Secondary_Roads_OSM_2017_PGY.geojson';
// var TertiaryRoadsUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_Built_V2/master/data/INFR_Secondary_Roads_OSM_2017_PGY.geojson?token=AgSQK4RF_9upqSgQKDijXRu1LAK1G49hks5acd1TwA%3D%3D';
//the target should be to generate Euclidean distance file from the line
var PavedRoadsUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/Roads_Condition_Asphalt_2.geojson';
var GravelRoadsUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/Roads_Condition_GravelandGravel_1.geojson';
var DirtRoadsUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/Roads_Condition_Dirt_4.geojson';


//define the parsed layer files
var parsedData_Airports;
var parsedData_Ports;
var parsedData_Schools;
var parsedData_MaternalSchools;
var parsedData_BasicSchools;
var parsedData_MiddleSchools;
var parsedData_SupSchools;

var parsedData_PmnSchools;
var parsedData_IncSchools;

var parsedData_Hospitals;
var parsedData_PrimaryHealthcare;
var parsedData_SecondaryHealthcare;
var parsedData_TertiaryHealthcare;

var parsedData_Roads1;
var parsedData_Roads2;
var parsedData_Roads3;

//define the geojson created layer files
var Airports = [];
var Ports = [];
var Schools = [];
var Hospitals = [];

var PrimaryRoads = [];
var SecondaryRoads = [];
var TertiaryRoads = [];

var PavedRoads = [];
var GravelRoads = [];
var DirtRoads = [];

var MaternalSchools = [];
var BasicSchools = [];
var MiddleSchools = [];
var SupSchools = [];

var PmnSchools = [];
var IncSchools = [];

var PrimaryHealthcare = [];
var SecondaryHealthcare = [];
var TertiaryHealthcare = [];



//3.2 GAP ANALYSIS DATA SET UP
//TRANSPORTATION
var GAP_transcoverageUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/GAP_TRANS_COVERAGE.geojson';
var GAP_transqualityUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/GAP_TRANS_QUALITY.geojson';
var GAP_transoutcomeUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/GAP_TRANS_OUTCOME.geojson';

//EDUCATION GAP AREAS
var GAP_educoverageUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/GAP_EDU_COVERAGE.geojson';
var GAP_eduqualityUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/GAP_EDU_QUALITY.geojson';
var GAP_eduoutcomeUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/GAP_EDU_OUTCOME.geojson';

//PUBLIC HEALTH GAP AREAS
var GAP_hthcoverageUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/GAP_PUBLICHEALTH_COVERAGE.geojson';
var GAP_hthqualityUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/GAP_PUBLICHEALTH_QUALITY.geojson';
var GAP_hthoutcomeUrl = 'https://raw.githubusercontent.com/GeoAdaptive/DE_V3/3e3b23b8c15806ba3e1f7cc9879b9b51bcf8a152/data/GAP_PUBLICHEALTH_OUTCOME.geojson';



//trans
var parsedData_transGapCoverage;
var parsedData_transGapQuality;
var parsedData_transGapOutcome;

var transGapCoverage = [];
var transGapQuality = [];
var transGapOutcome = [];

//education
var parsedData_eduGapCoverage;
var parsedData_eduGapQuality;
var parsedData_eduGapOutcome;

var eduGapCoverage = [];
var eduGapQuality = [];
var eduGapOutcome = [];

//public health
var parsedData_hthGapCoverage;
var parsedData_hthGapQuality;
var parsedData_hthGapOutcome;

var hthGapCoverage = [];
var hthGapQuality = [];
var hthGapOutcome = [];

//3.3 SET UP THE STYLES FOR DIFFERENT DATA LAYERS
var mouseoverstyle = {
  // fillOpacity: 0.8,
  weight:3.2,
};

var mouseoutstyle = {
  // fillOpacity: 0.8,
  weight: 0.8,
};

var highlightStyle = {
    color: '#ffffff',
    weight:0.8,
    opacity: 0.8,
    fillOpacity: 0.8,
    fillColor: '#F7DC6F'
};

var fadedStyle = {
    opacity: 0.6,
    fillOpacity: 0.6,
};

var extrahighlightStyle = {
    //border color
    color: '#7B241C',
    weight: 1,
    opacity: 0.6,
    //filling color
    fillOpacity: 0.6,
    fillColor: '#2E86C1'
};


// var pasthighlightStyle = {
//     opacity: 0.4,
//     fillOpacity: 0.4,
// };

// var distStyle = {
//     color: '#154360',
//     weight: 2,
//     opacity: 0.8,
//     fillOpacity: 0.8,
//     fillColor: '#2E86C1'
// };


//GAP AREA style
var gapCoverageStyle = {
    color: '#e74c3c',
    weight: 2,
    opacity: 0.8,
    fillOpacity: 0.8,
    fillColor: '#e74c3c'
};

var gapQualityStyle = {
    color: '#e74c3c',
    weight: 2,
    opacity: 0.8,
    fillOpacity: 0.8,
    fillColor: '#e74c3c'
};

var gapOutcomeStyle = {
    color: '#e74c3c',
    weight: 2,
    opacity: 0.8,
    fillOpacity: 0.8,
    fillColor: '#e74c3c'
};


// color scheme:
// the white grey color: #D7DBDD
// #F5B041

//STYLE CONTROLLED BY PARAMETERS
var myStyle_dep = function(feature){
  // switch(feature.properties.tipo_manag){
  //   case "PRIVADA":return{color:"#e74c3c"};
  //   case "OFICIAL":return{color:"#e67e22"};
  // }
  var x = feature.properties.popdensity;

  switch(true){
    case (x < 10):
      return{
        color:"#ffffff",
        weight:0.8,
        opacity:0.8,
        fillOpacity:0.8,
        fillColor:"#F7DC6F"
      };
      break;
    case (x < 50):
      return{
        color:"#ffffff",
        weight:0.8,
        opacity:0.8,
        fillOpacity:0.8,
        fillColor:"#F4D03F"
      };
      break;
    case (x < 100):
      return{
        color:"#ffffff",
        weight:0.8,
        opacity:0.8,
        fillOpacity:0.8,
        fillColor:"#F39C12"
      };
      break;
    case (x < 500):
      return{
        color:"#ffffff",
        weight:0.8,
        opacity:0.8,
        fillOpacity:0.8,
        fillColor:"#D35400"
      };
      break;
    case (x < 1000):
      return{
        color:"#ffffff",
        weight:0.8,
        opacity:0.8,
        fillOpacity:0.8,
        fillColor:"#D35401"
      };
      break;
    case (x >= 1000):
      return{
        color:"#ffffff",
        weight:0.8,
        opacity:0.8,
        fillOpacity:0.8,
        fillColor:"#7B241C"
      };
      break;
  }

  return {};
};


var myStyle_dist = function(feature){
  // var x = feature.properties.ID_2;
  var x = feature.properties.popdensity;
  switch(true){
    case (x < 10):
      return{
        color:"#ffffff",
        weight:0.8,
        opacity:0.8,
        fillOpacity:0.8,
        fillColor:"#F7DC6F"
      };
      break;
    case (x < 50):
      return{
        color:"#ffffff",
        weight:0.8,
        opacity:0.8,
        fillOpacity:0.8,
        fillColor:"#F4D03F"
      };
      break;
    case (x < 100):
      return{
        color:"#ffffff",
        weight:0.8,
        opacity:0.8,
        fillOpacity:0.8,
        fillColor:"#F39C12"
      };
      break;
    case (x < 500):
      return{
        color:"#ffffff",
        weight:0.8,
        opacity:0.8,
        fillOpacity:0.8,
        fillColor:"#D35400"
      };
      break;
    case (x < 1000):
      return{
        color:"#ffffff",
        weight:0.8,
        opacity:0.8,
        fillOpacity:0.8,
        fillColor:"#F7DC6F"
      };
      break;
    case (x < 2000):
      return{
        color:"#ffffff",
        weight:0.8,
        opacity:0.8,
        fillOpacity:0.8,
        fillColor:"#F39C12"
      };
      break;
    case (x < 5000):
      return{
        color:"#ffffff",
        weight:0.8,
        opacity:0.8,
        fillOpacity:0.8,
        fillColor:"#D35400"
      };
      break;
    case (x >= 5000):
      return{
        color:"#ffffff",
        weight:0.8,
        opacity:0.8,
        fillOpacity:0.8,
        fillColor:"#F39C12"
      };
      break;

  }
  return {};
};



var myStyle_airports = function(feature){
  var x = feature.properties.ATV_LBL;
  switch(true){
    case (x === "Nacional"):
      return{
        color:"#7B241C",
        weight:1,
        radius:5,
        opacity:0.8,
        fillOpacity:0.8,
        fillColor:"#F8C471"
      };
      break;
    case (x === "Internacional"):
      return{
        color:"#70001C",
        weight:2,
        radius:10,
        opacity:0.8,
        fillOpacity:0.8,
        fillColor:"#F39C12"
      };
      break;
  }
  return {};
};

var myStyle_ports = function(feature){
  var x = feature.properties.ZUS_LBL;
  switch(true){
    case (x === "Público"):
      return{
        color:"#154360",
        radius:7,
        weight:1,
        opacity:0.8,
        fillOpacity:0.8,
        fillColor:"#1ABC9C"
      };
      break;
    case (x === "Privado"):
      return{
        color:"#154360",
        radius:7,
        weight:1,
        opacity:0.8,
        fillOpacity:0.8,
        fillColor:"#2471A3"
      };
      break;
  }
  return {};
};
//DEFINE THE CLICKING EVENT FUNCTION FOR THE ADMS TO REACT
//FOR CLICK AND THE HEIGHLIGHT AND THEN REMOVE
var highlightedlayer;

//1.? create pane
// var pane = map.createPane();
// var marker = L.marker({pane: pane});

//2.? specify popup options
var customOptions =
    {
    'maxWidth': '400',
    'width': '200',
    'border': '2',
    'className' : 'custom-popup'
    }

// the gap area popup style
var gapcustomOptions =
    {
    'maxWidth': '400',
    'width': '300',
    'border': '3',
    'className' : 'custom-popup1'
    }


//3.4 CREATING THE BASIC GEOSPATIAL DATA
//DOWNLOAD AND PARSE THE DATA: NATIONAL LEVEL
// $(document).ready(function(){
//   $.ajax(Paraguay_country_boundary).done(function(data){
//     parsedData_Country = JSON.parse(data);
//     console.log(parsedData_Country);
//     console.log("parsed");
//     //SET THE DEFAULT COUNTRY MAP FIRST
//     var defaultboundary = L.geoJson(parsedData_Country,
//       {
//         style: highlightStyle,
//         pointToLayer: function (feature, latlng) {
//           return new L.Polygon(latlng, {
//           });
//         },
//
//         onEachFeature: function(feature,layer){
//           layer.bindPopup(
//             "<b>Name: </b>" +
//             feature.properties.admin +
//             "</br>" +
//
//             "<b>GDP: </b>" +
//             feature.properties.gdp_md_est +
//             "</br>" +
//
//             "<b>Population: </b>" +
//             feature.properties.pop_est +
//             "</br>" +
//
//             "<b>Income level: </b>" +
//             feature.properties.income_grp +
//             "</br>" +
//
//             "</br><button class='btn btn-light my-2 my-sm-0' style='font-size:12px;'>Download Report</button>"
//           )}
//         }).addTo(map);
//         defaultboundary.eachLayer(eachFeatureFunction);
//         Country_boundary.push(defaultboundary);
//         console.log("default country boundary generated.");
//   })
// })
//DOWNLOAD AND PARSE THE DATA: DEPARTMENT LEVEL
$(document).ready(function(){
  $.ajax(Paraguay_dep_boundary).done(function(data){
    parsedData_Department = JSON.parse(data);
    console.log(parsedData_Department);
    var itemB = L.geoJson(parsedData_Department,
      {
        style: myStyle_dep,
        pointToLayer: function (feature, latlng) {
          return new L.Polygon(latlng, {
          })
          // .bindTooltip("Department").openTooltip()
          ;
        },

        onEachFeature: function(feature,layer){
          // OPTION 0

          label = ("<div id='text'>" +
          "<div id='name'> Department Name: " +
          "</div>" +
          "<b>" +
          "<span id='category'>" + '<style>#category{color:#fff; font-weight:bold; background-color:#2E86C1; padding: 5px;}</style>' + feature.properties.Dept_name + "</b>" + "</span>" + "</div>" +
          "<br>" + "<table style='width:100%'>" +
          "<tr>" + "<td>Total area: </td>" + "<td>" + feature.properties.Total_area.toFixed(3) + "</td>"+ "</tr>" +
          // "<tr>" + "<td>Population (2002): </td>" + "<td>"+ feature.properties.Cen_2002.toFixed(0) + "</td>" + "</tr>" +
          "<tr>" + "<td>Population (2015): </td>" + "<td>"+ feature.properties.Pro_2015.toFixed(0) + "</td>" + "</tr>" +
          "<tr>" + "<td>Pop density: </td>" + "<td>"+ (feature.properties.Pro_2015 / feature.properties.Total_area).toFixed(3) + "per sq km</td>" + "</tr>" +
          // "<tr>" + "<td>Population Change (2002 - 2015)</td>" + "<td>"+ feature.properties.Perce_chan.toFixed(3) + "</td>" + "</tr>" +
          // "<tr>" + "<td>Population Index</td>" + "<td>" + feature.properties.popdensity + "</td>" + "</tr>" +
          "</table></div>");

          tooltip = L.tooltip({
            opacity:0.85,
            sticky:true,
            wrapScreen:true,
            noWrap:false,
          })
            .setContent(label);

          layer.bindTooltip(tooltip);

            // layer.bindTooltip(
            //   "<b>Name:</b> " +
            //   feature.properties.Dept_name +
            //   "</br>" +
            //
            //   "<b>Area: </b> " +
            //   // feature.properties.SQKM.toFixed(3) +
            //   " square km</br>" +
            //
            //   "<b>Population:</b> " +
            //   // feature.properties.POP.toFixed(0) +
            //   "</br>" +
            //
            //   "<b>Population Density: </b> " +
            //   // (feature.properties.POP/feature.properties.SQKM).toFixed(3) +
            //   " per square km</br>"
            //
            // ).openTooltip();

          layer.bindPopup(
            "<b>Inventory Analysis for: </b><br>" +
            "<h4><strong>" + feature.properties.NAM + "</strong></h4>" +
            "</br>" +
            // "<b>Department Name: </b>" +
            // feature.properties.NAM +
            // "</br>" +
            //
            // "<b>Total Area: </b>" +
            // feature.properties.Total_area.toFixed(3) +
            // " square km</br>" +
            //
            // "<b>Total Population: </b>" +
            // feature.properties.Pro_2015.toFixed(0) +
            // "</br>" +
            //
            // "<b>Population Density: </b>" +
            // feature.properties.popdensity.toFixed(3) +
            // " per square km</br>" +

            "</br><button class='btn btn-light my-2 my-sm-0' style='font-size:12px;' onclick='tableToPDF1()'>Download Report</button>"
            ,

            customOptions

          ).addTo(map);

          // layer.bindTooltip("Department").openTooltip();

          // if(countgapdisplay%2 == 1){
            // layer.on('mouseover',function(e){
            //   this.openPopup();
            // });
          // };

          // layer.on('mouseout',function(e){
          //   this.closePopup();
          // });

          // var tooltip_dep = L.tooltip({
          //   target: layer,
          //     map: map,
          //     html: "Department!",
          //   padding: '4px 8px',
          //   showDelay: 0
          // });

        }
        });
        itemB.eachLayer(eachFeatureFunction);
        // itemB.eachLayer(eachFeature_dep);
        Department_boundary.push(itemB);

  })
})

//DOWNLOAD AND PARSE THE DATA: MUNI LEVEL
$(document).ready(function(){
  $.ajax(Paraguay_muni_boundary).done(function(data){
    parsedData_District = JSON.parse(data);
    console.log(parsedData_District);

    var itemB = L.geoJson(parsedData_District,
      {
        style: myStyle_dist,
        pointToLayer: function (feature, latlng) {
          return new L.Polygon(latlng, {
          });
        },

        onEachFeature: function(feature,layer){

          // OPTION 0
          label = ("<div id='labeltext'>" +
          "<div id='name'> District Name: " +
          "</div>" +
          "<b>" +
          "<span id='category'>" + '<style>#category{color:#fff; font-weight:bold; background-color:#2E86C1; padding: 5px;}</style>' + feature.properties.NAM + "</b>" + "</span>" + "</div>" +
          "<br>" + "<table style='width:100%'>" +
          "<tr>" + "<td>Total area: </td>" + "<td>" + feature.properties.Total_Area.toFixed(3) + "</td>"+ "</tr>" +
          "<tr>" + "<td>Population: </td>" + "<td>"+ feature.properties.Wpop2015.toFixed(0) + "</td>" + "</tr>" +
          "<tr>" + "<td>Pop density: </td>" + "<td>"+ (feature.properties.popdensity).toFixed(3) + " per sq km</td>" + "</tr>" +
          // "<tr>" + "<td>Population Change (2002 - 2015)</td>" + "<td>"+ feature.properties.Perce_chan.toFixed(3) + "</td>" + "</tr>" +
          // "<tr>" + "<td>Population Index</td>" + "<td>" + feature.properties.popdensity + "</td>" + "</tr>" +
          "</table>" +
          "</div>");

          tooltip = L.tooltip({
            sticky:true,
            wrapScreen:true,
            noWrap:false,
          })
            .setContent(label);

          layer.bindTooltip(tooltip);


          layer.bindPopup(
            "<b>Inventory Analysis for: </b><br>" +
            "<strong>" + feature.properties.NAM + "</strong>" +
            "</br>" +
            // "<b>District Name: </b>" +
            // feature.properties.NAM +
            // "</br>" +
            //
            // "<b>Total Area: </b>" +
            // feature.properties.Total_Area.toFixed(3) +
            // " square km</br>" +
            //
            // "<b>Total Population: </b>" +
            // feature.properties.Wpop2015.toFixed(0) +
            // "</br>" +
            //
            // "<b>Population Density: </b>" +
            // feature.properties.popdensity.toFixed(3) +
            // " per square km</br>" +

            // "<b>Data updated: </b>" +
            // feature.properties.updated_at +
            // "</br>" +

            "</br><button class='btn btn-light my-2 my-sm-0' style='font-size:12px;' onclick='tableToPDF1()'>Download Report</button>"

            ,

            customOptions
          );

          // layer.on('mouseover',function(e){
          //   layer.setStyle(mouseoverStyle);
          // });
          // layer.on('mouseout',function(e){
          //   layer.setStyle(myStyle_dist);
          // });
        }
        });
        itemB.eachLayer(eachFeatureFunction);
        //'<button class="btn btn-default dropdown-toggle" type="button" id="reportbutton" onclick="tableToPDF1()" data-toggle="dropdown" aria-haspopup="true">Download Report</button>';

        Muni_boundary.push(itemB);
  })
})

//DOWNLOAD AND PARSE THE DATA: PRIMARY ROADS
$(document).ready(function(){
  $.ajax(PrimaryRoadsUrl).done(function(data){
    parsedData_Roads1 = JSON.parse(data);
    console.log(parsedData_Roads1);
    console.log("parsed");
    var itemB = L.geoJson(parsedData_Roads1,
      {
        style: {opacity:0.85,width:2,color:'#212F3D',fillOpacity:0.8},
        pointToLayer: function (feature, latlng) {
          return new L.Polygon(latlng, {
          });
        },
        });
    PrimaryRoads.push(itemB);
  })
})
//DOWNLOAD AND PARSE THE DATA: SECONDARY ROADS
$(document).ready(function(){
  $.ajax(SecondaryRoadsUrl).done(function(data){
    parsedData_Roads2 = JSON.parse(data);
    console.log(parsedData_Roads2);
    console.log("parsed");
    var itemB = L.geoJson(parsedData_Roads2,
      {
        style: {opacity:0.85,width:0.5,color:'#839192',fillOpacity:0.3},
        pointToLayer: function (feature, latlngs) {
          return new L.polyline(latlngs, {
          }
        );
      }}
    );
    SecondaryRoads.push(itemB);
  })
})

//DOWNLOAD AND PARSE THE DATA: PAVED ROADS
$(document).ready(function(){
  $.ajax(PavedRoadsUrl).done(function(data){
    parsedData_RoadsPaved = JSON.parse(data);
    console.log(parsedData_RoadsPaved);
    console.log("parsed");
    var itemB = L.geoJson(parsedData_RoadsPaved,
      {
        style: {opacity:0.65,width:0.5,color:'#82000A',fillOpacity:0.4},
        pointToLayer: function (feature, latlngs) {
          return new L.polyline(latlngs, {
          }
        );
      }}
    )
    // .bindTooltip("Paved Roads").openTooltip()
    ;
    PavedRoads.push(itemB);
  })
})

//DOWNLOAD AND PARSE THE DATA: GRAVEL ROADS
$(document).ready(function(){
  $.ajax(GravelRoadsUrl).done(function(data){
    parsedData_RoadsGravel = JSON.parse(data);
    console.log(parsedData_RoadsGravel);
    console.log("parsed");
    var itemB = L.geoJson(parsedData_RoadsGravel,
      {
        style: {opacity:0.65,width:0.5,color:'#fff01A',fillOpacity:0.4},
        pointToLayer: function (feature, latlngs) {
          return new L.polyline(latlngs, {
          }
        );
      }}
    );
    GravelRoads.push(itemB);
  })
})

//DOWNLOAD AND PARSE THE DATA: DIRT ROADS
$(document).ready(function(){
  $.ajax(DirtRoadsUrl).done(function(data){
    parsedData_RoadsDirt = JSON.parse(data);
    console.log(parsedData_RoadsDirt);
    console.log("parsed");
    var itemB = L.geoJson(parsedData_RoadsDirt,
      {
        style: {opacity:0.3,width:0.5,color:'#80033A',fillOpacity:0.3},
        pointToLayer: function (feature, latlngs) {
          return new L.polyline(latlngs, {
          }
        );
      }}
    );
    DirtRoads.push(itemB);
  })
})


//DOWNLOAD AND PARSE THE DATA: AIRPORT
$(document).ready(function(){
  $.ajax(AirportsUrl).done(function(data){
    parsedData_Airports = JSON.parse(data);
    console.log(parsedData_Airports);
    console.log("parsed");
    var itemB = L.geoJson(parsedData_Airports,
      {
        style: myStyle_airports,
        pointToLayer: function (feature, latlng) {
          return new L.circleMarker(latlng, {
            // radius:10,
            // weight:3,
            // opacity:0.7,
            // fillOpacity:0.7,
          });
      },

      onEachFeature: function(feature,layer){
        var coord = layer.feature.geometry.coordinates;
        coordsAirports.push(coord);
      },

    }
  ).bindTooltip("Airport").openTooltip()
  // .bindPopup("Airport")
  ;
    Airports.push(itemB);
    // console.log(coordsAirports);
    //
    // var airports = coordsAirports.map(function (p) { return [p[1], p[0], 15]; });
    // console.log("heatmap generated.");
    // console.log(airports);
    //
    // heat_airports = L.heatLayer(airports,{
    //
    //     radius: 30,
    //     blur: 25,
    //     maxZoom: 17,
    //
    // });
    //
    // console.log("AIRPORTS heatmap generated.");
  })
})
//DOWNLOAD AND PARSE THE DATA: PORT
$(document).ready(function(){
  $.ajax(PortsUrl).done(function(data){
    parsedData_Ports = JSON.parse(data);
    console.log(parsedData_Ports);
    console.log("parsed");
    var itemB = L.geoJson(parsedData_Ports,
      {
        style: myStyle_ports,
        pointToLayer: function (feature, latlng) {
          return new L.circleMarker(latlng, {
            // radius:6,
            // weight:1,
            // opacity:0.7,
            // fillOpacity:0.5,
          });
      },

      onEachFeature: function(feature,layer){
        var coord = layer.feature.geometry.coordinates;
        coordsPorts.push(coord);
      },

    }
    ).bindPopup("ports");
    Ports.push(itemB);
    // console.log(coordsPorts);
    //
    // var ports = coordsPorts.map(function (p) { return [p[1], p[0], 10]; });
    // console.log("heatmap generated.");
    // console.log(ports);
    //
    // heat_ports = L.heatLayer(ports,{
    //
    //     radius: 30,
    //     blur: 25,
    //     maxZoom: 17,
    //
    // });
    //
    // console.log("PORTS heatmap generated.");
  })
})

//DOWNLOAD AND PARSE THE DATA: EDUCATION
//DOWNLOAD AND PARSE THE DATA: MIDDLE SCHOOLS
$(document).ready(function(){
  $.ajax(MiddleSchoolsUrl).done(function(data){
    parsedData_MiddleSchools = JSON.parse(data);
    console.log(parsedData_MiddleSchools);
    console.log("parsed middle schools.");
    var itemB = L.geoJson(parsedData_MiddleSchools,
      {
        style: {opacity:0.45,width:0.05,color:'#5DADE2'},
        pointToLayer: function (feature, latlng) {
          return new L.circleMarker(latlng, {
            radius:2,
            weight:1,
            opacity:0.7,
            fillOpacity:0.7,
          });
        },

        onEachFeature: function(feature,layer){
          var coord = layer.feature.geometry.coordinates;
          coordsMiddleSchools.push(coord);
        },

    }
  ).bindPopup("middle schools");
    MiddleSchools.push(itemB);

    //GENERATE HEATMAP FOR THE MIDDLE SCHOOL DATA
    var middleschools = coordsMiddleSchools.map(function (p) { return [p[1], p[0], 6]; });
    console.log(coordsMiddleSchools);

        heat_middleschools = L.heatLayer(middleschools,{

            radius: 30,
            blur: 25,
            maxZoom: 17,

        });

    console.log("middleschools heatmap generated.");



  })
})

//DOWNLOAD AND PARSE THE DATA: PRIMARY HEALTHCARE
$(document).ready(function(){
  $.ajax(PrimaryHealthcareUrl).done(function(data){
    parsedData_PrimaryHealthcare = JSON.parse(data);
    console.log(parsedData_PrimaryHealthcare);
    console.log("parsed");
    var itemB = L.geoJson(parsedData_PrimaryHealthcare,
      {
        style: {opacity:0.45,width:0.05,color:'#233700'},
        pointToLayer: function (feature, latlng) {
          return new L.circleMarker(latlng, {
            radius:2,
            weight:1,
            opacity:0.7,
            fillOpacity:0.7,
          });
        },
    }
  ).bindPopup("PRIMARY HEALTH schools");
    PrimaryHealthcare.push(itemB);
  })
})

//DOWNLOAD AND PARSE THE DATA: SECONDARY HEALTHCARE
$(document).ready(function(){
  $.ajax(SecondaryHealthcareUrl).done(function(data){
    parsedData_SecondaryHealthcare = JSON.parse(data);
    console.log(parsedData_SecondaryHealthcare);
    console.log("parsed");
    var itemB = L.geoJson(parsedData_SecondaryHealthcare,
      {
        style: {opacity:0.45,width:0.05,color:'#233700'},
        pointToLayer: function (feature, latlng) {
          return new L.circleMarker(latlng, {
            radius:2,
            weight:1,
            opacity:0.7,
            fillOpacity:0.7,
          });
        },
    }
  ).bindPopup("SECONDARY HEALTH schools");
    SecondaryHealthcare.push(itemB);
  })
})


//DOWNLOAD AND PARSE THE DATA: TERTIARY HEALTHCARE
$(document).ready(function(){
  $.ajax(TertiaryHealthcareUrl).done(function(data){
    parsedData_TertiaryHealthcare = JSON.parse(data);
    console.log(parsedData_TertiaryHealthcare);
    console.log("parsed");
    var itemB = L.geoJson(parsedData_TertiaryHealthcare,
      {
        style: {opacity:0.45,width:0.05,color:'#233700'},
        pointToLayer: function (feature, latlng) {
          return new L.circleMarker(latlng, {
            radius:3,
            weight:1,
            opacity:0.7,
            fillOpacity:0.7,
          });
        },
    }
  ).bindPopup("TERTIARY HEALTH schools");
    TertiaryHealthcare.push(itemB);
  })
})


//3.5 CREATING THE GAP ANALYSIS GEOSPATIAL DATA
//STILL NEED TO RESTRICT THAT
//WHEN SPECIFIC SCALE OF UNITS IS CHOOSED, THE UNIT CAN NOT BE CHANGES WITH CHANGING ZOOM LEVEL!!!
//TO SHOW DIFFERENT OBJECT WITH DIFFERENT ZOOM LEVEL
// REF:http://jsfiddle.net/expedio/kuovyw8m/
// map.on('zoomend', function (e) {
//     zoom_based_layerchange();
// });

function zoom_based_layerchange() {
    //console.log(map.getZoom());
    // $("#zoomlevel").html(map.getZoom());
    var currentZoom = map.getZoom();

    if(countgapdisplay%2 == 1){
      switch (currentZoom) {
          case 6:
              // clean_map();
              // coorsLayer.addTo(map); //show Coors Field
              // $("#layername").html("Coors Field");
              _.each(Department_boundary,function(layer){
                map.removeLayer(layer);
              });
              _.each(Muni_boundary,function(layer){
                map.removeLayer(layer);
              });
              _.each(Country_boundary,function(layer){
                map.addLayer(layer);
              });
              break;
          case 8:
              // clean_map();
              // buslayer.addTo(map); //show Busline
              // $("#layername").html("Busline");
              _.each(Country_boundary,function(layer){
                map.removeLayer(layer);
              });
              _.each(Muni_boundary,function(layer){
                map.removeLayer(layer);
              });
              _.each(Department_boundary,function(layer){
                map.addLayer(layer);
              });
              break;
          case 12:
              // clean_map();
              // rental.addTo(map);
              // $("#layername").html("Rental");
              // // show rental
              _.each(Country_boundary,function(layer){
                map.removeLayer(layer);
              });
              _.each(Department_boundary,function(layer){
                map.removeLayer(layer);
              });
              _.each(Muni_boundary,function(layer){
                map.addLayer(layer);
              });
              break;

          default:
              // do nothing
              break;
      }
    }
    else{
      //remove the layers with tooltip labels



      switch (currentZoom) {
          case 6:
              // clean_map();
              // coorsLayer.addTo(map); //show Coors Field
              // $("#layername").html("Coors Field");
              _.each(Department_boundary,function(layer){
                map.removeLayer(layer);
              });
              _.each(Muni_boundary,function(layer){
                map.removeLayer(layer);
              });

              _.each(Department_boundary1,function(layer){
                map.removeLayer(layer);
              });
              _.each(Muni_boundary1,function(layer){
                map.removeLayer(layer);
              });


              _.each(Country_boundary,function(layer){
                map.addLayer(layer);
              });
              break;
          case 8:
              // clean_map();
              // buslayer.addTo(map); //show Busline
              // $("#layername").html("Busline");
              _.each(Department_boundary,function(layer){
                map.removeLayer(layer);
              });
              _.each(Muni_boundary,function(layer){
                map.removeLayer(layer);
              });

              _.each(Country_boundary,function(layer){
                map.removeLayer(layer);
              });
              _.each(Muni_boundary1,function(layer){
                map.removeLayer(layer);
              });


              _.each(Department_boundary1,function(layer){
                map.addLayer(layer);
              });
              break;
          case 12:
              // clean_map();
              // rental.addTo(map);
              // $("#layername").html("Rental");
              // // show rental
              _.each(Department_boundary,function(layer){
                map.removeLayer(layer);
              });
              _.each(Muni_boundary,function(layer){
                map.removeLayer(layer);
              });

              _.each(Country_boundary,function(layer){
                map.removeLayer(layer);
              });
              _.each(Department_boundary1,function(layer){
                map.removeLayer(layer);
              });
              _.each(Muni_boundary1,function(layer){
                map.addLayer(layer);
              });
              break;

          default:
              // do nothing
              break;
      }
    }
}


//INTIATIATE THE ANALYTICS MODE
var countgapdisplay = 1;
$('#gapshowbutton').click(function(){
  countgapdisplay++;
  if(countgapdisplay%2 == 0){
    $('#selected5').text('Hide Analytics');
    if(Country_boundary || Department_boundary || Muni_boundary){
      _.each(Country_boundary,function(layer){
          layer.setStyle(fadedStyle);
      });
      _.each(Department_boundary,function(layer){
          layer.setStyle(fadedStyle);
      });
      _.each(Muni_boundary,function(layer){
          layer.setStyle(fadedStyle);
      });
    };

    console.log("analytics clicked.");


    if(selectedscale == 'department'){
      _.each(Muni_boundary,function(layer){
          map.removeLayer(layer);
      });
      _.each(Country_boundary,function(layer){
          map.removeLayer(layer);
      });



      _.each(Department_boundary,function(layer){
          map.removeLayer(layer);
      });
      _.each(Department_boundary1,function(layer){
          layer.setStyle(fadedStyle);
      });
      _.each(Department_boundary1,function(layer){
          map.addLayer(layer);
      });
    }


    if(selectedscale == 'district'){
      console.log("district level analytics ready");
      _.each(Country_boundary,function(layer){
          map.removeLayer(layer);
      });
      _.each(Department_boundary,function(layer){
          map.removeLayer(layer);
      });


      _.each(Muni_boundary,function(layer){
          map.removeLayer(layer);
      });
      _.each(Muni_boundary1,function(layer){
          layer.setStyle(fadedStyle);
      });
      _.each(Muni_boundary1,function(layer){
          map.addLayer(layer);
      });
    }




  }else{
    $('#selected5').text('Launch Analytics');
    if(Country_boundary || Department_boundary || Muni_boundary){
    //REASSIGN THE STYLE FOR THE GEO OBJECTS
    _.each(Country_boundary,function(layer){
        layer.setStyle(highlightStyle);
    });
    _.each(Department_boundary,function(layer){
        layer.setStyle(myStyle_dep);
    });
    _.each(Muni_boundary,function(layer){
        layer.setStyle(myStyle_dist);
    });
    }

  }


});


//FOLLOWING IS THE ANALYTICS MODE OF DISPLAYING BASIC DATA OBJECTS
//DOWNLOAD AND PARSE THE DATA: DEPARTMENT LEVEL
$(document).ready(function(){
  $.ajax(Paraguay_dep_boundary).done(function(data){
    parsedData_Department = JSON.parse(data);
    console.log(parsedData_Department);
    console.log("parsed");

    var itemB = L.geoJson(parsedData_Department,
      {
        style: myStyle_dep,
        pointToLayer: function (feature, latlng) {
          return new L.Polygon(latlng, {
          });
        },

        onEachFeature: function(feature,layer){
          layer.bindPopup(
            "<b>Department Name: </b>" +
            feature.properties.NAM +
            "</br>" +

            "<b>Total Area: </b>" +
            feature.properties.Total_area.toFixed(3) +
            " square km</br>" +

            "<b>Total Population: </b>" +
            feature.properties.Pro_2015.toFixed(0) +
            "</br>" +

            "<b>Population Density: </b>" +
            feature.properties.popdensity.toFixed(3) +
            " per square km</br>" +

            "</br><button class='btn btn-light my-2 my-sm-0' style='font-size:12px;' onclick='tableToPDF1()'>Download Report</button>"
            ,

            customOptions

          );

        }
        });
        itemB.eachLayer(eachFeatureFunction);
        Department_boundary1.push(itemB);

  })
})
//DOWNLOAD AND PARSE THE DATA: MUNI LEVEL
$(document).ready(function(){
  $.ajax(Paraguay_muni_boundary).done(function(data){
    parsedData_District = JSON.parse(data);
    console.log(parsedData_District);
    console.log("parsed");

    var itemB = L.geoJson(parsedData_District,
      {
        style: myStyle_dist,
        pointToLayer: function (feature, latlng) {
          return new L.Polygon(latlng, {

          });
        },

        onEachFeature: function(feature,layer){
          layer.bindPopup(
            "<b>District Name: </b>" +
            feature.properties.NAM +
            "</br>" +

            "<b>Total Area: </b>" +
            feature.properties.Total_Area.toFixed(3) +
            " square km</br>" +

            "<b>Total Population: </b>" +
            feature.properties.Wpop2015.toFixed(0) +
            "</br>" +

            "<b>Population Density: </b>" +
            feature.properties.popdensity.toFixed(3) +
            " per square km</br>" +

            // "<b>Data updated: </b>" +
            // feature.properties.updated_at +
            // "</br>" +

            "</br><button class='btn btn-light my-2 my-sm-0' style='font-size:12px;' onclick='tableToPDF1()'>Download Report</button>"

            ,

            customOptions
          );

        }
        });
        itemB.eachLayer(eachFeatureFunction);
        //'<button class="btn btn-default dropdown-toggle" type="button" id="reportbutton" onclick="tableToPDF1()" data-toggle="dropdown" aria-haspopup="true">Download Report</button>';

        Muni_boundary1.push(itemB);
  })
})

//DOWNLOAD AND PARSE THE DATA: GAP AREAS
//DOWNLOAD AND PARSE THE DATA: TRANSPORTATION COVERAGE
$(document).ready(function(){
  $.ajax(GAP_transcoverageUrl).done(function(data){
    parsedData_transGapCoverage = JSON.parse(data);
    console.log(parsedData_transGapCoverage);
    console.log("parsed");
    //SET THE DEFAULT COUNTRY MAP FIRST
    var itemB = L.geoJson(parsedData_transGapCoverage,
      {
        style: gapCoverageStyle,
        pointToLayer: function (feature, latlng) {
          return new L.Polygon(latlng, {
          });
        },



        onEachFeature: function(feature,layer){
          layer.bindPopup(
            "<b>Name:</b> Gap Area #" +
            feature.properties.ID +
            "</br>" +

            "<b>Area: </b> " +
            feature.properties.SQKM.toFixed(3) +
            " square km</br>" +

            "<b>Population:</b> " +
            feature.properties.POP.toFixed(0) +
            "</br>" +

            "<b>Population Density: </b> " +
            (feature.properties.POP/feature.properties.SQKM).toFixed(3) +
            " per square km</br>" +

            "</br><button class='btn btn-light my-2 my-sm-0' style='font-size:12px;' onclick='tableToPDF2()'>Download Report</button>"

            ,

            gapcustomOptions

          );

            layer.on('mouseover',function(e){
              this.openPopup();
            });

          }
        });
        itemB.eachLayer(eachFeatureFunction);
        transGapCoverage.push(itemB);
        console.log("gap coverage generated.");
  })
})


//DOWNLOAD AND PARSE THE DATA: TRANSPORTATION QUALITY
$(document).ready(function(){
  $.ajax(GAP_transqualityUrl).done(function(data){
    parsedData_transGapQuality = JSON.parse(data);
    console.log(parsedData_transGapQuality);
    console.log("parsed");
    //SET THE DEFAULT COUNTRY MAP FIRST
    var itemB = L.geoJson(parsedData_transGapQuality,
      {
        style: gapQualityStyle,
        pointToLayer: function (feature, latlng) {
          return new L.Polygon(latlng, {
          });
        },

        onEachFeature: function(feature,layer){
          layer.bindPopup(
            "<b>Name:</b> Gap Area #" +
            feature.properties.Id +
            "</br>" +

            "<b>Area: </b> " +
            feature.properties.SQKM.toFixed(3) +
            " square km</br>" +

            "<b>Population:</b> " +
            feature.properties.POP.toFixed(0) +
            "</br>" +

            "<b>Population Density: </b> " +
            (feature.properties.POP/feature.properties.SQKM).toFixed(3) +
            " per square km</br>" +

            "</br><button class='btn btn-light my-2 my-sm-0' style='font-size:12px;' onclick='tableToPDF2()'>Download Report</button>"

            ,

            gapcustomOptions

          );

            layer.on('mouseover',function(e){
              this.openPopup();
            });

          }
        });
        itemB.eachLayer(eachFeatureFunction);
        transGapQuality.push(itemB);
        console.log("gap quality generated.");
  })
})


//DOWNLOAD AND PARSE THE DATA: TRANSPORTATION OUTCOME
$(document).ready(function(){
  $.ajax(GAP_transoutcomeUrl).done(function(data){
    parsedData_transGapOutcome = JSON.parse(data);
    console.log(parsedData_transGapOutcome);
    console.log("parsed");
    //SET THE DEFAULT COUNTRY MAP FIRST
      var itemB = L.geoJson(parsedData_transGapOutcome,
      {
        style: gapOutcomeStyle,
        pointToLayer: function (feature, latlng) {
          return new L.Polygon(latlng, {
          });
        },

        onEachFeature: function(feature,layer){
          layer.bindPopup(
            "<b>Name:</b> Gap Area #" +
            feature.properties.Id +
            "</br>" +

            "<b>Area: </b> " +
            feature.properties.SQKM.toFixed(3) +
            " square km</br>" +

            "<b>Population:</b> " +
            feature.properties.POP.toFixed(0) +
            "</br>" +

            "<b>Population Density: </b> " +
            (feature.properties.POP/feature.properties.SQKM).toFixed(3) +
            " per square km</br>" +

            "</br><button class='btn btn-light my-2 my-sm-0' style='font-size:12px;' onclick='tableToPDF2()'>Download Report</button>"

            ,

            gapcustomOptions

          );

            layer.on('mouseover',function(e){
              this.openPopup();
            });

          }
        });
        itemB.eachLayer(eachFeatureFunction);
        transGapOutcome.push(itemB);
        console.log("gap outcome generated.");
  })
})


//DOWNLOAD AND PARSE THE DATA: EDUCATION COVERAGE
$(document).ready(function(){
  $.ajax(GAP_educoverageUrl).done(function(data){
    parsedData_eduGapCoverage = JSON.parse(data);
    console.log(parsedData_eduGapCoverage);
    console.log("parsed");
    //SET THE DEFAULT COUNTRY MAP FIRST
    var itemB = L.geoJson(parsedData_eduGapCoverage,
      {
        style: gapCoverageStyle,
        pointToLayer: function (feature, latlng) {
          return new L.Polygon(latlng, {
          });
        },

        onEachFeature: function(feature,layer){
          layer.bindPopup(
            "<b>Name:</b> Gap Area #" +
            feature.properties.Id +
            "</br>" +

            "<b>Area: </b> " +
            feature.properties.Area_KM2.toFixed(3) +
            " square km</br>" +

            "<b>Population:</b> " +
            feature.properties.POP.toFixed(0) +
            "</br>" +

            "<b>Population Density: </b> " +
            (feature.properties.POP/feature.properties.Area_KM2).toFixed(3) +
            " per square km</br>" +

            "</br><button class='btn btn-light my-2 my-sm-0' style='font-size:12px;' onclick='tableToPDF2()'>Download Report</button>"

            ,

            gapcustomOptions

          );

            layer.on('mouseover',function(e){
              this.openPopup();
            });

          }
        });
        itemB.eachLayer(eachFeatureFunction);
        eduGapCoverage.push(itemB);
        console.log("gap coverage generated.");
  })
})


//DOWNLOAD AND PARSE THE DATA: QUALITY
$(document).ready(function(){
  $.ajax(GAP_eduqualityUrl).done(function(data){
    parsedData_eduGapQuality = JSON.parse(data);
    console.log(parsedData_eduGapQuality);
    console.log("parsed");
    //SET THE DEFAULT COUNTRY MAP FIRST
    var itemB = L.geoJson(parsedData_eduGapQuality,
      {
        style: gapQualityStyle,
        pointToLayer: function (feature, latlng) {
          return new L.Polygon(latlng, {
          });
        },

        onEachFeature: function(feature,layer){
          layer.bindPopup(
            "<b>Name:</b> Gap Area #" +
            feature.properties.Id +
            "</br>" +

            "<b>Area: </b> " +
            feature.properties.SQKM.toFixed(3) +
            " square km</br>" +

            "<b>Population:</b> " +
            feature.properties.POP.toFixed(0) +
            "</br>" +

            "<b>Population Density: </b> " +
            (feature.properties.POP/feature.properties.SQKM).toFixed(3) +
            " per square km</br>" +

            "</br><button class='btn btn-light my-2 my-sm-0' style='font-size:12px;' onclick='tableToPDF2()'>Download Report</button>"

            ,

            gapcustomOptions

          );

            layer.on('mouseover',function(e){
              this.openPopup();
            });

          }
        });
        itemB.eachLayer(eachFeatureFunction);
        eduGapQuality.push(itemB);
        console.log("gap quality generated.");
  })
})


//DOWNLOAD AND PARSE THE DATA: OUTCOME
$(document).ready(function(){
  $.ajax(GAP_eduoutcomeUrl).done(function(data){
    parsedData_eduGapOutcome = JSON.parse(data);
    console.log(parsedData_eduGapOutcome);
    console.log("parsed");
    //SET THE DEFAULT COUNTRY MAP FIRST
      var itemB = L.geoJson(parsedData_eduGapOutcome,
      {
        style: gapOutcomeStyle,
        pointToLayer: function (feature, latlng) {
          return new L.Polygon(latlng, {
          });
        },

        onEachFeature: function(feature,layer){
          layer.bindPopup(
            "<b>Name:</b> Gap Area #" +
            feature.properties.Id +
            "</br>" +

            "<b>Area: </b> " +
            feature.properties.SQKM.toFixed(3) +
            " square km</br>" +

            "<b>Population:</b> " +
            feature.properties.POP.toFixed(0) +
            "</br>" +

            "<b>Population Density: </b> " +
            (feature.properties.POP/feature.properties.SQKM).toFixed(3) +
            " per square km</br>" +

            "</br><button class='btn btn-light my-2 my-sm-0' style='font-size:12px;' onclick='tableToPDF2()'>Download Report</button>"

            ,

            gapcustomOptions

          );

            layer.on('mouseover',function(e){
              this.openPopup();
            });

          }
        });
        itemB.eachLayer(eachFeatureFunction);
        eduGapOutcome.push(itemB);
        console.log("gap outcome generated.");
  })
})


//DOWNLOAD AND PARSE THE DATA: PUBLIC HEALTH COVERAGE
$(document).ready(function(){
  $.ajax(GAP_hthcoverageUrl).done(function(data){
    parsedData_hthGapCoverage = JSON.parse(data);
    console.log(parsedData_hthGapCoverage);
    console.log("parsed");
    //SET THE DEFAULT COUNTRY MAP FIRST
    var itemB = L.geoJson(parsedData_hthGapCoverage,
      {
        style: gapCoverageStyle,
        pointToLayer: function (feature, latlng) {
          return new L.Polygon(latlng, {
          });
        },

        onEachFeature: function(feature,layer){
          layer.bindPopup(
            "<b>Name:</b> Gap Area #" +
            feature.properties.ID +
            "</br>" +

            "<b>Area: </b> " +
            feature.properties.SQKM.toFixed(3) +
            " square km</br>" +

            "<b>Population:</b> " +
            feature.properties.WPOP15.toFixed(0) +
            "</br>" +

            "<b>Population Density: </b> " +
            (feature.properties.POP/feature.properties.SQKM).toFixed(3) +
            " per square km</br>" +

            "</br><button class='btn btn-light my-2 my-sm-0' style='font-size:12px;' onclick='tableToPDF2()'>Download Report</button>"

            ,

            gapcustomOptions

          );

            layer.on('mouseover',function(e){
              this.openPopup();
            });

          }
        });
        itemB.eachLayer(eachFeatureFunction);
        hthGapCoverage.push(itemB);
        console.log("gap coverage generated.");
  })
})


//DOWNLOAD AND PARSE THE DATA: PUBLIC HEALTH QUALITY
$(document).ready(function(){
  $.ajax(GAP_hthqualityUrl).done(function(data){
    parsedData_hthGapQuality = JSON.parse(data);
    console.log(parsedData_hthGapQuality);
    console.log("parsed");
    //SET THE DEFAULT COUNTRY MAP FIRST
    var itemB = L.geoJson(parsedData_hthGapQuality,
      {
        style: gapQualityStyle,
        pointToLayer: function (feature, latlng) {
          return new L.Polygon(latlng, {
          });
        },

        onEachFeature: function(feature,layer){
          layer.bindPopup(
            "<b>Name:</b> Gap Area #" +
            feature.properties.Id +
            "</br>" +

            "<b>Area: </b> " +
            feature.properties.sqkm.toFixed(3) +
            " square km</br>" +

            "<b>Population:</b> " +
            feature.properties.POP_PRIMAR.toFixed(0) +
            "</br>" +

            "<b>Population Density: </b> " +
            (feature.properties.POP_PRIMAR/feature.properties.sqkm).toFixed(3) +
            " per square km</br>" +

            "</br><button class='btn btn-light my-2 my-sm-0' style='font-size:12px;' onclick='tableToPDF2()'>Download Report</button>"

            ,

            gapcustomOptions

          );

            layer.on('mouseover',function(e){
              this.openPopup();
            });

          }
        });
        itemB.eachLayer(eachFeatureFunction);
        hthGapQuality.push(itemB);
        console.log("gap quality generated.");
  })
})


//DOWNLOAD AND PARSE THE DATA: PUBLIC HEALTH OUTCOME
$(document).ready(function(){
  $.ajax(GAP_hthoutcomeUrl).done(function(data){
    parsedData_hthGapOutcome = JSON.parse(data);
    console.log(parsedData_hthGapOutcome);
    console.log("parsed");
    //SET THE DEFAULT COUNTRY MAP FIRST
      var itemB = L.geoJson(parsedData_hthGapOutcome,
      {
        style: gapOutcomeStyle,
        pointToLayer: function (feature, latlng) {
          return new L.Polygon(latlng, {
          });
        },

        onEachFeature: function(feature,layer){
          layer.bindPopup(
            "<b>Name:</b> Gap Area #" +
            feature.properties.Id +
            "</br>" +

            "<b>Area: </b> " +
            feature.properties.sqkm.toFixed(3) +
            " square km</br>" +

            "<b>Population:</b> " +
            feature.properties.POP.toFixed(0) +
            "</br>" +

            "<b>Population Density: </b> " +
            (feature.properties.POP/feature.properties.sqkm).toFixed(3) +
            " per square km</br>" +

            "</br><button class='btn btn-light my-2 my-sm-0' style='font-size:12px;' onclick='tableToPDF2()'>Download Report</button>"

            ,

            gapcustomOptions

          );

            layer.on('mouseover',function(e){
              this.openPopup();
            });

          }
        });
        itemB.eachLayer(eachFeatureFunction);
        hthGapOutcome.push(itemB);
        console.log("gap outcome generated.");
  })
})


//DEFINE THE EACH FUNCTION FOR INTERACTION WITH EACH LAYER FEATURE OBJECT
var eachFeatureFunction = function(layer){
  layer.on('mouseover', function() { layer.setStyle(mouseoverstyle);});
  layer.on('mouseout', function() { layer.setStyle(mouseoutstyle);});
  //REFERENCE ON AZAVEA NEXTCITY PROJECT
  // label = ("<div id='text'>" +
  // "<div id='name'>" + layer.feature.properties.Neighborho + "</div>" +
  // " is " + "<b>" + "<span id='category'>" + '<style>#category{background-color:' + layer.feature.properties.color + '; padding: 5px;}</style>' + layer.feature.properties.category + "</b>" + "</span>" + "</div>" +
  //  "<br>" + "<table style='width:100%'>" + "<tr>" + "<td>Crime Index</td>" + "<td>"+layer.feature.properties.CrimeScore + "</td>" + "</tr>" +
  //  "<tr>" + "<td>Median HH Income Index</td>" + "<td>" + layer.feature.properties.MHIScore + "</td>" + "</tr>" +
  //  "<tr>" + "<td>Population Index</td>" + "<td>"+layer.feature.properties.PopScore + "</td>" + "</tr>" +
  //  "<tr>" + "<td>Poverty Index</td>" + "<td>"+layer.feature.properties.PovScore + "</td>"+ "</tr>" +
  //  "<tr>" + "<td>Home Price Index</td>" + "<td>"+layer.feature.properties.MHSScore + "</td>"+ "</tr>" + "</table>");

    layer.on('click', function (event){
      // console.log(layer.feature.properties.poverty);
      map.fitBounds(layer.getBounds(),{
               padding: [80,80]
            });

      _.each(transGapCoverage,function(layer){
            layer.setStyle(gapCoverageStyle);
      });
      _.each(transGapOutcome,function(layer){
            layer.setStyle(gapOutcomeStyle);
      });
      _.each(transGapQuality,function(layer){
            layer.setStyle(gapQualityStyle);
      });

      _.each(Muni_boundary,function(layer){
          layer.setStyle(myStyle_dist);
      });

      _.each(Department_boundary,function(layer){
          layer.setStyle(myStyle_dist);
      });

      console.log("highlighted passed");
      layer.setStyle(extrahighlightStyle);

    });

    // layer.on('click', function (event) {
    //   map.fitBounds(layer.getBounds(),{
    //              padding: [100,180]
    //            });
    //   layer.setStyle(clickStyle);
    //   layer.on('mouseout', function(e){
    //     layer.setStyle(pastclickStyle);
    //   });
    // });

    //DEFINE THE USER QUERY INPUT!
    // $('#search').click(function(){
    //   povlow = $('#input1l').val();
    //   povhigh = $('#input1h').val();
    //   schllow = $('#input2l').val();
    //   schlhigh = $('#input2h').val();
    //   console.log("You selected the poverty range from "+ povlow +"% to " + povhigh +"%.");
    //   console.log("You selected the school density range from "+ schllow +" schools to " + schlhigh +"schools per 10,000 people.");
    //
    //   var pov = layer.feature.properties.poverty;
    //   console.log(layer.feature.properties.poverty);
    //
    //   var schld = layer.feature.properties.schl_perca;
    //   console.log(layer.feature.properties.schl_perca);
    //
    //   if((pov >= povlow) && (pov <= povhigh) && (schld >= schllow) && (schld <= schlhigh)){
    //     console.log(layer);
    //   } else {
    //     map.removeLayer(layer);
    //   }
    // });

};

//DOWNLOAD AND PARSE THE DATA: HOSPITALS
// $(document).ready(function(){
//   $.ajax(HospitalsUrl).done(function(data){
//     parsedData_Hospitals = JSON.parse(data);
//     console.log(parsedData_Hospitals);
//     console.log("parsed");
//     var itemB = L.geoJson(parsedData_Hospitals,
//       {
//         style: {opacity:0.45,width:0.05,color:'#A569BD'},
//         pointToLayer: function (feature, latlng) {
//           return new L.circleMarker(latlng, {
//             radius:3,
//             weight:1,
//             opacity:0.7,
//             fillOpacity:0.7,
//           });
//         },
//
//         onEachFeature: function(feature,layer){
//           var coord = layer.feature.geometry.coordinates;
//           coordsHospitals.push(coord);
//         },
//
//     }
//     ).bindPopup("hospital");
//     Hospitals.push(itemB);
//     console.log(coordsHospitals);
//
//     var hospitals = coordsHospitals.map(function (p) { return [p[1], p[0], 6]; });
//     console.log("heatmap generated.");
//     console.log(hospitals);
//
//     heat_hospitals = L.heatLayer(hospitals,{
//
//         radius: 30,
//         blur: 25,
//         maxZoom: 17,
//
//     });
//
//     console.log("HOSPITALS heatmap generated.");
//   })
// })

//define the parsed layer files
// var parsedData_Airports;
// var parsedData_Ports;
// var parsedData_Schools;
// var parsedData_Hospitals;
// var parsedData_Roads1;
// var parsedData_Roads2;


//MAP THE DATA ON WEB
//CHOOSE THE SCALE OF DISPLAY
//change the units on maps

// $('#mode_adm').click(function(){
//     _.each(Muni_boundary,function(layer){
//       map.addLayer(layer);
//     });
// })

$('#countryscale').click(function(){
  selectedscale = 'country';
  // $('#selectedunit').text($(this).text());
  map.setView([-23.414, -57.384],7);

  _.each(Department_boundary1,function(layer){
    map.removeLayer(layer);
  });
  _.each(Muni_boundary1,function(layer){
    map.removeLayer(layer);
  });



      _.each(Department_boundary,function(layer){
        map.removeLayer(layer);
      });
      _.each(Muni_boundary,function(layer){
        map.removeLayer(layer);
      });
      _.each(Country_boundary,function(layer){
        map.addLayer(layer);
      });

      //REASSIGN THE STYLE FOR THE GEO OBJECTS
      _.each(Country_boundary,function(layer){
          layer.setStyle(highlightStyle);
      });

});

$('#depscale').click(function(){
  selectedscale = 'department';
  // $('#selectedunit').text($(this).text());
  // map.setView([-23.414, -57.384],7);



  if(countgapdisplay%2 == 0){
    //the situation in analytics mode
    _.each(Country_boundary,function(layer){
      map.removeLayer(layer);
    });
    _.each(Muni_boundary1,function(layer){
      map.removeLayer(layer);
    });

    _.each(Department_boundary,function(layer){
      map.removeLayer(layer);
    });
    _.each(Department_boundary1,function(layer){
      map.addLayer(layer);
    });
    _.each(Department_boundary1,function(layer){
        layer.setStyle(fadedStyle);
    });
  }else{
    //the situation in data module
    _.each(Muni_boundary1,function(layer){
      map.removeLayer(layer);
    });
    _.each(Country_boundary,function(layer){
      map.removeLayer(layer);
    });



    _.each(Muni_boundary,function(layer){
      map.removeLayer(layer);
    });
    _.each(Department_boundary,function(layer){
      map.addLayer(layer);
    });
    _.each(Department_boundary,function(layer){
        layer.setStyle(myStyle_dep);
    });

    // console.log(Muni_boundary);
    // console.log(Muni_boundary[0]._layers);
    // console.log(Muni_boundary[0]._layers.feature.properties);

    _.each(Department_boundary,function(layer){
      console.log(layer);
      console.log(layer._layers);
      console.log(layer._layers[0]);

      //console.log(layer.feature.properties);
    });

    _.each(Department_boundary,function(layer){
      //THIS OPTION DOES NOT WORK SOMETHING WITH HTML IS WRONG!
      //OPTION A
      // var tooltip = L.tooltip({
      //       sticky: true,
      //       opacity: 0.9,
      //       style: {
      //         "width":"100px",
      //         "height":"150px",
      //       },
      //       // target: layer,
      //       // map: map,
      //       html: "<div><p>I'm a district!</p></div>"
      //       // showDelay: 0
      //   });
      // layer.bindTooltip(tooltip).openTooltip();

      //OPTION B
      // layer.bindTooltip(
      //   "<b>Name:</b> Department Name" +
      //   // feature.properties.ID +
      //   "</br>" +
      //
      //   "<b>Area: </b> 15138.320" +
      //   // feature.properties.SQKM.toFixed(3) +
      //   " square km</br>" +
      //
      //   "<b>Population:</b> 7577" +
      //   // feature.properties.POP.toFixed(0) +
      //   "</br>" +
      //
      //   "<b>Population Density: </b> 0.501" +
      //   // (feature.properties.POP/feature.properties.SQKM).toFixed(3) +
      //   " per square km</br>"
      //   ,
      //   {
      //     // sticky: true,
      //     // offset: (10,15),
      //     opacity: 0.9,
      //   }
      //
      // ).openTooltip();
    });
  }

});



$('#distscale').click(function(){
  selectedscale = 'district';
  // $('#selectedunit').text($(this).text());
  // map.setView([-23.414, -57.384],7);

  if(countgapdisplay%2 == 0){
    //the situation in analytics mode
    _.each(Country_boundary,function(layer){
      map.removeLayer(layer);
    });
    _.each(Department_boundary1,function(layer){
      map.removeLayer(layer);
    });

    _.each(Muni_boundary,function(layer){
      map.removeLayer(layer);
    });
    _.each(Muni_boundary1,function(layer){
      map.addLayer(layer);
    });
    _.each(Muni_boundary1,function(layer){
        layer.setStyle(fadedStyle);
    });
  }else{
    _.each(Department_boundary1,function(layer){
      map.removeLayer(layer);
    });
    _.each(Country_boundary,function(layer){
      map.removeLayer(layer);
    });


    _.each(Department_boundary,function(layer){
      map.removeLayer(layer);
    });
    _.each(Muni_boundary,function(layer){
      map.addLayer(layer);
    });

    _.each(Muni_boundary,function(layer){
        layer.setStyle(myStyle_dist);
    });

    // console.log(Muni_boundary);
    // console.log(Muni_boundary[0]._layers);
    // console.log(Muni_boundary[0]._layers.feature.properties);

    _.each(Muni_boundary,function(layer){
      //THIS OPTION DOES NOT WORK SOMETHING WITH HTML IS WRONG!
      // OPTION A
      // var tooltip = L.tooltip({
      //       target: layer,
      //       map: map,
      //       html: "<div><p>I'm a district!</p></div>",
      //       // padding: '1px 1px',
      //       showDelay: 0
      //   });
      // layer.bindTooltip(tooltip).openTooltip();

      // OPTION B
      // layer.bindTooltip(
      //   "<b>Name:</b> Puerto Pinasco" +
      //   // feature.properties.ID +
      //   "</br>" +
      //
      //   "<b>Area: </b> 15138.320" +
      //   // feature.properties.SQKM.toFixed(3) +
      //   " square km</br>" +
      //
      //   "<b>Population:</b> 7577" +
      //   // feature.properties.POP.toFixed(0) +
      //   "</br>" +
      //
      //   "<b>Population Density: </b> 0.501" +
      //   // (feature.properties.POP/feature.properties.SQKM).toFixed(3) +
      //   " per square km</br>"
      //   ,
      //   {
      //     sticky: true,
      //     // offset: (10,15),
      //     opacity: 0.9,
      //   }
      //
      // ).openTooltip();
    });
  }


});


var r1,r2,r3,r4,r5,r6;
var s1,s2,s3,s4,s5,s6;
var h1,h2,h3,h4;
$('#roads1').change(function(){
  if(this.checked){
    r1 = true;
  }
  if(!this.checked){
    r1 = false;
  }
});
$('#roads2').change(function(){
  if(this.checked){
    r2 = true;
  }
  if(!this.checked){
    r2 = false;
  }
});
$('#roads3').change(function(){
  if(this.checked){
    r3 = true;
  }
  if(!this.checked){
    r3 = false;
  }
});
$('#roads4').change(function(){
  if(this.checked){
    r4 = true;
  }
  if(!this.checked){
    r4 = false;
  }
});
$('#roads5').change(function(){
  if(this.checked){
    r5 = true;
  }
  if(!this.checked){
    r5 = false;
  }
});
$('#roads6').change(function(){
  if(this.checked){
    r6 = true;
  }
  if(!this.checked){
    r6 = false;
  }
});


$('#airports').change(function(){
  if(this.checked){
    b3 = true;
  }
  if(!this.checked){
    b3 = false;
  }
});
$('#ports').change(function(){
  if(this.checked){
    b4 = true;
  }
  if(!this.checked){
    b4 = false;
  }
});
$('#schools').change(function(){
  if(this.checked){
    b5 = true;
  }
  if(!this.checked){
    b5 = false;
  }
});
$('#hospitals').change(function(){
  if(this.checked){
    b6 = true;
  }
  if(!this.checked){
    b6 = false;
  }
});



//VARIALE FOR THE SELECTED STYLE
var selectedscale = '';

//ADJUSTED SIMPLER COLLAPSIBLE LIST OF LAYERS
var selectedStyle = {
    color: '#F5B041',
    fillOpacity: 0.2,
    fillColor: '#F5B041'
};

//SWITCH FROM BEING ACTIVE TO NOT ACTIVE
// $('.list-group li').click(function(e) {
//         e.preventDefault()
//         $that = $(this);
//         $that.parent().find('li').removeClass('active');
//         $that.addClass('active');
// });
// var countgapdisplay = 1;
// $('#gapshowbutton').click(function(){
//   countgapdisplay++;
//   if(countgapdisplay%2 == 0){
//     $('#selected5').text('Hide');
//   }else{
//     $('#selected5').text('Gap Analysis');
//   }
// });


//3.7 CONTROL FOR THE MAPPING AND REMOVING OF THE LAYERS
$('#roadstitle1').click(function(){

  if(document.getElementById('r1b').style.display == "block"){
    document.getElementById('r1b').style.display = 'none';
    document.getElementById('r1b').style.visibility = 'none';
    $('#box2').hide();
    $('#box3').hide();
    _.each(PrimaryRoads,function(layer){
      map.removeLayer(layer);
    });
    _.each(SecondaryRoads,function(layer){
      map.removeLayer(layer);
    });

  }else{
    document.getElementById('r1b').style.display = 'block';
    document.getElementById('r1b').style.visibility = 'visible';
    $('#box2').show();
    $('#box3').show();
    _.each(PrimaryRoads,function(layer){
      map.addLayer(layer);
    });
    _.each(SecondaryRoads,function(layer){
      map.addLayer(layer);
    });

    _.each(Country_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
    _.each(Department_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
    _.each(Muni_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
  }
})
$('#roadstitle2').click(function(){
  if(document.getElementById('r2b').style.display == "block"){
    document.getElementById('r2b').style.display = 'none';
    document.getElementById('r2b').style.visibility = 'none';
    $('#box4').hide();
    $('#box5').hide();
    _.each(PavedRoads,function(layer){
      map.removeLayer(layer);
    });
    _.each(GravelRoads,function(layer){
      map.removeLayer(layer);
    });


  }else{
    document.getElementById('r2b').style.display = 'block';
    document.getElementById('r2b').style.visibility = 'visible';
    $('#box4').show();
    $('#box5').show();
    _.each(PavedRoads,function(layer){
      map.addLayer(layer);
    });
    _.each(GravelRoads,function(layer){
      map.addLayer(layer);
    });

    _.each(Country_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
    _.each(Department_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
    _.each(Muni_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });

  }
})

$('#roadstitle3').click(function(){
  if(document.getElementById('r3b').style.display == "block"){
    document.getElementById('r3b').style.display = 'none';
    document.getElementById('r3b').style.visibility = 'none';
    $('#box6').hide();
    // $('#box5').hide();
    _.each(Airports,function(layer){
      map.removeLayer(layer);
    });

  }else{
    document.getElementById('r3b').style.display = 'block';
    document.getElementById('r3b').style.visibility = 'visible';
    $('#box6').show();
    _.each(Airports,function(layer){
      map.addLayer(layer);
    });

    _.each(Country_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
    _.each(Department_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
    _.each(Muni_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
  }
})
$('#roadstitle4').click(function(){
  if(document.getElementById('r4b').style.display == "block"){
    document.getElementById('r4b').style.display = 'none';
    document.getElementById('r4b').style.visibility = 'none';
    $('#box7').hide();
    _.each(Ports,function(layer){
      map.removeLayer(layer);
    });

  }else{
    document.getElementById('r4b').style.display = 'block';
    document.getElementById('r4b').style.visibility = 'visible';
    $('#box7').show();
    _.each(Ports,function(layer){
      map.addLayer(layer);
    });

    _.each(Country_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
    _.each(Department_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
    _.each(Muni_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });


  }
})

$('#roadstitle5').click(function(){
  if(document.getElementById('r5b').style.display == "block"){
    document.getElementById('r5b').style.display = 'none';
    document.getElementById('r5b').style.visibility = 'none';

    $('#box8').hide();
    _.each(MaternalSchools,function(layer){
      map.removeLayer(layer);
    });

  }else{
    document.getElementById('r5b').style.display = 'block';
    document.getElementById('r5b').style.visibility = 'visible';

    $('#box8').show();
    _.each(MaternalSchools,function(layer){
      map.addLayer(layer);
    });

    _.each(Country_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
    _.each(Department_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
    _.each(Muni_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });

    //DOWNLOAD AND PARSE THE DATA: MATERNAL SCHOOLS
    $(document).ready(function(){
      $.ajax(MaternalSchoolsUrl).done(function(data){
        parsedData_MaternalSchools = JSON.parse(data);
        console.log(parsedData_MaternalSchools);
        console.log("parsed");
        var itemB = L.geoJson(parsedData_MaternalSchools,
          {
            style: {opacity:0.45,width:0.05,color:'#197085'},
            pointToLayer: function (feature, latlng) {
              return new L.circleMarker(latlng, {
                radius:2,
                weight:1,
                opacity:0.7,
                fillOpacity:0.7,
              });
            },

            onEachFeature: function(feature,layer){
              var coord = layer.feature.geometry.coordinates;
              coordsMaternalSchools.push(coord);
            },

        }
      ).bindPopup("maternal schools");
        MaternalSchools.push(itemB);

        _.each(MaternalSchools,function(layer){
          map.addLayer(layer);
        });

      })
    })



  }
})
$('#roadstitle6').click(function(){
  if(document.getElementById('r6b').style.display == "block"){

    document.getElementById('r6b').style.display = 'none';
    document.getElementById('r6b').style.visibility = 'none';

    $('#box9').hide();
    _.each(BasicSchools,function(layer){
      map.removeLayer(layer);
    });

    _.each(BasicSchools,function(layer){
      map.removeLayer(layer);
    });

  }else{
    document.getElementById('r6b').style.display = 'block';
    document.getElementById('r6b').style.visibility = 'visible';

    $('#box9').show();
    _.each(BasicSchools,function(layer){
      map.addLayer(layer);
    });


    _.each(Country_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
    _.each(Department_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
    _.each(Muni_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });


    //DOWNLOAD AND PARSE THE DATA: BASIC SCHOOLS
    $(document).ready(function(){
      $.ajax(BasicSchoolsUrl).done(function(data){
        parsedData_BasicSchools = JSON.parse(data);
        console.log(parsedData_BasicSchools);
        console.log("parsed");
        var itemB = L.geoJson(parsedData_BasicSchools,
          {
            style: {opacity:0.45,width:0.05,color:'#007085'},
            pointToLayer: function (feature, latlng) {
              return new L.circleMarker(latlng, {
                radius:2,
                weight:1,
                opacity:0.7,
                fillOpacity:0.7,
              });
            },

            onEachFeature: function(feature,layer){
              var coord = layer.feature.geometry.coordinates;
              coordsBasicSchools.push(coord);
            },

        }
      ).bindPopup("basic schools");
        BasicSchools.push(itemB);

        _.each(BasicSchools,function(layer){
          map.addLayer(layer);
        });

      })
    })


  }
})

$('#roadstitle7').click(function(){
  if(document.getElementById('r7b').style.display == "block"){

    document.getElementById('r7b').style.display = 'none';
    document.getElementById('r7b').style.visibility = 'none';
    $('#box10').hide();
    _.each(MiddleSchools,function(layer){
      map.removeLayer(layer);
    });

  }else{
    document.getElementById('r7b').style.display = 'block';
    document.getElementById('r7b').style.visibility = 'visible';
    $('#box10').show();
    _.each(Country_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
    _.each(Department_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
    _.each(Muni_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });

    _.each(MiddleSchools,function(layer){
      map.addLayer(layer);
    });

  }
})

$('#roadstitle8').click(function(){
  if(document.getElementById('r8b').style.display == "block"){

    document.getElementById('r8b').style.display = 'none';
    document.getElementById('r8b').style.visibility = 'none';

    _.each(SupSchools,function(layer){
      map.removeLayer(layer);
    });

  }else{
    document.getElementById('r8b').style.display = 'block';
    document.getElementById('r8b').style.visibility = 'visible';

    _.each(Country_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
    _.each(Department_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
    _.each(Muni_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });

    //DOWNLOAD AND PARSE THE DATA: UNIVERSITIES
    $(document).ready(function(){
      $.ajax(SupSchoolsUrl).done(function(data){
        parsedData_SupSchools = JSON.parse(data);
        console.log(parsedData_SupSchools);
        console.log("parsed");
        var itemB = L.geoJson(parsedData_SupSchools,
          {
            style: {opacity:0.45,width:0.05,color:'#28B463'},
            pointToLayer: function (feature, latlng) {
              return new L.circleMarker(latlng, {
                radius:4,
                weight:1,
                opacity:0.7,
                fillOpacity:0.7,
              });
            },

            onEachFeature: function(feature,layer){
              var coord = layer.feature.geometry.coordinates;
              coordsSupSchools.push(coord);
            },

        }
      ).bindPopup("higher schools");
        SupSchools.push(itemB);

        _.each(SupSchools,function(layer){
          map.addLayer(layer);
        });


      })
    })




  }
})


$('#roadstitle9').click(function(){
  if(document.getElementById('r9b').style.display == "block"){

    document.getElementById('r9b').style.display = 'none';
    document.getElementById('r9b').style.visibility = 'none';

    _.each(PrimaryHealthcare,function(layer){
      map.removeLayer(layer);
    });

  }else{
    document.getElementById('r9b').style.display = 'block';
    document.getElementById('r9b').style.visibility = 'visible';
    _.each(PrimaryHealthcare,function(layer){
      map.addLayer(layer);
    });

    _.each(Country_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
    _.each(Department_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
    _.each(Muni_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });

  }
})

$('#roadstitle10').click(function(){
  if(document.getElementById('r10b').style.display == "block"){
    document.getElementById('r10b').style.display = 'none';
    document.getElementById('r10b').style.visibility = 'none';

    _.each(SecondaryHealthcare,function(layer){
      map.removeLayer(layer);
    });

  }else{
    document.getElementById('r10b').style.display = 'block';
    document.getElementById('r10b').style.visibility = 'visible';

    _.each(SecondaryHealthcare,function(layer){
      map.addLayer(layer);
    });

    _.each(Country_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
    _.each(Department_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
    _.each(Muni_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });

  }
})


$('#roadstitle11').click(function(){
  if(document.getElementById('r11b').style.display == "block"){

    document.getElementById('r11b').style.display = 'none';
    document.getElementById('r11b').style.visibility = 'none';

    _.each(TertiaryHealthcare,function(layer){
      map.removeLayer(layer);
    });

  }else{
    document.getElementById('r11b').style.display = 'block';
    document.getElementById('r11b').style.visibility = 'visible';
    _.each(TertiaryHealthcare,function(layer){
      map.addLayer(layer);
    });

    _.each(Country_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
    _.each(Department_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
    _.each(Muni_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });

  }
})

//FOR THE GAP ANALYSIS MODULE COLLAPSE
$('#gaptitle1').click(function(){

  if(document.getElementById('g1b').style.display == "block"){
    document.getElementById('g1b').style.display = 'none';
    document.getElementById('g1b').style.visibility = 'none';

    _.each(transGapCoverage,function(layer){
      map.removeLayer(layer);
    });

  }else{
    document.getElementById('g1b').style.display = 'block';
    document.getElementById('g1b').style.visibility = 'visible';

    _.each(transGapCoverage,function(layer){
      map.addLayer(layer);
    });

  }
})


$('#gaptitle2').click(function(){

  if(document.getElementById('g2b').style.display == "block"){
    document.getElementById('g2b').style.display = 'none';
    document.getElementById('g2b').style.visibility = 'none';

    _.each(transGapQuality,function(layer){
      map.removeLayer(layer);
    });

  }else{
    document.getElementById('g2b').style.display = 'block';
    document.getElementById('g2b').style.visibility = 'visible';

    _.each(transGapQuality,function(layer){
      map.addLayer(layer);
    });

  }
})


$('#gaptitle3').click(function(){

  if(document.getElementById('g3b').style.display == "block"){
    document.getElementById('g3b').style.display = 'none';
    document.getElementById('g3b').style.visibility = 'none';

    _.each(transGapOutcome,function(layer){
      map.removeLayer(layer);
    });


  }else{
    document.getElementById('g3b').style.display = 'block';
    document.getElementById('g3b').style.visibility = 'visible';

    _.each(transGapOutcome,function(layer){
      map.addLayer(layer);
    });

  }
})

$('#gaptitle4').click(function(){

  if(document.getElementById('g4b').style.display == "block"){
    document.getElementById('g4b').style.display = 'none';
    document.getElementById('g4b').style.visibility = 'none';

    _.each(eduGapCoverage,function(layer){
      map.removeLayer(layer);
    });

  }else{
    document.getElementById('g4b').style.display = 'block';
    document.getElementById('g4b').style.visibility = 'visible';

    _.each(eduGapCoverage,function(layer){
      map.addLayer(layer);
    });

  }
})

$('#gaptitle5').click(function(){

  if(document.getElementById('g5b').style.display == "block"){
    document.getElementById('g5b').style.display = 'none';
    document.getElementById('g5b').style.visibility = 'none';

    _.each(eduGapQuality,function(layer){
      map.removeLayer(layer);
    });


  }else{
    document.getElementById('g5b').style.display = 'block';
    document.getElementById('g5b').style.visibility = 'visible';

    _.each(eduGapQuality,function(layer){
      map.addLayer(layer);
    });

  }
})


$('#gaptitle6').click(function(){

  if(document.getElementById('g6b').style.display == "block"){
    document.getElementById('g6b').style.display = 'none';
    document.getElementById('g6b').style.visibility = 'none';

    _.each(eduGapOutcome,function(layer){
      map.removeLayer(layer);
    });


  }else{
    document.getElementById('g6b').style.display = 'block';
    document.getElementById('g6b').style.visibility = 'visible';

    _.each(eduGapOutcome,function(layer){
      map.addLayer(layer);
    });

  }
})


$('#gaptitle7').click(function(){

  if(document.getElementById('g7b').style.display == "block"){
    document.getElementById('g7b').style.display = 'none';
    document.getElementById('g7b').style.visibility = 'none';

    _.each(hthGapCoverage,function(layer){
      map.removeLayer(layer);
    });


  }else{
    document.getElementById('g7b').style.display = 'block';
    document.getElementById('g7b').style.visibility = 'visible';

    _.each(hthGapCoverage,function(layer){
      map.addLayer(layer);
    });

  }
})


$('#gaptitle8').click(function(){

  if(document.getElementById('g8b').style.display == "block"){
    document.getElementById('g8b').style.display = 'none';
    document.getElementById('g8b').style.visibility = 'none';

    _.each(hthGapQuality,function(layer){
      map.removeLayer(layer);
    });


  }else{
    document.getElementById('g8b').style.display = 'block';
    document.getElementById('g8b').style.visibility = 'visible';

    _.each(hthGapQuality,function(layer){
      map.addLayer(layer);
    });

  }
})


$('#gaptitle9').click(function(){

  if(document.getElementById('g9b').style.display == "block"){
    document.getElementById('g9b').style.display = 'none';
    document.getElementById('g9b').style.visibility = 'none';

    _.each(hthGapOutcome,function(layer){
      map.removeLayer(layer);
    });


  }else{
    document.getElementById('g9b').style.display = 'block';
    document.getElementById('g9b').style.visibility = 'visible';

    _.each(hthGapOutcome,function(layer){
      map.addLayer(layer);
    });

  }
})


//NEW CONTROL FOR DISPLAYING MAPS
$('#launchbutton-map').click(function(){
  console.log(r1,r2,r3,r4,r5,r6);
  console.log(s1,s2,s3,s4,s5,s6);
  console.log(h1,h2,h3,h4);
  _.each(PrimaryRoads,function(layer){
        map.addLayer(layer);
  });
  _.each(SecondaryRoads,function(layer){
        map.addLayer(layer);
  });
  _.each(Ports,function(layer){
        map.addLayer(layer);
  });
  _.each(Airports,function(layer){
        map.addLayer(layer);
  });

  // _.each(BasicSchools,function(layer){
  //       map.addLayer(layer);
  // });
  // _.each(MiddleSchools,function(layer){
  //       map.addLayer(layer);
  // });
  _.each(SupSchools,function(layer){
        map.addLayer(layer);
  });
  // _.each(PrimaryHealthcare,function(layer){
  //       map.addLayer(layer);
  // });
  // _.each(SecondaryHealthcare,function(layer){
  //       map.addLayer(layer);
  // });
  _.each(TertiaryHealthcare,function(layer){
        map.addLayer(layer);
  });


    //LOAD PRIMARY ROAD NETWORK
    // if (r1 == true){
    //       _.each(PrimaryRoads,function(layer){
    //         map.addLayer(layer);
    //       });
    // }
    //
    //
    // if (r2 == true){
    //   _.each(SecondaryRoads,function(layer){
    //     map.addLayer(layer);
    //   });
    // }
    //
    // if (r3 == true){
    //   _.each(TertiaryRoads,function(layer){
    //     map.addLayer(layer);
    //   });
    // }
    //
    // if (r4 == true){
    //   _.each(PavedRoads,function(layer){
    //     map.addLayer(layer);
    //   });
    // }
    //
    // if (r5 == true){
    //   _.each(GravelRoads,function(layer){
    //     map.addLayer(layer);
    //   });
    // }
    //
    // if (r6 == true){
    //   _.each(DirtRoads,function(layer){
    //     map.addLayer(layer);
    //   });
    // }
    //
    //
    //
    // if (b3 == true){
    //   _.each(Airports,function(layer){
    //     map.addLayer(layer);
    //   });
    // }
    //
    //   if (b4 == true){
    //     _.each(Ports,function(layer){
    //       map.addLayer(layer);
    //     });
    //   }
    //
    //   if (b5 == true){
    //     _.each(Schools,function(layer){
    //       map.addLayer(layer);
    //     });
    //   }
    //
    //
    //   if (b6 == true){
    //     _.each(Hospitals,function(layer){
    //       map.addLayer(layer);
    //     });
    //   }

});

//CONTROL THE REMOVAL OF THE ELEMENTS MAPPED
$('#resetbutton-map').click(function(){
  console.log("ready to remove");
  //REMOVE THE CHECK SIGNS
  document.getElementById('r1b').style.display = 'none';
  document.getElementById('r1b').style.visibility = 'none';
  document.getElementById('r2b').style.display = 'none';
  document.getElementById('r2b').style.visibility = 'none';
  document.getElementById('r3b').style.display = 'none';
  document.getElementById('r3b').style.visibility = 'none';
  document.getElementById('r4b').style.display = 'none';
  document.getElementById('r4b').style.visibility = 'none';
  document.getElementById('r5b').style.display = 'none';
  document.getElementById('r5b').style.visibility = 'none';
  document.getElementById('r6b').style.display = 'none';
  document.getElementById('r6b').style.visibility = 'none';
  document.getElementById('r7b').style.visibility = 'none';
  document.getElementById('r7b').style.display = 'none';
  document.getElementById('r8b').style.visibility = 'none';
  document.getElementById('r8b').style.display = 'none';
  document.getElementById('r9b').style.visibility = 'none';
  document.getElementById('r9b').style.visibility = 'none';
  document.getElementById('r10b').style.display = 'none';
  document.getElementById('r10b').style.visibility = 'none';
  document.getElementById('r11b').style.display = 'none';
  document.getElementById('r11b').style.visibility = 'none';

//REMOVE THE ADM BOUNDARY
_.each(Country_boundary,function(layer){
  map.removeLayer(layer);
});
_.each(Department_boundary,function(layer){
  map.removeLayer(layer);
});
_.each(Muni_boundary,function(layer){
  map.removeLayer(layer);
});

//REMOVE THE GAP AREA
_.each(transGapCoverage,function(layer){
  map.removeLayer(layer);
});
_.each(transGapQuality,function(layer){
  map.removeLayer(layer);
});
_.each(transGapOutcome,function(layer){
  map.removeLayer(layer);
});

_.each(eduGapCoverage,function(layer){
  map.removeLayer(layer);
});
_.each(eduGapQuality,function(layer){
  map.removeLayer(layer);
});
_.each(eduGapOutcome,function(layer){
  map.removeLayer(layer);
});

_.each(hthGapCoverage,function(layer){
  map.removeLayer(layer);
});
_.each(hthGapQuality,function(layer){
  map.removeLayer(layer);
});
_.each(hthGapOutcome,function(layer){
  map.removeLayer(layer);
});

//REMOVE THE LAYERS
  _.each(PrimaryRoads,function(layer){
    map.removeLayer(layer);
  });

  _.each(SecondaryRoads,function(layer){
    map.removeLayer(layer);
  });

  _.each(TertiaryRoads,function(layer){
    map.removeLayer(layer);
  });

  _.each(PavedRoads,function(layer){
    map.removeLayer(layer);
  });

  _.each(GravelRoads,function(layer){
    map.removeLayer(layer);
  });

  _.each(DirtRoads,function(layer){
    map.removeLayer(layer);
  });



  _.each(Airports,function(layer){
    map.removeLayer(layer);
  });

  _.each(Ports,function(layer){
    map.removeLayer(layer);
  });

  _.each(BasicSchools,function(layer){
    map.removeLayer(layer);
  });

  _.each(MiddleSchools,function(layer){
    map.removeLayer(layer);
  });

  _.each(SupSchools,function(layer){
    map.removeLayer(layer);
  });

  _.each(PrimaryHealthcare,function(layer){
    map.removeLayer(layer);
  });

  _.each(SecondaryHealthcare,function(layer){
    map.removeLayer(layer);
  });

  _.each(TertiaryHealthcare,function(layer){
    map.removeLayer(layer);
  });

  // _.each(SmallSchools,function(layer){
  //   map.removeLayer(layer);
  // });
  //
  // _.each(Hospitals,function(layer){
  //   map.removeLayer(layer);
  // });
  //
  // _.each(NationalHospitals,function(layer){
  //   map.removeLayer(layer);
  // });
  //
  // _.each(RegionalHospitals,function(layer){
  //   map.removeLayer(layer);
  // });
  //
  // _.each(AdvancedHospitals,function(layer){
  //   map.removeLayer(layer);
  // });
  //
  // _.each(BasicsHospitals,function(layer){
  //   map.removeLayer(layer);
  // });


  //reset the checked status as unchecked
  //SO HERE IS HOW YOU CAN SET THE API AND SELECT THE ELEMENT USING API REQUEST!!!USE []!!!
  $('input[type=checkbox]'&&'input[id!=heatmapcheck]').each(function()
    {
        this.checked = false;
    });
  // $('#heatmapcheck').each(function(){
  //   this.checked = true;
  // });

  //RESET ALL THE b1 - b6 values for remap only the selected layers
  b1 = false;
  b2 = false;
  b3 = false;
  b4 = false;
  b5 = false;
  b6 = false;

  //REMOVE ALL THE HEAT MAP LAYERS
  // map.removeLayer(heat_airports);
  // map.removeLayer(heat_ports);
  // map.removeLayer(heat_schools);
  // map.removeLayer(heat_hospitals);

});




//PRINTTING THE CURRENT VIEW!!!

// var printer = L.easyPrint({
//   title:'my prints',
//   // position:'bottomright',
//   tileLayer: lightmap,
//   sizeModes: ['CurrentSize', 'A4Landscape', 'A4Portrait'],
//   filename: 'DevelopExplorer_Map',
//   exportOnly: true,
//   hideControlContainer: true
//
// }).addTo(map);

function PrintFunction(){
  $.print('#mappage');
  // window.print();
  // printer.printMap('CurrentSize', 'MyManualPrint')
};


// function PrintFunction(printThis) {
//   var win = window.open();
//   self.focus();
//   win.document.open();
//   win.document.write('<'+'html'+'><'+'body'+'>');
//   win.document.write(printThis);
//   win.document.write('<'+'/body'+'><'+'/html'+'>');
//   win.document.close();
//   win.print('#map-mappage');
//   win.close();
// }


//3.6 HEATMAP ANALYSIS
//CREATE HEATMAP LAYERS FOR THE POINT TYPE DATA
var coordsAirports = [];
var coordsPorts = [];
var coordsMaternalSchools = [];
var coordsBasicSchools = [];
var coordsMiddleSchools = [];
var coordsSupSchools = [];
var coordsPrimaryHealthcare = [];
var coordsSecondaryHealthcare = [];
var coordsTertiaryHealthcare = [];

//MAP THE HEAT FOR SCHOOL DATA NOW
var points = [ ];
var points_draft = [ ];


var heat_airports;
var heat_ports;
var heat_middleschools;

// var blur_value;
// var radius_value;


//DEFINE THE VARIABLE FOR THE HEATMAP CHECKBOX
var heatmapcount = 0;
$('#heatmapcontrol').click(function(){
  heatmapcount++;
  if(heatmapcount%2 == 0){
    map.removeLayer(heat_middleschools);
    console.log("heatmap removed.");
  }
  else{
    map.addLayer(heat_middleschools);
  }
});

//control the display of the heatmap
// $('#airportsheat').click(function(){
//   console.log("heat button clicked.");
//   map.addLayer(heat_airports);
//   console.log("middleschools heatmap displayed.");
// });
// $('#portsheat').click(function(){
//   console.log("heat button clicked.");
//   map.addLayer(heat_ports);
//   console.log("middleschools heatmap displayed.");
// });
// $('#schoolsheat').click(function(){
//   console.log("heat button clicked.");
//   map.addLayer(heat_schools);
//   console.log("middleschools heatmap displayed.");
// });
// $('#hospitalsheat').click(function(){
//   console.log("heat button clicked.");
//   map.addLayer(heat_hospitals);
//   console.log("hospitals heatmap displayed.");
// });



// $('#reset').click(function(){
//   map.removeLayer(heat_schools);
//   map.removeLayer(mappedschools);
//   console.log("layer removed.");
// })

//CONTROL THE DIFFERENT INDEX FOR EDUCTION INDICATOR
//assigining color function


//CONTROL DISPLAYING THE OPTIONS SELECTED
$('#topic_education').click(function(){
  $('#selected1').text($(this).text());
});
$('#topic_health').click(function(){
  $('#selected1').text($(this).text());
});
$('#topic_infra').click(function(){
  $('#selected1').text($(this).text());
});
$('#topic_socio').click(function(){
  $('#selected1').text($(this).text());
});


$('#type_coverage').click(function(){
  $('#selected2').text($(this).text());
  _.each(GapQuality,function(layer){
    map.removeLayer(layer);
  });
  _.each(GapOutcome,function(layer){
    map.removeLayer(layer);
  });
  _.each(GapCoverage,function(layer){
      map.addLayer(layer);
  });

  if(Country_boundary || Department_boundary || Muni_boundary){
    _.each(Country_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
    _.each(Department_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
    _.each(Muni_boundary,function(layer){
        layer.setStyle(fadedStyle);
    });
  }

});
$('#type_quality').click(function(){
  $('#selected2').text($(this).text());
  _.each(GapCoverage,function(layer){
    map.removeLayer(layer);
  });
  _.each(GapOutcome,function(layer){
    map.removeLayer(layer);
  });
  _.each(GapQuality,function(layer){
    map.addLayer(layer);
  });
});
$('#type_outcome').click(function(){
  $('#selected2').text($(this).text());
  _.each(GapCoverage,function(layer){
    map.removeLayer(layer);
  });
  _.each(GapQuality,function(layer){
    map.removeLayer(layer);
  });
  _.each(GapOutcome,function(layer){
    map.addLayer(layer);
  });
});


$('#gapresetbutton').click(function(){
  //REMOVE THE CHECK SIGNS
  document.getElementById('g1b').style.display = 'none';
  document.getElementById('g1b').style.visibility = 'none';
  document.getElementById('g2b').style.display = 'none';
  document.getElementById('g2b').style.visibility = 'none';
  document.getElementById('g3b').style.display = 'none';
  document.getElementById('g3b').style.visibility = 'none';
  document.getElementById('g4b').style.display = 'none';
  document.getElementById('g4b').style.visibility = 'none';
  document.getElementById('g5b').style.display = 'none';
  document.getElementById('g5b').style.visibility = 'none';
  document.getElementById('g6b').style.display = 'none';
  document.getElementById('g6b').style.visibility = 'none';
  document.getElementById('g7b').style.visibility = 'none';
  document.getElementById('g7b').style.display = 'none';
  document.getElementById('g8b').style.visibility = 'none';
  document.getElementById('g8b').style.display = 'none';
  document.getElementById('g9b').style.visibility = 'none';
  document.getElementById('g9b').style.visibility = 'none';

  //REMOVE THE GAP AREA
  _.each(transGapCoverage,function(layer){
    map.removeLayer(layer);
  });
  _.each(transGapQuality,function(layer){
    map.removeLayer(layer);
  });
  _.each(transGapOutcome,function(layer){
    map.removeLayer(layer);
  });

  _.each(eduGapCoverage,function(layer){
    map.removeLayer(layer);
  });
  _.each(eduGapQuality,function(layer){
    map.removeLayer(layer);
  });
  _.each(eduGapOutcome,function(layer){
    map.removeLayer(layer);
  });

  _.each(hthGapCoverage,function(layer){
    map.removeLayer(layer);
  });
  _.each(hthGapQuality,function(layer){
    map.removeLayer(layer);
  });
  _.each(hthGapOutcome,function(layer){
    map.removeLayer(layer);
  });

  //REASSIGN THE STYLE FOR THE GEO OBJECTS
  _.each(Country_boundary,function(layer){
      layer.setStyle(highlightStyle);
  });
  _.each(Department_boundary,function(layer){
      layer.setStyle(myStyle_dep);
  });
  _.each(Muni_boundary,function(layer){
      layer.setStyle(myStyle_dist);
  });
});


// $('#mode_gap').click(function(){
//   $('#selected3').text($(this).text());
// });
// $('#mode_adm').click(function(){
//   $('#selected3').text($(this).text());
// });

//control the selection of scale for the data to Display


//control the selection of layers for which information to be presented
