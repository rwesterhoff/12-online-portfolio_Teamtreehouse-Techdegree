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
