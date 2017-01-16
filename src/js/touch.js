/* ---------------------------------------------------------------------- *\
	TOUCH
	The 'View more' buttons appear on hover over the project headers. 
	As this doesn't work on touch devices, they appear on scroll. Only if 
	the headers are in the middle of the screen.
\* ---------------------------------------------------------------------- */

// Detect touchpoints of device in order to check if it's a Touchdevice
function isTouch() {
 return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}
 
// if (isTouch()) {
 	// alert('this is a touch device');
    window.addEventListener('scroll', showButtonsOnScroll);
// }

