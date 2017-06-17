// These are the real estate listings that will be shown to the user.
var locations = [
 {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
 {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
 {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
 {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
 {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
 {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
];

var stylesForMap = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
];
function initMap() {
  // create a map
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 40.7413549, lng: -73.998024},
    styles: stylesForMap
  });
  // first char code for marker label
  var labelCode = 'A'.charCodeAt(0);

  var infoWindow = new google.maps.InfoWindow();

  // create a DrawingManager
  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [google.maps.drawing.OverlayType.CIRCLE, google.maps.drawing.OverlayType.POLYGON]
    },
    circleOptions: {
      draggable: true,
      // editable: true
    },
    polygonOptions: {
      draggable: true,
      // editable: true
    }

  });
  var drawingBounds = null;
  drawingManager.addListener('overlaycomplete', function(event){
    if(drawingBounds !== null) {
      drawingBounds.setMap(null);
      // Clear markers
      hideMarkers();
    }
    // console.log(event);
    drawingBounds = event.overlay;
    // show markers that are in drawingBounds
    searchWithDrawingBounds();
    drawingBounds.addListener('dragend', function(){
      hideMarkers();
      searchWithDrawingBounds();
    });
  });
  function searchWithDrawingBounds() {
    markers.forEach(function(marker) {
      if(drawingBounds.getBounds) {
        if(drawingBounds.getBounds().contains(marker.getPosition())) {
          marker.setMap(map);
        }
      } else { // polygon
        if(google.maps.geometry.poly.containsLocation(marker.getPosition(), drawingBounds)) {
          marker.setMap(map);
        }
      }
    });
  }
  // set toggle button for drawing tools
  document.getElementById('toggle-drawing').addEventListener('click', function() {
    if(drawingManager.map) {
      drawingManager.setMap(null);
      if(drawingBounds != null) {
        drawingBounds.setMap(null);
      }
    } else {
      drawingManager.setMap(map);
    }
  });

  // drawingManager.setMap(map);
  // markers and infoWindow
  var bounds = new google.maps.LatLngBounds();

  //  markers = [marker1, marker2, ...];
  var markers = locations.map(function(location) {
    // set marker
    var marker = new google.maps.Marker({
      position: location.location,
      title: location.title,
      label: String.fromCharCode(labelCode++),
      animation: google.maps.Animation.DROP,
    });
    // set infoWindow
    marker.addListener('click', function() {
      populateInfoWindow(this, infoWindow);
    });

    return marker;
  });

  // populate the infoWindow based on the marker when the marker is clicked
  // if the inforWindow is already opened for the marker, close it
  function populateInfoWindow(marker, infoWindow) {
    if(infoWindow.marker != marker) { // open inforWindow
      var latlng = marker.getPosition().lat() + ','+marker.getPosition().lng();
      infoWindow.marker = marker;
      infoWindow.setContent('');
      infoWindow.addListener('closeclick', function() {
        infoWindow.marker = null;
      });

      var streetViewService = new google.maps.StreetViewService();
      var radius = 50;
      var getStreetView = function (data, status) {
        if(status === google.maps.StreetViewStatus.OK) {
          var nearStreetViewLocation = data.location.latLng;
          var heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, marker.position);
          infoWindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
          var panoramaOptions = {
            position: nearStreetViewLocation,
            pov: {
              heading: heading,
              pitch: 30
            }
          };

          // display the panorama
          console.log('display panorama');
          var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
        } else {
          infoWindow.setContent('<div>' + marker.title + '</div><div>No Street View Found</div>');
        }
      };
      streetViewService.getPanorama({
        location: marker.position,
        radius: radius
      }, getStreetView);
      infoWindow.open(map, marker);
    } else {
      infoWindow.marker = null;
      infoWindow.close();
    }
  }

  // show markers
  function showMarkers() {
    for(var o = 0; o < markers.length; o++){
      bounds.extend(markers[o].getPosition());
      markers[o].setAnimation(google.maps.Animation.DROP);
      markers[o].setMap(map);
    }
    map.fitBounds(bounds);
  }

  function hideMarkers () {
    for(var o = 0; o < markers.length; o++){
      markers[o].setMap(null);
    }
  }
  document.getElementById('show-listings').addEventListener('click', showMarkers);
  document.getElementById('hide-listings').addEventListener('click', hideMarkers);

}
