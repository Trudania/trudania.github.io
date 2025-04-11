// popup.js
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Check if myObject exists and has create method
        if (window.myObject && typeof window.myObject.create === 'function') {
            window.myObject.create();
        } else {
            console.warn('myObject not properly initialized');
        }
    } catch (error) {
        console.error('Error in popup.js:', error);
    }
});

// Additional error handling
window.addEventListener('load', function() {
    if (!window.myObject) {
        console.warn('myObject not found on window load');
    }
});