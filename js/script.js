const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const pulo = 0;
const gameOver = 1;
const trilhaSonora = document.querySelector('#trilha');
const btnReinicia = document.querySelector('#btnReinicia');
const divReinicia = document.querySelector('.div-game-over');
const btnComeca = document.querySelector('#btnComeca');
const divComeco = document.querySelector('.div-comeco');
const marioInicio = document.querySelector('.mario-inicio');


const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500)
    playSound(pulo)
}


const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const cloudsPosition = clouds.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = ('./img/game-over.png');
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        clouds.style.animation = 'none';
        clouds.style.left = `${cloudsPosition}px`;

        playSound(gameOver)
        divReinicia.style.display = 'flex'

        trilhaSonora.pause();
        clearInterval(loop);
        pipePosition = 121;
        marioPosition = 81;
    }
}, 10);

document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        jump()
    }
})

btnReinicia.addEventListener('click', () => {
    trilhaSonora.currentTime = 0;
    trilhaSonora.play();
    divReinicia.style.display = 'none';
    loop()

    mario.src = ('./img/mario.gif');
    mario.style.position = 'absolute';
    mario.style.width = '150px';
    mario.style.bottom = '0';
})

function playSound(soundType) {
    var sound = document.createElement('audio')
    sound.preload = 'auto'
    sound.autoplay = 'true'
    sound.currentTime = 0.5
    var source = document.createElement('source')
    sound.appendChild(source);

    if (soundType === pulo) {
        source.src = './song/jump.mp3'
    } else {
        source.src = './song/game-over.mp3'
    }
    source.addEventListener('canplaythrough', function () {
        source.play
    }, false)
}

btnComeca.addEventListener('click', () => {
    divComeco.style.display = 'none';
    trilhaSonora.currentTime = 0;
    trilhaSonora.play();

    mario.style.display = 'flex';
    marioInicio.style.display = 'none';

    pipe.style.animation = 'pipe-animation 2s infinite linear';

    clouds.style.animation = 'clouds-animation 20s infinite linear';
})