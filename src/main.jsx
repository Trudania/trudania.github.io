import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'aframe'  // Import A-Frame first
import './index.css'
import App from './App.jsx'

// Register A-Frame component before rendering
AFRAME.registerComponent('random-fly', {
  schema: {
    speed: { type: 'number', default: 3000 }
  },
  init: function () {
    this.startRandomAnimation();
  },
  startRandomAnimation: function () {
    const el = this.el;
    const speed = this.data.speed;

    function setRandomPosition() {
      const x = (Math.random() * 4 - 2).toFixed(2);       // -2 to 2
      const y = (Math.random() * 2.5 + 0.25).toFixed(2);  // 0.25 to 2.75
      const z = -2.9;

      el.setAttribute('animation__move', {
        property: 'position',
        to: `${x} ${y} ${z}`,
        dur: speed,
        easing: 'easeInOutSine',
        loop: false
      });
    }

    setInterval(setRandomPosition, speed);
    setRandomPosition();
  }
});

// Register additional components if needed
AFRAME.registerComponent('handle-img-load', {
  init: function() {
    this.el.addEventListener('loaded', () => {
      const mesh = this.el.getObject3D('mesh');
      if (mesh) {
        const texture = mesh.material.map;
        if (texture) {
          texture.minFilter = THREE.LinearFilter;
          texture.generateMipmaps = false;
        }
      }
    });
  }
});

// Register the info-button-listener component
AFRAME.registerComponent('info-button-listener', {
    init: function () {
        const el = this.el;
        const panelId = el.getAttribute('data-infopanel');
        const soundId = el.getAttribute('data-infosound');
        const panelEl = document.getElementById(panelId);
        const soundEl = document.getElementById(soundId);

        // Ensure elements exist
        if (!panelEl) {
            console.error(`Info panel with ID ${panelId} not found!`);
            return;
        }
        if (!soundEl) {
            console.error(`Info sound with ID ${soundId} not found!`);
            return;
        }

        // Use the button image within the entity as the click target
        const buttonImage = el.querySelector('a-image.clickable');
        if (!buttonImage) {
            console.error(`Clickable button image not found within ${el.id}`);
            return;
        }

        buttonImage.addEventListener('click', () => {
            console.log(`Button ${el.id} clicked`); // Debugging
            this.showInfo(panelEl, soundEl);
        });
        
        // Also add mouseenter/mouseleave feedback for better UX
        buttonImage.addEventListener('mouseenter', () => {
            buttonImage.setAttribute('scale', '1.1 1.1 1.1');
        });
        
        buttonImage.addEventListener('mouseleave', () => {
            buttonImage.setAttribute('scale', '1 1 1');
        });
    },
    showInfo: function (panelEl, soundEl) {
        console.log(`Showing info panel: ${panelEl.id}`); // Debugging
        
        // Hide all panels and stop all sounds
        const infoPanels = document.querySelectorAll('[id^="infoPanel"]');
        const infoSounds = document.querySelectorAll('[id^="infoSound"]');

        infoPanels.forEach(panel => {
            panel.setAttribute('visible', false);
        });
        
        infoSounds.forEach(sound => {
            if (sound.pause) {
                sound.pause();
                sound.currentTime = 0;
            }
        });

        // Show the selected panel and play the sound
        panelEl.setAttribute('visible', true);
        soundEl.play().catch(e => console.error("Error playing sound:", e));
    }
});

// Create root and render app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
) 

