
    var keyboard = new THREEx.KeyboardState();
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.y = 12;
    scene.add( cube );

    var cubeVelocity = 0.1;
    
    addLight(10, 50, 130);

    camera.position.z = 3;
    camera.position.y = 1.5;

    var environment = new Environment(scene, window.innerWidth, 1000, 0);
    environment.createGround();
    environment.createRoad();
    environment.createSky();
    var car = environment.createCar();
    car.velocity = 0;
    car.add(camera);


    function processKeyboard(){
      if(keyboard.pressed("w") && car.velocity > -3) {
        car.velocity -= 0.1;
      }else if(keyboard.pressed("s") && car.velocity < 3) {
        car.velocity += 0.1;
      }
      else{
        if(car.velocity < 0.2 && car.velocity > -0.2) {
          car.velocity = 0.0;
        } else if(car.velocity > 0) {
          car.velocity -= 0.1;
        }else if(car.velocity < 0){
          car.velocity += 0.1;
        }
      }

      if(keyboard.pressed('a')){
        car.rotation.y += 0.1;
      } else if(keyboard.pressed('d')){
        car.rotation.y -= 0.1;
      }
    }

    function processCarMovement(){
      car.translateZ(car.velocity);
     // car.position.z += car.velocity;
     // camera.position.z = car.position.z + 2;
    }

    function addLight(x, y, z) {
      var pointLight = new THREE.PointLight(0xFFFFFF);

      pointLight.position.x = x;
      pointLight.position.y = y;
      pointLight.position.z = z;

      scene.add(pointLight);
    }

    function render(){
      requestAnimationFrame(render);

      cube.rotation.x += 0.1;
      cube.rotation.y += 0.1;

      processKeyboard();
      processCarMovement();

      renderer.render(scene, camera);
    }
    render();
