import * as THREE from 'three';
import {Color} from 'three';

class BasicTorus {

    constructor(name, scene, initialPosition) {
        this.material = new THREE.MeshPhongMaterial({ color: 0xFFA500 });
        this.mesh = this.getTorusMesh(this.material, scene, initialPosition);

        setTimeout(() => {
            this.updateColor();
        }, 2000)
    }

    getTorusMesh(material, scene, initialPosition) {
        const torusProperties = {
            radius: 0.4,
            tube: 0.1,
            radialSegments: 20,
            tubularSegments: 30,
        };
        const geometry = new THREE.TorusGeometry(torusProperties.radius, torusProperties.tube, torusProperties.radialSegments, torusProperties.tubularSegments);
        var torus = new THREE.Mesh(geometry, material);
        torus.position.copy(initialPosition);
        scene.add(torus);
        return torus;
    }

    update() {
        this.mesh.rotateY(0.1);
    }

    dispose() {
        this.mesh.geometry.dispose();
        this.mesh.material.dispose();
        this.mesh.dispose();
    }

    updateColor() {
        this.material.color = new Color(0xFF0000);
    }
}

export default BasicTorus;
