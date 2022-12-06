import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Portfolio from '../Portfolio';
import Time from '../utils/Time';
export default class Cyclist {
	portfolio: Portfolio;
	model: THREE.Group;
	spotLight: THREE.SpotLight;
	scrollPos: number = 0;
	scrollDirection: string = 'DOWN';
	constructor() {
		this.portfolio = new Portfolio();
		this.loadModel(
			'https://holonext.io/api/v1/scene/public/file/638cf207d01bc61e1143093e/scooter.glb'
		);
		this.addFloor();
		this.loadRoads();
		this.addLights();

		this.portfolio.time.on('update-model', this.update.bind(this));
		this.addListeners();
	}

	public loadModel(url: string) {
		const loader = new GLTFLoader();

		loader.load(url, (gltf) => {
			this.model = gltf.scene;

			this.model.position.set(0, 0, 0);
			this.portfolio.scene.add(this.model);
		});
	}

	private loadRoads() {
		const loader = new GLTFLoader();

		loader.load(
			'https://holonext.io/api/v1/scene/public/file/638e1325d01bc61e11432038/my_city.glb',
			(gltf) => {
				const model = gltf.scene;
				console.log(model);

				model.position.set(0, 0.02, -20);
				model.scale.set(0.5, 0.5, 0.5);
				model.rotateY((Math.PI / 2) * 3);
				this.portfolio.scene.add(model);
				this.portfolio.camera.instance.lookAt(0, 0, 0);
			}
		);
	}
	private addListeners() {
		// Detect scroll direction and emit event
		window.addEventListener('scroll', (e) => {
			if (document.body.getBoundingClientRect().top > this.scrollPos)
				this.scrollDirection = 'DOWN';
			else this.scrollDirection = 'UP';

			this.portfolio.time.emit('update-model');
			this.scrollPos = document.body.getBoundingClientRect().top;
		});
	}
	addFloor() {
		// CREATE FLOOR FOR SHADOWS AND LIGHTING
		const floor = new THREE.Mesh(
			new THREE.PlaneGeometry(100000, 100),
			new THREE.MeshStandardMaterial({
				color: 0xffffff,
				roughness: 0.5,
				metalness: 0.5,
			})
		);
		floor.rotation.x = -Math.PI * 0.5;
		floor.position.y = -0.1;
		this.portfolio.scene.add(floor);
	}

	addLights() {
		// AMBIENT LIGHT
		const ambientLight = new THREE.AmbientLight(0x222222, 1);
		this.portfolio.scene.add(ambientLight);

		//DIRECTIONAL LIGHT
		const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		directionalLight.position.set(0, 10, 10);
		this.portfolio.scene.add(directionalLight);

		//SPOTLIGHT FOR THE MODEL
		const spotLight = new THREE.SpotLight(0xffffff, 1, 150);
		spotLight.position.set(0.45, 1.4, 0);
		spotLight.power = 4000;
		spotLight.angle = 0.4;
		spotLight.decay = 2;

		spotLight.target.position.set(3, 0, 0);

		this.portfolio.scene.add(spotLight);
		this.portfolio.scene.add(spotLight.target);
		this.spotLight = spotLight;
	}

	public update() {
		const MOVE_SPEED = this.scrollDirection === 'UP' ? 0.4 : -0.4;

		if (this.model) {
			this.model.position.x += MOVE_SPEED;
			this.spotLight.position.x += MOVE_SPEED;
			this.spotLight.target.position.x += MOVE_SPEED;
			this.portfolio.camera.instance.position.x += MOVE_SPEED;
			this.portfolio.camera.instance.lookAt(this.model.position);
		}
	}
}
