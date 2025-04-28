import 'aframe';
import React, { useEffect } from 'react';
import { Scene } from 'react-aframe-ar';

function App() {
  // Add back useEffect for additional event binding
  useEffect(() => {
    // Add explicit click handlers after scene has loaded
    const scene = document.querySelector('a-scene');
    
    scene.addEventListener('loaded', () => {
      console.log('Scene loaded, setting up click handlers');
      
      // Find all clickable elements and make sure they're properly set up
      const clickables = document.querySelectorAll('.clickable');
      clickables.forEach(el => {
        el.addEventListener('click', (e) => {
          console.log('Direct click on:', el.id);
          // Get parent entity that has the info-button-listener component
          const parentEntity = el.closest('[info-button-listener]');
          if (parentEntity) {
            const panelId = parentEntity.getAttribute('data-infopanel');
            const panel = document.getElementById(panelId);
            if (panel) {
              // Toggle visibility (simple interaction)
              const isVisible = panel.getAttribute('visible');
              panel.setAttribute('visible', !isVisible);
              
              // Play sound if becoming visible
              if (!isVisible) {
                const soundId = parentEntity.getAttribute('data-infosound');
                const sound = document.getElementById(soundId);
                if (sound) sound.play().catch(e => console.warn('Sound play error:', e));
              }
            }
          }
          e.stopPropagation();
        });
      });
    });
    
    // Cleanup function when component unmounts
    return () => {
      // Any cleanup code needed
    };
  }, []);

  return (
    <Scene
      embedded
      arjs="sourceType: webcam; debugUIEnabled: false; patternRatio: 0.5; detectionMode: mono_and_matrix;"
      renderer="antialias: true; colorManagement: true; alpha: true"
      vr-mode-ui="enabled: false"
      loading-screen="enabled: true"
    >
      <a-assets timeout="20000"> {/* Increased timeout */} 
        {/* Base Image */}
        <img id="img1"
             src="/assets/images/img1.png" // Path relative to public folder
             crossOrigin="anonymous" 
             alt="Base display image" />

        {/* Info Button SVGs */}
        <img id="infobutton1" src="/assets/images/infobutton1.png" crossOrigin="anonymous" alt="Info Button 1" />
        <img id="infobutton2" src="/assets/images/infobutton2.png" crossOrigin="anonymous" alt="Info Button 2" />
        <img id="infobutton3" src="/assets/images/infobutton3.png" crossOrigin="anonymous" alt="Info Button 3" />
        <img id="infobutton4" src="/assets/images/infobutton4.png" crossOrigin="anonymous" alt="Info Button 4" />

        {/* Flying Effect Image */}
        <img id="flyingEffect" src="/assets/images/flyingeffect.png" crossOrigin="anonymous" alt="Flying Effect" />

        {/* Audio Files */}
        <audio id="infoSound1" src="/assets/audio/info1.mp3" preload="auto"></audio>
        <audio id="infoSound2" src="/assets/audio/info2.mp3" preload="auto"></audio>
        <audio id="infoSound3" src="/assets/audio/info3.mp3" preload="auto"></audio>
        <audio id="infoSound4" src="/assets/audio/info4.mp3" preload="auto"></audio>
      </a-assets>

      <a-camera position="0 0 0" look-controls-enabled="false" arjs-look-controls>
        <a-cursor 
          raycaster="objects: .clickable" 
          fuse="false" 
          color="white" 
          opacity="0.7"
          /> 
      </a-camera>

      <a-entity id="imageContainer" position="0 0 -1.2">
        {/* Base Image Entity */}
        <a-image
          id="baseImage"
          src="#img1"
          width="2" height="1.25"
          material="shader: flat; npot: true; transparent: true"
          handle-img-load> {/* Add component for potential texture filtering */} 
        </a-image>

        {/* Info Button 1 - The Murder Room */}
        <a-entity 
          id="infoButton1" 
          data-infopanel="infoPanel1" 
          data-infosound="infoSound1" 
          info-button-listener >
            <a-image id="infobutton1-image" 
                     src="#infobutton1" 
                     class="clickable" 
                     width="0.1" height="0.1"
                     position="-0.6 0.01 0.01" 
                     material="shader: flat; npot: true; transparent: true">
            </a-image>
            
            <a-entity id="infoPanel1"
                     position="-0.6 0.01 0.015"
                     visible="false"
                     geometry="primitive: plane; width: 0.6; height: 0.4"
                     material="color: #111; opacity: 0.8; transparent: true">
               <a-text value="The Murder Room" 
                      align="center" 
                      color="#FFF" 
                      width="1.5"
                      position="0 0.15 0.01"></a-text>
               <a-text value="Visitors claim cold chills and strange\nsounds in the room where Charlotte\nwas killed. It's said her final scream\nstill echoes through the walls."
                      align="center"
                      baseline="top"
                      color="#CCC"
                      width="1.3" 
                      position="0 0.08 0.01"
                      wrap-count="30"></a-text>
            </a-entity>
        </a-entity>

        {/* Info Button 2 - The Green Lady */}
        <a-entity 
          id="infoButton2" 
          data-infopanel="infoPanel2" 
          data-infosound="infoSound2" 
          info-button-listener >
          <a-image id="infobutton2-image"  
                    src="#infobutton2" 
                    class="clickable" 
                    width="0.1" height="0.1"
                    position="-0.4 -0.2 0.01"  
                    material="shader: flat; npot: true; transparent: true">
          </a-image>
          
          <a-entity id="infoPanel2"
                    position="-0.4 -0.2 0.015"
                    visible="false"
                    geometry="primitive: plane; width: 0.6; height: 0.4"
                    material="color: #111; opacity: 0.8; transparent: true">
             <a-text value="The Green Lady" 
                    align="center" 
                    color="#FFF" 
                    width="1.5"
                    position="0 0.15 0.01"></a-text>
             <a-text value="The ghost of Charlotte, known as the\nGreen Lady, is said to haunt the castle\nafter being murdered by her husband.\nHer spirit is often seen roaming the\ntower in a green dress."
                    align="center"
                    baseline="top"
                    color="#CCC"
                    width="1.3" 
                    position="0 0.08 0.01"
                    wrap-count="30"></a-text>
          </a-entity>
        </a-entity>

        {/* Info Button 3 - Ghostly Windows */}
        <a-entity 
          id="infoButton3" 
          data-infopanel="infoPanel3" 
          data-infosound="infoSound3" 
          info-button-listener >
          <a-image id="infobutton3-image"  
                   src="#infobutton3" 
                   class="clickable" 
                   width="0.1" height="0.1"
                   position="0.6 0.0141 0.01"  
                   material="shader: flat; npot: true; transparent: true">
          </a-image>
          
          <a-entity id="infoPanel3"
                    position="0.6 0.0141 0.015"
                    visible="false"
                    geometry="primitive: plane; width: 0.6; height: 0.4"
                    material="color: #111; opacity: 0.8; transparent: true">
             <a-text value="Ghostly Windows" 
                    align="center" 
                    color="#FFF" 
                    width="1.5"
                    position="0 0.15 0.01"></a-text>
             <a-text value="Locals say that at night, flickering\nlights or ghostly silhouettes sometimes\nappear in the upper windows—especially\nin the tower where the Green Lady died."
                    align="center"
                    baseline="top"
                    color="#CCC"
                    width="1.3" 
                    position="0 0.08 0.01"
                    wrap-count="30"></a-text>
          </a-entity>
        </a-entity>

        {/* Info Button 4 - Wailing Echoes */}
        <a-entity 
          id="infoButton4" 
          data-infopanel="infoPanel4" 
          data-infosound="infoSound4" 
          info-button-listener >
          <a-image id="infobutton4-image"  
                   src="#infobutton4" 
                   class="clickable" 
                   width="0.1" height="0.1"
                   position="0.2 0.0141 0.01" 
                   material="shader: flat; npot: true; transparent: true">
          </a-image>
          
          <a-entity id="infoPanel4"
                    position="0.2 0.0141 0.015"
                    visible="false"
                    geometry="primitive: plane; width: 0.6; height: 0.4"
                    material="color: #111; opacity: 0.8; transparent: true">
             <a-text value="Wailing Echoes" 
                    align="center" 
                    color="#FFF" 
                    width="1.5"
                    position="0 0.15 0.01"></a-text>
             <a-text value="At night, eerie wails and whispers can\nbe heard in the halls, especially near\nthe chapel and upper levels. Many\nbelieve it's the voice of the restless\nGreen Lady."
                    align="center"
                    baseline="top"
                    color="#CCC"
                    width="1.3" 
                    position="0 0.08 0.01"
                    wrap-count="30"></a-text>
          </a-entity>
        </a-entity>
      </a-entity>

      {/* Flying Effects Container - Optional: If you want the flying effects */}
      <a-entity id="flyingEffects">
        {/* 
          You would need logic similar to popup.html's DOMContentLoaded 
          listener to dynamically create the flying effect entities here,
          likely within a useEffect hook in the App component.
          Example template:
        */}
         <a-image
            id="flyingEffectTemplate"
            src="#flyingEffect"
            width="0.075"
            height="0.075"
            material="transparent: true; opacity: 0.8; shader: flat; npot: true"
            random-fly /* Assuming random-fly is registered in main.jsx */ 
            visible="false"> 
         </a-image> 
      </a-entity>

    </Scene>
  );
}

export default App;