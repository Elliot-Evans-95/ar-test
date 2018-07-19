import Engine from './Managers/Engine';

class Main {
    constructor(engine) {
        engine.start();
        document.getElementsByName('updateColor').forEach((button) => {
            button.addEventListener('click', function (event) {
                engine.changeColor('torus', parseInt(event.target.value, 16));
            });
        });

        document.getElementsByName('updateColor').forEach((button) => {
            button.addEventListener('click', function (event) {
                engine.changeColor('cube', parseInt(event.target.value, 16));
            });
        });

        document.getElementsByName('updateShape').forEach((button) => {
            button.addEventListener('click', function (event) {
                engine.changeObject(event.target.value);
            });
        });

        document.getElementsByName('scaleShape').forEach((button) => {
            button.addEventListener('click', function (event) {
                engine.changeObject(event.target.value);
            });
        });

        document.getElementById('removeShape').addEventListener('click', (event) => {
            engine.removeObject();
        });
    }
}

new Main(new Engine());