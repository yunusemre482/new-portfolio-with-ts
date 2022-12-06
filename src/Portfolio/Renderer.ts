import * as THREE from 'three';
import Portfolio from './Portfolio';
import { CameraInterface } from './Camera';
import Sizes from './utils/Sizes';
export default class Renderer {
	instance: THREE.WebGLRenderer;
	portfolio: Portfolio;
	canvas: HTMLCanvasElement;
	scene: THREE.Scene;
	camera: CameraInterface;
	sizes: Sizes;
	constructor() {
		this.portfolio = new Portfolio();

		this.canvas = this.portfolio.canvas;
		this.sizes = this.portfolio.sizes;
		this.scene = this.portfolio.scene;
		this.camera = this.portfolio.camera;

		this.setInstance();
	}

	setInstance() {
		this.instance = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
			alpha: true,
		});
		this.instance.physicallyCorrectLights = true;
		this.instance.outputEncoding = THREE.sRGBEncoding;
		this.instance.toneMapping = THREE.CineonToneMapping;
		this.instance.toneMappingExposure = 1.75;
		this.instance.shadowMap.enabled = true;
		this.instance.shadowMap.type = THREE.PCFShadowMap;
		this.instance.setClearColor('#211d20');
		this.instance.setSize(this.sizes.width, this.sizes.height);
		this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
		this.instance.setClearAlpha(1);

		this.clearBackground();
	}

	clearBackground() {
		this.instance.setClearColor(0x000000, 1); // the default
	}
	resize() {
		this.instance.setSize(this.sizes.width, this.sizes.height);
		this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
	}

	update() {
		this.instance.render(this.scene, this.camera.instance);
	}
}
