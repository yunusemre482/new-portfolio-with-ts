import * as THREE from 'three';
import Portfolio from './Portfolio';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export interface CameraInterface {
	portfolio: Portfolio;
	sizes: {
		width: Number;
		height: Number;
	};
	canvas: HTMLCanvasElement;
	scene: THREE.Scene;
	instance: THREE.PerspectiveCamera;

	setInstance: () => void;
	resize: () => void;
	setControls: () => void;
	update: () => void;
}

export default class Camera implements CameraInterface {
	portfolio: Portfolio;
	sizes: {
		width: number;
		height: number;
	};
	canvas: HTMLCanvasElement;
	scene: THREE.Scene;
	instance: THREE.PerspectiveCamera;
	controls: OrbitControls;
	constructor() {
		this.portfolio = new Portfolio();
		this.sizes = this.portfolio.sizes;
		this.scene = this.portfolio.scene;
		this.canvas = this.portfolio.canvas;

		this.setInstance();
	}

	setInstance() {
		this.instance = new THREE.PerspectiveCamera(
			45,
			window.innerWidth / window.innerHeight,
			5,
			100000
		);

		this.instance.position.set(0, 5, 25);
		this.scene.add(this.instance);
	}

	setControls() {
		this.controls = new OrbitControls(this.instance, this.canvas);
		this.controls.enableDamping = true;
	}

	resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height;
		console.log(this.sizes.width, this.sizes.height);

		this.instance.updateProjectionMatrix();
	}

	update() {
		//this.controls.update();
	}
}
