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
