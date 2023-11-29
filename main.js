"use strict";

function main(){
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerHeight / window.innerHeight,
        1,
        1000,
    )

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.querySelector(".webgl").appendChild(renderer.domElement)
    renderer.render(scene, camera)
    
}

main()