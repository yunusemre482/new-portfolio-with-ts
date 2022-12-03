import './styles/main.scss';
import Portfolio from './Portfolio/Portfolio';
const canvas = document.querySelector('#model-canvas') as HTMLCanvasElement;

const portfolio = new Portfolio(canvas);

// // scene
// const scene = new THREE.Scene();

// // spline scene
// const loader = new SplineLoader();
// loader.load('https://prod.spline.design/dK1SOYcfc06MES9N/scene.splinecode', (splineScene) => {
// 	scene.add(splineScene);
// });
