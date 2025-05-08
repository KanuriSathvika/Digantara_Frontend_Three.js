import * as THREE from 'three';

let highlightedObject = null;
let outlineMaterial = new THREE.ShaderMaterial({
  uniforms: {
    color: { value: new THREE.Color(0xdf660f) }  // Changed to warm orange color
  },
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec3 pos = position + normal * 0.1;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    varying vec3 vNormal;
    void main() {
      float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 1.0);
      gl_FragColor = vec4(color, 1.0) * intensity;
    }
  `,
  transparent: true,
  side: THREE.BackSide,
  depthWrite: false
});

export function getHighlightedObject() {
  return highlightedObject;
}

export function handleObjectClick(object, scene) {
  // Remove previous highlight if it exists
  if (highlightedObject && highlightedObject.outline) {
    scene.remove(highlightedObject.outline);
    delete highlightedObject.outline;
  }

  // If clicking the same object, just remove highlight
  if (highlightedObject === object) {
    highlightedObject = null;
    return;
  }

  highlightedObject = object;

  // Create outline mesh
  const outlineMesh = new THREE.Mesh(object.geometry.clone(), outlineMaterial.clone());
  outlineMesh.scale.copy(object.scale).multiplyScalar(1.1);
  outlineMesh.position.copy(object.position);
  outlineMesh.rotation.copy(object.rotation);
  outlineMesh.renderOrder = 1;

  object.outline = outlineMesh;
  scene.add(outlineMesh);
}

export function updateHighlight(renderer, scene, camera) {
  if (!highlightedObject || !highlightedObject.outline) return;

  // Update material uniforms for better visual effect
  const viewDir = new THREE.Vector3();
  camera.getWorldDirection(viewDir);
  
  if (highlightedObject.outline.material.uniforms) {
    highlightedObject.outline.material.uniforms.color.value.setHex(0xdf660f);  // Changed to warm orange color
  }
}
