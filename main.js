import { initScene } from './init.js';
import { acercarBolaAzul, despejarEntrada } from './funciones.js';
import {POINTER_CLICK, POINTER_ENTER, POINTER_EXIT, Pointer} from './pointer.js'

var renderer, scene, camera, controls, objects;
[renderer, scene, camera, controls, objects] = initScene();
// capturador de rayos que nos sirve para interceptar objetos con el mouse
{
    const color = 0xFFFFFF;  // white
    // const near = 1;
    // const far = 70;
    /**
     * FogExp2 is closer to reality but Fog is used more commonly since it 
     * lets you choose a place to apply the fog so you can decide to show a 
     * clear scene up to a certain distance and then fade out to some color past that distance.
     */
    //   const density = 0.1;
    //   scene.fog = new THREE.FogExp2(color, density);
    // scene.fog = new THREE.Fog(color, near, far);
    scene.background = new THREE.Color(color);
}

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var render = (time) => {
    time *= 0.001;

    objects.cubos.forEach((cube, ndx) => {
        const speed = .2 + ndx * .1;
        const rot = time * speed;
        
        if(cube.name == "principal"){
            cube.rotation.x = rot;
        }
        cube.rotation.y = rot +1;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

setInterval(() => {
    const r = Math.random(), g = Math.random(), b = Math.random();
    objects.secreto.material.emissive.setRGB(r, g, b);
    objects.secreto.material.color.setRGB(r, g, b);
}, 500);


const onMouseMove = (event) => {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1; //obtiene la coordenada del mouse en el eje x
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1; //obtiene la coordenada del mouse en el eje y
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);
    intersects.map((intersection) => {
        // console.log('intersection', intersection);
        const tl = new TimelineMax();
        tl.to(intersection.object.scale, .5, {x:.5, ease: Expo.easeOut });
        tl.to(intersection.object.position, .5, {x: 5, ease: Expo.easeOut });
        tl.to(intersection.object.rotation, .5, {y: Math.PI*2 , ease: Expo.easeOut });
    }); 
}

// document.body.addEventListener('mousemove', onMouseMove, false);

export const showTime = (camera, modo) =>{

    
    setTimeout(() => {
        if(modo == 'a'){
            const delay = despejarEntrada(objects.cubosEntrada);
            acercarBolaAzul(camera.position, delay);
        }
    }
    ,1000);
}

requestAnimationFrame(render);
