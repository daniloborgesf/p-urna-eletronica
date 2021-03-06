// CONTROLE DE INTERFACE
let seuVotoPara = document.querySelector(".divisao--1-1 span");
let cargo = document.querySelector(".divisao--1-2 span");
let descricao = document.querySelector(".divisao--1-4");
let aviso = document.querySelector(".divisao--2");
let lateral = document.querySelector(".divisao--1-direita");
let numeros = document.querySelector(".divisao--1-3");
// CONTROLE DE AMBIENTE
let etapaAtual = 0;
let numero = "";
let votoBranco = false;
let votos = [];

// CONTROLE DE FUNÇÕES
function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let numeroHTML = "";
    numero = "";

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHTML += '<div class="numero pisca"></div>';
        } else {
            numeroHTML += '<div class="numero"></div>';
        }
    }
    seuVotoPara.style.display = "none";
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = "";
    aviso.style.display = "none"
    lateral.innerHTML = "";
    numeros.innerHTML = numeroHTML;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });

    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = "block";
        aviso.style.display = "block";
        descricao.innerHTML = `Nome: ${candidato.nome} <br> Partido: ${candidato.partido}`;

        let fotosHTML = "";

        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHTML += `<div class='divisao--1-imagem pequena'> <img src='images/${candidato.fotos[i].url}' alt='imagem-prefeito'>${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHTML += `<div class='divisao--1-imagem'> <img src='images/${candidato.fotos[i].url}' alt='imagem-prefeito'>${candidato.fotos[i].legenda}</div>`;
            }
        }
        lateral.innerHTML = fotosHTML;
    } else {
        seuVotoPara.style.display = "block";
        aviso.style.display = "block";
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
    }
}

function clicou(n) {
    let elementoNumero = document.querySelector(".numero.pisca");
    if (elementoNumero !== null) {
        elementoNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elementoNumero.classList.remove("pisca");
        if (elementoNumero.nextElementSibling !== null) {
            elementoNumero.nextElementSibling.classList.add("pisca");
        } else {
            atualizaInterface();
        }
    }
}

function branco() {
    numero = "";
    votoBranco = true;

    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    numeros.innerHTML = "";
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'
    lateral.innerHTML = "";
}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = true;

    if (votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: "branco"
        })
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }

    if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector(".tela").innerHTML = '<div class="aviso--fim pisca">FIM</div>'
            console.log(votos);
        }
    }
}
//
comecarEtapa();

