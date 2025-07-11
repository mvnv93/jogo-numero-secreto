let listaNuemeroSoreados = [];
let numeroLimite = 10;
let numeroSecreto = geraNumeroAleatorio();
let tentativas = 1;
// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Informe um número entre 1 e 10';

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do número secreto');
    exibirTextoNaTela('p','Informe um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    // console.log(chute == numeroSecreto);
    if (chute == numeroSecreto){
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('h1','Acertou!');
        exibirTextoNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        chute > numeroSecreto ? exibirTextoNaTela('p','O número secreto é menor!') : exibirTextoNaTela('p','O número secreto é maior!');
        tentativas++;
        limparCampo();
    }
}

function geraNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = listaNuemeroSoreados.length;

    if(quantidadeElementosLista == numeroLimite){
        listaNuemeroSoreados = [];
    }

    if(listaNuemeroSoreados.includes(numeroEscolhido)){
        return geraNumeroAleatorio(); 
    } else {
        listaNuemeroSoreados.push(numeroEscolhido); // listaNuemeroSoreados.pop exlui o último registro
        console.log(listaNuemeroSoreados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = geraNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}