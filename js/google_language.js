function analyze(sentence, dbKey) {
  gapi.client.init({
    'apiKey': 'AIzaSyDWOwWUPAZ4RzyyZ6v_stHKFU0Lf8hLN7Y',
    'discoveryDocs': ['https://language.googleapis.com/$discovery/rest?version=v1beta1']
  }).then( function() {
    return gapi.client.language.documents.analyzeSentiment({
      'document': {
                'type': 'PLAIN_TEXT',
                'content': sentence
             }
    });
  }).then(function(resp) {
    // send to dataLayer here
    //Has the result of the sentiment

    score = resp.result.documentSentiment.score;
    if(score >= 0.3) {
      score *= 100;
      document.getElementById(dbKey).innerHTML = "<br><div class='center'><div class='chip positive'>" + score + "% Positive </div></div><br>"
    } else if (score <= -0.3) {
      score *= 100;
      document.getElementById(dbKey).innerHTML = "<br><div class='center'><div class='chip negative'>" + Math.abs(score) + "% Negative </div></div><br>"
    }

  });
};

gapi.load('client', function() {
console.log("Content is loaded");
});
