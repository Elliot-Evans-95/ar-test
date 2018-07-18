import * as THREE from 'three';
import {ARPerspectiveCamera, ARAnchorManager, ARDebug} from 'three.ar.js';
import entityManager from './EntityManager';
import BasicTorus from '../Entities/BasicTorus';
import BasicCubus from '../Entities/BasicCubus';
import renderer from './Renderer';
import VRControls from '../Utils/VRControls';
import {Color} from 'three';

export default class Engine {

    constructor() {

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

        entityManager.addEntity(new BasicTorus('shape', this.scene, new THREE.Vector3(0, 0, -1.5)));

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

    changeObject() {
        // PLEASE, PLEASE, PLEASE DELET THIS!!!!!
        entityManager.removeEntity(new BasicTorus('shape', this.scene, new THREE.Vector3(0, 0, -1.5)));
        entityManager.addEntity(new BasicCubus('shape', this.scene, new THREE.Vector3(0, 0, -1.5)));
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

