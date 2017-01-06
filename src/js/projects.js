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
