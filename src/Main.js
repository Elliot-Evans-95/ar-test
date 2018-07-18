import Engine from './Managers/Engine';

class Main {
    constructor(engine) {
        this.engine = engine;
        this.engine.start();
        document.getElementsByName('updateColor').forEach((button) => {
            button.addEventListener('click', function (event) {
                engine.changeColor('torus', parseInt(event.target.value, 16));
            });
        });
    }
}

new Main(new Engine());