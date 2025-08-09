// Enhanced Purple Dark Cursor Trail JavaScript
(function() {
    // Configuration - enhanced for better visibility
    const trailLength = 12;
    const dots = [];
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    let mouseTimeout;

    // Create trail dots
    function createTrail() {
        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-dot';
            document.body.appendChild(dot);
            dots.push({
                element: dot,
                x: 0,
                y: 0,
                targetX: 0,
                targetY: 0
            });
        }
    }

    // Enhanced mouse tracking with movement detection
    function trackMouse() {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            isMouseMoving = true;
            
            // Clear existing timeout and set new one
            clearTimeout(mouseTimeout);
            mouseTimeout = setTimeout(() => {
                isMouseMoving = false;
            }, 100);
        });
    }

    // Enhanced animation loop with better smoothing
    function animateTrail() {
        let prevX = mouseX;
        let prevY = mouseY;

        dots.forEach((dot, index) => {
            // Enhanced delay and smoothing for more fluid motion
            const delay = (index + 1) * 0.12;
            const smoothing = isMouseMoving ? 0.15 : 0.08;
            
            dot.targetX = prevX;
            dot.targetY = prevY;
            
            dot.x += (dot.targetX - dot.x) * delay * smoothing * 10;
            dot.y += (dot.targetY - dot.y) * delay * smoothing * 10;

            // Position the dot with enhanced offset
            dot.element.style.left = (dot.x - 5) + 'px';
            dot.element.style.top = (dot.y - 5) + 'px';

            // Enhanced scaling and opacity with better visibility
            const scale = Math.max(0.3, 1 - (index * 0.08));
            const opacity = Math.max(0.2, 1 - (index * 0.085));
            
            dot.element.style.transform = `scale(${scale})`;
            dot.element.style.opacity = opacity;

            // Enhance glow effect when mouse is moving
            if (isMouseMoving && index < 3) {
                dot.element.style.filter = 'brightness(1.3) contrast(1.1)';
            } else {
                dot.element.style.filter = 'brightness(1) contrast(1)';
            }

            // Set next position for following dot
            prevX = dot.x;
            prevY = dot.y;
        });

        requestAnimationFrame(animateTrail);
    }

    // Enhanced mouse enter/leave events
    function handleMouseEvents() {
        // Hide trail when mouse leaves window
        document.addEventListener('mouseleave', () => {
            dots.forEach((dot, index) => {
                dot.element.style.opacity = '0';
                dot.element.style.transform = 'scale(0)';
            });
        });

        // Show trail when mouse enters window
        document.addEventListener('mouseenter', () => {
            dots.forEach((dot, index) => {
                const opacity = Math.max(0.2, 1 - (index * 0.085));
                const scale = Math.max(0.3, 1 - (index * 0.08));
                dot.element.style.opacity = opacity;
                dot.element.style.transform = `scale(${scale})`;
            });
        });

        // Enhanced visibility on scroll
        window.addEventListener('scroll', () => {
            if (isMouseMoving) {
                dots.forEach((dot, index) => {
                    if (index < 4) {
                        dot.element.style.filter = 'brightness(1.4) contrast(1.2)';
                    }
                });
                
                setTimeout(() => {
                    dots.forEach(dot => {
                        dot.element.style.filter = 'brightness(1) contrast(1)';
                    });
                }, 150);
            }
        });
    }

    // Initialize the cursor trail
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                createTrail();
                trackMouse();
                handleMouseEvents();
                animateTrail();
            });
        } else {
            createTrail();
            trackMouse();
            handleMouseEvents();
            animateTrail();
        }
    }

    // Start the cursor trail
    init();

    // Enhanced API for customization
    window.CursorTrail = {
        // Method to update trail length
        updateTrailLength: function(newLength) {
            // Remove existing dots
            dots.forEach(dot => dot.element.remove());
            dots.length = 0;
            
            // Create new trail with updated length
            for (let i = 0; i < newLength; i++) {
                const dot = document.createElement('div');
                dot.className = 'cursor-dot';
                document.body.appendChild(dot);
                dots.push({
                    element: dot,
                    x: 0,
                    y: 0,
                    targetX: 0,
                    targetY: 0
                });
            }
        },
        
        // Method to enhance visibility temporarily
        boost: function(duration = 1000) {
            dots.forEach((dot, index) => {
                if (index < 6) {
                    dot.element.style.filter = 'brightness(1.5) contrast(1.3)';
                    dot.element.style.transform = `scale(${Math.max(0.5, 1.2 - (index * 0.08))})`;
                }
            });
            
            setTimeout(() => {
                dots.forEach(dot => {
                    dot.element.style.filter = 'brightness(1) contrast(1)';
                });
            }, duration);
        },
        
        // Method to destroy the trail
        destroy: function() {
            dots.forEach(dot => dot.element.remove());
            dots.length = 0;
        }
    };
})();