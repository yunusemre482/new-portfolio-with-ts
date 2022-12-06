import * as THREE from 'three';
import Portfolio from '../Portfolio';
export default class SkyBox {
	filename: string = 'purplenebula';
	portflolio: Portfolio;

	constructor() {
		this.portflolio = new Portfolio();
		this.init();
	}
	createPathStrings(filename: string) {
		const basePath = `https://raw.githubusercontent.com/codypearce/some-skyboxes/master/skyboxes/${filename}/`;
		const baseFilename = basePath + filename;
		const fileType = filename == 'purplenebula' ? '.png' : '.jpg';
		const sides = ['up', 'dn', 'rt', 'bk', 'ft', 'lf'];

		const pathStings = sides.map((side) => {
			return baseFilename + '_' + side + fileType;
		});

		return pathStings;
	}

	createMaterialArray(filename: string) {
		const skyboxImagepaths = this.createPathStrings(filename);
		const materialArray = skyboxImagepaths.map((image) => {
			let texture = new THREE.TextureLoader().load(image);

			return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
		});
		return materialArray;
	}

	init() {
		const materialArray = this.createMaterialArray(this.filename);
		const skyboxGeo = new THREE.BoxGeometry(100000, 100000, 100000);
		const skybox = new THREE.Mesh(skyboxGeo, materialArray);
		this.portflolio.scene.add(skybox);
	}
}
