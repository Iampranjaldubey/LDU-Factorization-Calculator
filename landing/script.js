/**
 * MathLab Landing Page JavaScript
 * Matrix rain animation and interactive effects
 */

// Matrix Rain Canvas Animation
(function initMatrixRain() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters - mix of numbers, math symbols, and characters
    const matrixChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZαβγδεζηθικλμνξοπρστυφχψωΣ∫∂∇∞√∑∏';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Create drops array
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // Random start position
    }

    // Matrix rain animation
    function drawMatrix() {
        // Semi-transparent black to create trail effect
        ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Purple glow color for matrix characters
        ctx.fillStyle = 'rgba(167, 139, 250, 0.4)';
        ctx.font = `${fontSize}px monospace`;

        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            // Draw character
            ctx.fillText(text, x, y);

            // Reset drop to top when it reaches bottom or randomly
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Increment Y position
            drops[i]++;
        }
    }

    // Animation loop
    function animate() {
        drawMatrix();
        requestAnimationFrame(animate);
    }

    // Start animation
    animate();
})();

// Smooth scroll for anchor links
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
})();

// Parallax effect on scroll
(function initParallax() {
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
})();

// Animate elements on scroll (intersection observer)
(function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all tool cards
    document.querySelectorAll('.tool-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
})();

// Card hover glow effect enhancement
(function initCardInteractions() {
    const cards = document.querySelectorAll('.tool-card:not(.coming-soon)');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        // Add click handler for active cards
        const link = card.querySelector('.tool-link:not(.disabled)');
        if (link) {
            card.addEventListener('click', function(e) {
                if (!link.contains(e.target)) {
                    link.click();
                }
            });
        }
    });
})();

// Dynamic gradient animation for title
(function initTitleAnimation() {
    const title = document.querySelector('.title-main');
    if (!title) return;

    let hue = 0;
    setInterval(() => {
        hue = (hue + 1) % 360;
        // The CSS gradient shift animation handles this visually
    }, 100);
})();

// Math symbol animation initialization
(function initMathSymbols() {
    const symbols = document.querySelectorAll('.symbol');
    
    symbols.forEach((symbol, index) => {
        // Randomize animation delay and duration slightly
        const delay = Math.random() * 5;
        const duration = 15 + Math.random() * 10;
        symbol.style.animationDelay = `${delay}s`;
        symbol.style.animationDuration = `${duration}s`;
    });
})();

// Navbar background on scroll
(function initNavbarScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.background = 'rgba(10, 14, 39, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'rgba(10, 14, 39, 0.7)';
            nav.style.backdropFilter = 'blur(10px)';
        }

        lastScroll = currentScroll;
    });
})();

// Console Easter Egg
console.log('%cMathLab', 'font-size: 50px; font-weight: bold; color: #7c3aed;');
console.log('%cInteractive Linear Algebra & Mathematics Lab', 'font-size: 16px; color: #06b6d4;');
console.log('%cWelcome to the research lab dashboard! 🧪', 'font-size: 14px; color: #cbd5e1;');

// Performance optimization: Reduce animations on low-end devices
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.symbol').forEach(symbol => {
        symbol.style.animation = 'none';
    });
    
    const canvas = document.getElementById('matrixCanvas');
    if (canvas) {
        canvas.style.display = 'none';
    }
}
