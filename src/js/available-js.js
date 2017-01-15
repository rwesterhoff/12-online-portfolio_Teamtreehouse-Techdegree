/* ---------------------------------------------------------------------- *\
	AVAILABLE JS
	Inject class for progressive enhancement if Javascript is loaded. 
	Because a lot is not working properly in iOS, I only do this if it's NOT
	a iOS device. I consider this being part of the progressive enhancement.
\* ---------------------------------------------------------------------- */

// Prepare html
var html = document.getElementsByTagName('html')[0];
// Prepare iOS sniffing
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
// Set class if device is NOT iOS
if (!iOS) {
    html.className = 'js';
}

