var typed = new Typed('.type-h2', {
    strings: ['&#60;&#47;' +'Willey Gonzaga de Oliveira' + '&#62;'],
    typeSpeed: 30,
});

var typed2 = new Typed('.type-p1', {
    strings: ['Sou um <b>Desenvolvedor Iniciante</b>!'],
    typeSpeed: 20,
    startDelay: 1500,
    showCursor: true,
});

var typed2 = new Typed('.type-p2', {
    strings: ['Trabalho principalmente com <b>Back-End</b> utilizando <b>Nodejs</b>.'],
    typeSpeed: 20,
    startDelay: 2700,
    showCursor: true,
});

var infos = document.getElementById("type-p1");
var infos2 = document.getElementById("type-p2");

infos.classList.add('invisivel');
infos2.classList.add('invisivel');

setTimeout(() => {
    infos.classList.remove('invisivel');
}, 1500);

setTimeout(() => {
    infos2.classList.remove('invisivel');
}, 2700);