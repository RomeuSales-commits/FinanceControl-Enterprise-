class FinanceControl {
constructor() {
this.contas = JSON.parse(localStorage.getItem('contas')) || [];
this.saidasFixas = 5000;
this.init();
}

init() {
this.bindEvents();
this.render();
}

bindEvents() {
document.querySelectorAll('[data-tab]').forEach(btn => {
btn.addEventListener('click', (e) => {
this.changeTab(e.target.dataset.tab);
});
});

document.getElementById('menuToggle')
.addEventListener('click', () => {
document.getElementById('sidebar').classList.toggle('active');
});

document.getElementById('btnAdicionar')
.addEventListener('click', () => this.adicionarConta());

document.getElementById('modoClaro')
.addEventListener('click', () => document.body.classList.remove('dark'));

document.getElementById('modoEscuro')
.addEventListener('click', () => document.body.classList.add('dark'));

document.getElementById('fonteMenor')
.addEventListener('click', () => document.body.style.fontSize = "14px");

document.getElementById('fontePadrao')
.addEventListener('click', () => document.body.style.fontSize = "16px");

document.getElementById('fonteMaior')
.addEventListener('click', () => document.body.style.fontSize = "20px");
}

changeTab(tabId) {
document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
document.getElementById(tabId).classList.add('active');
}

adicionarConta() {
const cliente = document.getElementById("cliente").value;
const valor = parseFloat(document.getElementById("valor").value);
const vencimento = document.getElementById("vencimento").value;

if (!cliente || !valor || !vencimento) return alert("Preencha todos os campos");

this.contas.push({ cliente, valor, vencimento });
localStorage.setItem('contas', JSON.stringify(this.contas));
this.render();
}

render() {
const total = this.contas.reduce((s, c) => s + c.valor, 0);

document.getElementById("totalReceber").innerText = total;
document.getElementById("entradas").innerText = total;
document.getElementById("saldo").innerText = total - this.saidasFixas;

const hoje = new Date();
const lista = document.getElementById("listaInadimplentes");
lista.innerHTML = "";
let totalInad = 0;

this.contas.forEach(conta => {
if (new Date(conta.vencimento) < hoje) {
const li = document.createElement("li");
li.innerText = `${conta.cliente} - R$ ${conta.valor}`;
lista.appendChild(li);
totalInad++;
}
});

document.getElementById("totalInadimplentes").innerText = totalInad;

const listaContas = document.getElementById("listaContas");
listaContas.innerHTML = "";
this.contas.forEach(conta => {
const li = document.createElement("li");
li.innerText = `${conta.cliente} - R$ ${conta.valor}`;
listaContas.appendChild(li);
});
}
}

document.addEventListener("DOMContentLoaded", () => {
new FinanceControl();
});
