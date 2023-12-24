 // Code from previous example

    // ...

    // Function to create a marker for each place
    function createMarker(place) {
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          title: place.name
        });
  
        // Retrieve details for each place, including ratings and doctors
        var request = {
          placeId: place.place_id,
          fields: ['name', 'rating', 'formatted_address', 'formatted_phone_number', 'website']
        };
  
        var service = new google.maps.places.PlacesService(map);
        service.getDetails(request, function(placeDetails, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            // Display details in an info window when the marker is clicked
            var infoWindow = new google.maps.InfoWindow({
              content: `
                <div class="place-details">
                  <h2>${placeDetails.name}</h2>
                  <p>Rating: ${placeDetails.rating}</p>
                  <p>Address: ${placeDetails.formatted_address}</p>
                  <p>Phone: ${placeDetails.formatted_phone_number}</p>
                  <p>Website: <a href="${placeDetails.website}">${placeDetails.website}</a></p>
                </div>
              `
            });
  
            marker.addListener('click', function() {
              infoWindow.open(map, marker);
            });
          }
        });
      }