<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>AR Info Panel with Effects - Force Visible</title>
    <script>
        // Prevent popup.js error
        window.myObject = {
            create: function() {
                return true;
            }
        };

        // Suppress WebGL warnings
        const originalConsoleWarn = console.warn;
        const originalConsoleError = console.error;

        console.warn = function() {
            if (arguments[0] && (
                arguments[0].includes('WebGL') ||
                arguments[0].includes('GL_INVALID') ||
                arguments[0].includes('texSubImage2D')
            )) {
                return;
            }
            originalConsoleWarn.apply(console, arguments);
        };

        console.error = function() {
            if (arguments[0] && arguments[0].includes('popup.js')) {
                return;
            }
            originalConsoleError.apply(console, arguments);
        };
    </script>
    <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
    <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const scene = document.querySelector('a-scene');
            const flyingEffectsContainer = document.querySelector('#flyingEffects');
            const flyingEffectTemplate = document.querySelector('#flyingEffectTemplate');

            scene.addEventListener('loaded', () => {
                for (let i = 0; i < 20; i++) {
                    const fx = flyingEffectTemplate.cloneNode(true);
                    fx.setAttribute('id', `flyingEffect${i}`);
                    fx.setAttribute('visible', true);

                    const x = (Math.random() - 0.5) * 2;    // Adjust range for AR
                    const y = 0.1 + Math.random() * 1;      // Adjust range for AR
                    const z = -0.8 + Math.random() * 0.2;    // Adjust Z position for AR

                    fx.setAttribute('position', `${x} ${y} ${z}`);
                    flyingEffectsContainer.appendChild(fx);
                }
            });
        });
    </script>
</head>
<body>
    <a-scene
        renderer="antialias: true; colorManagement: true;"
        loading-screen="enabled: true"
        vr-mode-ui="enabled: false"
        arjs="detectionMode: mono_and_matrix; debugUIEnabled: true; sourceType: webcam; patternRatio: 0.5">

        <a-assets timeout="10000">
            <img id="img1"
                src="./public/assets/images/img1.png"
                crossorigin="anonymous"
                onerror="this.onerror=null; console.log('Error loading image:', this.src);">

            <img id="infoSvg1"
                src="./public/assets/images/info1.svg"
                crossorigin="anonymous"
                onerror="this.onerror=null; console.log('Error loading image:', this.src);">
            <img id="infoSvg2"
                src="./public/assets/images/info2.svg"
                crossorigin="anonymous"
                onerror="this.onerror=null; console.log('Error loading image:', this.src);">
            <img id="infoSvg3"
                src="./public/assets/images/info3.svg"
                crossorigin="anonymous"
                onerror="this.onerror=null; console.log('Error loading image:', this.src);">
            <img id="infoSvg4"
                src="./public/assets/images/info4.svg"
                crossorigin="anonymous"
                onerror="this.onerror=null; console.log('Error loading image:', this.src);">

            <img id="flyingEffect"
                src="./public/assets/images/flyingeffect.png"
                crossorigin="anonymous"
                onerror="this.onerror=null; console.log('Error loading image:', this.src);">
        </a-assets>

        <a-camera position="0 0 0" look-controls-enabled="false" arjs-look-controls></a-camera>

        <a-entity id="imageContainer" position="0 0 -1.2">
            <a-image
                id="baseImage"
                src="#img1"
                width="2"        height="1.25"        material="shader: flat; npot: true; transparent: true">
            </a-image>

            <a-entity position="0 0 0">
                <a-image
                    id="infoPanel1"
                    src="#infoSvg1"
                    visible="true"
                    position="-0.7 0.2 0.021" width="0.4"    height="0.5"
                    material="shader: flat; npot: true; transparent: true; opacity: 1">
                </a-image>
            </a-entity>

            <a-entity position="0 0 0">
                <a-image
                    id="infoPanel2"
                    src="#infoSvg2"
                    visible="true"
                    position="-0.5 -0.5 0.021"    width="0.4"    height="0.5"
                    material="shader: flat; npot: true; transparent: true; opacity: 1">
                </a-image>
            </a-entity>

            <a-entity position="0 0 0">
                <a-image
                    id="infoPanel3"
                    src="#infoSvg3"
                    visible="true"
                    position="0.5 -0.2 0.021"    width="0.4"    height="0.5"
                    material="shader: flat; npot: true; transparent: true; opacity: 1">
                </a-image>
            </a-entity>

            <a-entity position="0 0 0">
                <a-image
                    id="infoPanel4"
                    src="#infoSvg4"
                    visible="true"
                    position="0.3 -0.2 0.021"   width="0.4"    height="0.5"
                    material="shader: flat; npot: true; transparent: true; opacity: 1">
                </a-image>
            </a-entity>
        </a-entity>

        <a-entity id="flyingEffects">
            <a-image
                id="flyingEffectTemplate"
                src="#flyingEffect"
                width="0.075"
                height="0.075"
                material="transparent: true; opacity: 0.8; shader: flat; npot: true"
                random-fly=""
                visible="false">
            </a-image>
        </a-entity>

        </a-scene>

    </body>
</html>