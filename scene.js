import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'
import {ImagesInfo} from "./constants.js";

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

const imagesWithTexturesInfo = ImagesInfo.map((info) => {
    return {...info, urlMap: info.name + '.jpg', urlAlpha: info.name + '_alpha.jpg', map: null, alphaMap: null}
})

const textureLoader = new THREE.TextureLoader();
imagesWithTexturesInfo.forEach((info)=> {
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

imagesWithTexturesInfo.forEach((info) => {
    generateImage({map: info.map, alphaMap: info.alphaMap}, info.position, info.scale)
})


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

    if (mixer !== null) {
        mixer.setTime(THREE.MathUtils.damp(mixer.time, carAnimation.duration * scrollPosition, 3, deltaTime))

        if (mixer.time <= 20.25) {
            carInfo.cabin.mesh.material.color.copy(carInfo.cabin.defaultColor)
            carInfo.body.mesh.material.color.copy(carInfo.body.defaultColor)
        }
        if (mixer.time > 20.25 && mixer.time <= 43.98) {
            carInfo.cabin.mesh.material.color.set(0x0000ff)
            carInfo.body.mesh.material.color.set(0x0000ff)
        }
        if (mixer.time > 43.98) {
            carInfo.cabin.mesh.material.color.set(0xff0000)
            carInfo.body.mesh.material.color.set(0xff0000)
        }
    }

    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}

animate()