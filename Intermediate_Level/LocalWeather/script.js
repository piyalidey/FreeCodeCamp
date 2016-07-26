$(document).ready(function() {

  var myLocation = new Object();

  //Array of pictures to use for backgrounds
  var weatherbackgrounds = {
    "clear-day": "url(https://crystalseye.files.wordpress.com/2011/08/dsc_0724.jpg)",
    "clear-night": "url(https://tcklusman.files.wordpress.com/2014/05/tumblr_static_dark-starry-night-sky-226736.jpg)",
    "rain": "url(https://images2.alphacoders.com/180/180742.jpg)",
    "snow": "url(https://i.ytimg.com/vi/ea1GMrjjJ1A/maxresdefault.jpg)",
    "sleet": "url(https://i.ytimg.com/vi/AhBFanbd6Ng/maxresdefault.jpg)",
    "wind": "url(https://c1.staticflickr.com/1/74/197043548_c352e40aab_b.jpg)",
    "fog": "url(https://static.pexels.com/photos/17579/pexels-photo.jpg)",
    "cloudy": "url(https://rimco2502.files.wordpress.com/2013/04/cloudy-sky-and-bird-image.jpg)",
    "partly-cloudy-day": "url(https://upload.wikimedia.org/wikipedia/commons/1/1d/Cloudy_sky_over_Bergamo.jpg)",
    "partly-cloudy-night": "url(https://pamperingcampers.files.wordpress.com/2012/08/cloudymoonrise-1.jpg)",
    "default": "url(https://nhmu.utah.edu/sites/default/files/attachments/earth.jpg)"
  };

  //Make sure location is available
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {

      //Set variables to longitude and latitude and save to myLocation object
      myLocation.latitude = position.coords.latitude;
      myLocation.longitude = position.coords.longitude;

      //Send latitude and longitude to Forecast.io for data
      var forecasturl = 'https://api.forecast.io/forecast/98537211d3fefa27e18ab99fcb04e52d/' + myLocation.latitude + ',' + myLocation.longitude;
      $.ajax({
        url: forecasturl,
        type: 'GET',
        data: {},
        dataType: 'jsonp',
        success: function(data) {
          /*console.log(data);*/
          //Set weather data to myLocation object.
          var tempfahr = parseFloat(data["currently"]["temperature"]);
          myLocation.tempfahr = tempfahr.toFixed(0).toString();

          var tempcels = (tempfahr - 32) * 5 / 9;
          myLocation.tempcels = tempcels.toFixed(0).toString();
          myLocation.icon = data["currently"]["icon"];
          myLocation.summary = data["currently"]["summary"];

          //Set background image
          if (weatherbackgrounds.hasOwnProperty(myLocation.icon)) {
            $("body").css("background-image", weatherbackgrounds[myLocation.icon]);
          } else {
            $("body").css("background-image", weatherbackgrounds["default"]);
          }

          //Send weather data to DOM elements.
          $("#currenttempfahr").html(myLocation.tempfahr);
          $("#currenttempcels").html(myLocation.tempcels);
          $("#summary").html(myLocation.summary);

          /*console.log(myLocation);*/
        }
      })

      //Send latitude and longitude to Google.
      var googlejsonurl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + myLocation.latitude + ',' + myLocation.longitude + '&key=AIzaSyBH8cQd4MBKP8o8TXg5Tc_xecG4f5dZ1Dc';
      $.ajax({
        url: googlejsonurl,
        type: 'GET',
        data: {},
        dataType: 'json',
        success: function(data) {
          var address = data.results[0].address_components;

          //Assign the myLocation object a city, state, and postal code from the Google data.
          for (i = 0; i < address.length; i++) {
            var typesarray = address[i]["types"];
            for (j = 0; j < typesarray.length; j++) {
              if (typesarray[j] == "locality") {
                myLocation.city = address[i].long_name;
              }
              if (typesarray[j] == "administrative_area_level_1") {
                myLocation.state = address[i].short_name;
              }
              if (typesarray[j] == "postal_code") {
                myLocation.postalcode = address[i].long_name;
              }
              if (typesarray[j] == "country") {
                myLocation.country = address[i].long_name;
                myLocation.countryshort = address[i].short_name;
              }
            }
          }

          $("#cityandstate").html(myLocation.city + ", " + myLocation.state);

          /*console.log(myLocation);*/
        }
      });
    });
  } else {
    $("#location").html("No location available");
  }

  
  //Initially hide the Celsius temperature
  $('#currenttempcels').hide();
  
  //Set button to switch between Fahrenheit and Celsius
  $('#switchlink').click(function() {
    if ($('#currenttempcels').is(":hidden")) {
      $('#currenttempfahr').fadeOut(function() {
        $('#currenttempcels').fadeIn();
      });
      
      /*$('#currenttempcels').show();
      $('#currenttempfahr').hide();*/
      $('#temptype').html('&deg;C');
      $('#switchlink').html('&deg;F');
    }
    else {
      $('#currenttempcels').fadeOut(function() {
        $('#currenttempfahr').fadeIn();
      });
      /*$('#currenttempcels').hide();
      $('#currenttempfahr').show();*/
      $('#temptype').html('&deg;F');
      $('#switchlink').html('&deg;C');
    }

  });

});