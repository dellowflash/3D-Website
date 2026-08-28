// ================================
// THREE.JS 3D ANIMATION
// ================================

const canvas = document.getElementById("three-canvas");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 7;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


// ================================
// MAIN 3D OBJECT
// ================================

const geometry = new THREE.IcosahedronGeometry(2, 1);

const material = new THREE.MeshStandardMaterial({
    color: 0x8a2be2,
    metalness: 0.7,
    roughness: 0.2,
    wireframe: false
});

const sphere = new THREE.Mesh(geometry, material);

sphere.position.set(3, 0, 0);

scene.add(sphere);


// Wireframe around sphere
const wireGeometry = new THREE.IcosahedronGeometry(2.15, 2);

const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0xc77dff,
    wireframe: true,
    transparent: true,
    opacity: 0.25
});

const wireSphere = new THREE.Mesh(
    wireGeometry,
    wireMaterial
);

wireSphere.position.copy(sphere.position);

scene.add(wireSphere);


// ================================
// LIGHTING
// ================================

const light = new THREE.PointLight(
    0xffffff,
    2,
    100
);

light.position.set(5, 5, 5);
scene.add(light);

const purpleLight = new THREE.PointLight(
    0x8a2be2,
    5,
    100
);

purpleLight.position.set(-5, -3, 5);
scene.add(purpleLight);


// ================================
// PARTICLES / STARS
// ================================

const particlesGeometry = new THREE.BufferGeometry();

const particlesCount = 800;

const positions = new Float32Array(
    particlesCount * 3
);

for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 30;
}

particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
);

const particlesMaterial =
    new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.03
    });

const particles = new THREE.Points(
    particlesGeometry,
    particlesMaterial
);

scene.add(particles);


// ================================
// MOUSE INTERACTION
// ================================

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (event) => {

    mouseX =
        (event.clientX / window.innerWidth - 0.5) * 2;

    mouseY =
        (event.clientY / window.innerHeight - 0.5) * 2;
});


// ================================
// ANIMATION LOOP
// ================================

function animate() {

    requestAnimationFrame(animate);

    // Rotate object
    sphere.rotation.x += 0.005;
    sphere.rotation.y += 0.008;

    wireSphere.rotation.x -= 0.003;
    wireSphere.rotation.y -= 0.005;

    // Floating animation
    sphere.position.y =
        Math.sin(Date.now() * 0.001) * 0.4;

    wireSphere.position.y =
        sphere.position.y;

    // Mouse movement effect
    sphere.rotation.x += mouseY * 0.003;
    sphere.rotation.y += mouseX * 0.003;

    // Particle movement
    particles.rotation.y += 0.0005;

    renderer.render(scene, camera);
}

animate();


// ================================
// WINDOW RESIZE
// ================================

window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});


// ================================
// BUTTON FUNCTIONS
// ================================

document.getElementById("exploreBtn")
    .addEventListener("click", () => {

        document.getElementById("about")
            .scrollIntoView({
                behavior: "smooth"
            });
    });


function showMessage() {

    document.getElementById("message").innerHTML =
        "🚀 Your 3D journey starts here!";
}