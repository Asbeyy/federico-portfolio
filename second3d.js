import * as THREE from 'three'
import { WebGLRenderer } from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight , 0.1, 1000)


//* Cube
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshStandardMaterial({ color: 0xfff, roughness: 0.5 })
const material1 = new THREE.MeshStandardMaterial({ color: 0xfecec, roughness: 0.5 })
const material2 = new THREE.MeshStandardMaterial({ color: 0xefeecc, roughness: 0 })
const cube = new THREE.Mesh(geometry,material)
cube.castShadow = true
scene.add(cube)

const renderer = new WebGLRenderer({
    alpha: true
  })

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById('canv-test').appendChild(renderer.domElement)


//* Plane
// const planeGeometry = new THREE.PlaneGeometry(150,150)
// const plane = new THREE.Mesh(planeGeometry,material2)
// plane.rotation.x = -Math.PI / 2
// plane.receiveShadow = true
//plane.position.y= -0.5
// scene.add(plane)


//* Lights

const light = new THREE.PointLight( 0x404040, 10, )
light.position.set( 0, 4, 3 )
light.castShadow = true
scene.add(light)

camera.position.z = 3
camera.position.y = 0.8
cube.position.y = 1

renderer.render(scene,camera)






//!Recursive Animation Loop
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera)
    cube.rotation.y += 0.01
    cube.rotation.x += 0.01
}

animate()


//! Append text after 3D Canvas 
// Create a new <div> element and set its id to "myDiv":
const newDiv = document.createElement('div');
newDiv.id = 'myDiv';
newDiv.innerHTML = ' This DIV was appended with JS inside /second3ds.js '

// Append the new <div> element as a child of an existing element with the id "parent":
const parent = document.getElementById('canv-test');
//parent.appendChild(newDiv);
