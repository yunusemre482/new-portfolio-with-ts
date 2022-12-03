import * as THREE from 'three';
import Camera from './Camera';
import Renderer from './Renderer';
import Sizes from './utils/Sizes';
import Time from './utils/Time';
import Loader from './utils/ModelLoader';
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
	loader: Loader;

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
		this.loader = new Loader();
		this.camera = new Camera();
		this.renderer = new Renderer();
		this.time = new Time();
		this.sizes.on('resize', () => {
			this.camera.resize();
		});

		// Time tick event
		this.time.on('tick', () => {
			this.update();
		});

		this.loader.load('https://prod.spline.design/dK1SOYcfc06MES9N/scene.splinecode');
	}

	resize() {
		this.camera.resize();
		this.renderer.resize();
	}

	update() {
		this.camera.update();
		this.renderer.update();
	}
	destroy() {}
}
