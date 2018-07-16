import * as THREE from 'three';
import baseEntity from './BaseEntity';

export default class BasicTorus extends baseEntity {

    constructor(name, scene, initialPosition) {
        super(name);
        this.mesh = this.getTorusMesh(scene, initialPosition);
        this.mesh.userData.parent = this;

        this.torusProperties = {
            radius: 0.5,
            tube: 0.2,
            radialSegments: 50,
            tubularSegments: 50,
            arc: 5,
        };

    }

    getTorusMesh(scene, initialPosition) {
        const geometry = new THREE.TorusGeometry(this.torusProperties.radius, this.torusProperties.tube, this.torusProperties.radialSegments, this.torusProperties.tubularSegments);
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
