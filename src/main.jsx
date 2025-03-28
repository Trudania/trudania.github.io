import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
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
