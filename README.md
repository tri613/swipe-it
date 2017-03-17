# Swipe-it

An event listener for swiping gestures with pure javascript only, no dependency needed.
~~Touch devices only.~~
**Also supports mouse now!** -- 2016/09/23

:warning: 2017/03/17

I found out it's much simple and forward to use `on` instead of `listen`,
so I changed it back.
(Very annoying, I know)

Here's a simple plunker demo:
https://plnkr.co/edit/FqCGSVcsXL3vFOruUDCL?p=preview

## Usage

 - include `dist/swipe-it.js` or `dist/swipe-it.min.js` into your file.
 - then use it like this:

```js
const mySwipeIt = new SwipeIt('your_element_selector_here' [,options]);
mySwipeIt.on('swipeLeft', function(event) {
	const swipeDistance = event.detail.distance; //the swipe distance (px)
	console.log(`mySwipeIt is on swipeLeft with ${swipeDistance} px!`);
}).on('swipeRight', function(event) {
	console.log('mySwipeIt is on swipeRight!');
});
```
- That's it!

## Options
Type: Object

- `mouseEvent` [boolean] | `true`

    Whether using mouse event or not.

-  `minDistance` [int] | `30` (px)

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

Every swipe event object (except `swipe`) contains a swipe distance data in `event.detail.distance`.

## Bugfix
- 2017/03/17: Swipe events are now dispatched to it's listener instead of `event.target`.
