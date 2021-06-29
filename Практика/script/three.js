
var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH, renderer, container, models, LOADING_MANAGER, IMAGE_LOADER, OBJ_LOADER;

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
	camera.lookAt(scene.position);

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
function initLoaders() {
	LOADING_MANAGER = new THREE.LoadingManager();
	IMAGE_LOADER = new THREE.ImageLoader(LOADING_MANAGER);
	OBJ_LOADER = new THREE.OBJLoader(LOADING_MANAGER);
}




function init() {
	
	// настраиваем сцену, камеру и рендер
	createScene();

	// add the lights
	createLights();


	//add models
	OBJ_LOADER.load('models/Mouse.obj', (object) => {
		object.scale.x = 0.3;
		object.scale.y = 0.3;
		object.scale.z = 0.3;
		object.rotation.x = -Math.PI / 2;
		object.position.y = -30;

		OBJECT = object;
		scene.add(OBJECT);
	});

	renderer.render(scene, camera);
	
}


window.onload = function () {
	init();
}




