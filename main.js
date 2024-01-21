import './style.css';
import * as THREE from 'three';

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

camera.position.setZ(30);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);
camera.position.z = 50;

const sunGeometry = new THREE.SphereGeometry(10, 32, 32);
const sunTextureLoader = new THREE.TextureLoader();
const suTexture = sunTextureLoader.load('sun.png');
const sunMaterial = new THREE.MeshStandardMaterial({ map: suTexture });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);


function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);
const cubeTexture=new THREE.TextureLoader().load('ccc.jpg');

const cube=new THREE.Mesh(
   new THREE.SphereGeometry(8,32,32),
   new THREE.MeshStandardMaterial({map:cubeTexture})
);

scene.add(cube);

cube.position.set(0, 0, 0);
const earthDistance = 38;
cube.position.set(earthDistance, 0, 0);
sun.add(cube);

const moonGeometry = new THREE.SphereGeometry(2, 32, 32);
const moonTextureLoader = new THREE.TextureLoader();
const moonTexture = moonTextureLoader.load('moon.jpg');
const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);

scene.add(moon);
moon.position.set(30 + 8, 0, 0);
const moonDistance = 12;
moon.position.set(moonDistance, 0, 0);
cube.add(moon);

function animate(){
     requestAnimationFrame(animate);
    sun.rotation.y +=0.001;
     cube.rotation.y += 0.01;
     moon.rotation.y += 0.09;
     renderer.render(scene,camera);
}
animate();
