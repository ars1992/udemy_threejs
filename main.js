"use strict";

function main(){
    const scene = new THREE.Scene()
    const box = generateBox(1, 1, 1)
    box.translateZ(-5)
    box.position.y = box.geometry.parameters.height / 2

    const floor = generateFloor(10, 20)
    floor.rotation.x = Math.PI / 2
    scene.add(box)
    scene.add(floor)

    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000,
    )
    camera.position.x = 1
    camera.position.y = 5
    camera.position.z = 5
    camera.lookAt(new THREE.Vector3(0, 0, -5))

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.querySelector(".webgl").appendChild(renderer.domElement)
    update(renderer, scene, camera)
    return scene
}

function generateFloor(w, d){
    const geometry = new THREE.PlaneGeometry(w, d)
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        side: THREE.DoubleSide,
    })
    const mesh = new THREE.Mesh(geometry, material)
    return mesh
}

function generateBox(w, h, d){
    const geometry = new THREE.BoxGeometry(w, h, d)
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
    })
    const mesh = new THREE.Mesh(geometry, material)
    return mesh
}

function update(renderer, scene, camera){
    renderer.render(scene, camera)
    requestAnimationFrame(function() {
        update(renderer, scene, camera)
    })
}

const scene = main();
console.log(scene)