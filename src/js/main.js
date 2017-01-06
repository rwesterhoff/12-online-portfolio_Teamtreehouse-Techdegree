// Inject class for progressive enhancement if Javascript is loaded
var html = document.getElementsByTagName( 'html' )[0];
html.className = 'js';

// Prepare menu nav and menu to inject HTML
var menu = document.getElementById('menu'),
    nav = document.getElementById('nav-prim');

// Add the toggle to the nav element
function addToggle(element) {
    // Prepare container and html for injection
    var container = document.createElement('button'),
        html = '';
    // Add html to be injected in container
    html += '<svg version="1.1" class="hamburger-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"';
     html += 'viewBox="0 0 24 20" style="enable-background:new 0 0 24 20;" xml:space="preserve">';
html += '<style type="text/css">';
  html +=   '.st0{fill:none;stroke:#FFFFFF;stroke-width:4;stroke-linecap:square;}';
html += '</style>';
html += '<path id="hamburger-icon-line_2_" class="st0" d="M2,2h20"/>';
html += '<path id="hamburger-icon-line_1_" class="st0" d="M2,10h20"/>';
html += '<path id="hamburger-icon-line" class="st0" d="M2,18h20"/>';
html += '</svg>';
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
};

addToggle(nav);
toggleMenu();

// Add the buttons to the projects to show the descriptions (progressive enhancement)
function addButtons() {
    var projects = document.querySelectorAll('#projects .project-header .content'),
        length = projects.length;

    // For each project
    for (var i = 0; i < length; i++) {

        var project = projects[i]
        button = document.createElement('button'),
            text = document.createTextNode('View more');

        button.appendChild(text);
        button.classList = 'button-cta-oncolor';
        button.setAttribute('data-state', 'hidden');;
        // Add a btn
        project.appendChild(button);
    }
}

addButtons();
