firebase.initializeApp(config);
var firebase = firebase.database();



firebase.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val().title);

});



function showListings(title, description) {
  //Append to listing
}
