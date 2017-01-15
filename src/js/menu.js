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

