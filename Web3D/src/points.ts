import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;
let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
let scene: any, renderer: any, camera: THREE.PerspectiveCamera;
let radius = 100;
let controls: any, stats: any;

init();
animate();

function init() {
  scene = new THREE.Scene();

  //
  camera = new THREE.PerspectiveCamera(50, aspect * 0.5, 300, 10000000);
  camera.position.x = 2 * radius;
  camera.position.y = 2 * radius;
  camera.position.z = 2 * radius;
  camera.lookAt(0, 0, 0);
  scene.add(camera);
  //

  scene.add(new THREE.AxesHelper(5 * radius));

  //  add star
  const geometry = new THREE.BufferGeometry();
  const vertices = [];

  for (let i = 0; i < 10000; i++) {
    vertices.push(THREE.MathUtils.randFloatSpread(2000)); // x
    vertices.push(THREE.MathUtils.randFloatSpread(2000)); // y
    vertices.push(THREE.MathUtils.randFloatSpread(2000)); // z
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  const particles = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({ color: 0x888888 })
  );
  scene.add(particles);

  //
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  document.body.appendChild(renderer.domElement);
  //   renderer.autoClear = false;

  //
  stats = Stats();
  document.body.appendChild(stats.dom);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  stats.update();
}