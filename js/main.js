var html = document.GetElementsByTagName('html');
alert(html);
(function() {

    var button = document.querySelector('.menu-toggle');

    var menu = document.querySelector('.menu-mobile');

    button.addEventListener('click', function() {
        // alert('button is clicked!');
        menu.classList.toggle('menu-closed');
        menu.classList.toggle('menu-open');
        button.classList.toggle('clicked');

    });
})();
