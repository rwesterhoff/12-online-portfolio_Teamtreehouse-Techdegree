// Add the buttons to the projects to show the descriptions (progressive enhancement)
function addButtons() {
    var projects = document.querySelectorAll('#projects .project-header .content'),
        length = projects.length,
        index = 0,
        project = projects[index],
        button = document.createElement('button'),
        text = document.createTextNode('View more');

    button.appendChild(text);
    button.classList = 'button-cta-oncolor';
    button.setAttribute('data-state', 'hidden');

    // For each project
    for (index; index < length; index++) {
        // Add a btn
        project.appendChild(button);
    }
}

addButtons();
