/**
 * @jest-environment jsdom
 */

beforeEach(() => {
  // O HTML aqui agora é um espelho do seu index.html real
  document.body.innerHTML = `
    <section id="balls-container"></section>
    <p id="rgb-color"></p>
    <p id="answer"></p>
    <p id="score"></p>
    <button id="reset-game"></button>
    <button id="zerar"></button> `;
});

describe('Jogo Color Guess', () => {
  let script;

  beforeEach(() => {
    // Limpa o cache do require para importar o script novamente a cada teste
    jest.resetModules();
    script = require('../script.js');
  });

  test('createBall adiciona bolas ao container', () => {
    const container = document.getElementById('balls-container');
    expect(container.children.length).toBeGreaterThan(0);
    // Verifica se as bolas têm a classe correta
    Array.from(container.children).forEach((el) => {
      expect(el.classList.contains('ball')).toBe(true);
    });
  });

  test('corBallsAleatoria atribui cores diferentes às bolas', () => {
    if (script.corBallsAleatoria) {
      script.corBallsAleatoria();
      const balls = document.querySelectorAll('.ball');
      const cores = Array.from(balls).map((b) => b.style.backgroundColor);
      // Deve haver pelo menos duas cores diferentes
      const coresUnicas = new Set(cores);
      expect(coresUnicas.size).toBeGreaterThan(1);
    }
  });

  test('posicaoAleatoria retorna um índice válido', () => {
    if (script.posicaoAleatoria) {
      const idx = script.posicaoAleatoria();
      const balls = document.querySelectorAll('.ball');
      expect(idx).toBeGreaterThanOrEqual(0);
      expect(idx).toBeLessThan(balls.length);
    }
  });

  test('selecionarBall mostra resposta correta ou errada', () => {
    // Simula o clique em uma bola
    const balls = document.querySelectorAll('.ball');
    if (balls.length > 0 && script.selecionarBall) {
      balls[0].click();
      const answer = document.getElementById('answer').textContent;
      expect(['Acertou!', 'Errou! Tente novamente!']).toContain(answer);
    }
  });

  test('reseta reinicia o jogo', () => {
    if (script.reseta) {
      script.reseta();
      const answer = document.getElementById('answer').textContent;
      expect(answer).toBe('Escolha uma cor');
    }
  });
});