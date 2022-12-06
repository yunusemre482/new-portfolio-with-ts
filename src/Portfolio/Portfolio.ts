import * as THREE from 'three';
import Camera from './Camera';
import Renderer from './Renderer';
import Sizes from './utils/Sizes';
import Time from './utils/Time';

//MODEL IMPORTS
import Cyclist from './models/Cyclist';
import House from './models/House';
import SkyBox from './world/SkyBox';
type _canvas = HTMLCanvasElement;
type _instance = Portfolio | undefined | null;

declare global {
	interface Window {
		portfolio: _instance;
	}
}

let instance: _instance = null;
export default class Portfolio {
	canvas: HTMLCanvasElement;
	scene: THREE.Scene;
	camera: Camera;
	sizes: Sizes;
	renderer: Renderer;
	time: Time;

	house: House;
	cyclist: Cyclist;
	skybox: SkyBox;

	constructor(_canvas?: _canvas) {
		if (instance) {
			return instance;
		}
		instance = this;
		// Global access
		window.portfolio = this;

		this.canvas = _canvas;
		this.sizes = new Sizes();

		this.scene = new THREE.Scene();

		this.camera = new Camera();
		this.renderer = new Renderer();
		this.time = new Time();
		// this.house = new House('https://prod.spline.design/dK1SOYcfc06MES9N/scene.splinecode');
		this.cyclist = new Cyclist();
		this.skybox = new SkyBox();

		this.sizes.on('resize', () => {
			this.resize();
		});

		// Time tick event
		this.time.on('tick', () => {
			this.update();
		});
	}

	resize() {
		console.log('resizing...');
		this.camera.resize();
		this.renderer.resize();
	}

	update() {
		this.camera.update();
		this.renderer.update();
	}
	destroy() {
		this.sizes.off('resize');
		this.time.off('tick');
	}
}
