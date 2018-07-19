import * as THREE from 'three';

class BasicTorus {

    constructor(name, scene, initialPosition) {
        this.name = name;
        this.material = new THREE.MeshPhongMaterial({ color: 0xFFA500, shininess: 10 });
        this.mesh = this.getTorusMesh(this.material, scene, initialPosition);
    }

    getTorusMesh(material, scene, initialPosition) {
        const torusProperties = {
            radius: 0.4,
            tube: 0.1,
            radialSegments: 20,
            tubularSegments: 30
        };
        const geometry = new THREE.TorusGeometry(torusProperties.radius, torusProperties.tube, torusProperties.radialSegments, torusProperties.tubularSegments);
        let torus = new THREE.Mesh(geometry, material);
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
