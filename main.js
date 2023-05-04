import * as THREE from 'three'
import { WebGLRenderer } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import VanillaTilt from 'vanilla-tilt';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
// import * as TWEEN from '@tweenjs/tween.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,window.innerWidth/window.innerHeight,0.1,1000
  )

const renderer = new WebGLRenderer({
  alpha: true
})
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement)






//!! Geometries
const thorusGeometry = new THREE.TorusKnotGeometry(.5,.22,200,200)

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('https://bruno-simon.com/prismic/matcaps/8.png')
const materialMatcap = new THREE.MeshMatcapMaterial({
  matcap: texture
})

const torus = new THREE.Mesh(thorusGeometry,materialMatcap)
scene.add(torus)


const controls = new OrbitControls( camera, renderer.domElement );









//!! Phone or Desktop

function checkDevice(){
  if (window.innerWidth <= 650){
    //Phone Settings
    camera.position.z = 5
    camera.position.x = 0
    camera.position.y = 0.9
  } else {
    //Desktop view settings
    camera.position.z = 4;
    camera.position.x = -0.8
    camera.position.y = 0

    //! Tilt for cards

    VanillaTilt.init(document.querySelectorAll('.card'), {
    max: 25,
    speed: 400,
    glare: true,
    'max-glare': 1,
    });
    VanillaTilt.init(document.querySelector(".more"), {
      max: 20,
      speed: 400,
      axis: null
    });
  }
}
checkDevice()

function onWindowResize() {
  if (window.innerWidth <= 650){
    return
  }
  checkDevice()
  console.log("resize happening")
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);
window.onload = function() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}



//! Camera Animaion (Play with the torus)

//On click of key letter "P"
window.addEventListener("keydown",(e) => {
  if(e.key === "p"){
    console.log("TRIGGER")
    moveCameraSmoothly(camera,{ x: 0, y: 0, z: 4 }, 2000);
    document.getElementById('pagefront').style.zIndex = "-999"
  }
})

//Onclick of letter "O"
window.addEventListener("keydown",(e) => {
  if(e.key === "o"){
    console.log("NOT-TRIGGER")
    moveCameraSmoothly(camera,checkerCamPos(), 2000);
    document.getElementById('pagefront').style.zIndex = "999"
  }
})

function moveCameraSmoothly(camera, newPosition, duration) {
  const currentPos = camera.position.clone();
  const targetPos = new THREE.Vector3(newPosition.x, newPosition.y, newPosition.z);
  const distance = currentPos.distanceTo(targetPos);
  const startTime = Date.now();

  function animate() {
    const currentTime = Date.now() - startTime;
    const progress = Math.min(currentTime / duration, 1);
    const easedProgress = 0.5 - 0.5 * Math.cos(progress * Math.PI);

    camera.position.lerpVectors(currentPos, targetPos, easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
    }
  }

  animate();
}

function checkerCamPos(){
  if (window.innerWidth <= 650){
    //Phone Settings
    return { z: 5, x: 0, y: 0.9}
  } else {
    //Desktop view settings
    return { z: 4, x: -0.8, y: 0}
  }
}





//!
function animate(){
  window.requestAnimationFrame(animate)
  renderer.render(scene,camera)
  torus.rotation.y += 0.01
}
animate()



