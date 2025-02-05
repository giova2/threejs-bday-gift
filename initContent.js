import { Pointer } from './pointer.js'
import { despejarEntrada, agregarCubos, acercarBolaAzul, randomMeshes, agregarPiramides } from './funciones.js';
const on = (elem, type, cb) => elem.addEventListener(type,cb)

export const initContent = (scene,camera,renderer) => {
    const audiosSrc= {
        sunshine: {src: './assets/audio/sunshine.mp3'},
        crowd: {src: './assets/audio/happy-birthday-crowd.mp3'},
        applause: {src: './assets/audio/small-group-applauding.wav'},
        cheers: {src: './assets/audio/cheers.wav'},
        hidden1: {src: './assets/audio/happy-birthday-music.mp3'},
        aleatorio: {src: './assets/audio/Hidden-message-birthday.mp3'},
        cumple: {src: './assets/audio/happy-birthday-music.mp3'},
    }
    //set the background color of the scene
    let pointer;
    const stage = new THREE.Group()

    //load a cat texture
    const texture_loader = new THREE.TextureLoader()

    const gltf_loader = new THREE.GLTFLoader()
    gltf_loader.load('./assets/birthdaycard.glb', 
        (model)=> {
            model.scene.position.x = -1
            model.scene.position.y = 0
            model.scene.position.z = -1
            stage.add(model.scene)
        }
    )

    //a standard light
    // Luces
    const light = new THREE.DirectionalLight( 0xffffff, 1.0 );
    light.position.set( 0, 10, 25 ).normalize();
    stage.add( light );

    const amb = new THREE.AmbientLight(0xffffff, 0.3);
    stage.add(amb);

    const point = new THREE.PointLight(0xffffff, 1.5);
    point.position.set(0.15, 2.1, -5.8);
    stage.add(point);
    

    const text_loader = new THREE.TTFLoader()
    text_loader.load("./assets/Vollkorn-BlackItalic.ttf", data =>{
        const font = new THREE.FontLoader().parse(data)
        const geo = new THREE.TextBufferGeometry("Happy Birthday [name]!", {
            font: font,
            size: 0.8,
            height: 0.2,
            bevelEnabled: false,
            bevelThickness: 0.2,
            bevelSize: 0.05
        })
        geo.center()
        const mesh = new THREE.Mesh(geo,
            new THREE.MeshStandardMaterial({
                color: '#ff11ff',
                metalness: 0.3,
                roughness: 0.3
            })
        )
        mesh.position.set(0, 3.5, -4)
        
        gsap.to(mesh.scale, 2, {x:1.5, y:1.5, z:1.5, ease: "back.in(1.7)", yoyo:true, repeat:-1 })
        stage.add(mesh)
    })

    // enable stats visible inside VR
    stage.add(camera)

    //class which handles mouse and VR controller
    pointer = new Pointer(stage,renderer,camera, {
        //Pointer searches everything in the scene by default
        //override this to match just certain things
        intersectionFilter: ((o) => o.userData.clickable),
        //make the camera pan when moving the mouse. good for simulating head turning on desktop
        cameraFollowMouse:false,
        // set to true to move the controller node forward and tilt with the mouse.
        // good for testing VR controls on desktop
        mouseSimulatesController:false,
    })

    const targets = []
    //Eventos
    var domEvents	= new THREEx.DomEvents(camera, renderer.domElement);
    // objetos
    var geometryParams = [2, 2, 2];
    var materialParams = { color: 0xFFCC00 };
    const quantity = 50;
    let cubosEntrada = randomMeshes(scene, geometryParams, materialParams, domEvents, quantity);
    const cubos = agregarCubos(scene, texture_loader);

    const piramides = agregarPiramides(scene, domEvents);    

    // creamos una esfera
    const target1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.25),
        new THREE.MeshLambertMaterial({ color: 'red'})
    )
    // controls.target.set( 0, 3, -4 );
    target1.position.set(0, 1, -6)
    target1.name = 'cake'
    targets.push(target1)

    const sol = new THREE.Mesh(
        new THREE.SphereGeometry(2.5),
        new THREE.MeshLambertMaterial({ color: 'yellow'})
    )
    // controls.target.set( 0, 3, -4 );
    sol.position.set(-7, 9, -25)
    sol.name = 'sol'
    targets.push(sol)

    //DEFINIMOS LA BOLA CENTRAL DEL MAPA
    const bola = new THREE.Mesh(
        new THREE.SphereGeometry(0.25),
        new THREE.MeshLambertMaterial({ color: 'blue'})
    )
    bola.position.set(0,1.5,0)
    bola.name = 'cumple';

    gsap.to(bola.scale, 2, {x:3, y:3, z:3, ease: "power2.inOut", yoyo:true, repeat:-1 })
    
    targets.push(bola)
    
    targets.forEach((target) =>{
        target.userData.clickable = true
        stage.add(target)
        on(target, 'click', (e)=>{
            // stage.position.x = -e.target.position.x
            // stage.position.z = -e.target.position.z
            if(e.target.name == "cake"){
                audioAleatorio.play()
            }
            if(e.target.name == "cumple"){
                const delay = despejarEntrada(cubosEntrada);
                acercarBolaAzul(camera.position, delay);
                audioCumple.play()
            }
            if(e.target.name == "sol"){
                // audioAleatorio.play();
                audioSunshine.play()
            }
        })
    })
    cubos.forEach((cubo, index) => {
        cubo.userData.clickable = true
        stage.add(cubo);
        on(cubo, 'click', (e)=>{
            if(index == 0){
                audioCheers.play()
            }
            if(index == 1){
                audioCrowd.play()
            }
            if(index == 2){
                audioApplause.play()
            }
        })
    })
    scene.add(stage)

    const audioListener = new THREE.AudioListener()
    camera.add(audioListener)
    
    const audioAleatorio = new THREE.Audio(audioListener)
    const audioCrowd     = new THREE.Audio(audioListener)
    const audioApplause     = new THREE.Audio(audioListener)
    const audioCheers     = new THREE.Audio(audioListener)
    const audioSunshine   = new THREE.Audio(audioListener)
    const audioHidden1   = new THREE.Audio(audioListener)
    const audioCumple   = new THREE.Audio(audioListener)

    const audioLoader = new THREE.AudioLoader()

    audioLoader.load(audiosSrc.hidden1.src, (mp4)=>{
        audioHidden1.setBuffer(mp4)
        audioHidden1.setVolume( 0.4 )
    })
    audioLoader.load(audiosSrc.cumple.src, (mp4)=>{
        audioCumple.setBuffer(mp4)
    })
    audioLoader.load(audiosSrc.aleatorio.src, (mp4)=>{
        audioAleatorio.setBuffer(mp4)
    })
    audioLoader.load(audiosSrc.crowd.src, (mp4)=>{
        audioCrowd.setBuffer(mp4)
        audioCrowd.setVolume(0.8)
    })
    audioLoader.load(audiosSrc.applause.src, (mp4)=>{
        audioApplause.setBuffer(mp4)
        audioApplause.setVolume(1.3)
    })
    audioLoader.load(audiosSrc.cheers.src, (mp4)=>{
        audioCheers.setBuffer(mp4)
        audioCheers.setVolume(0.8)
    })
    audioLoader.load(audiosSrc.sunshine.src, (mp4)=>{
        audioSunshine.setBuffer(mp4)
        audioSunshine.setVolume(1.2)
    })
    
    const audiosFiles = {
        sunshine: audioSunshine,
        crowd: audioCrowd,
        applause: audioApplause,
        cheers: audioCheers,
        hidden1: audioHidden1,
        aleatorio: audioAleatorio,
        cumple: audioCumple,
    }
    scene.add(new THREE.Mesh(
        new THREE.SphereGeometry(30),
        new THREE.MeshLambertMaterial({
            color: 'white',
            map: texture_loader.load('assets/sky.jpg'),
            side: THREE.BackSide
        })
    ))

    return {cubosEntrada: cubosEntrada, cubos: cubos, secreto: target1, bola: bola, piramides: piramides, audios: audiosFiles};
}