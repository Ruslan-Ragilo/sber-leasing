import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'
import {TEXTURES} from "./constants.js";

/**
 * Variables
 */

let mixer = null;
let carScene = null;
let carInfo = {
    cabin: {mesh: null, defaultColor: null, secondColor: [1,  0, 1]},
    body: {mesh: null, defaultColor: null, secondColor: [1,  0, 1]}
};
let carAnimation = null;

/**
 * Canvas
 */

const canvas = document.querySelector('canvas.webgl')

/**
 * Scene
 */

const scene = new THREE.Scene()
// scene.background = new THREE.Color(0xf0f0f0);


/**
 * Textures
 */

const texturesInfo = TEXTURES.map((name) => {
    return {name: name, urlMap: name + '.jpg', urlAlpha: name + '_alpha.jpg', map: null, alphaMap: null}
})

const textureLoader = new THREE.TextureLoader();
texturesInfo.forEach((info)=> {
    info.map = textureLoader.load('/scene/textures/' + info.urlMap, (loadedTexture) => {
        loadedTexture.colorSpace = THREE.SRGBColorSpace
    });
    info.alphaMap = textureLoader.load('/scene/textures/' + info.urlAlpha, (loadedTexture) => {
        loadedTexture.colorSpace = THREE.SRGBColorSpace
    });
})

/**
 * Models
 */

const dracoLoader = new DRACOLoader()
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

gltfLoader.load(
    '/scene/models/road.glb',
    (gltf) => {
        gltf.scene.position.x -= 0.11
        scene.add(gltf.scene)
    }
)

gltfLoader.load(
    '/scene/models/car.glb',
    (gltf) => {
        mixer = new THREE.AnimationMixer(gltf.scene)
        carScene = gltf.scene.children[1]
        carInfo.body.mesh = carScene.children[0]
        carInfo.cabin.mesh = carScene.children[5]
        carInfo.cabin.defaultColor = carInfo.cabin.mesh.material.color.clone()
        carInfo.body.defaultColor = carInfo.body.mesh.material.color.clone()
        carAnimation = gltf.animations[0]
        const action = mixer.clipAction(carAnimation)
        action.play()
        // console.log(carAnimation.duration * scrollPosition)
        mixer.setTime(carAnimation.duration * scrollPosition)
        gltf.scene.position.x -= 0.11
        scene.add(gltf.scene)
    }
)

/**
 * Images
 */
const generateImage = (textures, position, scale) => {
    const image = new THREE.Mesh(
        new THREE.PlaneGeometry(scale, scale),
        new THREE.MeshBasicMaterial({
            map: textures.map,
            alphaMap: textures.alphaMap,
            transparent: true
        })
    )
    image.position.set(...position);
    image.rotation.x -= Math.PI * 0.21
    scene.add(image)
}

const findLoadedImageByName = (name) => {
    const textures = texturesInfo.find((info)=> info.name === name)
    return {map: textures.map, alphaMap: textures.alphaMap}
}

generateImage( findLoadedImageByName('img_1_top'), [0.385, 0.5, -18.552], 1.8)
generateImage( findLoadedImageByName('img_1_bottom'), [0.385, -2.0, -22.06], 1.8)
generateImage( findLoadedImageByName('img_2'), [0.995, 0.0, -17.535], 0.7)
generateImage( findLoadedImageByName('img_3'), [-1, 0.0, -16.775], 1.8)
generateImage( findLoadedImageByName('img_4'), [0.45, 0.0, -13.945], 0.7)
generateImage( findLoadedImageByName('img_5'), [0.105, -3.0, -16.94], 4.5)
generateImage( findLoadedImageByName('img_5_top'), [0.033, 2.0, -9.24], 0.14)
generateImage( findLoadedImageByName('img_6'), [-0.23, 0.5, -9.795], 1.3)
generateImage( findLoadedImageByName('img_7_bottom'), [-0.095, -1.0, -9.9], 1.2)
generateImage( findLoadedImageByName('img_7_top'), [-0.095, 1.0, -7.1], 1.2)
generateImage( findLoadedImageByName('img_8_bottom'), [-0.45, 0, -7.14], 1.2)
generateImage( findLoadedImageByName('img_8_top'), [0.55, 0, -6.6], 0.8)
generateImage( findLoadedImageByName('img_9_bottom'), [-0.95, 0, -4.6], 2.2)
generateImage( findLoadedImageByName('img_9_top'), [1.4, 0, -3.9], 2.5)
generateImage( findLoadedImageByName('img_10_top'), [-0.4, 0, -2.75], 0.7)
generateImage( findLoadedImageByName('img_11_top'), [0.21, 1, 0.67], 1.1)
generateImage( findLoadedImageByName('img_11_bottom'), [-0.57, 0, -1.53], 1.6)
generateImage( findLoadedImageByName('img_12'), [0.95, 0, 0.9], 2.2)
generateImage( findLoadedImageByName('img_13'), [-0.95, 0, 3.8], 1.3)
generateImage( findLoadedImageByName('img_14'), [0.5, 0, 5.3], 1.1)
generateImage( findLoadedImageByName('img_15_1'), [-0.45, 0, 6.8], 0.55)
generateImage( findLoadedImageByName('img_15_2'), [-0.34, -1, 6.43], 1.2)
generateImage( findLoadedImageByName('img_15_2_top'), [-0.34, 1, 9.23], 1.2)
generateImage( findLoadedImageByName('img_15_3'), [-0.47, 0.2, 8.86], 0.40)
generateImage( findLoadedImageByName('img_15_4'), [0.07, 0, 8.72], 0.40)
generateImage( findLoadedImageByName('img_16_bottom'), [-0.14, -2, 7.45], 3.5)
generateImage( findLoadedImageByName('img_16_top'), [-0.055, 1, 11.75], 0.55)
generateImage( findLoadedImageByName('img_17'), [-0.34, 1, 15.55], 1.0)
generateImage( findLoadedImageByName('img_18'), [0.43, 0, 16.8], 1.0)


/**
 * Light
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

/**
 * Sizes
 */

const sizes = {
    width: document.body.clientWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    sizes.width = document.body.clientWidth
    sizes.height = window.innerHeight
    const newAspectRatio = sizes.width / sizes.height
    console.log(newAspectRatio)
    frustumSize = 3.4 / newAspectRatio
    if (newAspectRatio < 1) {
        frustumSize *= 0.9
    }
    camera.left = frustumSize * newAspectRatio / -2
    camera.right = frustumSize * newAspectRatio / 2
    camera.top = frustumSize / 2
    camera.bottom = frustumSize / -2
    camera.updateProjectionMatrix()
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */

const aspect = sizes.width / sizes.height
let frustumSize = 3.4 / aspect
if (aspect < 1) {
    frustumSize *= 0.9
}

console.log(aspect)
const camera = new THREE.OrthographicCamera(
    frustumSize * aspect / -2,
    frustumSize * aspect / 2,
    frustumSize / 2,
    frustumSize / -2,
    0.1,
    20
);
camera.position.set(-0.1, 5, 0);
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Scroll
 */

const scrollContainer = document.querySelector('div.canvas-wrapper')
let scrollPosition = (canvas.offsetTop) / scrollContainer.clientHeight;

window.addEventListener('scroll', function () {

    // console.log(canvas.offsetTop)
    // console.dir(-(scrollContainer.getBoundingClientRect().top / scrollContainer.clientHeight))
    // console.log((canvas.offsetTop) / scrollContainer.clientHeight)
    // scrollPosition = Math.min(
    //     (canvas.offsetTop + sizes.height) / scrollContainer.clientHeight,
    //     (scrollContainer.clientHeight - (sizes.height) / 2) / scrollContainer.clientHeight
    // );
    scrollPosition = -((scrollContainer.getBoundingClientRect().top -( sizes.height / 2) ) / scrollContainer.clientHeight)
    scrollPosition = Math.min(Math.max(scrollPosition, 0.04), 0.96);
    console.log(scrollPosition)
    // console.log(scrollPosition)
});


/**
 * Animation
 */


const clock = new THREE.Clock()
let previousTime = 0

const animate = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    if (carScene !== null) {
        camera.position.z = Math.min(Math.max(carScene.position.z + 7, -13), 25);
        // camera.lookAt = Math.min(Math.max(scrollPosition, -15), 15);
        camera.lookAt(-0.1, 0, Math.min(Math.max(carScene.position.z, -20), 18))
        //
        // camera.position.z = carScene.position.z + 7;
        // camera.lookAt(-0.1, 0, carScene.position.z)
    }

    // console.log(carInfo)

    if (mixer !== null) {
        // console.log(mixer.time)
        // mixer.setTime(carAnimation.duration * scrollPosition)
        // console.log(carAnimation.duration * scrollPosition)
        mixer.setTime(THREE.MathUtils.damp(mixer.time, carAnimation.duration * scrollPosition, 3, deltaTime))

        if (mixer.time <= 20.25) {
            carInfo.cabin.mesh.material.color.copy(carInfo.cabin.defaultColor)
            carInfo.body.mesh.material.color.copy(carInfo.body.defaultColor)
        }
        if (mixer.time > 20.25 && mixer.time <= 43.98) {
            carInfo.cabin.mesh.material.color.set(0x0000ff)
            carInfo.body.mesh.material.color.set(0x0000ff)
            // car.children.forEach((c) => {
            //     c.material.color.set(0x0000ff)
            // })
        }
        if (mixer.time > 43.98) {
            // console.log(car)

            carInfo.cabin.mesh.material.color.set(0xff0000)
            carInfo.body.mesh.material.color.set(0xff0000)
            // car.children.forEach((c) => {
            //     c.material.color.set(0x0000ff)
            // })
        }
    }

    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}

animate()