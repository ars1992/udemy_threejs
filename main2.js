function init(){
    const scene = new THREE.Scene();
    const leftLight = genareteSpotLight

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