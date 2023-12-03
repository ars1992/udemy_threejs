
function init(){
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
    objloader.load("img/wolf_model/Wolf_obj.obj", function(object){
        const body = textureloader.load("img/wolf_model/textures/Wolf_Body.jpg")
        const fur = textureloader.load("img/wolf_model/textures/Wolf_Fur.jpg")

        const bodyMat = new THREE.MeshStandardMaterial({color: "rgb(255, 255, 255)"})
        const furMat = new THREE.MeshStandardMaterial({color: "rgb(255, 255, 255)"})

        object.traverse(function(child){
            if(child.name === 'Wolf_obj_body_Cube.001'){
                child.material = bodyMat
                bodyMat.roughness = 1
                bodyMat.map = body
                bodyMat.metalness = 0
            }

            if(child.name === 'Wolf_obj_fur_Cube.002'){
                child.material = furMat
                furMat.roughness = 1
                furMat.map = fur
                furMat.metalness = 0
            }
        })


        object.scale.x = 4
        object.scale.y = 4
        object.scale.z = 4

        scene.add(object)
    })

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

    requestAnimationFrame(function () {
        update(renderer, scene, camera, controls)
    })
}

 console.log(init())