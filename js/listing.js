firebase.initializeApp(config);
var firebase = firebase.database();



firebase.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val().title);
  document.getElementById('listing').innerHTML += createCards(snapshot.val().title, snapshot.val().description);
});



function createCards(title, description) {
  var card = "<div class='card-panel teal'><span class='white-text'>"+ title + "<br>" + description + " </span>  </div>"


  //Append to listing


return card;

}
