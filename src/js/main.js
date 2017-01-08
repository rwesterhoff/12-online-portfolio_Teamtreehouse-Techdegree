// Inject class for progressive enhancement if Javascript is loaded
var html = document.getElementsByTagName( 'html' )[0];
// Set class
html.className = 'js';

// Detect touchpoints of device in order to check if it's a Touchdevice
function isTouch() {
 return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}
 
if (isTouch()) {
 // alert('this is a touch device');
} else {
	 // alert('this is NO touch device');
 }

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

// Prepare buttonclass
var btnClass = 'button-cta-oncolor',
    // Prepare projects
    projects = document.querySelectorAll('#projects .project-header .content'),
    // And descriptions
    descriptions = document.getElementsByClassName('project-desc'),
    // Set amount of descriptions
    totalDesc = descriptions.length,
    // Set amount of projects
    totalProj = projects.length;

// Initially hide all descriptions
function hideAllDescriptions() {

    for (var i = 0; i < totalDesc; i++) {
        // Prepare single description
        var description = descriptions[i];
        // Hide each description
        description.setAttribute('data-state', 'hidden');
    }
}

// Add the buttons to the projects to show the descriptions (progressive enhancement)
function addButtons() {

    // For each project
    for (var i = 0; i < totalProj; i++) {
        // Prepare single project
        var project = projects[i],
            // Prepare a single button
            button = document.createElement('button'),
            // Prepare the button text
            text = document.createTextNode('View more');

        // Add text to button
        button.appendChild(text);
        // Add class to button
        button.classList = btnClass;
        // Hide each button
        button.setAttribute('data-state', 'hidden');
        // Add a btn
        project.appendChild(button);
    }
}

function enableClickButton() {
    // Prepare all buttons
    var buttons = document.getElementsByClassName(btnClass),
        // Set length
        length = buttons.length;

    for (var i = 0; i < length; i++) {
        // Prepare single button
        var button = buttons[i];
        // Enable button to get a click event
        button.addEventListener('click', showDescription);
    }
}

function showDescription() {
    // Prepare parent 
    var parent = this.parentElement.parentElement.parentElement,
        // Get id of description
        descriptionId = parent.getElementsByClassName('project-desc')[0].id,
        // Get description
        description = document.getElementById(descriptionId);
    // First hide all
    hideAllDescriptions();
    // Than show correct one
    description.setAttribute('data-state', 'visible');
}

function moveDescriptions() {
    // Check breakpoints
    if (bkpSmall) {
        console.log('put every desc inside project');
        for (i = 0; i < totalDesc; i++) {
            // Prepare single description
            var description = document.getElementById('project-desc-' + [i]),
                project = document.getElementById('project-' + [i]);

            // Copy each description 
            // var clone = description.cloneNode;

            // remove old
            // project.removeChild(description);
            
            // insert inside index
            console.log(description);
            console.log(project);

        }
    }

    if (bkpMedium) {
        console.log('put each 2 descs after even (2,4,6...) project');
        // Check amount of desc
        // copy each description 
        // check if index is < 2
        // if yes 
        // insert after project 2
        // else if index < 2 + 2
        // insert after project 4
        // etc...
        // remove old
    }

    if (bkpLarge || bkpXlarge) {
        console.log('put each 3 descs after third (3,6...) project');
        // Check amount of desc
        // copy each description 
        // check if index is < 3
        // if yes 
        // insert after project 3
        // else if index < 3 + 3
        // insert after project 6
        // etc...
        // remove old
    }
}

// Initially:
hideAllDescriptions();
addButtons();
enableClickButton();

// Prepare primary nav and menu to inject HTML
var menu = document.getElementById('menu'),
    nav = document.getElementById('nav-prim');

// Add the toggle to the nav element
function addToggle(element) {
    // Prepare container and html for injection
    var container = document.createElement('button'),
        html = '';

    // Populate the html with the correct elements
    html += '<div class="hamburger-icon">';
    html += '<div class="hamburger-icon-line"></div>';
    html += '<div class="hamburger-icon-line"></div>';
    html += '<div class="hamburger-icon-line"></div>';
    html += '</div>';
    // Inject html into container
    container.innerHTML = html;
    // Inject container before menu
    element.insertBefore(container, menu);
    // Give the container a class to be able to toggle visibility
    container.classList = 'menu-toggle';
}

// Toggle the menu class for visibility
function toggleMenu() {
    // Prepare the button for toggling
    var button = document.querySelector('.menu-toggle');
    // Add a class to hide the menu
    menu.className += ' menu-closed';
    // Enable toggling the menu
    button.addEventListener('click', function() {
        menu.classList.toggle('menu-closed');
        menu.classList.toggle('menu-open');
        // Change appearance of the toggle button when clicked
        button.classList.toggle('clicked');
    });
}

// Initially:
addToggle(nav);
toggleMenu();
