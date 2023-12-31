"use strict";

const keyboard = new THREEx.KeyboardState()
const clock = new THREE.Clock()

function main() {
    const scene = new THREE.Scene()

    const gui = new dat.GUI()

    const box = generateBox(1, 1, 1)
    box.name = "box"
    box.position.y = box.geometry.parameters.height / 2

    const sphere = generateSphere(2, 42, 42, "img/texture-abstract.jpg")
    sphere.name = "sphere"
    sphere.position.set(1, 1, 1)

    const floor = generateFloor(10, 20)
    floor.name = "floor"
    floor.rotation.x = Math.PI / 2
    floor.add(box)

    const pointLight = genaretePointLight(0xffffff, 1)
    pointLight.name = "pointLight"
    pointLight.position.y = 5

    const ambientLight = genareteAmbientLight("rgb(222, 222, 0)", 4)
    ambientLight.name = "ambientLight"
    sphere.add(ambientLight)

    gui.add(pointLight, "intensity", 0, 20)
    gui.add(ambientLight, "intensity", 0, 20)

    scene.add(floor)
    scene.add(sphere)
    scene.add(pointLight)
    // loadScene(scene)

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
    renderer.shadowMap.enabled = true
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor("rgb(60, 60, 60)")

    document.querySelector(".webgl").appendChild(renderer.domElement)

    const controls = new THREE.OrbitControls(camera, renderer.domElement)

    update(renderer, scene, camera, controls)
    return scene
}

function loadScene(scene) {
    const loader = new THREE.ObjectLoader()
    loader.load("scenes/scene.json", function (obj) {
        scene.add(obj)
    },
        function (x) {
            console.log(x.loaded / x.total * 100 + "% loaded scene")
        },
        function (err) {
            console.log(err)
        }
    )
    // return scene
}

function generateFloor(w, d) {
    const geometry = new THREE.PlaneGeometry(w, d)
    const material = new THREE.MeshPhongMaterial({
        color: "rgb(100, 100, 100)",
        side: THREE.DoubleSide,
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.receiveShadow = true
    return mesh
}

function generateBox(w, h, d) {
    const geometry = new THREE.BoxGeometry(w, h, d)
    const material = new THREE.MeshPhongMaterial({
        color: "rgb(20, 20, 20)",
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true
    return mesh
}

function generateSphere(radius, hoeensegmente, breitensegmente, texture) {

    const loader = new THREE.TextureLoader()

    const sphereGeometry = new THREE.SphereGeometry(radius, hoeensegmente, breitensegmente)
    const sphereTexture = loader.load(texture)
    const sphereMaterial = new THREE.MeshLambertMaterial({
        map: sphereTexture
    })
    const sphereMash = new THREE.Mesh(sphereGeometry, sphereMaterial)
    return sphereMash
}

function genaretePointLight(color, intensity) {
    const ligtht = new THREE.PointLight(color, intensity)
    ligtht.castShadow = true
    return ligtht
}

function genareteAmbientLight(color, intensity) {
    const ligtht = new THREE.AmbientLight(color, intensity)
    ligtht.castShadow = true
    return ligtht
}

function update(renderer, scene, camera, controls) {
    renderer.render(scene, camera)

    const floor = scene.getObjectByName("floor")
    floor.rotation.x += 0.002

    scene.traverse(function (child) {
        const box = child.getObjectByName("box")
        // box.rotation.y -= 0.2
    })

    controls.update()

    const speed = 10
    const step = speed * clock.getDelta()
    const box = scene.getObjectByName("box")
    const sphere = scene.getObjectByName("sphere")
    if (keyboard.pressed("D")) {
        box.translateX(step)
    }
    if (keyboard.pressed("A")) {
        box.translateX(-step)
    }
    if (keyboard.pressed("W")) {
        box.translateY(step)
    }
    if (keyboard.pressed("S")) {
        box.translateY(-step)
    }
    if (keyboard.pressed(" ")) {
        sphere.rotation.y += step / 2
        sphere.rotation.z += step / 4
    }

    requestAnimationFrame(function () {
        update(renderer, scene, camera, controls)
    })
}

const scene = main();
console.log(scene)