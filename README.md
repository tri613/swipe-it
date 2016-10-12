#Swipe-it

An event listener for swiping gestures with pure javascript only, no dependency needed.  
~~Touch devices only.~~
**Also supports mouse now!** -- 2016/09/23

Here's a simple plunker demo:  
https://plnkr.co/edit/FqCGSVcsXL3vFOruUDCL?p=preview

## Usage

 - include `swipe-it.js` or `swipe-it.min.js` into your file.
 - then use it like this:

```js
var mySwipeIt = new SwipeIt('your_element_selector_here');
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
- That's it!


## Events

- swipe (for all directions)
- swipeLeft
- swipeRight
- swipeUp
- swipeDown

**NOTICE**  
Swipe events won't trigger if the distance between start point and end point is less than `30px`.

