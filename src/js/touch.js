// Detect touchpoints of device in order to check if it's a Touchdevice
function isTouch() {
 return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}
 
if (isTouch()) {
 // alert('this is a touch device');
} else {
	 // alert('this is NO touch device');
 }
