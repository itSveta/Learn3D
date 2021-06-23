var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH, renderer, container;
var Colors = {
	red:0xf25346,
	white:0xd8d0d1,
	brown:0x59332e,
	brownDark:0x23190f,
	pink:0xF5986E,
	yellow:0xf4ce93,
	blue:0x68c3c0,

};
var hemisphereLight, shadowLight;
function createScene() {
	// Получаем ширину и высоту экрана,
// используем их для настройки соотношения сторон камеры
// и размер рендерера.
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;

	// Создаем сцену
	scene = new THREE.Scene();

	// Добавляем на сцену эффект тумана; того же цвета, что и
// цвет фона, используемый в таблице стилей
	scene.fog = new THREE.Fog(0xf25346, 100, 950);

	// Создаем камеру
	aspectRatio = WIDTH / HEIGHT;
	fieldOfView = 60;
	nearPlane = 1;
	farPlane = 10000;
	camera = new THREE.PerspectiveCamera(
		fieldOfView,
		aspectRatio,
		nearPlane,
		farPlane
	);

	// Задаем позицию камеры
	camera.position.x = 0;
	camera.position.z = 200;
	camera.position.y = 100;

	// Ренедер
	renderer = new THREE.WebGLRenderer({
		// Разрешить прозрачность отображать градиентный фон
// мы определили в CSS
		alpha: true,

		// Активируем сглаживание; это менее эффективно,
// но, поскольку наш проект основан на low-poly, все должно быть хорошо :)
		antialias: true
	});

// Определяем размер рендерера; в таком случае,
// он заполнит весь экран
	renderer.setSize(WIDTH, HEIGHT);

	// Включаем рендеринг теней
	renderer.shadowMap.enabled = true;

	// Добавляем элемент DOM рендерера в
// контейнер, который мы создали в HTML
	container = document.getElementById('WebGL-output');
	container.appendChild(renderer.domElement);

// Слушаем экран: если пользователь изменяет его размер
// нам нужно обновить камеру и размер рендерера
	window.addEventListener('resize', handleWindowResize, false);
}
function handleWindowResize() {

	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}
function createLights() {
	// Свет в виде полусферы - это свет градиентного цвета;
// первый параметр - цвет неба, второй параметр - цвет земли,
// третий параметр - интенсивность света
	hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)

// Направленный свет светит с определенного направления.
// Он действует как солнце, это означает, что все испускаемые лучи параллельны.
	shadowLight = new THREE.DirectionalLight(0xffffff, .9);

	// Устанавливаем направление света
	shadowLight.position.set(150, 350, 350);

// Разрешить отбрасывание тени
	shadowLight.castShadow = true;

	// определяем видимую область проецируемой тени
	shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;

	// определяем разрешение тени; чем выше тем лучше,
// но также более дорогой и менее производительный
	shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;


	scene.add(hemisphereLight);
	scene.add(shadowLight);
}
// First let's define a Sea object :
Sea = function(){

	// create the geometry (shape) of the cylinder;
	// the parameters are:
	// radius top, radius bottom, height, number of segments on the radius, number of segments vertically
	var geom = new THREE.CylinderGeometry(600,600,800,40,10);

	// rotate the geometry on the x axis
	geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));

	// create the material
	var mat = new THREE.MeshPhongMaterial({
		color:Colors.blue,
		transparent:true,
		opacity:.6,
		shading:THREE.FlatShading,
	});

	// To create an object in Three.js, we have to create a mesh
	// which is a combination of a geometry and some material
	this.mesh = new THREE.Mesh(geom, mat);

	// Allow the sea to receive shadows
	this.mesh.receiveShadow = true;
}
// Instantiate the sea and add it to the scene:
var sea;
function createSea(){
	sea = new Sea();

	// push it a little bit at the bottom of the scene
	sea.mesh.position.y = -600;

	// add the mesh of the sea to the scene
	scene.add(sea.mesh);
}
Cloud = function(){
	// Create an empty container that will hold the different parts of the cloud
	this.mesh = new THREE.Object3D();

	// create a cube geometry;
	// this shape will be duplicated to create the cloud
	var geom = new THREE.BoxGeometry(20,20,20);

	// create a material; a simple white material will do the trick
	var mat = new THREE.MeshPhongMaterial({
		color:Colors.white,
	});

	// duplicate the geometry a random number of times
	var nBlocs = 3+Math.floor(Math.random()*3);
	for (var i=0; i<nBlocs; i++ ){

		// create the mesh by cloning the geometry
		var m = new THREE.Mesh(geom, mat);

		// set the position and the rotation of each cube randomly
		m.position.x = i*15;
		m.position.y = Math.random()*10;
		m.position.z = Math.random()*10;
		m.rotation.z = Math.random()*Math.PI*2;
		m.rotation.y = Math.random()*Math.PI*2;

		// set the size of the cube randomly
		var s = .1 + Math.random()*.9;
		m.scale.set(s,s,s);

		// allow each cube to cast and to receive shadows
		m.castShadow = true;
		m.receiveShadow = true;

		// add the cube to the container we first created
		this.mesh.add(m);
	}
}

function init() {
	// настраиваем сцену, камеру и рендер
	createScene();

	// add the lights
	createLights();

	// add the objects
	//createPlane();
	createSea();
	//createSky();
	renderer.render(scene, camera);
	// start a loop that will update the objects' positions
	// and render the scene on each frame
	//loop();
}


window.onload = function() {

	init();
}

