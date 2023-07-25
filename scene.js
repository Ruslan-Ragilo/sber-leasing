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
const cameraMaxFarLookAtZPosition = -20;
const cameraMaxNearLookAtZPosition = 18;

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
 * Rails
 */

const generateRail = (position) => {
    const rail = new THREE.Mesh(
        new THREE.PlaneGeometry(0.006, 0.12),
        new THREE.MeshBasicMaterial({
            color: new THREE.Color(0x82857f)
        })
    )
    rail.position.set(...position);
    const euler = new THREE.Euler(-Math.PI * 0.5, 0, -Math.PI * 0.25, 'XYZ');
    rail.quaternion.setFromEuler(euler);
    scene.add(rail)
}

generateRail([0.067, 0.00, -12.075])
generateRail([0.049, 0.00, -12.1])

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
    aspect = sizes.width / sizes.height
    console.log(aspect)
    frustumSize = 3.4 / aspect
    if (aspect < 1) {
        frustumSize *= 0.9
    }
    camera.left = frustumSize * aspect / -2
    camera.right = frustumSize * aspect / 2
    camera.top = frustumSize / 2
    camera.bottom = frustumSize / -2
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */

let aspect = sizes.width / sizes.height
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
        camera.position.z = Math.min(Math.max(carScene.position.z + 7, cameraMaxFarLookAtZPosition + 7), cameraMaxNearLookAtZPosition + 7);
        camera.lookAt(-0.1, 0, Math.min(Math.max(carScene.position.z, cameraMaxFarLookAtZPosition), cameraMaxNearLookAtZPosition))
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