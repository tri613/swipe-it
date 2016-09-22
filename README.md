#Swipe-it

An Event listener for swiping gestures with pure javascript only, no dependency needed.


## Usage

 - include `swipe-it.js` into your file.
 - then use it like this:

```js
var mySwipeIt = new SwipeIt('#your_element_selector_here');
mySwipeIt
.on('swipeLeft',function(e){
	//your handler here
	console.log('mySwipeIt is on swipeLeft!');
})
.on('swipeRight',function(e){
	//your handler here
	console.log('mySwipeIt is on swipeRight!');
});
```
- Bang!



## Events

- swipeLeft
- swipeRight
- swipeUp
- swipeDown

**NOTICE:**
Swipe events won't trigger if the distance between start point and end point is less than `30px`.
