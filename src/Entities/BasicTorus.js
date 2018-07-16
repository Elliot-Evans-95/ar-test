import * as THREE from 'three';
import baseEntity from './BaseEntity';

export default class BasicTorus extends baseEntity {

    constructor(name, scene, initialPosition) {
        super(name);
        this.mesh = this.getTorusMesh(scene, initialPosition);
        this.mesh.userData.parent = this;
        this.radius = 0.4;
        this.tube = 0.1;
        this.radialSegments = 20;
        this.tubularSegments = 30;
    }

    getTorusMesh(scene, initialPosition) {
        const geometry = new THREE.TorusGeometry(this.radius, this.tube, this.radialSegments, this.tubularSegments);
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
