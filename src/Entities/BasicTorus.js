import * as THREE from 'three';
import baseEntity from './BaseEntity';

class BasicTorus extends baseEntity {

    constructor(name, scene, initialPosition) {
        super(name);
        this.mesh = BasicTorus.getTorusMesh(scene, initialPosition);
        this.mesh.userData.parent = this;
    }

    static getTorusMesh(scene, initialPosition) {
        const torusProperties = {
            radius: 0.4,
            tube: 0.1,
            radialSegments: 20,
            tubularSegments: 30,
        };
        const geometry = new THREE.TorusGeometry(torusProperties.radius, torusProperties.tube, torusProperties.radialSegments, torusProperties.tubularSegments);
        const material = new THREE.MeshPhongMaterial({ color: 0xFFA500 });
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

export default BasicTorus;
