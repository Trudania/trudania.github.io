import 'aframe';
import React, { useEffect } from 'react';
import { Box, Sphere, Cylinder, Plane, Sky, Text, Scene } from 'react-aframe-ar';

// Initialize A-Frame components
if (!AFRAME.components['ar-handler']) {
  AFRAME.registerComponent('ar-handler', {
    init: function() {
      console.log('AR component initialized');
    }
  });
}

function App() {
  useEffect(() => {
    // Component initialization and cleanup
    const cleanup = () => {
      // Cleanup code if needed
    };
    return cleanup;
  }, []);

  return (
    <>
      <Scene
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false;"
        renderer="antialias: true; alpha: true"
        vr-mode-ui="enabled: false"
      >
        <Box 
          position="-1 0.5 -3" 
          rotation="0 45 0" 
          color="#4CC3D9" 
          shadow 
          material="shader: standard"
        />
        <Sphere 
          position="0 1.25 -5" 
          radius="1.25" 
          color="#EF2D5E" 
          shadow 
          material="shader: standard"
        />
        <Cylinder 
          position="1 0.75 -3" 
          radius="0.5" 
          height="1.5" 
          color="#FFC65D" 
          shadow 
          material="shader: standard"
        />
        <Plane 
          position="0 0 -4" 
          rotation="-90 0 0" 
          width="4" 
          height="4" 
          color="#7BC8A4" 
          shadow 
          material="shader: standard"
        />
        <Sky color="#ECECEC" />
        <Text 
          value="Hello world, react-aframe-ar!" 
          align="center" 
          position="0 2.3 -1.5" 
          color="#7BC8A4"
          width="6"
        />
        <a-entity camera look-controls wasd-controls></a-entity>
      </Scene>
    </>
  );
}

export default App;