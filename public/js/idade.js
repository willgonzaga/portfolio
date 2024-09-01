var now = new Date();
var nascimento = new Date('2006/07/23');
var idade = now.getFullYear() - nascimento.getUTCFullYear();
var mes = now.getMonth() - nascimento.getMonth();

if (mes < 0 || (mes === 0 && now.getDate() < nascimento.getDate())) {
    idade--;
}
document.write(idade);