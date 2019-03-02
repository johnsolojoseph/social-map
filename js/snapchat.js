window.snapKitInit = function () {
       // Argument 1
       var bitmojiWebPickerIconClass =
         'my-bitmoji-stickerpicker-icon-target';

       // Argument 2
       var uiOptions = {
         onStickerPickCallback:
           function onStickerPickCallback(bitmojiImgURL){
             bitMoji = document.getElementById("bitmoji");
             document.getElementById("bitmoji-img").innerHTML = "<div class='center'><img src=" + "\"" + bitmojiImgURL + "\"" + "/></div>";
             document.getElementById("bitmoji-img").style.display = "block";
             document.getElementById("bitmoji").innerHTML = bitmojiImgURL;

           },
         webpickerPosition: 'bottomRight',
       };

       // Argument 3
       var loginParamsObj = {
         clientId: 'e49c5fc4-7ded-46ba-ba9c-6f3d9a3719a3',
         redirectURI: 'https://johnsolojoseph.github.io/social-map/',
         scopeList: [ // the list of scopes you are approved for
          'user.bitmoji.avatar',
          'user.display_name',
         ],
       };

       // Mount Bitmoji Icon(s)
       snap.bitmojikit.mountBitmojiStickerPickerIcons(
         bitmojiWebPickerIconClass,
         uiOptions,
         loginParamsObj,
       );
     };

     // Load the SDK asynchronously
     (function (d, s, id) {
       var js, sjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) return;
       js = d.createElement(s); js.id = id;
       js.src = "https://sdk.snapkit.com/js/v1/login_bitmoji.js";
       sjs.parentNode.insertBefore(js, sjs);
     }(document, 'script', 'bitmojikit-sdk'));
