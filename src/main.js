import * as THREE from 'three';
import { initScene, objects, renderer, camera, scene } from './scene.js';
import { initControls } from './controls.js';
import { handleObjectClick, updateHighlight, getHighlightedObject } from './highlight.js';

initScene();
const controls = initControls(camera, renderer.domElement);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Animation parameters
const clock = new THREE.Clock();
const floatAmplitude = 0.2;
const floatSpeed = 2;

function onClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(objects);
  
  if (intersects.length > 0) {
    handleObjectClick(intersects[0].object, scene);
  }
}

window.addEventListener('click', onClick);

function updateObjectAnimations(time) {
  objects.forEach((obj, index) => {
    // Rotation animation
    obj.rotation.x += 0.005 * (index + 1);
    obj.rotation.y += 0.007 * (index + 1);
    
    // Floating animation
    const floatOffset = Math.sin(time * floatSpeed + index) * floatAmplitude;
    obj.position.y = 1 + floatOffset;
    
    // Scale pulse animation
    const scalePulse = 1 + Math.sin(time * 3 + index * Math.PI) * 0.1;
    obj.scale.setScalar(scalePulse);

    // Update outline if this is the highlighted object
    const highlightedObj = getHighlightedObject();
    if (highlightedObj === obj && obj.outline) {
      obj.outline.position.copy(obj.position);
      obj.outline.rotation.copy(obj.rotation);
      obj.outline.scale.copy(obj.scale).multiplyScalar(1.1);
    }
  });
}

function animate() {
  requestAnimationFrame(animate);
  const time = clock.getElapsedTime();
  
  updateObjectAnimations(time);
  controls.update();
  
  renderer.clear();
  renderer.render(scene, camera);
  
  // Update highlight after main render
  updateHighlight(renderer, scene, camera);
}

animate();
