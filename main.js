"use strict";

function main(){
    const scene = new THREE.Scene()
    const box = generateBox(1, 1, 1)
    box.translateZ(-5)
    scene.add(box)

    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerHeight / window.innerHeight,
        1,
        1000,
    )
    camera.position.x = 0
    camera.position.y = 5
    camera.position.z = 0
    camera.lookAt(new THREE.Vector3(0, 0, -5))

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.querySelector(".webgl").appendChild(renderer.domElement)
    renderer.render(scene, camera)
    
}

function generateBox(w, h, d){
    const geometry = new THREE.BoxGeometry(w, h, d)
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
    })
    const mesh = new THREE.Mesh(geometry, material)
    return mesh
}

main()