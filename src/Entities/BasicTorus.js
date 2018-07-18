import * as THREE from 'three';
import './../ThirdParty/three.js/MTLLoader';
import './../ThirdParty/three.js/OBJLoader';
import baseEntity from './BaseEntity';
import DRACOLoader from './../ThirdParty/draco/DRACOLoader';

class BasicTorus extends baseEntity {
    constructor(name, id, scene,) {
        super(name, id);
        this.loadMaterial(scene);
        // this.getModel(scene, initialPosition);
    }

    loadMaterial(scene, initialPosition) {
        // let mtlLoader = new THREE.MTLLoader();
        // mtlLoader.setPath('./Models/');
        // mtlLoader.load('Astronaut.mtl', materials => {
        //     materials.preload();
        //     this.getModel(scene, materials.materials.Astronaut_mat, initialPosition);
        // });

        let volcano;
        const objLoader = new THREE.OBJLoader();

        objLoader.setPath('./Models/volcano/');
        objLoader.load('Volcano.obj', function (object) {
            volcano = object;
            volcano.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.map = THREE.ImageUtils.loadTexture('./Models/volcano/Volcano.png');
                    child.material.map.needsUpdate = true;
                }
            });

            scene.add(volcano);
            volcano.position.set(10000, 10000, 10000);
            volcano.scale.x = 0.005;
            volcano.scale.y = 0.005;
            volcano.scale.z = 0.005;

            var ambient = new THREE.AmbientLight(0x333333);
            scene.add(ambient);

            var directionalLight = new THREE.DirectionalLight(0xffffff);
            directionalLight.position.set(1, 1, 0.5);
            scene.add(directionalLight);

        })

    }

    getModel(scene, material, initialPosition) {
        const dracoLoader = new DRACOLoader(
            './ThirdParty/draco/DRACOLoader.js',
            { type: 'js', }
        );

        dracoLoader.load('./Models/Astronaut.drc', (geometry) => {
            geometry.computeVertexNormals();

            // const material = new THREE.MeshPhongMaterial({ vertexColors: THREE.VertexColors });
            const shape = this.setupModel(new THREE.Mesh(geometry, material));
            // shape.castShadow = true;
            // shape.receiveShadow = true;
            shape.position.copy(initialPosition);
            scene.add(shape);

            dracoLoader.releaseDecoderModule();
        });
    }

    setupModel(mesh) {
        this.model = new THREE.Object3D();
        this.modelScene = new THREE.Object3D();

        this.modelBoundingBox = new THREE.Box3();
        this.modelBoundingBox.setFromObject(mesh);

        let objectSize = this.modelBoundingBox.getSize();
        let desiredHeight = 1.93;
        let scale = desiredHeight / objectSize.y;

        this.model.renderOrder = 4;
        this.model.add(mesh);

        let mtx = new THREE.Matrix4().makeScale(scale, scale, scale);
        mesh.castShadow = true;
        mesh.geometry.applyMatrix(mtx);
        this.modelBoundingBox.setFromObject(mesh);

        this.modelScene.add(this.model);
        // this.S3DScene.add(this.modelScene);
    }

    update() {
    }

    dispose() {
    }

}

export default BasicTorus;
