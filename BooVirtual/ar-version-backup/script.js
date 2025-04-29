document.addEventListener('DOMContentLoaded', function() {
    // References to DOM elements
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');
    const closeBtn = document.querySelector('.close-btn');
    
    // Wait for A-Frame to load
    document.querySelector('a-scene').addEventListener('loaded', function() {
        // Get all hotspots
        const hotspots = document.querySelectorAll('.hotspot');
        
        // Add click event to each hotspot
        hotspots.forEach(hotspot => {
            // Get the hotspot's info button
            const infoButton = hotspot.querySelector('a-image');
            
            // Add click event
            infoButton.addEventListener('click', function() {
                // Get the data-info attribute value
                const info = hotspot.getAttribute('data-info');
                
                // Display the popup with the info
                popupText.textContent = info;
                popup.style.display = 'block';
            });
        });
    });
    
    // Close popup when clicking the close button
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });
    
    // Close popup when clicking outside the popup content
    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
    
    // For testing on desktop without AR
    document.addEventListener('keydown', function(event) {
        if (event.key === 't') {
            // Simulate clicking on the first hotspot for testing
            const randomIndex = Math.floor(Math.random() * 4);
            const hotspots = document.querySelectorAll('.hotspot');
            
            if (hotspots[randomIndex]) {
                const info = hotspots[randomIndex].getAttribute('data-info');
                popupText.textContent = info;
                popup.style.display = 'block';
            }
        }
    });

    // Mobile-specific touch events handling
    const arScene = document.querySelector('a-scene');
    
    arScene.addEventListener('touchstart', function(event) {
        // Check if we're touching a hotspot
        const touch = event.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        
        if (element && element.closest('.hotspot')) {
            const hotspot = element.closest('.hotspot');
            const info = hotspot.getAttribute('data-info');
            
            popupText.textContent = info;
            popup.style.display = 'block';
            
            event.preventDefault();
        }
    });
}); 