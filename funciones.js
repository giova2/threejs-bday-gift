const on = (elem, type, cb) => elem.addEventListener(type,cb)
//definimos una cantidad de objetos ubicados aleatoriamente
export const randomMeshes = (scene, geometryParams, materialParams, domEvents, quantity) => {
    let objects = [];
    for (let i = 0; i < quantity; i++ ){
        const geometry = new THREE.BoxGeometry(geometryParams[0], geometryParams[1], geometryParams[2]);
        const material = i % 3 == 0 ? new THREE.MeshPhongMaterial(materialParams) : new THREE.MeshLambertMaterial(materialParams);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.times = 0;
        domEvents.addEventListener(mesh, 'mouseover', function(event){
            mesh.times++;
            const tl = new TimelineMax();
            const movimiento = mesh.times % 2 == 0 ? -10 : 10;
            const giro = mesh.times % 2 == 0 ? -Math.PI*2 : Math.PI*2;
            mesh.material.color.setRGB(Math.random(), Math.random(), Math.random());
            tl.to(mesh.scale, .5, {x: .5, ease: Expo.easeOut });
            tl.to(mesh.position, .5, {x: movimiento, ease: Expo.easeOut });
            tl.to(mesh.rotation, .5, {y: giro , ease: Expo.easeOut });
            tl.to(mesh.scale, .5, {x: 1, ease: Expo.easeOut });
        }, false)
        mesh.position.x = (Math.random() - 0.5) * 10;
        mesh.position.y = (Math.random()) * 6;
        mesh.position.z = (Math.random() - 0.5) * 10;
        objects.push(mesh);
        scene.add(mesh);
    }
    return objects;
}

export const agregarCubos = (scene, texture_loader) => {
    //definimos el cubo que tendrá las fotos
    const boxWidth = 3;
    const boxHeight = 3;
    const boxDepth = 3;
    const cubos = [];  // just an array we can use to rotate the cubes
    const origin = /^http:\/\/localhost:4000$/.test(window.location.origin) ? window.location.origin+'/assets/img/' : window.location.origin+'/threejs-bday-gift/assets/img/';
    const definicionCubos = [
        {
            name: "principal",
            posicion: [ 7, 6, -4 ],
            urls:
            [
                `${origin}bday-1.jpeg`,
                `${origin}bday-2.jpeg`,
                `${origin}bday-3.jpeg`,
                `${origin}bday-4.jpeg`,
                `${origin}bday-5.jpeg`,
                `${origin}bday-6.jpg`
            ],
        },
        {
            name: "principal",
            posicion: [ 0, 7, -4 ],
            urls:
            [
                `${origin}bday-7.jpg`,
                `${origin}bday-8.jpg`,
                `${origin}bday-9.jpg`,
                `${origin}bday-10.jpg`,
                `${origin}bday-11.jpeg`,
                `${origin}bday-12.jpeg`
            ],
        },
        {
            name: "principal",
            posicion: [ -7, 6, -4 ],
            urls:
            [
                `${origin}bday-13.jpeg`,
                `${origin}bday-14.jpeg`,
                `${origin}bday-15.jpeg`,
                `${origin}bday-16.jpg`,
                `${origin}bday-17.jpg`,
                `${origin}bday-18.jpg`
            ],
        },
        {
            name: "aleatorio",
            posicion: [ -20, 2, 0 ],
            urls:
            [
                `${origin}bday-19.jpg`,
                `${origin}bday-20.jpg`,
                `${origin}bday-21.jpeg`,
                '',
                `${origin}bday-22.jpeg`,
                `${origin}bday-23.jpeg`
            ],
        },
        {
            name: "aleatorio",
            posicion: [ 20, 2, 0 ],
            urls:
            [
                `${origin}bday-24.jpeg`,
                `${origin}bday-25.jpeg`,
                `${origin}bday-26.jpg`,
                '',
                `${origin}bday-27.jpg`,
                `${origin}bday-28.jpg`
            ],
        },
        {
            name: "aleatorio",
            posicion: [ 13, 2, 10 ],
            urls:
            [
                `${origin}bday-50.jpg`,
                `${origin}bday-26.jpg`,
                `${origin}bday-27.jpg`,
                '',
                `${origin}bday-28.jpg`,
                `${origin}bday-29.jpg`
            ],
        },
        {
            name: "aleatorio",
            posicion: [ -13, 2, 10 ],
            urls:
            [
                `${origin}bday-30.jpg`,
                `${origin}bday-31.jpeg`,
                `${origin}bday-32.jpeg`,
                '',
                `${origin}bday-33.jpeg`,
                `${origin}bday-34.jpeg`
            ],
        },
        {
            name: "aleatorio",
            posicion: [ -15, 2, -8 ],
            urls:
            [
                `${origin}bday-35.jpeg`,
                `${origin}bday-36.jpg`,
                `${origin}bday-37.jpg`,
                '',
                `${origin}bday-38.jpg`,
                `${origin}bday-39.jpg`
            ],
        },
        {
            name: "aleatorio",
            posicion: [ 15, 2, -8 ],
            urls:
            [
                `${origin}bday-40.jpg`,
                `${origin}bday-41.jpg`,
                `${origin}bday-42.jpeg`,
                '',
                `${origin}bday-43.jpeg`,
                `${origin}bday-44.jpeg`
            ],
        },
        {
            name: "aleatorio",
            posicion: [ 2, 2, -14 ],
            urls:
            [
                `${origin}bday-45.jpeg`,
                `${origin}bday-46.jpeg`,
                `${origin}bday-47.jpg`,
                '',
                `${origin}bday-48.jpg`,
                `${origin}bday-49.jpg`
            ],
        },
    ];
    definicionCubos.map(( definicion )=>{
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
        let materials = [];
        definicion.urls.map((url) =>{
            materials.push(new THREE.MeshBasicMaterial({ map: texture_loader.load(url) }));
        });
        const cubeMultiplePictures = new THREE.Mesh(geometry, materials);
        cubeMultiplePictures.position.set(definicion.posicion[0], definicion.posicion[1], definicion.posicion[2]);
        cubeMultiplePictures.name = definicion.name;
        scene.add(cubeMultiplePictures);
        cubos.push(cubeMultiplePictures);
    });
    return cubos;
}


export const acercarBolaAzul = (prop, retraso) => {
    const tl2 = new TimelineMax();
    tl2.to(prop, 3, {z: 3, ease: Expo.easeOut }, retraso);
}

export const despejarEntrada = (objects) => {
    // los eventos se realizan en forma simultanea dado que se crea un TimeLineMax para cada bucle
    const duracion = 0.5;
    objects.map((mesh, index) =>{
        const movimiento = index % 2 == 0 ? -15 : 15;
        const giro = index % 2 == 0 ? -Math.PI*2 : Math.PI*2;
        const tl = new TimelineMax();
        tl.to(mesh.scale, duracion, {x: .5, ease: Expo.easeOut });
        tl.to(mesh.position, duracion, {x: movimiento, ease: Expo.easeOut });
        tl.to(mesh.rotation, duracion, {y: giro , ease: Expo.easeOut });
        tl.to(mesh.scale, duracion, {x: 1, ease: Expo.easeOut });
    });
    return duracion * 4; // se devuelve la duración que deberá tener la animación siguiente para poder hacerla luego de que acabe esta
}

export const addAnimationHide = (elem) => {
    elem.addEventListener('animationend',
    (event) => {
        event.target.classList.add('ocultar');
    },false);
    elem.classList.add('desvanecer');
}

export const showElem = (elem) => {
    elem.classList.remove('ocultar', 'desvanecer');
}

export const agregarPiramides = (scene, domEvents) =>{
    let piramides = []; 
    const ubicaciones = [
        {x: 20, z: 1},
        {x: 20, z: 2},
        {x: 22, z: -9},
        {x: 23, z: -7},
        {x: 25, z: 6},
        {x: 24, z: -11},
        {x: 26, z: -6},
        {x: 21, z: 3},
        {x: -27, z: -10},
        {x: -24, z: -9},
        {x: -23, z: 7},
        {x: -21, z: -7},
        {x: -20, z: 3},
        {x: -18, z: -9},
        
    ]
    ubicaciones.map((ubicacion, index) =>{
        let geometry  = new THREE.CylinderBufferGeometry( 0, 2, 6, 4, 1 );
        let material  = new THREE.MeshPhongMaterial( { color: 0x57a82c, flatShading: true } );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = ubicacion.x;
        mesh.position.y = 0;
        mesh.position.z = ubicacion.z;
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        piramides.push(mesh);
        scene.add( mesh );
        eventColorMesh(mesh, index, domEvents);
    })
    for ( var i = 0; i < 30; i ++ ) {
        let geometry  = new THREE.CylinderBufferGeometry( 0, 2, 6, 4, 1 );
        let material  = new THREE.MeshPhongMaterial( { color: 0x57a82c, flatShading: true } );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = (Math.random() - 0.5) * 45;
        mesh.position.y = 0;
        mesh.position.z = 6 + Math.random() * 25;
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        piramides.push(mesh);
        scene.add( mesh );
        eventColorMesh(mesh, i, domEvents);
    }

    return piramides;
}

const eventColorMesh = (mesh, index, domEvents) => {
    domEvents.addEventListener(mesh, 'mouseover', function(event){
        index % 3 == 1 && mesh.material.color.set(0xff00ff);
        index % 3 == 2 && mesh.material.color.set(0xe0b0ff);
        index % 3 == 0 && mesh.material.color.set(0x832f80);     
    });
    domEvents.addEventListener(mesh, 'mouseout', function(event){
        mesh.material.color.set(0x57a82c);
    });
}
    