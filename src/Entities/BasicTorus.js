import * as THREE from 'three';
import baseEntity from './BaseEntity';

class BasicTorus extends baseEntity {

    constructor(name, scene, initialPosition) {
        super(name);
        this.material = new THREE.MeshPhongMaterial({ color: 0xFFA500 });
        this.mesh = this.getTorusMesh(this.material, scene, initialPosition);

        // setTimeout(() => {
        //     // this.dispose();
        //     // this.mesh.geometry.dispose();
        //     // this.mesh.material.dispose();
        //     // this.mesh.dispose();
        //
        //     this.material = new THREE.MeshPhongMaterial({ color: 0xFF0000 });
        //     this.mesh = this.getTorusMesh(this.material, scene, initialPosition);
        // }, 2000)

        // this.updateColor(scene, initialPosition);
    }

    getTorusMesh(material, scene, initialPosition) {
        const torusProperties = {
            radius: 0.4,
            tube: 0.1,
            radialSegments: 20,
            tubularSegments: 30,
        };
        const geometry = new THREE.TorusGeometry(torusProperties.radius, torusProperties.tube, torusProperties.radialSegments, torusProperties.tubularSegments);
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

    updateColor(scene, initialPosition) {
        this.material.color = 0xff5643;
        this.getTorusMesh(this.material, scene, initialPosition)
    }
}

export default BasicTorus;
