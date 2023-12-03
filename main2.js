const keyboard = new THREEx.KeyboardState()
const clock = new THREE.Clock()

function init() {
    const scene = new THREE.Scene();

    const leftLight = genareteSpotLight("rgb(255, 200, 200)", 0.5)
    leftLight.name = "leftLight"

    const rightLight = genareteSpotLight("rgb(255, 200, 200)", 1.5)
    rightLight.name = "rightLight"

    leftLight.position.set(6, 8, 9)
    rightLight.position.set(30, 20, -10)

    const filenamesBackround = ["px", "nx", "py", "ny", "pz", "nz"]
    const reflectionCube = new THREE.CubeTextureLoader().load(
        filenamesBackround.map(
            function (filename) {
                return "img/backround/" + filename + ".jpg"
            }
        )
    )
    scene.background = reflectionCube
    scene.add(leftLight)
    scene.add(rightLight)


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

    const objloader = new THREE.OBJLoader()
    const textureloader = new THREE.TextureLoader()
    objloader.load("img/wolf_model/Wolf_obj.obj", function (object) {
        const body = textureloader.load("img/wolf_model/textures/Wolf_Body.jpg")
        const fur = textureloader.load("img/wolf_model/textures/Wolf_Fur.jpg")

        const bodyMat = new THREE.MeshStandardMaterial({ color: "rgb(255, 255, 255)" })
        const furMat = new THREE.MeshStandardMaterial({ color: "rgb(255, 255, 255)" })

        object.traverse(function (child) {
            if (child.name === 'Wolf_obj_body_Cube.001') {
                child.material = bodyMat
                bodyMat.roughness = 1
                bodyMat.map = body
                bodyMat.metalness = 0
            }

            if (child.name === 'Wolf_obj_fur_Cube.002') {
                child.material = furMat
                furMat.roughness = 1
                furMat.map = fur
                furMat.metalness = 0
            }
        })

        object.scale.x = 4
        object.scale.y = 4
        object.scale.z = 4
        object.name = "wolf"

        scene.add(object)
    })

    const particleSystem = new THREE.Geometry()
    const particleMat = new THREE.PointsMaterial({
        color: "rgb(255, 255, 255)",
        size: 0.5,
        map: new THREE.TextureLoader().load("img/particle.jpg"),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    })

    const particelAmount = 50_000
    for (let i = 0; i < particelAmount; i++) {
        const particle = new THREE.Vector3(Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100)
        particleSystem.vertices.push(particle)
    }
    const particles = new THREE.Points(particleSystem, particleMat)
    particles.name = "particles"
    scene.add(particles)

    const renderer = new THREE.WebGLRenderer()
    renderer.shadowMap.enabled = true
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor("rgb(60, 60, 60)")

    document.querySelector(".webgl").appendChild(renderer.domElement)

    const controls = new THREE.OrbitControls(camera, renderer.domElement)

    update(renderer, scene, camera, controls)
    return scene
}

function genareteSpotLight(color, intensity) {
    const ligtht = new THREE.SpotLight(color, intensity)
    ligtht.castShadow = true
    ligtht.penumbra = 0.5
    ligtht.shadow.mapSize.width = 2048
    ligtht.shadow.mapSize.hight = 2048
    ligtht.shadow.bias = 0.001
    return ligtht
}

function update(renderer, scene, camera, controls) {
    renderer.render(scene, camera)

    controls.update()

    const particles = scene.getObjectByName("particles")
    particles.geometry.vertices.forEach(function(p) {
        p.x -= Math.random() * 0.11 * 2
        p.y -= Math.random() * 0.02 * 2
        p.z += Math.random() * 0.05 * 2

        if(p.x < -100){
            p.x += 100
        }
        if(p.y < -100){
            p.y += 100
        }
        if(p.z > 100){
            p.z += 100
        }
    })

    particles.geometry.verticesNeedUpdate = true

    const speed = 10
    const step = speed * clock.getDelta()
    const wolf = scene.getObjectByName("wolf")

    if (keyboard.pressed("D")) {
        wolf.rotation.y = 0
        wolf.translateX(step)
    }
    if (keyboard.pressed("A")) {
        wolf.rotation.y = 0
        wolf.translateX(-step)
    }
    if (keyboard.pressed("W")) {
        wolf.rotation.y = 0
        wolf.translateZ(step)
    }
    if (keyboard.pressed("S")) {
        wolf.rotation.y = Math.PI
        wolf.translateZ(step)
    }


    requestAnimationFrame(function () {
        update(renderer, scene, camera, controls)
    })
}

console.log(init())