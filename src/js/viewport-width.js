/* ---------------------------------------------------------------------- *\
    VIEWPORT WIDTH
    This check is needed for moving around the project 
    descriptions in the DOM. If the screen is a 2 or 3 column grid, 
    the desciptions need to appear below all project headers of the row.
\* ---------------------------------------------------------------------- */

// Prepare breakpoints
var small = 320,
    medium = 768,
    large = 1024,
    xlarge = 1440,
    viewportWidth,
    bkpSmall,
    bkpMedium,
    bkpLarge,
    bkpXlarge;

// Check what the breakpoint currently is 
function checkBkp(size) {
    // Set breakpoint
    if (size < medium) {
        console.log('small: ' + size);
        bkpSmall = true;
        bkpMedium = false;
        bkpLarge = false;
        bkpXlarge = false;
    } else if (size > medium && size < large) {
        console.log('medium: ' + size);
        bkpSmall = false;
        bkpMedium = true;
        bkpLarge = false;
        bkpXlarge = false;
    } else if (size > large && size < xlarge) {
        console.log('large: ' + size);
        bkpSmall = false;
        bkpMedium = false;
        bkpLarge = true;
        bkpXlarge = false;
    } else if (size > xlarge) {
        console.log('xlarge: ' + size);
        bkpSmall = false;
        bkpMedium = false;
        bkpLarge = false;
        bkpXlarge = true;
    }
    // Get projectdescriptions at the right position in the DOM
    moveDescriptions();
}

// Crossbrowser check for window size
function checkViewportSize() {
    if (typeof(window.innerWidth) == 'number') {
        viewportWidth = window.innerWidth;
    } else {
        if (document.documentElement && (document.documentElement.clientWidth)) {
            viewportWidth = document.documentElement.clientWidth;
        } else {
            if (document.body && (document.body.clientWidth)) {
                viewportWidth = document.body.clientWidth;
            }
        }
    }
    // Send width to check for breakpoints
    checkBkp(viewportWidth);
}

// Listen to resizing the window
window.addEventListener('load', checkViewportSize);
window.addEventListener('resize', checkViewportSize);

