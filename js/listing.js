firebase.initializeApp(config);
var firebase = firebase.database();



firebase.ref().on("child_added", function(snapshot) {
  document.getElementById('listing').innerHTML += createCards(snapshot.val().title, snapshot.val().description, snapshot.val().bitmoji, snapshot.key);
  analyze(snapshot.val().description, snapshot.key);
});



function createCards(title, description, bitmoji, dbKey) {
  if(description && title){
  var card =""
  card = "<div class='card-panel card-list'><span class='white-text'>"+ title + "<br>" + description + " </span>   "
  if(bitmoji){
  card += "<div class='center'><img class='responsive-img' src=" + "\"" + bitmoji + "\"" + "/></div>"
  card += "<div id=" + "\"" + dbKey + "\"" +"></div></div>"
} else {
  card += "<div id=" + "\"" + dbKey + "\"" +"></div>"
  card += "</div>"
}
  }
  else
  var card = "";
  //Append to listing


return card;

}
