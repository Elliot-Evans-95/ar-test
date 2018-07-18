import * as THREE from 'three';

class BasicTorus {

    constructor(name, scene, initialPosition) {
        this.name = name;
        this.material = new THREE.MeshPhongMaterial({ color: 0xFFA500, shininess: 10 });
        this.mesh = this.getCubusMesh(this.material, scene, initialPosition);


    }

    getCubusMesh(material, scene, initialPosition) {
        const cubusProperties = {
            width: 0.5,
            height: 0.5,
            depth: 0.5
        };
        const geometry = new THREE.BoxGeometry(cubusProperties.width, cubusProperties.height, cubusProperties.depth);
        let torus = new THREE.Mesh(geometry, material);
        torus.position.copy(initialPosition);
        scene.add(torus);


        return torus;
    }

    update() {

    }

    dispose() {
        this.mesh.geometry.dispose();
        this.mesh.material.dispose();
        this.mesh.dispose();
    }
}

export default BasicTorus;
