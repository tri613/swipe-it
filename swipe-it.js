/*===========================
  Swipe-it v1.0.0
  An Event handler for swiping gestures with vanilla js.

  @Create 2016/09/22
  @Author Trina Lu
  ===========================*/

(function(window, document, exportName){
  
  'use strict';

  function SwipeIt(selector) {
    var _elements = document.querySelectorAll(selector);;
    var _xStart, _yStart, _xEnd, _yEnd;

     init();
     ready();
     
     this.on = function(swipeEvent,callback){
        listen(swipeEvent,callback);
        return this;
     }

    function ready() {
       listen('touchstart', touchStartHandler);
       listen('touchmove', touchMoveHandler);
       listen('touchend', touchEndHandler);
    }

    function init() {
       _xStart = null;
       _yStart = null;
       _xEnd = null;
       _yEnd = null;
    }

    function listen(event, handler) {
      for (var i = 0; i < _elements.length; i++) {
         _elements[i].addEventListener(event, handler);
      }
    }

    function stopListen(event, handler) {
      for (var i = 0; i < _elements.length; i++) {
         _elements[i].removeEventListener(event, handler);
      }
    }

    function triggerEvent(eventString) {
      var event = new Event(eventString);
      for (var i = 0; i < _elements.length; i++) {
       _elements[i].dispatchEvent(event);
      }
    }

    function touchStartHandler(e) {
      _xStart = e.touches[0].clientX;
      _yStart = e.touches[0].clientY;
    }

    function touchMoveHandler(e) {
      _xEnd = e.touches[0].clientX;
      _yEnd = e.touches[0].clientY;
    }

    function touchEndHandler(e) {
        if (Math.abs(_xStart - _xEnd) > 30) { //horizontal
           var swipeEventString = (_xStart < _xEnd) ? 'swipeRight' : 'swipeLeft';
           triggerEvent(swipeEventString);
        }
        if (Math.abs(_yStart - _yEnd) > 30) { //vertical
           var swipeEventString = (_yStart > _yEnd) ? 'swipeUp' : 'swipeDown';
           triggerEvent(swipeEventString);
        }
        init();
    }
  }

  //export
  window[exportName] = SwipeIt;

})(window, document, 'SwipeIt');