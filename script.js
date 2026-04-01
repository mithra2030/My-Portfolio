/**
 * script.js - Soft/Girly Interactive functions
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. Intersection Observer (Scroll Fade)
    // ==========================================
    const sections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ==========================================
    // 2. Dynamic Navbar
    // ==========================================
    const navbar = document.getElementById("navbar");
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 3. Mobile Navigation Toggle
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if(hamburger){
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if(navLinks.classList.contains('active')){
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            if(navLinks.classList.contains('active')){
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // ==========================================
    // 4. Floating Sparkles / Bubbles Canvas
    // ==========================================
    const canvas = document.getElementById('sparkles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const numberOfParticles = 40; // Soft and minimal

    window.addEventListener('resize', function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 4 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * -0.5 - 0.2; // Float slowly upwards
            
            // Bright neon pink colors for dark theme
            const colors = [
                'rgba(255, 255, 255, 0.9)',
                'rgba(255, 51, 133, 0.8)',  // Hot Pink
                'rgba(255, 126, 179, 0.8)', // Light glowing Pink
                'rgba(216, 180, 226, 0.7)'  // Lavender/Purple
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Wobble effect
            this.x += Math.sin(this.y * 0.05) * 0.2;

            if (this.y + this.size < 0) {
                this.y = canvas.height + this.size;
                this.x = Math.random() * canvas.width;
            }
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Add a soft glow behind each particle
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        // Leave a slight dark trail to make them look softer
        ctx.fillStyle = 'rgba(18, 4, 23, 0.3)'; // Match very dark plum background
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
});
