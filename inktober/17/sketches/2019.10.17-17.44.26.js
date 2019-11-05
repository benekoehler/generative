/**
 * A basic ThreeJS cube scene.
 * @author Matt DesLauriers (@mattdesl)
 */

const canvasSketch = require('canvas-sketch');
const glslify = require('glslify');
// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require('three');

// Include any additional ThreeJS examples below
require('three/examples/js/controls/OrbitControls');

const settings = {
  // Make the loop animated
  animate: true,
  dimensions: [1000,1000],
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
  // Turn on MSAA
  attributes: { antialias: true }
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context
  });

  // WebGL background color
  renderer.setClearColor('#fff', 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
  camera.position.set(0, 1.5, 4);
  camera.lookAt(new THREE.Vector3(0,1.5,0));

  // Setup camera controller
  // const controls = new THREE.OrbitControls(camera);

  // Setup your scene
  const scene = new THREE.Scene();

  const axesHelper = new THREE.AxesHelper( 5 );
  scene.add( axesHelper );

  // const mesh = new THREE.Mesh(
  //   new THREE.BoxGeometry(1, 1, 1),
  //   new THREE.MeshPhysicalMaterial({
  //     color: 'white',
  //     roughness: 0.75,
  //     flatShading: true
  //   })
  // );
  // scene.add(mesh);


    const fragmentShader = glslify("./frag.glsl");

  const vertexShader = glslify("./vert.glsl");

  const geometry =   new THREE.PlaneBufferGeometry( 4,1,160,1 );
  console.log(geometry.toJSON());

  const mesh = new THREE.Mesh(
    geometry,
    new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        playhead: { value: 0 },
        offset: { value: Math.random() * 100 }
      }
    })
  );
  scene.add(mesh);

  // Specify an ambient/unlit colour
  // scene.add(new THREE.AmbientLight('#fff'));

  // // Add some light
  // const light = new THREE.PointLight('#ff0000', 1, 15.5);
  // light.position.set(2, 2, -4).multiplyScalar(1.5);
  // scene.add(light);

  // draw each frame
  return {
    // Handle resize events here
    resize ({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // And render events here
    render ({ time }) {
      mesh.material.uniforms.playhead.value = time;
      // mesh.rotation.y = time * (10 * Math.PI / 180);
      // controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of WebGL context (optional)
    unload () {
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
