// Prepare buttons
var btnClass = 'button-cta-oncolor';

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
        button.setAttribute('data-state', 'hidden');;
        // Add a btn
        project.appendChild(button);
    }
}

function clickButton() {
    var buttons = document.getElementsByClassName(btnClass),
        length = buttons.length;
    console.log(buttons);
    for (var i = 0; i < length; i++) {

        var button = buttons[i];
// console.log(button);
        button.addEventListener('click', function() {
            console('click');
        });
    }
}

addButtons();
clickButton();
dg.nbxkj.nb;fjn 