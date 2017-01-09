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
        // Get description
        description = document.getElementById('desc-' + parent.id);
    // First hide all
    hideAllDescriptions();
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

            var stepUp = step + 1;
            console.log('put every desc inside project');
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

// Initially:
hideAllDescriptions();
addButtons();
enableClickButton();
