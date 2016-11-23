/*===========================
  Swipe-it v1.3.0
  An event listener for swiping gestures with vanilla js.
  https://github.com/tri613/swipe-it
 
  @Create 2016/09/22
  @Update 2016/11/23
  @Author Trina Lu
  ===========================*/
(function(window, document, exportName) {

  'use strict';

  var _window = [window];
  var _target = false;

  function SwipeIt(selector) {
    var _elements = document.querySelectorAll(selector);
    var _xStart, _yStart, _xEnd, _yEnd;

    init();
    ready();

    this.listen = function(swipeEvent, callback) {
      listen(swipeEvent, callback, _elements);
      return this;
    }

    function ready() {
      //for touching device
      listen('touchstart', touchStartHandler, _elements);
      listen('touchmove', touchMoveHandler, _elements);
      listen('touchend', touchEndHandler, _elements);
      //for mouse
      listen('mousedown', mouseDownHandler, _elements);
    }

    function init() {
      _xStart = false;
      _yStart = false;
      _xEnd = false;
      _yEnd = false;
      _target = false;
    }

    function mouseDownHandler(e) {
      _xStart = e.clientX;
      _yStart = e.clientY;
      _target = e.target;
      listen('mousemove', mouseMoveHandler, _window);
      listen('mouseup', mouseEndHandler, _window);
    }

    function mouseMoveHandler(e) {
      e.preventDefault(); // **prevent drag event from being triggered**
      if (!_xStart || !_yStart) return;
      _xEnd = e.clientX;
      _yEnd = e.clientY;
    }

    function mouseEndHandler(e) {
      stopListen('mousemove', mouseMoveHandler, _window);
      stopListen('mouseup', mouseEndHandler, _window);
      touchEndHandler(e);
    }

    function touchStartHandler(e) {
      _target = e.target;
      _xStart = e.touches[0].clientX;
      _yStart = e.touches[0].clientY;
    }

    function touchMoveHandler(e) {
      _xEnd = e.touches[0].clientX;
      _yEnd = e.touches[0].clientY;
    }

    function touchEndHandler(e) {
      if (_xStart && _yStart && _xEnd && _yEnd) {
        var h = Math.abs(_xStart - _xEnd);
        var v = Math.abs(_yStart - _yEnd);
        var d = 30;
        if (h > d) { //horizontal
          var swipeEventString = (_xStart < _xEnd) ? 'swipeRight' : 'swipeLeft';
          triggerEvent(swipeEventString, _target);
        }
        if (v > d) { //vertical
          var swipeEventString = (_yStart > _yEnd) ? 'swipeUp' : 'swipeDown';
          triggerEvent(swipeEventString, _target);
        }
        if (h > d || v > d){
          triggerEvent('swipe', _target);
        }
      };
      init();
    }
  }

  function listen(event, handler, elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener(event, handler);
    }
  }

  function stopListen(event, handler, elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeEventListener(event, handler);
    }
  }

  function triggerEvent(eventString, elements) {
    var event = new Event(eventString);
    if (elements.constructor !== Array) {
      elements.dispatchEvent(event);
    } else {
      for (var i = 0; i < elements.length; i++) {
        elements[i].dispatchEvent(event);
      }
    }
  }

  //export
  window[exportName] = SwipeIt;

})(window, document, 'SwipeIt');
