async function analyze(sentence) {
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
    console.log(resp.result.documentSentiment.score);
    return resp.result.documentSentiment.score;

  });
};

gapi.load('client', function() {
console.log("Content is loaded");
});
