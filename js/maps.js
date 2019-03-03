//Initialize all Materialize JavaScript
M.AutoInit();

//Await Function
var wait = ms => new Promise((r, j)=>setTimeout(r, ms))

// Initialize Firebase, config from db_config
firebase.initializeApp(config);
var firebase = firebase.database();

//Initialize Markers
var markers = [];

//Initalize Map
function initMap() {
  // Map options
  var options = {
    zoom: 14,
    center: {
      lat: 37.305577,
      lng: -120.477717
    },
    //mapStyle from map_style.js
    styles: mapStyle
  }

  // New map
  var map = new google.maps.Map(document.getElementById('map'), options);

  // Listen for click on map
  google.maps.event.addListener(map, 'click', function(e) {

    //Opens modal to add marker
    $('#add').modal('open');
    //Passes a hidden coordinate to the form
    document.getElementById("coordinate").innerHTML = '<div id="latLng">' + e.latLng.lat() + ',' + e.latLng.lng() + '</div>';
  });

  //Listens for the save button to be clicked
  document.getElementById("save").addEventListener("click", function() {
    //Initialize variables and retrieve values
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var userCoordinates = document.getElementById("latLng").innerText;
    var bitmojiImgURL = document.getElementById("bitmoji").innerText;
    var mapCoord = userCoordinates.split(",", 2);

    //Parses the coordinate strings
    var userLat = parseFloat(mapCoord[0]);
    var userLng = parseFloat(mapCoord[1]);

    var geoData = {
      lat: userLat,
      lng: userLng
    }

    var radioValue = $("input[name='icons']:checked").val();

    //Sets default icon to warning sign if user does not pick
    if (!radioValue) {
      radioValue = "img/warning.png";
    }




    //Closes the modal once the user is done
    $('#add').modal('close');


    var dt = new Date();
    var utcDate = dt.toUTCString();


    // Add marker to Firebase db
    firebase.ref('/').push().set({
      coordinates: geoData,
      title: title,
      description: description,
      police: "",
      solved: "",
      icon: radioValue,
      sentiment: sentiment,
      date: utcDate,
      bitmoji: bitmojiImgURL
    });

    //Notifies the user that a marker was succesfully added
    M.toast({
      html: 'Marker added!'
    });

    //Resets form values after user saves
    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
    $('input[name=icons]').attr('checked', false);
    document.getElementById("bitmoji-img").style.display = "none";
    document.getElementById("bitmoji").innerHTML = "";

  });


  //Real-time data adding
  firebase.ref().on("child_added", function(snapshot) {
    addMarker(snapshot);
  });

  //Real-time delete
  firebase.ref().on("child_removed", function(snapshot) {
    var deletedKey = snapshot.key;
    //Searches the marker key that matches the deleted marker in O(1) lookup
    if (markers[deletedKey]) {
      markers[deletedKey].setMap(null);
    }

    //Let users know their marker is deleted
    M.toast({
      html: 'Marker deleted!'
    });
  });

  //Updates the webpage when marker is updated
  firebase.ref().on("child_changed", function(snapshot) {
    //removes the same marker from map
    markers[snapshot.key].setMap(null);

    //Adds the new updated marker
    addMarker(snapshot);

    //Updates the user
    M.toast({
      html: 'Marker updated!'
    });
  });

  // Add Marker Function
  async function addMarker(props) {
    var marker = new google.maps.Marker({
      position: props.val().coordinates,
      map: map,
      key: props.key
    });


    //Sets the marker icon


    if (props.val().solved) {
      marker.setIcon(props.val().solved);
    } else if (props.val().police) {
      marker.setIcon(props.val().police);
    } else {
      marker.setIcon(props.val().icon);
    }


    //Solved Icon
    var solvedIcon = "\"" + "img/solved.png" + "\"";
    var solvedTitle = "\"" + "img/solved.png" + "\"";
    var policeTitle = "\"" + "[Police Are On Their Way!]<br>" + props.val().title + "\"";
    var policeIcon = "\"" + "img/police-car.png" + "\"";

    //Path for the database ID
    var dbPath = "\"/" + props.key + "\"";


    //Info Window Content

    //Set default content for infoWindow
    var newContent = "<p>There seems to be a problem...<p>";

    //Checks to see if the user inputted anything for the infoWindow
    if (props.val().title && props.val().description) {
      newContent = "<div class='center'><h4>" + props.val().title + "</h4></div> <h6>Description:</h6> <p>" + props.val().description + "</p>";

    } else if (props.val().title) {
      newContent = "<div class='center'><h4>" + props.val().title + "</h4></div> <p>There seems to be a problem...<p>";
    } else if (props.val().description) {
      newContent = "<h6>Description:</h6> <p>" + props.val().description + "</p>";
    }

    if(props.val().bitmoji) {
      newContent += "<div class='center'><img src=" + "\"" + props.val().bitmoji + "\"" + "/></div>"
    }

    if(props.val().sentiment >= 3) {
      newContent += "<br><div class='center'><div class='chip positive'>Positive </div></div><br>";
    } else if (props.val().sentiment <= -3) {
      newContent += "<br><div class='center'><div class='chip negative'>Negative </div></div><br>";
    }



      newContent += '<br> <p> ' + props.val().date + " </p> <br>";

    if(props.val().solved) {
      newContent = "<p>The problem has been solved!<p><br>";
    }

    if (!props.val().solved && !props.val().police) {
      newContent += "<br><div class='center'><img src='img/alarm.png'><a class='police' onclick='firebase.ref(" + dbPath + ").update({police:" + policeIcon + "});" + "'>Send police</a><img src='img/alarm.png'></div><br>";
      newContent += "<br><div class='center'> <a class='solved' onclick='firebase.ref(" + dbPath + ").update({solved:" + solvedIcon + "});" + "'>Mark As Solved </a>";
      newContent += "<a class='delete' onclick='firebase.ref(" + dbPath + ").remove();" + "'>Delete Marker </a></div>";
    } else if (!props.val().solved) {
      newContent += "<br><div class='center'> <a class='solved' onclick='firebase.ref(" + dbPath + ").update({solved:" + solvedIcon + "});" + "'>Mark As Solved </a>";
      newContent += "<a class='delete' onclick='firebase.ref(" + dbPath + ").remove();" + "'>Delete Marker </a></div>";
    }
    else {
      newContent += "<div class='center'><a class='delete' onclick='firebase.ref(" + dbPath + ").remove();" + "'>Delete Marker </a></div>";
    }

    // Creates infoWindow content
    var infoWindow = new google.maps.InfoWindow({
      content: newContent
    });

    //Pushes markers to a markers array, hashmap implementation for O(1) lookup
    markers[marker.key] = marker;


    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });
  } //end of addMarker





} //end of init map
