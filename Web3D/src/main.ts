import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;
let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
let scene: any, renderer: any, camera: THREE.PerspectiveCamera;
let cameraHelper: any;
let radius = 10;
let controls: any, stats: any;
let shaderMaterial: any;
init();

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  //
  camera = new THREE.PerspectiveCamera(50, aspect * 1, 0.1, 10000);
  camera.position.x = 2 * radius;
  camera.position.y = 2 * radius;
  camera.position.z = 2 * radius;
  camera.lookAt(0, 0, 0);
  scene.add(camera);
  //

  //   cameraHelper = new THREE.CameraHelper(camera);
  //   scene.add(cameraHelper);

  //   scene.add(new THREE.AxesHelper(5 * radius));

  //  add star
  const geometry = new THREE.BufferGeometry();

  const vertices = [];

  const size = [];
  const opacity = [];
  const speed = [];

  const totalStar = 1000;
  for (let i = 0; i < totalStar; i++) {
    vertices.push(THREE.MathUtils.randFloatSpread(600)); // x
    vertices.push(THREE.MathUtils.randFloatSpread(600)); // y
    vertices.push(THREE.MathUtils.randFloatSpread(600)); // z

    size.push(Math.random() * 5 + 5);
    opacity.push(Math.random() * Math.PI);
    // opacity.push(1);
    speed.push(Math.random() * 10 + 10);
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.setAttribute("size", new THREE.Float32BufferAttribute(size, 1));
  geometry.setAttribute("opacity", new THREE.Float32BufferAttribute(size, 1));
  geometry.setAttribute("speed", new THREE.Float32BufferAttribute(size, 1));

  //   const pMaterial = new THREE.PointsMaterial({ color: 0x888888 });

  //   uniforms = {
  //     pointTexture: { value: new THREE.TextureLoader().load( 'textures/sprites/spark1.png' ) }
  // };

  shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: {
        value: 0,
      },
      color: {
        value: new THREE.Color(0xff0000),
      },
      pointTexture: {
        value: new THREE.TextureLoader().load(
          "https://threejs.org/examples/textures/sprites/snowflake2.png"
        ),
      },
    },
    // - abs(sin(time + opacity))
    vertexShader: `
      uniform float time;
      attribute float size;
      attribute float opacity;
      attribute float speed;
      varying float vOpacity;
      void main() {
        vOpacity = 1.0 - abs(sin(time + opacity));
        vec3 pos = position;
        pos.y = 50. - mod(50. - (position.y - (speed * time)), 100.);
        vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
        gl_PointSize = abs(sin(time + size)) * size * ( 300.0 / -mvPosition.z );
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D pointTexture;
      uniform vec3 color;
      varying float vOpacity;
      void main() {
        gl_FragColor = vec4( color, vOpacity );
        gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
      }
    `,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true,
    vertexColors: true,
  });

  const particles = new THREE.Points(geometry, shaderMaterial);

  scene.add(particles);
  console.log("particles:", particles);

  //   renderer.autoClear = false;
  stats = Stats();
  document.body.appendChild(stats.dom);

  controls = new OrbitControls(camera, document.body);

  renderer.render(scene, camera);
}

const clock = new THREE.Clock();

function animate() {
  shaderMaterial.uniforms.time.value = clock.getElapsedTime();

  renderer.render(scene, camera);
  stats.update();
  controls.update();

  requestAnimationFrame(animate);
}

animate();