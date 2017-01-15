// Inject class for progressive enhancement if Javascript is loaded
var html = document.getElementsByTagName('html')[0];
// Prepare iOS sniffing
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
// Set class if device is NOT iOS
if (!iOS) {
    html.className = 'js';
}
