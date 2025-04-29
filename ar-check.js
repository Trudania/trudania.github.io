document.addEventListener('DOMContentLoaded', function() {
    // Check if AR is likely to be supported
    function isARSupported() {
        // Check for WebRTC/camera support
        const hasGetUserMedia = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
        
        // Check for mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Check for WebGL
        let hasWebGL = false;
        try {
            const canvas = document.createElement('canvas');
            hasWebGL = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch(e) {
            hasWebGL = false;
        }
        
        // For iOS specifically check for newer iOS version
        const isRecentiOS = /iPhone|iPad|iPod/.test(navigator.userAgent) && 
                           (navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/) || [0,0])[1] >= 11;
                           
        // Check for Android AR support (roughly)
        const isARCapableAndroid = /Android/.test(navigator.userAgent) && 
                                 (navigator.userAgent.match(/Android (\d+)/) || [0,0])[1] >= 7;
                                 
        return hasGetUserMedia && hasWebGL && (isRecentiOS || isARCapableAndroid || !isMobile);
    }
    
    // Redirect to non-AR version if AR is not supported
    if (!isARSupported() && window.location.pathname.indexOf('no-ar.html') === -1) {
        window.location.href = 'no-ar.html';
    }
}); 