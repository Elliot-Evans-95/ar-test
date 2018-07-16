import * as THREE from 'three';
import baseEntity from './BaseEntity';

export default class BasicTorus extends baseEntity {

    constructor(name, scene, initialPosition) {
        super(name);
        this.mesh = this.getTorusMesh(scene, initialPosition);
        this.mesh.userData.parent = this;
        this.boxParameters = {
            width: 10,
            height: 10,
            depth: 2,
            widthSegments: 5,
            heightSegments: 5,
            depthSegments: 5
        }
    }

    getTorusMesh(scene, initialPosition) {
        const geometry = new THREE.BoxGeometry(this.boxParameters.width, this.boxParameters.height, this.boxParameters.depth, this.boxParameters.widthSegments,
            this.boxParameters.heightSegments, this.boxParameters.depthSegments);
        const material = new THREE.MeshPhongMaterial({ color: 0x0B5394 });
        const torus = new THREE.Mesh(geometry, material);
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
}
