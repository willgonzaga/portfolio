var typed = new Typed('.type-h2', {
    strings: ['&#60;&#47;' + 'Willey Gonzaga de Oliveira' + '&#62;'],
    typeSpeed: 30,
});

var typed2 = new Typed('.type-p1', {
    strings: ['Sou um <b>Desenvolvedor de Software</b>!'],
    typeSpeed: 25,
    startDelay: 1500,
    showCursor: true,
});

var infos = document.getElementById("type-p1");

infos.classList.add('invisivel');

setTimeout(() => {
    infos.classList.remove('invisivel');
}, 1500);