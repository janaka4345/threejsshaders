import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.querySelector(".webgl");
///scene
const scene = new THREE.Scene();
//camera
const camera = new THREE.PerspectiveCamera(75, 800 / 600, 1, 100);
scene.add(camera);
camera.position.set(0, 0, 3);

//model
const geometry = new THREE.PlaneGeometry(1, 1);
const material = new THREE.RawShaderMaterial({
  vertexShader: `
  uniform mat4 projectionMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 modelMatrix;
  
  attribute vec3 position;

  void main()
  {
    gl_Position=projectionMatrix * viewMatrix * modelMatrix * vec4(position,1.0);
  }
  `,
  fragmentShader: `
   precision mediump float;

   void main(){
    gl_FragColor=vec4(1.0,0.0,0.0,1.0);
   }
  `,
});
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

//controls
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(800, 600);
const controls = new OrbitControls(camera, renderer.domElement);

renderer.render(scene, camera);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// let time = Date.now();
const clock = new THREE.Clock();
// gsap.to(mesh.position,{duration:3,delay:1,x:5})
// gsap.to(mesh.position,{duration:3,delay:1,x:0})
//animation
const tick = () => {
  //time
  const elapsedTime = clock.getElapsedTime();

  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
tick();
