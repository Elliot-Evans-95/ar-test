import Engine from './Managers/Engine';

const engine = new Engine();
engine.start();


document.getElementById('updateColor').addEventListener('click', function () {
    engine.changeColor('torus');
});
