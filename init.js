import { initContent } from './initContent.js';
import { showTime } from './main.js';
import { addAnimationHide, showElem } from './funciones.js';
const $ = (sel) => document.querySelector(sel)

export const initScene = () => {
    //create DIV for the canvas
    const container = document.createElement( 'div' );
    document.body.appendChild( container );
    const canvas = document.querySelector('#canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, 
        logarithmicDepthBuffer: true,
         antialias: true 
    } );
    const fov = 70;
    const aspect = window.innerWidth / window.innerHeight;  // 2 is the canvas default
    const near = 0.1;
    const far = 50;
    const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.z = 25;
    camera.position.y = 6;
    const scene = new THREE.Scene();

    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    controls.target.set( 0, 1, -5.3 );
    controls.minDistance= 0.2;
    controls.maxDistance= 25;
    //CON ESTO LO QUE HACEMOS ES LIMITAR LA ORBITA A EL SUELO, EL RANGO VA DE 0 A PI SIENDO 0 LA VISTA DESDE ARRIBA Y PI LA VISTA DESDE ABAJO
    controls.maxPolarAngle = Math.PI/2
    
    
    let objects = initContent(scene,camera,renderer)
    
    
    window.addEventListener( 'resize', ()=>{
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }, false );


    THREE.DefaultLoadingManager.onStart = (url, loaded, total) => {
        // console.log(`loading ${url}.  loaded ${loaded} of ${total}`)
        
    }
    THREE.DefaultLoadingManager.onLoad = () => {
        $('#loading-indicator').style.display = 'none'
        $('#click-to-play').style.display = 'block'
        const overlay = $('#overlay');
        const callback = () => {
            addAnimationHide(document.body.querySelector(".container-marquesina"));
        };
        marquesina(callback);
        
        $("#click-to-play").getElementsByTagName('button')
        document.querySelectorAll("#click-to-play button").forEach((elem)=>{
            elem.addEventListener('click',(e)=>{
                addAnimationHide(overlay);
                objects.audios.cumple.play();
                setTimeout(() => {
                    objects.audios.crowd.play()
                }, 12000);
                showTime(camera, e.target.value);
            })
        });
        document.body.querySelector('#volver').addEventListener('click',
        () => {
            showElem(overlay);
        }
        ,false)
        document.body.querySelector('#clue').addEventListener('click',
        () => {
            if(Swal){
                Swal.fire({
                    title: 'A clue!',
                    text: 'Look inside the cake! You can move around by clicking and dragging! Zoom in with the wheel of your mouse!',
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                })
            }else{
                alert('Look inside the cake!')
            }
            
        }
        ,false)
    }
    THREE.DefaultLoadingManager.onProgress = (url, loaded, total) => {
        // console.log(`prog ${url}.  loaded ${loaded} of ${total}`)
        $("#progress").setAttribute('value', 100*(loaded/total))
    }
    THREE.DefaultLoadingManager.onError = (url) => {
        // console.log(`error loading ${url}`)
    }

    return [ renderer, scene, camera, controls, objects];
}