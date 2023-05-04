import * as THREE from 'three'
import { WebGLRenderer } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
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
  }
}

checkDevice()



function animate(){
  window.requestAnimationFrame(animate)
  renderer.render(scene,camera)
  torus.rotation.y += 0.01
}

animate()


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