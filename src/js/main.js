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
    window.addEventListener('scroll', showButtonsOnScroll);
}
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
        projectHeader = parent.getElementsByClassName('project-header'),
        // Get description
        description = document.getElementById('desc-' + parent.id);
    // First hide all
    hideAllDescriptions();
    // window.scrollTo(0, 400);
    console.log(parent.offsetTop);
    window.scrollTo(0, parent.offsetTop);
    // Than show correct one
    description.setAttribute('data-state', 'visible');
}

function moveDescriptions() {
    // Prepare stuff 
    var step,
        // Start counting at 1 (e.g. 'project-1')
        i = 1,
        // Prepare outer container for insertBefore
        projectsContainer = document.getElementById('projects'),
        // Move items according to breakpoints + steps
        moveItems = function() {
            // Add step
            var stepUp = step + 1;

            for (i; i <= totalDesc; i++) {
                // Prepare single description
                var description = document.getElementById('desc-project-' + [i]),
                    // Prepare single project
                    project = document.getElementById('project-' + [i]),
                    // Get the parent
                    parent = description.parentElement,
                    // Copy each description 
                    clone = description.cloneNode(true),
                    // Check if the current items index is dividable by the step
                    checkDivision = i / step,
                    // Set the reference for insertion 
                    reference = document.getElementById('project-' + (stepUp));

                // Remove old
                parent.removeChild(description);

                // check if index is even
                if (Number.isInteger(checkDivision)) {
                    stepUp += step;
                }
                if (step > 1) {
                    projectsContainer.insertBefore(clone, reference);
                } else {
                    project.appendChild(clone);
                }
            }
        };

    // Check breakpoints
    if (bkpSmall) {
        // Set the step for setting the grid
        step = 1;
    } else if (bkpMedium) {
        step = 2;
    } else if (bkpLarge || bkpXlarge) {
        step = 3;
    }
    // And finally move items
    moveItems();
}

function showButtonsOnScroll() {
    var viewPortHeight = window.innerHeight,
        projectHeaders = document.getElementsByClassName('project-header'),
        totalHead = projectHeaders.length,
        viewPortBodyTop = document.body.scrollTop,
        viewPortRootTop = document.documentElement.scrollTop,
        viewPortBodyCenter = document.body.scrollTop + (viewPortHeight / 2),
        viewPortRootCenter = document.documentElement.scrollTop + (viewPortHeight / 2),
        viewPortBodyBottom = viewPortHeight + viewPortBodyTop,
        viewPortRootBottom = viewPortHeight + viewPortRootTop,
        i = 0;

    for (i; i < totalHead; i++) {
        // Prepare each header
        var projectHeader = projectHeaders[i],
            button = projectHeader.querySelector('button'),
            description = projectHeader.querySelector('button'),
            headHeight = projectHeader.clientHeight,
            headTop = projectHeader.offsetTop,
            headCenter = headTop + (headHeight / 2),
            headBottom = headTop + headHeight;
        
        // Show button on scroll
        if (
            viewPortBodyCenter > headTop && viewPortBodyCenter < headBottom 
            ) {
            // console.log('>');
            button.setAttribute('data-state', 'visible');
        } else {
            button.setAttribute('data-state', 'hidden');
        }
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
