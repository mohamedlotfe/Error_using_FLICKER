
var Models = [
{
    title: 'HSBC - Bank',
        location: {lat:30.0618514 , lng:  31.33627469999999},
    url: 'http://www.mallofegypt.com',

    description: 'Mall of Egypt ... Drop by our Valley and donate items from books ' +
    "to clothing; these will find their way " +
    'to those who need them the most through Ahl Masr' ,

    place_id: 1

},
{
    
         title: 'Fisal Islamic Bank',
        location: {lat:30.0598666 , lng: 31.336481899999967},
    url: 'http://www.dreamlandgolf.com/' ,
    description: 'The Dreamland Golf Course is a world class facility' +
    'located just a few minutes away from the Great Pyramids.',
    place_id: 2
},
{
     title: 'EG Bank _ Nasr City ',
        location: {lat:30.0577622 , lng:31.337659400000007 },
    url: 'http://www.mallofarabia.com.eg',
    description: 'Fashion. Women; Unisex; Men; Children; Sportswear & Goods; Accessories . ' +
    "& Leather Products; Health & Beauty. Women. Daniel Hechter · Hejabi · Whats Up " ,
    place_id: 3
}];

var map, makeMarkers,photoURL="",contentString="";
markers = [];
var infowindow = null;

function initilizationMap() {
    var Egypt ={lat: 30.056508, lng: 31.337882} ;     //coordinates of center is my map 

  map = new google.maps.Map(document.getElementById('map'), {
    center: Egypt,
    zoom: 15,
      styles:[
    {
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#f49f53"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "color": "#f9ddc5"
            },
            {
                "lightness": -7
            }
        ]
    },
    {
        "featureType": "road",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "lightness": 43
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "color": "#645c20"
            },
            {
                "lightness": 38
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#1994bf"
            },
            {
                "saturation": -69
            },
            {
                "gamma": 0.99
            },
            {
                "lightness": 43
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f19f53"
            },
            {
                "weight": 1.3
            },
            {
                "visibility": "on"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "poi.business"
    },
    {
        "featureType": "poi.park",
        "stylers": [
            {
                "color": "#645c20"
            },
            {
                "lightness": 39
            }
        ]
    },
    {
        "featureType": "poi.school",
        "stylers": [
            {
                "color": "#a95521"
            },
            {
                "lightness": 35
            }
        ]
    },
    {},
    {
        "featureType": "poi.medical",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "lightness": 38
            },
            {
                "visibility": "off"
            }
        ]
    },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {
        "elementType": "labels"
    },
    {
        "featureType": "poi.sports_complex",
        "stylers": [
            {
                "color": "#9e5916"
            },
            {
                "lightness": 32
            }
        ]
    },
    {},
    {
        "featureType": "poi.government",
        "stylers": [
            {
                "color": "#9e5916"
            },
            {
                "lightness": 46
            }
        ]
    },
    {
        "featureType": "transit.station",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "lightness": 22
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "lightness": 38
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#f19f53"
            },
            {
                "lightness": -10
            }
        ]
    },
    {},
    {},
    {}
]
  });

  infowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

   makeMarkers = function(){
    infowindow.close();
    bounds = new google.maps.LatLngBounds();
    // clear  all Marker from map 
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }

    for (i = 0; i < filterPlaces().length; i++) {
      var pos = filterPlaces()[i].place_id -1;
      markers[pos].setMap(map);
      bounds.extend(markers[pos].position);
    }

    map.fitBounds(bounds);
  };

  for (var itr = 0; itr < filterPlaces().length; itr++) {
    
    var locationX=filterPlaces()[itr].location;
    var titleX=filterPlaces()[itr].title;
    var descriptionX =filterPlaces()[itr].description;
    
    marker = new google.maps.Marker({
      id: itr,
      position: locationX,
      map: map,
      title:titleX,
      description: descriptionX,
      animation: google.maps.Animation.DROP

    });

    markers.push(marker);
    bounds.extend(marker.position);
    //when u click on the spescific marker 
    marker.addListener('click', function(){

        GetDetails(this);
        infowindow.close();
        infowindow.setContent("<p>"+this.title+"</p></br>"+contentString+"</br>"+photoURL);
        map.panTo(marker.position);
        this.setAnimation(google.maps.Animation.BOUNCE);
        infowindow.open(map, this);
        
        setTimeout(function () {marker.setAnimation(null); }, 1300);
        
        infowindow.addListener('closeclick', function(){
          infowindow.setMarker(null);
        });
    });

  } //end looping here
  
  map.fitBounds(bounds);
  //From https://stackoverflow.com/questions/21966344/flickr-api-flickr-geotagged-photos-not-being-displayed-as-map-markers
  function GetDetails(loc)
  {
  var MyUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+
  '404d11dfce7c38ef841c30dee81c35c7&tags=food&text=people&lat=' +loc.position.lat + '&lon=' 
  + loc.position.lng + '&format=json&nojsoncallback=1';

  $.ajax({
            url: MyUrl,
            dataType: "json",
            success: function(response) {

               $.each(response.photos.photo, function(i,item){
            //Get the url for the image.
             photoURL = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' +
             item.id + '_' + item.secret + '_m.jpg';      
             htmlString = '<img src="' + photoURL + '">';                    
             contentString = '<div id="content">' + htmlString + '</div>';

              });

            }
  }).fail(function(xhr, textStatus, errorThrown) {
            alert("Sorry the request failed to load.Try agin after sometime");
        })
    }

    
}// end initilization function 


mapError = () => {
  // Error handling
   $('#map').text('Error: Google Maps Informations will not be loaded');
};


var viewModel = function() {
  var self =this;
  var numLocations;
  self.LocationsArray = ko.observableArray();
  self.filteredQuery = ko.observable();

for (i = 0; i < Models.length; i++) {
        self.LocationsArray.push(Models[i]);
    }

   
  filteringResults = function(){
       //if user search for spesific place
    filterPlaces = ko.observableArray();
    if (self.filteredQuery()) {

          numLocations=self.LocationsArray().length; 
      
        for (var i = 0; i < numLocations; i++) {
      
          if ( self.LocationsArray()[i].title.toLowerCase().indexOf(self.filteredQuery()) >- 1)
            filterPlaces.push(self.LocationsArray()[i]);
         }

         //function to filter markers as places 
          makeMarkers();
    
    }else{
         
         //if user NOt search for any place
         numLocations=self.LocationsArray().length; 
         for (var i = 0; i < numLocations; i++) {
              filterPlaces.push( self.LocationsArray()[i]);
              }
        }

      //in two cases will Rturn back observableArray      
    return filterPlaces();
  };

  self.SetMarker= function(place){
    google.maps.event.trigger(markers[place.place_id -1], 'click');
  };


};

ko.applyBindings(viewModel);
