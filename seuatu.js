// javascript document for index.html

// Google Maps API Key: AIzaSyD2I1HLgflmmaNuK3Cu9JFx0SQxeBM_jiE

function initialize()
{
	var myCenter=new google.maps.LatLng(-6.3648006,106.8290333,17);	

	var mapProp = { center:new google.maps.LatLng(-6.3648006,106.8290333,17),
					zoom:10,
	  				mapTypeId:google.maps.MapTypeId.TERRAIN
	  			};
	var map = new google.maps.Map(document.getElementById("maps"),mapProp);

	var marker = new google.maps.Marker({
					position:myCenter,
				});

	var request = {
   	 location: myCenter	,
   	 radius: '1000',
   	 query: 'bimbel'
  	};

	  service = new google.maps.places.PlacesService(map);
	  service.textSearch(request, callback);

	marker.setMap(map);

	// Create the search box and link it to the UI element.
	var input = /** @type {HTMLInputElement} */(
	document.getElementById('pac-input'));
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));
	var markers = [];
	// Listen for the event fired when the user selects an item from the
	// pick list. Retrieve the matching places for that item.
	google.maps.event.addListener(searchBox, 'places_changed', function() {
  		var places = searchBox.getPlaces();

		if (places.length == 0) {
			return;
		}

	    for (var i = 0, marker; marker = markers[i]; i++) {
	      marker.setMap(null);
	    }

	    // For each place, get the icon, place name, and location.
	    markers = [];
	    var bounds = new google.maps.LatLngBounds();
	    for (var i = 0, place; place = places[i]; i++) {
	    	var image = {
	        	url: place.icon,
	        	size: new google.maps.Size(71, 71),
	        	origin: new google.maps.Point(0, 0),
	        	anchor: new google.maps.Point(17, 34),
	        	scaledSize: new google.maps.Size(25, 25)
	      	};

	      	// Create a marker for each place.
	      	var marker = new google.maps.Marker({
		        map: map,
	        	icon: image,
	        	title: place.name,
	        	position: place.geometry.location
	      	});

	      	markers.push(marker);

	      	bounds.extend(place.geometry.location);
	    }

	    map.fitBounds(bounds);
 	});

 	// Bias the SearchBox results towards places that are within the bounds of the
  	// current map's viewport.
  	google.maps.event.addListener(map, 'bounds_changed', function() {
	    var bounds = map.getBounds();
	    searchBox.setBounds(bounds);
  	});

	google.maps.event.addListener(marker,'click',
		function() {
	  		map.setZoom(17);
	  		map.setCenter(marker.getPosition());
	  	}
	);

	var infowindow = new google.maps.InfoWindow({
	  					content:"FASILKOM UI"
	  				});

	infowindow.open(map,marker);

	google.maps.event.addListener(marker,'click',
		function() {
	  		map.setZoom(17);
	  		map.setCenter(marker.getPosition());
	  	}
	);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    	for (var i = 0; i < results.length; i++) {
      		var place = results[i];
      		createMarker(results[i]);
    	}
	}
}

google.maps.event.addDomListener(window, 'load', initialize);