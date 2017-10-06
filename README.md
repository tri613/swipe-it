# Swipe-it

An event listener for swiping gestures with pure javascript only, no dependency needed.
~~Touch devices only.~~

**Also supports mouse now!** -- 2016/09/23

Here's a simple plunker demo:
https://plnkr.co/edit/FqCGSVcsXL3vFOruUDCL?p=preview

## Usage

 - include `dist/swipe-it.js` or `dist/swipe-it.min.js` into your file.
 - then use it like this:

```js
const mySwipeIt = new SwipeIt('your_element_selector_here' [,options]);

mySwipeIt
.on('swipeLeft', function(event) {
    // your event handler here
    const swipeStartPoint = event.swipe.start;
    const swipeEndPoint = event.swipe.end;
    const swipeDistance = event.swipe.distance; //the swipe distance (px)
    console.log(`mySwipeIt is on swipeLeft with ${swipeDistance} px!`);
})
.on('swipeRight', function(event) {
    // your event handler here
    console.log('mySwipeIt is on swipeRight!');
});
```
- That's it!

## Options [object]
All options are optionable.

- **mouseEvent** [boolean] | `true`

    Whether using mouse event or not.

- **minDistance** [int] | `30`

    The minimal distance (px) between the start point and end point for triggering swipe events.

### example
```js
const swipeWithOptions = new SwipeIt('#with-options', {
    mouseEvent: false,
    minDistance: 50
});
```

## Events
- swipe (for all directions)
- swipeLeft
- swipeRight
- swipeUp
- swipeDown

### Extra event data
Every swipe event (except `swipe`) contains a swipe data object which could be access by `event.swipe`.

- `event.swipe.distance`

	The distance between the start point and end point

- `event.swipe.start`

	The start point position. For vertical swipe events, this would be the `event.clientY` value;
	for horizontal swipe events, this would be the `event.clientX` value of the start point.

- `event.swipe.end`

	Just like `event.swipe.start` instead of this is the end point position.

## Bugfix
- 2017/03/17: Swipe events are now dispatched to it's listener instead of `event.target`.
- 2017/03/22: Add support to IE11.
