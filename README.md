#Swipe-it

An event listener for swiping gestures with pure javascript only, no dependency needed.  
~~Touch devices only.~~
**Also supports mouse now!** -- 2016/09/23

:warning: 2016/11/23

I decided to use the word `listen` instead since jQuery has an API named `on`,  
and that's the only different thing in the new version v1.3.0,   
other parts still work the same.

Here's a simple plunker demo:  
https://plnkr.co/edit/FqCGSVcsXL3vFOruUDCL?p=preview

## Usage

 - include `dist/swipe-it.js` or `dist/swipe-it.min.js` into your file.
 - then use it like this:

```js
var mySwipeIt = new SwipeIt('your_element_selector_here');
mySwipeIt
.listen('swipeLeft',function(e){
	//your handler here
	console.log('mySwipeIt is on swipeLeft!');
})
.listen('swipeRight',function(e){
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

