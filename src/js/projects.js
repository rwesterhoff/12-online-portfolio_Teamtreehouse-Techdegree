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
                projectHeaders[i].classList.remove('clicked');
            }
            // Than show correct one
            description.setAttribute('data-state', 'visible');
            // Make header show as being 'clicked'
            projectHeader.classList.add('clicked');

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

