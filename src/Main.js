import Engine from './Managers/Engine';

class Main {
    constructor(engine) {
        engine.start();
        document.getElementsByName('updateColor').forEach((button) => {
            button.addEventListener('click', function (event) {
                engine.changeColor('shape', parseInt(event.target.value, 16));
            });
        });

        document.getElementById('updateShape').addEventListener('click', () => {
            engine.changeObject();
        })
    }
}

new Main(new Engine());