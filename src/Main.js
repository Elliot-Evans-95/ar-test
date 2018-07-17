import Engine from './Managers/Engine';

const engine = new Engine();
engine.start();


document.getElementsByName('updateColor').forEach((button) => {
    button.addEventListener('click', function (event) {
        engine.changeColor('torus', event.target.value);
    });
});
