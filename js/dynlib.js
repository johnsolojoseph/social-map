//           _ _                     _ _         _ _
//          /  /                    /  /    _ _ /  /
//   _ _ _ /  /_ _   _ _ _ _ _ _   /  /    /_ //  /_ _
//  /  _ _   //  /  /  //  _ _  \ /  /    /  //  _ _  \ 
// /  /_ /  //  /_ /  //  /  /  //  /_ _ /  //  /_ /  /
// \_ _ _ _/ \_ _    //_ /  /_ //_ _ _ //_ / \_ _ _ _/
//             _ /  /
//            /_ _ /   Version 1.07 - Feb 6, 2005
//
// ----------------------------------------------------
//   The Cross-Browser Dynamic HTML Scripting Library
// ----------------------------------------------------
//
// dynLib by Lloyd Hassell
// Website: lloydhassell.com/dynlib
// Email: lloydhassell@hotmail.com
// Featured on: Dynamic Drive HTML code library (http://www.dynamicdrive.com)

// --- 1. BROWSER DETECTION --- //

var dyn = (document.all || document.layers || document.getElementById) ? true : false;

var ie = (navigator.appName.indexOf('Microsoft') != -1) ? true : false;
var ie4 = (ie && document.all && !document.getElementById) ? true : false;
var ie5 = (ie && document.getElementById && navigator.userAgent.indexOf('MSIE 6.0') == -1) ? true : false;
var ie6 = (ie && document.getElementById && !ie5) ? true : false;
var ie4Min = (ie4 || ie5 || ie6) ? true : false;
var ie5Min = (ie5 || ie6) ? true : false;
var ie6Min = ie6;

var ns = (navigator.appName.indexOf('Netscape') != -1) ? true : false;
var ns4 = (ns && document.layers) ? true : false;
var ns6 = (ns && document.getElementById) ? true : false;
var ns4Min = (ns4 || ns6) ? true : false;
var ns6Min = ns6;

// --- 2. CURSOR --- //

var cursorPageX, cursorPageY;
var cursorWinX, cursorWinY;

function captureCursor() {
   if (dyn && !cursorCaptured) {
      if (ns) document.captureEvents(Event.MOUSEMOVE);
      document.onmousemove = updateCursorPos;
      cursorCaptured = true;
      }
   }

// Do not use any CURSOR code past here.

var cursorCaptured = false;

function updateCursorPos(EVENT) {
   if (dyn) {
      if (ie) {
         cursorWinX = event.clientX - 2;
         cursorWinY = event.clientY - 2;
         cursorPageX = cursorWinX + document.body.scrollLeft;
         cursorPageY = cursorWinY + document.body.scrollTop;
         }
      else {
         cursorPageX = EVENT.pageX;
         cursorPageY = EVENT.pageY;
         cursorWinX = cursorPageX - window.pageXOffset;
         cursorWinY = cursorPageY - window.pageYOffset;
         }
      if (dragLayerObj.isDragging) {
         moveLayerTo(dragLayerObj.layerObj,cursorPageX - dragLayerObj.cursorOffsetX,cursorPageY - dragLayerObj.cursorOffsetY);
         return false;
         }
      }
   }

// --- 3. DOCUMENT --- //

function getDocHeight() {
   if (ie4Min) return (document.body.scrollHeight > document.body.clientHeight) ? document.body.scrollHeight : document.body.clientHeight;
   else if (ns4Min) return (document.height > window.innerHeight) ? document.height : window.innerHeight;
   }

function getDocWidth() {
   if (ie4Min) return (document.body.scrollWidth > document.body.clientWidth) ? document.body.scrollWidth : document.body.clientWidth;
   else if (ns4Min) return (document.width > window.innerWidth) ? document.width : window.innerWidth;
   }

function getDocScrollLeft() {
   if (ie4Min) return document.body.scrollLeft;
   else if (ns4Min) return window.pageXOffset;
   }

function getDocScrollTop() {
   if (ie4Min) return document.body.scrollTop;
   else if (ns4Min) return window.pageYOffset;
   }

// --- 4. EVENTS --- //

function addObjEvent(OBJ,EVENT,FUNC) {
   if (dyn) {
      if (EVENT == 'click') {
         if (ns4) OBJ.captureEvents(Event.CLICK);
         OBJ.onclick = new Function(FUNC);
         }
      else if (EVENT == 'mousedown') {
         if (ns4) OBJ.captureEvents(Event.MOUSEDOWN);
         OBJ.onmousedown = new Function(FUNC);
         }
      else if (EVENT == 'mouseup') {
         if (ns4) OBJ.captureEvents(Event.MOUSEUP);
         OBJ.onmouseup = new Function(FUNC);
         }
      else if (EVENT == 'mouseover') {
         if (ns4) OBJ.captureEvents(Event.MOUSEOVER);
         OBJ.onmouseover = new Function(FUNC);
         }
      else if (EVENT == 'mouseout') {
         if (ns4) OBJ.captureEvents(Event.MOUSEOUT);
         OBJ.onmouseout = new Function(FUNC);
         }
      }
   }

function removeObjEvent(OBJ,EVENT) {
   if (dyn) {
      if (EVENT == 'click') {
         if (ns4) OBJ.releaseEvents(Event.CLICK);
         OBJ.onclick = null;
         }
      else if (EVENT == 'mousedown') {
         if (ns4) OBJ.releaseEvents(Event.MOUSEDOWN);
         OBJ.onmousedown = null;
         }
      else if (EVENT == 'mouseup') {
         if (ns4) OBJ.releaseEvents(Event.MOUSEUP);
         OBJ.onmouseup = null;
         }
      else if (EVENT == 'mouseover') {
         if (ns4) OBJ.releaseEvents(Event.MOUSEOVER);
         OBJ.onmouseover = null;
         }
      else if (EVENT == 'mouseout') {
         if (ns4) OBJ.releaseEvents(Event.MOUSEOUT);
         OBJ.onmouseout = null;
         }
      }
   }

// --- 5. HTML STRINGS --- //

function getATag(HREF,TARGET,ONMOUSEOVER,ONMOUSEOUT,OTHER) {
   var tempHtmlStr = '<A';
   if (!isBlank(HREF)) tempHtmlStr += ' HREF="' + HREF + '"';
   if (!isBlank(TARGET)) tempHtmlStr += ' TARGET="' + TARGET + '"';
   if (!isBlank(ONMOUSEOVER)) tempHtmlStr += ' onMouseOver="' + ONMOUSEOVER + '"';
   if (!isBlank(ONMOUSEOUT)) tempHtmlStr += ' onMouseOut="' + ONMOUSEOUT + '"';
   if (!isBlank(OTHER)) tempHtmlStr += ' ' + OTHER;
   tempHtmlStr += '>';
   return tempHtmlStr;
   }

function getFontTag(COLOR,FACE,SIZE,OTHER) {
   var tempHtmlStr = '<FONT';
   if (!isBlank(COLOR)) tempHtmlStr += ' COLOR="' + COLOR + '"';
   if (!isBlank(FACE)) tempHtmlStr += ' FACE="' + FACE + '"';
   if (!isBlank(SIZE)) tempHtmlStr += ' SIZE="' + SIZE + '"';
   if (!isBlank(OTHER)) tempHtmlStr += ' ' + OTHER;
   tempHtmlStr += '>';
   return tempHtmlStr;
   }

function getImgTag(NAME,SRC,WIDTH,HEIGHT,BORDER,ALIGN,HSPACE,VSPACE,ALT,OTHER) {
   var tempHtmlStr = '<IMG';
   if (!isBlank(NAME)) tempHtmlStr += ' NAME="' + NAME + '"';
   if (!isBlank(SRC)) tempHtmlStr += ' SRC="' + SRC + '"';
   if (!isBlank(WIDTH)) tempHtmlStr += ' WIDTH="' + WIDTH + '"';
   if (!isBlank(HEIGHT)) tempHtmlStr += ' HEIGHT="' + HEIGHT + '"';
   if (!isBlank(BORDER)) tempHtmlStr += ' BORDER="' + BORDER + '"';
   if (!isBlank(ALIGN)) tempHtmlStr += ' ALIGN="' + ALIGN + '"';
   if (!isBlank(HSPACE)) tempHtmlStr += ' HSPACE="' + HSPACE + '"';
   if (!isBlank(VSPACE)) tempHtmlStr += ' VSPACE="' + VSPACE + '"';
   if (!isBlank(ALT)) tempHtmlStr += ' ALT="' + ALT + '"';
   if (!isBlank(OTHER)) tempHtmlStr += ' ' + OTHER;
   tempHtmlStr += '>';
   return tempHtmlStr;
   }

function getTableTag(CELLPADDING,CELLSPACING,BORDER,WIDTH,HEIGHT,OTHER) {
   var tempHtmlStr = '<TABLE';
   if (!isBlank(CELLPADDING)) tempHtmlStr += ' CELLPADDING="' + CELLPADDING + '"';
   if (!isBlank(CELLSPACING)) tempHtmlStr += ' CELLSPACING="' + CELLSPACING + '"';
   if (!isBlank(BORDER)) tempHtmlStr += ' BORDER="' + BORDER + '"';
   if (!isBlank(WIDTH)) tempHtmlStr += ' WIDTH="' + WIDTH + '"';
   if (!isBlank(HEIGHT)) tempHtmlStr += ' HEIGHT="' + HEIGHT + '"';
   if (!isBlank(OTHER)) tempHtmlStr += ' ' + OTHER;
   tempHtmlStr += '>';
   return tempHtmlStr;
   }

function getTdTag(ALIGN,VALIGN,WIDTH,BGCOLOR,BACKGROUND,COLSPAN,ROWSPAN,NOWRAP,OTHER) {
   var tempHtmlStr = '<TD';
   if (!isBlank(ALIGN)) tempHtmlStr += ' ALIGN="' + ALIGN + '"';
   if (!isBlank(VALIGN)) tempHtmlStr += ' VALIGN="' + VALIGN + '"';
   if (!isBlank(WIDTH)) tempHtmlStr += ' WIDTH="' + WIDTH + '"';
   if (!isBlank(BGCOLOR)) tempHtmlStr += ' BGCOLOR="' + BGCOLOR + '"';
   if (!isBlank(BACKGROUND)) tempHtmlStr += ' BACKGROUND="' + BACKGROUND + '"';
   if (!isBlank(COLSPAN)) tempHtmlStr += ' COLSPAN="' + COLSPAN + '"';
   if (!isBlank(ROWSPAN)) tempHtmlStr += ' ROWSPAN="' + ROWSPAN + '"';
   if (NOWRAP == true) tempHtmlStr += ' NOWRAP';
   if (!isBlank(OTHER)) tempHtmlStr += ' ' + OTHER;
   tempHtmlStr += '>';
   return tempHtmlStr;
   }

// --- 6. IMAGES --- //

function getImgObj(IMGNAME) {
   if (ns4) {
      var tempImgObj = null;
      var tempParentObj = (arguments.length == 1) ? document : arguments[1];
      if (arguments.length == 1 && document.images[IMGNAME] != null) tempImgObj = document.images[IMGNAME];
      else {
         for (var tempLayerLoop in tempParentObj.layers) {
            var tempObj = tempParentObj.layers[tempLayerLoop];
            var tempConstructor = tempObj.constructor + '';
            if (tempConstructor.indexOf('function Layer()') != -1) {
               if (tempObj.document.images[IMGNAME] != null) return tempObj.document.images[IMGNAME];
               else if (tempObj.document.layers.length > 0) tempImgObj = getImgObj(IMGNAME,tempObj);
               }
            }
         }
      return tempImgObj;
      }
   else if (dyn) return document.images[IMGNAME];
   }

function loadImg(SRC) {
   if (dyn) {
      var tempImgObj = new Image();
      tempImgObj.src = SRC;
      return tempImgObj;
      }
   }

// --- 7. LAYER ADDING --- //

function addLayer(LAYERID,PARENTLAYEROBJ) {
   if (ie4Min) {
      if (isBlank(PARENTLAYEROBJ)) PARENTLAYEROBJ = document.body;
      PARENTLAYEROBJ.insertAdjacentHTML('BeforeEnd','<div id="' + LAYERID + '" style="position:absolute;left:0;top:0;width:1;visibility:hidden;"></div>');
      return (document.all) ? document.all[LAYERID] : document.getElementById(LAYERID);
      }
   else if (ns4) {
      if (isBlank(PARENTLAYEROBJ)) {
         document.layers[LAYERID] = new Layer(0);
         return document.layers[LAYERID];
         }
      else {
         PARENTLAYEROBJ.document.layers[LAYERID] = new Layer(0,PARENTLAYEROBJ);
         return PARENTLAYEROBJ.document.layers[LAYERID];
         }
      }
   else if (ns6) {
      if (isBlank(PARENTLAYEROBJ)) PARENTLAYEROBJ = document.body;
      var tempLayer = document.createElement('div');
      tempLayer.setAttribute('id',LAYERID);
      tempLayer.setAttribute('style','position:absolute;left:0;top:0;width:1;visibility:hidden;');
      PARENTLAYEROBJ.appendChild(tempLayer);
      return document.getElementById(LAYERID);
      }
   }

// --- 8. LAYER APPEARANCE --- //

function setLayerBgColor(LAYEROBJ,COLOR) {
   if (ns4) LAYEROBJ.document.bgColor = COLOR;
   else if (dyn) LAYEROBJ.style.backgroundColor = COLOR;
   }

function setLayerBgSrc(LAYEROBJ,SRC) {
   if (ns4) LAYEROBJ.background.src = SRC;
   else if (dyn) LAYEROBJ.style.backgroundImage = 'url(' + SRC + ')';
   }

// --- 9. LAYER CLIPPING --- //

function getLayerClipBottom(LAYEROBJ) {
   if (ns4) return LAYEROBJ.clip.bottom;
   else if (dyn) {
      var tempClipArray = LAYEROBJ.style.clip.substring(5,LAYEROBJ.style.clip.length - 3).split('px ');
      return parseInt(tempClipArray[2]);
      }
   }

function getLayerClipLeft(LAYEROBJ) {
   if (ns4) return LAYEROBJ.clip.left;
   else if (dyn) {
      var tempClipArray = LAYEROBJ.style.clip.substring(5,LAYEROBJ.style.clip.length - 3).split('px ');
      return parseInt(tempClipArray[3]);
      }
   }

function getLayerClipRight(LAYEROBJ) {
   if (ns4) return LAYEROBJ.clip.right;
   else if (dyn) {
      var tempClipArray = LAYEROBJ.style.clip.substring(5,LAYEROBJ.style.clip.length - 3).split('px ');
      return parseInt(tempClipArray[1]);
      }
   }

function getLayerClipTop(LAYEROBJ) {
   if (ns4) return LAYEROBJ.clip.top;
   else if (dyn) {
      var tempClipArray = LAYEROBJ.style.clip.substring(5,LAYEROBJ.style.clip.length - 3).split('px ');
      return parseInt(tempClipArray[0]);
      }
   }

function setLayerClip(LAYEROBJ,TOP,RIGHT,BOTTOM,LEFT) {
   if (dyn) {
      if (isBlank(TOP)) TOP = getLayerClipTop(LAYEROBJ);
      if (isBlank(RIGHT)) RIGHT = getLayerClipRight(LAYEROBJ);
      if (isBlank(BOTTOM)) BOTTOM = getLayerClipBottom(LAYEROBJ);
      if (isBlank(LEFT)) LEFT = getLayerClipLeft(LAYEROBJ);
      if (ns4) {
         LAYEROBJ.clip.left = LEFT;
         LAYEROBJ.clip.top = TOP;
         LAYEROBJ.clip.right = RIGHT;
         LAYEROBJ.clip.bottom = BOTTOM;
         }
      else LAYEROBJ.style.clip = 'rect(' + TOP + 'px ' +  RIGHT + 'px ' + BOTTOM + 'px '  + LEFT + 'px)';
      }
   }

// --- 10. LAYER DIMENSIONS --- //

function getLayerHeight(LAYEROBJ) {
   if (ie4) return LAYEROBJ.clientHeight;
   else if (ns4) return LAYEROBJ.clip.height;
   else if (dyn) return parseInt(LAYEROBJ.style.height);
   }

function getLayerWidth(LAYEROBJ) {
   if (ie4) return LAYEROBJ.clientWidth;
   else if (ns4) return LAYEROBJ.clip.width;
   else if (dyn) return parseInt(LAYEROBJ.style.width);
   }

function setLayerSize(LAYEROBJ,WIDTH,HEIGHT) {
   if (ie4) {
      if (!isBlank(WIDTH)) LAYEROBJ.style.pixelWidth = WIDTH;
      if (!isBlank(HEIGHT)) LAYEROBJ.style.pixelHeight = HEIGHT;
      }
   else if (ns4) {
      if (!isBlank(WIDTH)) LAYEROBJ.clip.right = WIDTH;
      if (!isBlank(HEIGHT)) LAYEROBJ.clip.bottom = HEIGHT;
      }
   else if (dyn) {
      if (!isBlank(WIDTH)) LAYEROBJ.style.width = WIDTH + 'px';
      if (!isBlank(HEIGHT)) LAYEROBJ.style.height = HEIGHT + 'px';
      }
   }

// --- 11. LAYER DRAGGING --- //

function addLayerDrag(LAYEROBJ,DRAGLAYEROBJ,DRAGENDFUNC) {
   if (dyn) {
      if (!cursorCaptured) captureCursor();
      LAYEROBJ.drag = new Object();
      LAYEROBJ.drag.layerObj = (!isBlank(DRAGLAYEROBJ)) ? DRAGLAYEROBJ : LAYEROBJ;
      LAYEROBJ.drag.onDragEnd = (!isBlank(DRAGENDFUNC)) ? new Function(DRAGENDFUNC) : null;
      if (ns4) {
         LAYEROBJ.captureEvents(Event.MOUSEDOWN);
         document.captureEvents(Event.MOUSEUP);
         }
      LAYEROBJ.onmousedown = dragLayerStart;
      document.onmouseup = dragLayerStop;
      }
   }

function removeLayerDrag(LAYEROBJ) {
   if (dyn) {
      LAYEROBJ.drag = null;
      LAYEROBJ.onmousedown = null;
      if (ns4) {
         LAYEROBJ.releaseEvents(Event.MOUSEDOWN);
         document.releaseEvents(Event.MOUSEUP);
         }
      }
   }

// Do not use any LAYER DRAGGING code past here.

dragLayerObj = new Object();
dragLayerObj.isDragging = false;

function dragLayerStart() {
   if (!this.isSliding) {
      dragLayerObj.layerObj = this.drag.layerObj;
      dragLayerObj.cursorOffsetX = cursorPageX - getLayerLeft(dragLayerObj.layerObj);
      dragLayerObj.cursorOffsetY = cursorPageY - getLayerTop(dragLayerObj.layerObj);
      dragLayerObj.onDragEnd = this.drag.onDragEnd;
      setLayerOnTop(dragLayerObj.layerObj);
      dragLayerObj.isDragging = true;
      return true;
      }
   }

function dragLayerStop() {
   if (dragLayerObj.isDragging) {
      dragLayerObj.isDragging = false;
      if (dragLayerObj.onDragEnd != null) dragLayerObj.onDragEnd();
      return true;
      }
   }

// --- 12. LAYER HTML --- //

function setLayerHTML(LAYEROBJ,STR) {
   if (navigator.userAgent.indexOf('MSIE 5.0') && navigator.userAgent.indexOf('Mac') != -1) STR += '\n';
   if (ns4) {
      LAYEROBJ.document.open();
      LAYEROBJ.document.write(STR);
      LAYEROBJ.document.close();
      }
   else if (dyn) LAYEROBJ.innerHTML = STR;
   }

// --- 13. LAYER OBJECT --- //

function getLayerObj(LAYERID) {
   if (ie4) return document.all[LAYERID];
   else if (ns4) {
      var tempLayerObj = null;
      var tempParentObj = (arguments.length == 1) ? document : arguments[1];
      for (var tempLayerLoop in tempParentObj.layers) {
         var tempObj = tempParentObj.layers[tempLayerLoop];
         var tempConstructor = tempObj.constructor + '';
         if (tempConstructor.indexOf('function Layer()') != -1) {
            if (tempLayerLoop == LAYERID) return tempObj;
            else if (tempObj.document.layers.length > 0) tempLayerObj = getLayerObj(LAYERID,tempObj);
            }
         }
      return tempLayerObj;
      }
   else if (dyn) return document.getElementById(LAYERID);
   }

// --- 14. LAYER POSITIONING --- //

function getLayerLeft(LAYEROBJ) {
   if (ns4) return LAYEROBJ.left;
   else if (dyn) return parseInt(LAYEROBJ.style.left);
   }

function getLayerTop(LAYEROBJ) {
   if (ns4) return LAYEROBJ.top;
   else if (dyn) return parseInt(LAYEROBJ.style.top);
   }

function moveLayerBy(LAYEROBJ,DISTX,DISTY) {
   if (ns4) {
      if (isBlank(DISTX)) DISTX = 0;
      if (isBlank(DISTY)) DISTY = 0;
      LAYEROBJ.moveBy(DISTX,DISTY);
      }
   else if (dyn) {
      if (!isBlank(DISTX)) LAYEROBJ.style.left = (parseInt(LAYEROBJ.style.left) + DISTX) + 'px';
      if (!isBlank(DISTY)) LAYEROBJ.style.top = (parseInt(LAYEROBJ.style.top) + DISTY) + 'px';
      }
   }

function moveLayerTo(LAYEROBJ,LEFT,TOP) {
   if (ns4) {
      if (isBlank(LEFT)) LEFT = getLayerLeft(LAYEROBJ);
      if (isBlank(TOP)) TOP = getLayerTop(LAYEROBJ);
      LAYEROBJ.moveTo(LEFT,TOP);
      }
   else if (dyn) {
      if (!isBlank(LEFT)) LAYEROBJ.style.left = LEFT + 'px';
      if (!isBlank(TOP)) LAYEROBJ.style.top = TOP + 'px';
      }
   }

// --- 15. LAYER SLIDING --- //

function slideLayerBy(LAYEROBJ,DISTX,DISTY,INCREMENT,FRAMERATE,SLIDEENDFUNC) {
   if (dyn) {
      var tempSlideId = LAYEROBJ.id;
      if (slideLayerObj[tempSlideId] != null) window.clearTimeout(slideLayerObj[tempSlideId].moveTimeout);
      var tempPosX = getLayerLeft(LAYEROBJ);
      var tempPosY = getLayerTop(LAYEROBJ);
      if (isBlank(DISTX)) DISTX = 0; 
      if (isBlank(DISTY)) DISTY = 0; 
      var tempEndX = tempPosX + DISTX;
      var tempEndY = tempPosY + DISTY;
      slideLayerObj[tempSlideId] = new slideLayerInit(LAYEROBJ,tempPosX,tempPosY,tempEndX,tempEndY,INCREMENT,FRAMERATE,SLIDEENDFUNC);
      slideLayerObj[tempSlideId].slideLayer();
      }
   }

function slideLayerTo(LAYEROBJ,LEFT,TOP,INCREMENT,FRAMERATE,SLIDEENDFUNC) {
   if (dyn) {
      var tempSlideId = LAYEROBJ.id;
      if (slideLayerObj[tempSlideId] != null) window.clearTimeout(slideLayerObj[tempSlideId].moveTimeout);
      var tempPosX = getLayerLeft(LAYEROBJ);
      var tempPosY = getLayerTop(LAYEROBJ);
      if (isBlank(LEFT)) LEFT = tempPosX;
      if (isBlank(TOP)) TOP = tempPosY;
      slideLayerObj[tempSlideId] = new slideLayerInit(LAYEROBJ,tempPosX,tempPosY,LEFT,TOP,INCREMENT,FRAMERATE,SLIDEENDFUNC);
      slideLayerObj[tempSlideId].slideLayer();
      }
   }

// Do not use any LAYER SLIDING code past here.

slideLayerObj = new Object();

function slideLayerInit(LAYEROBJ,POSX,POSY,ENDX,ENDY,INCREMENT,FRAMERATE,SLIDEENDFUNC) {
   dragLayerObj.isDragging = false;
   LAYEROBJ.isSliding = true;
   this.layerId = LAYEROBJ.id;
   this.layerObj = LAYEROBJ;
   this.posX = POSX;
   this.posY = POSY;
   this.posZ = 0;
   this.endX = ENDX;
   this.endY = ENDY;
   this.incZ = (!isBlank(INCREMENT)) ? INCREMENT : 3;
   this.frameRate = (!isBlank(FRAMERATE)) ? FRAMERATE : 50;
   this.onSlideEnd = (!isBlank(SLIDEENDFUNC)) ? new Function(SLIDEENDFUNC) : null;
   this.moveTimeout = null;
   this.slideLayer = slideLayerMove;
   this.distX = this.endX - this.posX;
   this.dirX = (this.distX >= 0) ? 'right' : 'left';
   if (this.distX < 0) this.distX *= -1;
   this.distY = this.endY - this.posY;
   this.dirY = (this.distY >= 0) ? 'down' : 'up';
   if (this.distY < 0) this.distY *= -1;
   this.distZ = Math.sqrt(Math.pow(this.distX,2) + Math.pow(this.distY,2));
   this.slideAngle = Math.atan(this.distX / this.distY);
   this.incX = Math.sin(this.slideAngle) * this.incZ;
   this.incY = Math.cos(this.slideAngle) * this.incZ;
   }

function slideLayerMove() {
   if (this.posZ + this.incZ < this.distZ) {
      this.posX += (this.dirX == 'right') ? this.incX : this.incX * -1;
      this.posY += (this.dirY == 'down') ? this.incY : this.incY * -1;
      this.posZ += this.incZ;
      moveLayerTo(this.layerObj,Math.round(this.posX),Math.round(this.posY));
      slideLayerObj[this.layerId].moveTimeout = setTimeout('slideLayerObj[\'' + this.layerId + '\'].slideLayer()',this.frameRate);
      }
   else {
      this.posX = this.endX;
      this.posY = this.endY;
      moveLayerTo(this.layerObj,this.endX,this.endY);
      if (this.onSlideEnd != null) this.onSlideEnd();
      this.layerObj.isSliding = false;
      }
   }

// --- 16. LAYER STACKING --- //

function setLayerOnBottom(LAYEROBJ) {
   if (dyn) setLayerZIndex(LAYEROBJ,getLayerStack('<') - 1);
   }

function setLayerOnTop(LAYEROBJ) {
   if (dyn) setLayerZIndex(LAYEROBJ,getLayerStack('>') + 1);
   }

// Do not use any LAYER STACKING code past here.

function getLayerStack(TYPE) {
   if (ie4) {
      var tempLayerZIndex = null;
      for (var tempLayerLoop in document.all) {
         if (typeof(document.all[tempLayerLoop]) == 'object' && (document.all[tempLayerLoop].tagName == 'DIV' || document.all[tempLayerLoop].tagName == 'SPAN')) {
            if (tempLayerZIndex == null || eval('document.all[tempLayerLoop].style.zIndex ' + TYPE + ' tempLayerZIndex')) {
               tempLayerZIndex = document.all[tempLayerLoop].style.zIndex;
               }
            }
         }
      }
   else if (ns4) {
      var tempParentObj = (arguments.length == 1) ? document : arguments[1];
      var tempLayerZIndex = (arguments.length == 1) ? null : arguments[2];
      for (var tempLayerLoop in tempParentObj.layers) {
         var tempConstructor = tempParentObj.layers[tempLayerLoop].constructor + '';
         if (tempConstructor.indexOf('function Layer()') != -1) {
            if (tempLayerZIndex == null || eval('tempParentObj.layers[tempLayerLoop].zIndex ' + TYPE + ' tempLayerZIndex')) {
               tempLayerZIndex = tempParentObj.layers[tempLayerLoop].zIndex;
               }
            if (tempParentObj.layers[tempLayerLoop].layers.length > 0) {
               tempLayerZIndex = getLayerStack(TYPE,tempParentObj.layers[tempLayerLoop].document,tempLayerZIndex);
               }
            }
         }
      }
   else if (dyn) {
      var tempLayerZIndex = null;
      var tempLayersObj = document.getElementsByTagName('div');
      for (var tempLayerLoop = 0; tempLayerLoop < tempLayersObj.length; tempLayerLoop++) {
         if (tempLayerZIndex == null || eval('tempLayersObj[tempLayerLoop].style.zIndex ' + TYPE + ' tempLayerZIndex')) {
            tempLayerZIndex = tempLayersObj[tempLayerLoop].style.zIndex;
            }
         }
      }
   return tempLayerZIndex;
   }

// --- 17. LAYER VISIBILITY --- //

function hideLayer(LAYEROBJ) {
   if (ns4) LAYEROBJ.visibility = 'hide';
   else if (dyn) LAYEROBJ.style.visibility = 'hidden';
   }

function showLayer(LAYEROBJ) {
   if (ns4) LAYEROBJ.visibility = 'show';
   else if (dyn) LAYEROBJ.style.visibility = 'visible';
   }

// --- 18. LAYER Z-INDEX --- //

function getLayerZIndex(LAYEROBJ) {
   if (ns4) return LAYEROBJ.zIndex;
   else if (dyn) return LAYEROBJ.style.zIndex;
   }

function setLayerZIndex(LAYEROBJ,ZINDEX) {
   if (ns4) LAYEROBJ.zIndex = ZINDEX;
   else if (dyn) LAYEROBJ.style.zIndex = ZINDEX;
   }

// --- 19. WINDOW --- //

function getWinHeight() {
   if (ie4Min) return document.body.clientHeight;
   else if (ns4Min) return window.innerHeight;
   }

function getWinWidth() {
   if (ie4Min) return document.body.clientWidth;
   else if (ns4Min) return window.innerWidth;
   }

// --- 20. OTHER CODE --- //

function isBlank(STR) {
   if (dyn) {
      if (STR == null) STR = '';
      STR += '';
      STR = STR.replace(/^\s+|\s+$/g,'');
      return (STR == '') ? true : false;
      }
   }