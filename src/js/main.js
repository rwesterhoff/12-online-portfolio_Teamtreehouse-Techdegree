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
    html.classList.add('js');
}


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
 
if (isTouch()) {
 	// alert('this is a touch device');
    window.addEventListener('scroll', showButtonsOnScroll);
}


/* ---------------------------------------------------------------------- *\
    PROJECTS
    Injecting 'View more' buttons and showing, hiding and moving around
    project descriptions in the DOM. The TweenLite scrollTo Plugin is
    used again for some smooth scrolling.
\* ---------------------------------------------------------------------- */

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
        projectHeader = parent.querySelector('.project-header'),
        projectHeaders = document.querySelectorAll('.project-header'),
        viewPortBodyTop = document.body.scrollTop,
        // Get description
        description = document.getElementById('desc-' + parent.id),
        hideAllShowOne = function() {
            // Remove all 'clicked' states
            for (i = 0; i < projectHeaders.length; i++) {
                // Reset each header
                projectHeaders[i].removeAttribute('data-state', 'clicked');
            }
            // Than show correct one
            description.setAttribute('data-state', 'visible');
            // Make header show as being 'clicked'
            projectHeader.setAttribute('data-state', 'clicked');

        };

    // First hide all
    hideAllDescriptions();
    // Check if project header is in the correct position
    if (viewPortBodyTop !== parent.offsetTop) {
        setTimeout(function() {
            // Scroll to header of clicked project
            TweenLite.to(window, 0.4, {
                scrollTo: parent.offsetTop,
                // And hide all / show clicked description
                onComplete: hideAllShowOne
            });
        }, 200);

    } else {
        setTimeout(function() {
            hideAllShowOne();
        }, 400);
    }
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
            headHeight = projectHeader.clientHeight,
            headTop = projectHeader.offsetTop,
            headCenter = headTop + (headHeight / 2),
            headBottom = headTop + headHeight;

        // Show button on scroll
        if (
            viewPortBodyCenter > headTop && viewPortBodyCenter < headBottom
        ) {
            projectHeader.setAttribute('data-state', 'focus');
        } else {
            projectHeader.setAttribute('data-state', 'blur');

        }
    }
}

// Check if device is NOT iOS
if (!iOS) {
    // Initially:
    hideAllDescriptions();
    addButtons();
    enableClickButton();
}


/* ---------------------------------------------------------------------- *\
    MENU
    Plain and simple hamburger menu with injection of states to 
    change the appearance of the hamburger and for showing and 
    hiding the menu. Other than that a simple GSAP TweenLite scrollTo 
    Plugin is use for some smooth scrolling.
\* ---------------------------------------------------------------------- */

// Prepare primary nav and menu to inject HTML
var menu = document.getElementById('menu'),
    menuItems = menu.getElementsByTagName('a'),
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

function enableMenu() {
    for (i = 0; i < menuItems.length; i++) {
        // alert(menuItems[i].getAttribute('href'));
        menuItems[i].addEventListener('click', goToModule);
    }
}
// Navigate and scroll to clicked item
function goToModule(e) {
    var href = this.getAttribute('href'),
        refModule = document.querySelector(href);

    e.preventDefault();

    // Scroll to start of module
    setTimeout(function() {
        TweenLite.to(window, 0.4, {
            scrollTo: refModule
        });
    }, 200);
}
// Initially:
addToggle(nav);
toggleMenu();
enableMenu();


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

