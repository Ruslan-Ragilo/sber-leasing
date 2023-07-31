import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'
import {ImagesInfo} from "./constants.js";

/**
 * Variables
 */

let mixer = null;
let carMoving = null;
let carInfo = {
    cabin: {mesh: null, firstMaterial: null, secondMaterial: [], thirdMaterial: []},
    body: {mesh: null, firstMaterial: null, secondMaterial: [], thirdMaterial: []}
};
let carAnimation = null;
const cameraMaxFarLookAtZPosition = -19.2;
const cameraMaxNearLookAtZPosition = 17.7;
const cameraXPosition = -0.01;
const objectsList = []
const triggeredObjects = [];

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
    return {...info, urlMap: info.name + '.jpg', urlAlpha: info.name + '_a.jpg', map: null, alphaMap: null}
})

// const blockWithTextInfo = BlockWithTextInfo.map((info) => {
//     return {...info, urlMap: info.name + '.png', map: null}
// })


const textureLoader = new THREE.TextureLoader()

const shadowCarAlpha = textureLoader.load('/scene/textures/images/shadow_car_alpha.jpg',(loadedTexture) => {
    loadedTexture.colorSpace = THREE.SRGBColorSpace
});
imagesWithTexturesInfo.forEach((info)=> {
    info.map = textureLoader.load('/scene/textures/images/' + info.urlMap, (loadedTexture) => {
        loadedTexture.colorSpace = THREE.SRGBColorSpace
    });
    info.alphaMap = textureLoader.load('/scene/textures/images/' + info.urlAlpha, (loadedTexture) => {
        loadedTexture.colorSpace = THREE.SRGBColorSpace
    });
})

// blockWithTextInfo.forEach((info)=> {
//     info.map = textureLoader.load('/scene/textures/text/' + info.urlMap, (loadedTexture) => {
//
//
//         loadedTexture.magFilter = THREE.NearestFilter
//
//         // loadedTexture.minFilter = THREE.LinearFilter
//         loadedTexture.generateMipmaps = false
//         loadedTexture.colorSpace = THREE.SRGBColorSpace
//
//     });
// })

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
        carMoving = gltf.scene.children[0]
        carMoving.add(generateShadow())
        const carSecond = gltf.scene.children[2]
        const carThird = gltf.scene.children[3]
        carInfo.body.mesh = carMoving.children[0]
        carInfo.cabin.mesh = carMoving.children[5]
        carInfo.body.firstMaterial = carSecond.children[4].material.clone()
        carInfo.body.secondMaterial = carThird.children[5].material.clone()
        carInfo.body.thirdMaterial = carMoving.children[0].material.clone()
        carInfo.cabin.firstMaterial = carSecond.children[0].material.clone()
        carInfo.cabin.secondMaterial = carThird.children[0].material.clone()
        carInfo.cabin.thirdMaterial = carMoving.children[5].material.clone()
        carSecond.position.x = 10
        carThird.position.x = 10
        carAnimation = gltf.animations[0]
        const action = mixer.clipAction(carAnimation)
        action.play()
        mixer.setTime(carAnimation.duration * scrollPosition)
        objectsList.forEach((img)=> {
            if (img.fadeInStartPosition <= carMoving.position.z) {
                img.mesh.material.opacity = 1;
                triggeredObjects.push(img)
            }
        })
        gltf.scene.position.x -= 0.11
        scene.add(gltf.scene)
    }
)

/**
 * Images
 */
const generateImage = (textures, position, scale, fadeInStartPosition) => {
    const image = new THREE.Mesh(
        new THREE.PlaneGeometry(scale, scale),
        new THREE.MeshBasicMaterial({
            map: textures.map,
            alphaMap: textures.alphaMap,
            transparent: true,
            opacity: 0
        })
    )
    image.position.set(...position);
    image.rotation.x -= Math.PI * 0.21;
    objectsList.push({mesh: image, fadeInStartPosition: fadeInStartPosition});
    scene.add(image)
}

imagesWithTexturesInfo.forEach((info) => {
    generateImage({map: info.map, alphaMap: info.alphaMap}, info.position, info.scale, info.fadeInStartPosition)
})

// blockWithTextInfo.forEach((info) => {
//     generateImage({map: info.map, alphaMap: null}, info.position, info.scale)
// })

/**
 * Rails
 */

const generateRail = (position) => {
    const rail = new THREE.Mesh(
        new THREE.PlaneGeometry(0.0045, 0.085),
        new THREE.MeshBasicMaterial({
            color: new THREE.Color(0x7a888f),
            opacity: 0,
            transparent: true
        })
    )
    rail.position.set(...position);
    const euler = new THREE.Euler(-Math.PI * 0.5, 0, -Math.PI * 0.25, 'XYZ');
    rail.quaternion.setFromEuler(euler);
    objectsList.push({mesh: rail, fadeInStartPosition: -11.8});
    scene.add(rail)
}

generateRail([0.12, 0.00, -12.025])
generateRail([0.14, 0.00, -12.01])

/**
 * Shadow
 */

const generateShadow = () => {
    const shadow = new THREE.Mesh(
        new THREE.PlaneGeometry(2.7, 4.2),
        new THREE.MeshBasicMaterial({
            color: new THREE.Color(0x212020),
            opacity: 1,
            alphaMap: shadowCarAlpha,
            transparent: true
        })
    )
    shadow.position.x -= 1.5;
    shadow.position.z -= 0.5;
    shadow.rotation.x -= Math.PI * 0.5;

    return shadow
}

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
    frustumSize = 2.4 / aspect
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
let frustumSize = 2.4 / aspect
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
camera.position.set(cameraXPosition, 5, 0);
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
    scrollPosition = -((scrollContainer.getBoundingClientRect().top ) / (scrollContainer.clientHeight + (sizes.height * 2)))
    scrollPosition += 0.065
    scrollPosition = Math.min(Math.max(scrollPosition, 0.065), 0.945);
});


/**
 * Animation
 */

const clock = new THREE.Clock()
let previousTime = 0

const calculateDistanceZ = (position1, position2) => {
    const dz = position1 - position2;
    return Math.abs(dz);
};

const animateCarMaterials = () => {
    const carTime = mixer.time;
    if (carTime <= 20.25) {
        carInfo.cabin.mesh.material = carInfo.cabin.firstMaterial;
        carInfo.body.mesh.material = carInfo.body.firstMaterial;
    } else if (carTime <= 43.98) {
        carInfo.cabin.mesh.material = carInfo.cabin.secondMaterial;
        carInfo.body.mesh.material = carInfo.body.secondMaterial;
    } else {
        carInfo.cabin.mesh.material = carInfo.cabin.thirdMaterial;
        carInfo.body.mesh.material = carInfo.body.thirdMaterial;
    }
};

const animateObjects = () => {
    objectsList.forEach((obj) => {
        if (!triggeredObjects.includes(obj)) {
            const distanceZ = calculateDistanceZ(carMoving.position.z, obj.fadeInStartPosition);
            if (distanceZ < 1) {
                gsap.to(obj.mesh.material, { opacity: 1, duration: 0.8, ease: Power2.easeIn });
                triggeredObjects.push(obj);
            }
        }
    });
};

const animate = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    if (carMoving !== null) {
        const carZPosition = carMoving.position.z + 7;
        const clampedZPosition = Math.min(Math.max(carZPosition, cameraMaxFarLookAtZPosition + 7), cameraMaxNearLookAtZPosition + 7);
        const clampedLookAtZPosition = Math.min(Math.max(carMoving.position.z, cameraMaxFarLookAtZPosition), cameraMaxNearLookAtZPosition);

        camera.position.z = clampedZPosition;
        camera.lookAt(cameraXPosition, 0, clampedLookAtZPosition);

        animateObjects();
        mixer.setTime(THREE.MathUtils.damp(mixer.time, carAnimation.duration * scrollPosition, 3, deltaTime));
        animateCarMaterials();
    }

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};

animate();