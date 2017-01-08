// Inject class for progressive enhancement if Javascript is loaded
var html = document.getElementsByTagName( 'html' )[0];
html.className = 'js';

function isTouch() {
 return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}
 
if (isTouch()) {
 // alert('this is a touch device');
} else {
	 // alert('this is NO touch device');
 }

// Prepare buttons
var btnClass = 'button-cta-oncolor',
    // And descriptions
    descriptions = document.getElementsByClassName('project-desc');

// Initially hide all descriptions
function hideAllDescriptions() {
    var length = descriptions.length;
    for (var i = 0; i < length; i++) {
        descriptions[i].setAttribute('data-state', 'hidden');
    }
}
// Add the buttons to the projects to show the descriptions (progressive enhancement)
function addButtons() {
    var projects = document.querySelectorAll('#projects .project-header .content'),
        length = projects.length;

    // For each project
    for (var i = 0; i < length; i++) {

        var project = projects[i],
            button = document.createElement('button'),
            text = document.createTextNode('View more');

        button.appendChild(text);
        button.classList = btnClass;
        button.setAttribute('data-state', 'hidden');
        // Add a btn
        project.appendChild(button);
    }
}

function showDescription() {
    var parent = this.parentElement.parentElement.parentElement,
        descriptionId = parent.getElementsByClassName('project-desc')[0].id,
        description = document.getElementById(descriptionId);
    hideAllDescriptions();
    description.setAttribute('data-state', 'visible');
}

function enableClickButton() {
    var buttons = document.getElementsByClassName(btnClass),
        length = buttons.length;
    for (var i = 0; i < length; i++) {

        buttons[i].addEventListener('click', showDescription);
    }
}

hideAllDescriptions();
addButtons();
enableClickButton();

// Prepare menu nav and menu to inject HTML
var menu = document.getElementById('menu'),
    nav = document.getElementById('nav-prim');

// Add the toggle to the nav element
function addToggle(element) {
    // Prepare container and html for injection
    var container = document.createElement('button'),
        html = '';

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

addToggle(nav);
toggleMenu();
