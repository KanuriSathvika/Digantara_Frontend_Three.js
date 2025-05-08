import * as THREE from 'three';

export let scene, camera, renderer, objects = [];

export function initScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 3, 7);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    stencil: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xf0f5ff); // Light blue-ish white background
  renderer.shadowMap.enabled = true;
  
  document.body.appendChild(renderer.domElement);

  // Enhanced lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  light.castShadow = true;
  // Configure shadow properties
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 50;
  light.shadow.camera.left = -15;
  light.shadow.camera.right = 15;
  light.shadow.camera.top = 15;
  light.shadow.camera.bottom = -15;
  scene.add(light);

  // Ground plane with increased size
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshStandardMaterial({ 
      color: 0xe6e6e6, // Light gray for the ground plane
      roughness: 0.8,
      metalness: 0.2
    })
  );
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -0.5;
  plane.receiveShadow = true;
  scene.add(plane);

  const shapes = [
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.ConeGeometry(0.5, 1, 32),
    new THREE.TorusGeometry(0.4, 0.2, 16, 32),
    new THREE.CylinderGeometry(0.5, 0.5, 1, 32)
  ];

  // Enhanced materials with new color scheme
  const materials = [
    new THREE.MeshStandardMaterial({ 
      color: 0x9FE2BF, // Mint green
      roughness: 0.1, 
      metalness: 0.3
    }),
    new THREE.MeshStandardMaterial({ 
      color: 0xFFBF00, // Amber
      roughness: 0.1, 
      metalness: 0.2
    }),
    new THREE.MeshStandardMaterial({ 
      color: 0xbf94e4, // Turquoise
    // color: 0x40E0D0, // Turquoise
      roughness: 0.1, 
      metalness: 0.1
    }),
    new THREE.MeshStandardMaterial({ 
      color: 0xDE3163, // Cerise
      roughness: 0.1, 
      metalness: 0.25
    }),
    new THREE.MeshStandardMaterial({ 
      color: 0x6495ED, // Cornflower Blue
      roughness: 0.1, 
      metalness: 0.3
    })
  ];

  for (let i = 0; i < shapes.length; i++) {
    const mesh = new THREE.Mesh(shapes[i], materials[i]);
    mesh.position.set(i * 2 - 4, 0.5, 0);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    objects.push(mesh);
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
