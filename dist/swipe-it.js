/*===========================
  Swipe-it v1.4.1
  An event listener for swiping gestures with vanilla js.
  https://github.com/tri613/swipe-it#readme
 
  @Create 2016/09/22
  @Update 2017/08/11
  @Author Trina Lu
  ===========================*/
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

(function (window, document, exportName) {

  var _target = false;
  var _window = [window];
  var defaultOptions = {
    'mouseEvent': true,
    'minDistance': 30
  };

  function SwipeIt(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _elements = nodeListToArray(document.querySelectorAll(selector));
    var _xStart = void 0,
        _yStart = void 0,
        _xEnd = void 0,
        _yEnd = void 0;

    options.mouseEvent = options.mouseEvent === undefined ? defaultOptions.mouseEvent : options.mouseEvent;
    options.minDistance = options.minDistance === undefined ? defaultOptions.minDistance : options.minDistance;

    init();
    ready();

    this.on = function (swipeEvent, callback) {
      listen(swipeEvent, callback, _elements);
      return this;
    };

    function ready() {
      //for touching device
      listen('touchstart', touchStartHandler, _elements);
      listen('touchmove', touchMoveHandler, _elements);
      listen('touchend', touchEndHandler, _elements);
      //for mouse
      if (options.mouseEvent) {
        listen('mousedown', mouseDownHandler, _elements);
      }
    }

    function init() {
      _xStart = false;
      _yStart = false;
      _xEnd = false;
      _yEnd = false;
      _target = false;
    }

    function mouseDownHandler(e) {
      _target = this;
      _xStart = e.clientX;
      _yStart = e.clientY;
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
      _target = this;
      _xStart = e.touches[0].clientX;
      _yStart = e.touches[0].clientY;
    }

    function touchMoveHandler(e) {
      _xEnd = e.touches[0].clientX;
      _yEnd = e.touches[0].clientY;
    }

    function touchEndHandler(e) {
      if (_xStart && _yStart && _xEnd && _yEnd) {
        var disH = _xStart - _xEnd,
            disV = _yStart - _yEnd;

        var _map = [disH, disV].map(Math.abs),
            _map2 = _slicedToArray(_map, 2),
            h = _map2[0],
            v = _map2[1];

        var d = options.minDistance;
        if (h > d) {
          //horizontal
          var swipeEventString = _xStart < _xEnd ? 'swipeRight' : 'swipeLeft';
          triggerEvent(swipeEventString, _target, {
            distance: disH,
            start: _xStart,
            end: _xEnd
          });
        }
        if (v > d) {
          //vertical
          var _swipeEventString = _yStart > _yEnd ? 'swipeUp' : 'swipeDown';
          triggerEvent(_swipeEventString, _target, {
            distance: disV,
            start: _yStart,
            end: _yEnd
          });
        }
        if (h > d || v > d) {
          triggerEvent('swipe', _target);
        }
      };
      init();
    }
  }

  function listen(event, handler, elements) {
    toArray(elements).forEach(function (element) {
      return element.addEventListener(event, handler);
    });
  }

  function stopListen(event, handler, elements) {
    toArray(elements).forEach(function (element) {
      return element.removeEventListener(event, handler);
    });
  }

  function triggerEvent(eventString, elements) {
    var extraParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var event = document.createEvent('Event');
    event.initEvent(eventString, true, true);
    event.swipe = extraParams;
    toArray(elements).forEach(function (element) {
      return element.dispatchEvent(event);
    });
  }

  function nodeListToArray(nodes) {
    var nodesArray = [];
    for (var i = 0; i < nodes.length; i++) {
      nodesArray.push(nodes[i]);
    }
    return nodesArray;
  }

  function toArray(elements) {
    return Array.isArray(elements) ? elements : [elements];
  }

  //export
  window[exportName] = SwipeIt;
})(window, document, 'SwipeIt');