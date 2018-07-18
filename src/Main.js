import Engine from './Managers/Engine';

const engine = new Engine();
engine.start();

document.getElementsByName('updateColor').forEach((button) => {
    button.addEventListener('click', function (event) {
        engine.changeColor('torus', parseInt(event.target.value, 16));
    });
});
