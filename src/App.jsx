import 'aframe';
import React from 'react';
import { Scene } from 'react-aframe-ar';

function App() {
  // No useEffect needed for this static setup unless adding dynamic behavior later

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

        {/* Info Panel SVGs */}
        <img id="infoSvg1" src="/assets/images/info1.svg" crossOrigin="anonymous" alt="Info Panel 1" />
        <img id="infoSvg2" src="/assets/images/info2.svg" crossOrigin="anonymous" alt="Info Panel 2" />
        <img id="infoSvg3" src="/assets/images/info3.svg" crossOrigin="anonymous" alt="Info Panel 3" />
        <img id="infoSvg4" src="/assets/images/info4.svg" crossOrigin="anonymous" alt="Info Panel 4" />

        {/* Info Button SVGs */}
        <img id="infobutton1" src="/assets/images/infobutton1.svg" crossOrigin="anonymous" alt="Info Button 1" />
        <img id="infobutton2" src="/assets/images/infobutton2.svg" crossOrigin="anonymous" alt="Info Button 2" />
        <img id="infobutton3" src="/assets/images/infobutton3.svg" crossOrigin="anonymous" alt="Info Button 3" />
        <img id="infobutton4" src="/assets/images/infobutton4.svg" crossOrigin="anonymous" alt="Info Button 4" />

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

        {/* Info Button 1 */}
        <a-entity 
          id="infoButton1" 
          data-infopanel="infoPanel1" 
          data-infosound="infoSound1" 
          info-button-listener >
            <a-image id="infobutton1-image" 
                     src="#infobutton1" 
                     className="clickable" /* Add class for raycaster */
                     width="0.1" height="0.1"
                     position="-0.6 0.01 0.01" 
                     material="shader: flat; npot: true; transparent: true">
            </a-image>
            <a-image id="infoPanel1" 
                     src="#infoSvg1" 
                     visible="false" 
                     position="-0.6 0.01 0.01"
                     width="0.4" height="0.5" 
                     material="shader: flat; npot: true; transparent: true; opacity: 0">
            </a-image>
        </a-entity>

        {/* Info Button 2 */}
        <a-entity 
          id="infoButton2" 
          data-infopanel="infoPanel2" 
          data-infosound="infoSound2" 
          info-button-listener >
          <a-image  id="infobutton2-image"  
                    src="#infobutton2" 
                    className="clickable" /* Add class for raycaster */
                    width="0.1" height="0.1"
                    position="-0.4 -0.2 0.01"  
                    material="shader: flat; npot: true; transparent: true">
          </a-image>
          <a-image id="infoPanel2" 
                   src="#infoSvg2" 
                   visible="false" 
                   position="-0.4 -0.2 0.01"
                   width="0.4" height="0.5" 
                   material="shader: flat; npot: true; transparent: true; opacity: 0">
          </a-image>
        </a-entity>

        {/* Info Button 3 */}
        <a-entity 
          id="infoButton3" 
          data-infopanel="infoPanel3" 
          data-infosound="infoSound3" 
          info-button-listener >
          <a-image id="infobutton3-image"  
                   src="#infobutton3" 
                   className="clickable" /* Add class for raycaster */
                   width="0.1" height="0.1"
                   position="0.6 0.0141 0.01"  
                   material="shader: flat; npot: true; transparent: true">
          </a-image>
          <a-image id="infoPanel3" 
                   src="#infoSvg3" 
                   visible="false" 
                   position="0.6 0.0141 0.01"
                   width="0.4" height="0.5" 
                   material="shader: flat; npot: true; transparent: true; opacity: 0">
          </a-image>
        </a-entity>

        {/* Info Button 4 */}
        <a-entity 
          id="infoButton4" 
          data-infopanel="infoPanel4" 
          data-infosound="infoSound4" 
          info-button-listener >
          <a-image id="infobutton4-image"  
                   src="#infobutton4" 
                   className="clickable" /* Add class for raycaster */
                   width="0.1" height="0.1"
                   position="0.2 0.0141 0.01" 
                   material="shader: flat; npot: true; transparent: true">
          </a-image>
          <a-image id="infoPanel4" 
                   src="#infoSvg4" 
                   visible="false" 
                   position="0.2 0.0141 0.01"
                   width="0.4" height="0.5" 
                   material="shader: flat; npot: true; transparent: true; opacity: 0">
          </a-image>
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