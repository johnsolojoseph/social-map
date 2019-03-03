// =============================== //
// Bouncing Images                 //
// v1.1 - Feb 5, 2005              //
// ------------------------------- //
// Written by Lloyd Hassell        //
// Website: lloydhassell.com       //
// Email: lloydhassell@hotmail.com //
// =============================== //

// Featured on: Dynamic Drive HTML code library (http://www.dynamicdrive.com)

// INITIALIZATION:

bouncingImages = new Object();

// CONFIGURATION:

bouncingImages.imgCount = 3;
bouncingImages.imgWidth = 40;
bouncingImages.imgHeight = 40;
bouncingImages.imgSrc = 'img/dog.png';

bouncingImages.frameRate = 30;

bouncingImages.minRandomSpeed = 2;
bouncingImages.maxRandomSpeed = 8;

// MAIN:

bouncingImages.isLoaded = false;
bouncingImages.dirX = new Array();
bouncingImages.dirY = new Array();
bouncingImages.posX = new Array();
bouncingImages.posY = new Array();
bouncingImages.speedX = new Array();
bouncingImages.speedY = new Array();
var winWidth, winHeight;

if (dyn) var preloadImgObj = loadImg(bouncingImages.imgSrc);

function loadBouncingImages() {
   if (dyn && !bouncingImages.isLoaded) {
      winWidth = getWinWidth();
      winHeight = getWinHeight();
      for (var layerLoop = 0; layerLoop < bouncingImages.imgCount; layerLoop++) {
         bouncingImages.dirX[layerLoop] = (Math.round(Math.random()) == 0) ? 'left' : 'right';
         bouncingImages.dirY[layerLoop] = (Math.round(Math.random()) == 0) ? 'up' : 'down';
         bouncingImages.posX[layerLoop] = Math.floor(Math.random() * (winWidth - bouncingImages.imgWidth - 1)) + getDocScrollLeft();
         bouncingImages.posY[layerLoop] = Math.floor(Math.random() * (winHeight - bouncingImages.imgHeight - 1)) + getDocScrollTop();
         bouncingImages.speedX[layerLoop] = Math.round(Math.random() * (bouncingImages.maxRandomSpeed - bouncingImages.minRandomSpeed)) + bouncingImages.minRandomSpeed;
         bouncingImages.speedY[layerLoop] = Math.round(Math.random() * (bouncingImages.maxRandomSpeed - bouncingImages.minRandomSpeed)) + bouncingImages.minRandomSpeed;
         var tempLayerObj = addLayer('bouncingImagesLyr' + layerLoop);
         bouncingImages['layerObj' + layerLoop] = tempLayerObj;
         setLayerSize(tempLayerObj,bouncingImages.imgWidth,bouncingImages.imgHeight);
         setLayerClip(tempLayerObj,0,bouncingImages.imgWidth,bouncingImages.imgHeight,0);
         setLayerHTML(tempLayerObj,getImgTag('bouncingImagesImg' + layerLoop,preloadImgObj.src,bouncingImages.imgWidth,bouncingImages.imgHeight,0));
         moveLayerTo(tempLayerObj,bouncingImages.posX[layerLoop],bouncingImages.posY[layerLoop]);
         showLayer(tempLayerObj);
         }
      bouncingImages.isLoaded = true;
      moveBouncingImages();
      }
   }

function moveBouncingImages() {
   for (var layerLoop = 0; layerLoop < bouncingImages.imgCount; layerLoop++) {
      if (bouncingImages.dirX[layerLoop] == 'left') {
         if (bouncingImages.posX[layerLoop] > bouncingImages.speedX[layerLoop]) bouncingImages.posX[layerLoop] -= bouncingImages.speedX[layerLoop];
         else {
            bouncingImages.dirX[layerLoop] = 'right';
            bouncingImages.posX[layerLoop] = 0;
            }
         }
      else if (bouncingImages.dirX[layerLoop] == 'right') {
         if (bouncingImages.posX[layerLoop] + bouncingImages.imgWidth < winWidth - bouncingImages.speedX[layerLoop]) bouncingImages.posX[layerLoop] += bouncingImages.speedX[layerLoop];
         else {
            bouncingImages.dirX[layerLoop] = 'left';
            bouncingImages.posX[layerLoop] = winWidth - bouncingImages.imgWidth;
            }
         }
      if (bouncingImages.dirY[layerLoop] == 'up') {
         if (bouncingImages.posY[layerLoop] > bouncingImages.speedY[layerLoop]) bouncingImages.posY[layerLoop] -= bouncingImages.speedY[layerLoop];
         else {
            bouncingImages.dirY[layerLoop] = 'down';
            bouncingImages.posY[layerLoop] = 0;
            }
         }
      else if (bouncingImages.dirY[layerLoop] == 'down') {
         if (bouncingImages.posY[layerLoop] + bouncingImages.imgHeight < winHeight - bouncingImages.speedY[layerLoop]) bouncingImages.posY[layerLoop] += bouncingImages.speedY[layerLoop];
         else {
            bouncingImages.dirY[layerLoop] = 'up';
            bouncingImages.posY[layerLoop] = winHeight - bouncingImages.imgHeight;
            }
         }
      }
   for (var layerLoop = 0; layerLoop < bouncingImages.imgCount; layerLoop++) moveLayerTo(bouncingImages['layerObj' + layerLoop],bouncingImages.posX[layerLoop] + getDocScrollLeft(),bouncingImages.posY[layerLoop] + getDocScrollTop());
   window.setTimeout('moveBouncingImages()',bouncingImages.frameRate);
   }
