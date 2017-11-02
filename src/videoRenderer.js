var AMOUNT = 100;

var container;

var camera, scene, renderer;

var video, image, imageContext, imageReflection, imageReflectionContext, imageReflectionGradient;
var texture, textureReflection;

var mesh;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2, windowHalfY = window.innerHeight / 2;

$(function () {
    var container = $('<div>'); // Might be unused
    $('body').append(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();
    video = document.getElementById('video');

    alert(video.width +" x "+ video.height);

    image = document.createElement('canvas');
    image.width = window.width;
    image.height = window.height;

    imageContext = image.getContext('2d');
    imageContext.fillStyle = '#000000';
    imageContext.fillRect(0, 0, 1920, 1080);
    texture = new THREE.Texture(video);
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.format = THREE.RGBFormat;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    var material = new THREE.MeshBasicMaterial({
        map: texture,
        overdraw: true
    });

    var plane = new THREE.PlaneGeometry(1280, 768, 4, 4);

    mesh = new THREE.Mesh(plane, material);
    scene.add(mesh);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.append($(renderer.domElement));
    $(document).on('mousemove', onDocumentMouseMove);
    $(window).on('resize', onWindowResize);

    animate();
});

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouseX = ( event.clientX - windowHalfX );
    mouseY = ( event.clientY - windowHalfY ) * 0.2;
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    camera.position.x += ( mouseX - camera.position.x ) * 0.05;
    camera.position.y += ( -mouseY - camera.position.y ) * 0.05;
    camera.lookAt(scene.position);
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
	//     imageContext.drawImage(video, 0, 0);
        if (texture) texture.needsUpdate = true;
    }
    renderer.render(scene, camera);
}
