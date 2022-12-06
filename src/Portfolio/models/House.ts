import * as THREE from 'three';
import SplineLoader from '@splinetool/loader';

import Time from '../utils/Time';
import Portfolio from '../Portfolio';

export default class House {
	portfolio: Portfolio;
	scene: THREE.Scene;
	time: Time;
	animation: {
		mixer?: THREE.AnimationMixer;
		actions?: {
			[key: string]: THREE.AnimationAction;
		};
	};
	model: THREE.Scene;

	constructor(modelURl: string) {
		this.portfolio = new Portfolio();
		this.scene = this.portfolio.scene;
		this.time = this.portfolio.time;
		this.loadModel(modelURl);
		this.setAnimation();
	}

	private async loadModel(url: string) {
		const loader = new SplineLoader();

		loader.load(url, (splineScene) => {
			this.model = splineScene;
			this.portfolio.scene.add(splineScene);
		});
	}

	public getModel() {
		return this.model;
	}

	private setAnimation() {}

	public playAnimation(name: string) {}

	private update() {
		// this.animation.mixer.update(this.time.delta * 0.001);
	}
}
