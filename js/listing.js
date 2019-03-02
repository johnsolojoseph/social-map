firebase.initializeApp(config);
var firebase = firebase.database();



firebase.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val().title);
  document.getElementById('listing').innerHTML += createCards(snapshot.val().title, snapshot.val().description, snapshot.val().bitmoji);
});



function createCards(title, description, bitmoji) {
  if(description && title){
  var card =""
  card = "<div class='card-panel teal'><span class='white-text'>"+ title + "<br>" + description + " </span>   "
  if(bitmoji){
  card += "<div class='center'><img src=" + "\"" + bitmoji + "\"" + "/></div> </div>"
} else {
  card += "</div>"
}
  }
  else
  var card = "";
  //Append to listing


return card;

}
