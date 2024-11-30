import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

import nebula from "../img/nebula.jpg";
import stars from "../img/stars.jpg";

// === Renderer Setup ===
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true; // Enable shadows

// === Scene ===
const scene = new THREE.Scene();

// === Camera Setup ===
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-5, 20, 20);

// === Light Setup ===

// Ambient light
const ambientLight = new THREE.AmbientLight(0x888888); // Soft ambient lighting
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Bright directional light
scene.add(directionalLight);
directionalLight.position.set(-30, 20, 0);
directionalLight.castShadow = true; // Enable shadows
directionalLight.shadow.camera.top = 20;
directionalLight.shadow.camera.bottom = -20;
directionalLight.shadow.camera.left = -20;
directionalLight.shadow.camera.right = 20;

// === Background ===

// Load background texture
const textureLoader = new THREE.TextureLoader();
// scene.background = textureLoader.load(stars); // Load stars background texture in 2D
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  nebula,
  stars,
  stars,
  stars,
  nebula,
  stars,
]);

// === GUI Options ===
const gui = new dat.GUI();
const options = {
  color: 0xff0000, // Sphere color
  wireframe: false, // Toggle for sphere wireframe
  speed: 0.01, // Animation speed for sphere
};

// GUI Controls
gui.addColor(options, "color").onChange((e) => {
  sphere.material.color.set(e);
});
gui.add(options, "wireframe").onChange((e) => {
  sphere.material.wireframe = e;
});
gui.add(options, "speed", 0, 0.1); // Slider to control speed

// === Orbit Controls ===
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update(); // Sync controls with camera

// === Helpers ===
const axesHelper = new THREE.AxesHelper(3); // XYZ axes helper
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(30, 30); // Grid on the ground
scene.add(gridHelper);

// Directional light helpers
const dLightShadowHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
scene.add(dLightShadowHelper);

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(dLightHelper);

// === Objects ===

// Plane (Ground)
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI / 2; // Make it horizontal
plane.receiveShadow = true; // Enable shadows
scene.add(plane);

// Box
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// Sphere
const sphereGeometry = new THREE.SphereGeometry(4, 100, 100);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: options.color,
  wireframe: options.wireframe,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-10, 4, 1);
sphere.castShadow = true; // Enable shadows
scene.add(sphere); // Add sphere to scene

//Box 2 with texture

const box2Geometry = new THREE.BoxGeometry(4,4,4);
const box2Material = new THREE.MeshStandardMaterial({
  //color: 0xffffff,
  map: textureLoader.load(nebula),

});
const box2 = new THREE.Mesh(box2Geometry, box2Material);
box2.position.set(10, 10, 10);
box2.castShadow = true;
scene.add(box2);

//Box 3 with multiple textures

const box3Geometry = new THREE.BoxGeometry(4,4,4);
const box3Material = [
  new THREE.MeshStandardMaterial({map: textureLoader.load(nebula), side: THREE.DoubleSide}),
  new THREE.MeshStandardMaterial({map: textureLoader.load(stars), side: THREE.DoubleSide}),
  new THREE.MeshStandardMaterial({map: textureLoader.load(nebula), side: THREE.DoubleSide}),
  new THREE.MeshStandardMaterial({map: textureLoader.load(stars), side: THREE.DoubleSide}),
  new THREE.MeshStandardMaterial({map: textureLoader.load(nebula), side: THREE.DoubleSide}),
  new THREE.MeshStandardMaterial({map: textureLoader.load(stars), side: THREE.DoubleSide}),
];

const box3 = new THREE.Mesh(box3Geometry, box3Material);
box3.position.set(10, 10, -10);
box3.castShadow = true;
scene.add(box3);



// === Animation ===

let step = 0; // Step counter for animation

function animate(time) {
  // Rotate the box
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;

  // Animate sphere
  step += options.speed; // Increment step by speed value
  sphere.position.y = Math.abs(Math.sin(step)) * 10; // Create bounce effect

  // Render the scene
  orbit.update(); // Update orbit controls
  renderer.render(scene, camera);
}

// Start the animation loop
renderer.setAnimationLoop(animate);

// === Window Resize Handler ===
window.addEventListener("resize", () => {
  // Adjust camera aspect ratio and renderer size
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
