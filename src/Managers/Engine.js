import * as THREE from 'three';
import {ARPerspectiveCamera, ARAnchorManager, ARDebug} from 'three.ar.js';
import entityManager from './EntityManager';
import BasicTorus from '../Entities/BasicTorus';
import BasicCubus from '../Entities/BasicCube';
import renderer from './Renderer';
import VRControls from '../Utils/VRControls';
import {Color} from 'three';

export default class Engine {

    constructor() {
        this.shape;
        this.scene;
    }

    start() {
        renderer.initRenderer().then((success) => {
            if (success) {
                this.buildCamera();
                this.setupScene();
                this.startUpdate();
            }
        });
    }

    buildCamera() {
        const camera = new ARPerspectiveCamera(
            renderer.vrDisplay,
            60,
            window.innerWidth / window.innerHeight,
            renderer.vrDisplay.depthNear,
            renderer.vrDisplay.depthFar
        );
        entityManager.mainCamera = camera;
        this.vrControls = new VRControls(camera);
    }

    setupScene() {
        this.scene = new THREE.Scene();

        const light = new THREE.PointLight(0xffff00, 1, 100);
        light.position.set(5, 5, 5);
        this.scene.add(light);
        this.scene.add(entityManager.mainCamera);

    }

    addCanvasEventHandlers() {
        window.addEventListener('resize', this.onWindowResize, false);
    }

    onWindowResize() {
        entityManager.mainCamera.aspect = window.innerWidth / window.innerHeight;
        entityManager.mainCamera.updateProjectionMatrix();
        renderer.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    changeColor(entityName, color) {
        const entity = entityManager.findByName(entityName);
        entity.material.color = new Color(color);
    }

    changeObject(type) {
        if (type === "cube") {
            entityManager.addEntity(new BasicCubus('cube', this.scene, new THREE.Vector3(0, 0, -2.5)));
        }
        else if (type === "torus") {
            this.shape = new BasicTorus('torus', this.scene, new THREE.Vector3(0, 0, -2.5));
            entityManager.addEntity(this.shape);
        }
    }

    removeObject() {
        // const entity = entityManager.findByName('torus');
    }

    startUpdate() {
        const currentInstance = this;
        this.update = () => {
            entityManager.update();
            entityManager.mainCamera.updateProjectionMatrix();
            currentInstance.vrControls.update();
            renderer.update(currentInstance.scene, entityManager.mainCamera, currentInstance.update);
        };
        this.update();
    }

    addAnchor() {

    }
}

