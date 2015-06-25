    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.y = 10;
    scene.add( cube );

    var cubeVelocity = 0.1;
    
    addLight(10, 50, 130);

    camera.position.z = 5;
    camera.position.y = 10;

    var environment = new Environment(scene, window.innerWidth, 1000, 0);
    environment.createGround();

    function addLight(x, y, z) {
      var pointLight = new THREE.PointLight(0xFFFFFF);

      pointLight.position.x = x;
      pointLight.position.y = y;
      pointLight.position.z = z;

      scene.add(pointLight);
    }

    function moveCube(){
      //cube.translateX(cubeVelocity);
      //cube.translateY(cubeVelocity);
    }

    function render(){
      requestAnimationFrame(render);

      cube.rotation.x += 0.1;
      cube.rotation.y += 0.1;
      moveCube();

      renderer.render(scene, camera);
    }
    render();
