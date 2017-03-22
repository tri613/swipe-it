(function(window, document, exportName) {

  let _target = false;
  const _window = [window];
  const defaultOptions = {
    'mouseEvent': true,
    'minDistance': 30
  };

  function SwipeIt(selector, options = {}) {
    const _elements = nodeListToArray(document.querySelectorAll(selector));
    let _xStart, _yStart, _xEnd, _yEnd;

    options.mouseEvent = (options.mouseEvent === undefined) ? defaultOptions.mouseEvent : options.mouseEvent;
    options.minDistance = (options.minDistance === undefined) ? defaultOptions.minDistance : options.minDistance;

    init();
    ready();

    this.on = function(swipeEvent, callback) {
      listen(swipeEvent, callback, _elements);
      return this;
    }

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
        const [disH, disV] = [_xStart - _xEnd, _yStart - _yEnd];
        const [h, v] = [disH, disV].map(Math.abs);
        const d = options.minDistance;
        if (h > d) { //horizontal
          const swipeEventString = (_xStart < _xEnd) ? 'swipeRight' : 'swipeLeft';
          triggerEvent(swipeEventString, _target, { 
            distance: disH,
            start: _xStart,
            end: _xEnd
          });
        }
        if (v > d) { //vertical
          const swipeEventString = (_yStart > _yEnd) ? 'swipeUp' : 'swipeDown';
          triggerEvent(swipeEventString, _target, { 
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
    toArray(elements).forEach(element => element.addEventListener(event, handler));
  }

  function stopListen(event, handler, elements) {
    toArray(elements).forEach(element => element.removeEventListener(event, handler));
  }

  function triggerEvent(eventString, elements, extraParams = {}) {
    const event = document.createEvent('Event');
    event.initEvent(eventString, true, true);
    event.swipe = extraParams;
    toArray(elements).forEach(element => element.dispatchEvent(event));
  }

  function nodeListToArray(nodes) {
    const nodesArray = [];
    for (let i = 0; i < nodes.length; i++) {
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
