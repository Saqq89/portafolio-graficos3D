import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render( scene, camera );

//Torus

const geometry = new THREE.TorusGeometry( 10, 2, 16, 100);
const material = new THREE.MeshStandardMaterial( {color: 0x020335 } );
const torus = new THREE.Mesh( geometry, material );

scene.add(torus)

//Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

//  const lightHelper = new THREE.PointLightHelper(pointLight);
//  const gridHelper = new THREE.GridHelper(200, 50);
//  scene.add(lightHelper, gridHelper);

//  const controls = new OrbitControls(camera, renderer.domElement);

 function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('/space.jpg');
scene.background = spaceTexture;

// Avatar

const saqqTexture = new THREE.TextureLoader().load('/saqq.jpg');

const saqq = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 0), new THREE.MeshBasicMaterial({ map: saqqTexture }));

scene.add(saqq);

//nave

const naveTexture = new THREE.TextureLoader().load('/nave.jpg');
const normalTexture = new THREE.TextureLoader().load('/normal.jpg');

const nave = new THREE.Mesh(
  new THREE.OctahedronGeometry(4, 0),
  new THREE.MeshStandardMaterial({
    map: naveTexture,
    normalMap: normalTexture,
  })
);

scene.add(nave);

nave.position.z = 30;
nave.position.setX(-10);

saqq.position.z = -5;
saqq.position.x = 2;

//Scroll Animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  nave.rotation.x += 0.005;
  nave.rotation.y += 0.0075;
  nave.rotation.z += 0.005;

  saqq.rotation.y += 0.01;
  saqq.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

//Animation Loop

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  //controls.update();

  renderer.render( scene, camera );
}

animate()