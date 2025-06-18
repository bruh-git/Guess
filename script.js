const resetGame = document.getElementById('reset-game');
const container = document.getElementById('balls-container');
// cria as divs para serem coloridas e adiciona classes
function createBall(){
    for (let index = 0; index < 6; index+=1) {
        const elementDiv = document.createElement("div");
        elementDiv.classList.add("ball");
        elementDiv.addEventListener("click", selecionarBall);
        container.appendChild(elementDiv);
    }
}
createBall();
// sorteia as cores 
// https://wallacemaxters.com.br/blog/2021/02/20/como-gerar-cores-aleatorias-no-javascript
function criaCor(){
    const r = parseInt(Math.random()*255);
    const g = parseInt(Math.random()*255);
    const b = parseInt(Math.random()*255);

    return `rgb(${r}, ${g}, ${b})`;
}
const colorRgb = document.getElementById ('rgb-color');
const ballItem = document.querySelectorAll('.ball');

// sorteia o numero rgb de uma das classes para ser a opção certa
function posicaoAleatoria(){
    let resposta = Math.floor(Math.random() * 6);
    return resposta
}
// gera a cor e coloca o rgb dessa cor no paragrafo para ser sorteada

function corBallsAleatoria(){
    for (let i = 0; i < ballItem.length; i += 1) {
        ballItem[i].style.backgroundColor = criaCor();
    }
    let acertou = posicaoAleatoria();
    colorRgb.innerText = ballItem[acertou].style.backgroundColor;   
}
corBallsAleatoria()

const Elementanswer = document.getElementById('answer');
const scoreElement = document.getElementById('score');

// placar
let contador = 0;
scoreElement.innerText = "Pontos: " + contador;


// verifica se a cor que voce escolhe é a mesma da cor gerada automaticamente
function selecionarBall(event) {
    event.target.classList.add('selected');
    if (event.target.style.backgroundColor === colorRgb.innerText) {
        Elementanswer.innerText = 'Acertou!'
        scoreElement.innerText = "Pontos: " + (contador +=3);
    } else {
        Elementanswer.innerText = 'Errou! Tente novamente!'
    }
}
// reseta o jogo assim que clicar no botão e sem perder os pontos do placar 
resetGame.addEventListener("click", reseta)

function reseta(){
    corBallsAleatoria();
    // document.querySelector('.selected').classList.remove('selected'); retirei pois não estava passando o requesito 6
    Elementanswer.innerText = 'Escolha uma cor';
    // location.reload(); retirei pois não passava o requesito 7, zera o placar
}
const resetPlacar = document.getElementById("zerar");
resetPlacar.addEventListener("click",function(){
    location.reload();
})