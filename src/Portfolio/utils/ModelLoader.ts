import SplineLoader from '@splinetool/loader';
import Portfolio from '../Portfolio';
export default class Loader {
	instance: SplineLoader;
	portfolio: Portfolio;
	constructor() {
		this.portfolio = new Portfolio();
		this.instance = new SplineLoader();
	}

	async load(url: string) {
		this.instance.load(url, (splineScene) => {
			this.portfolio.scene.add(splineScene);
		});
	}
}
