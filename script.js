/* ============================================
   Smart Portfolio v2 — JavaScript
   WOW Effects: Particles, Parallax, Tilt,
   Magnetic buttons, Counters, Typing
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ═══════════════════════════════════════════
    //  1. PARTICLE SYSTEM (neural network style)
    // ═══════════════════════════════════════════
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null };
        let animFrameId;

        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.hue = Math.random() > 0.5 ? 255 : 200; // purple or cyan
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Mouse interaction — gentle push
                if (mouse.x !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        const force = (150 - dist) / 150;
                        this.x += dx * force * 0.01;
                        this.y += dy * force * 0.01;
                    }
                }

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.hue === 255
                    ? `rgba(124, 92, 252, ${this.opacity})`
                    : `rgba(0, 212, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        // Create particles
        const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Connection lines
        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        const opacity = ((120 - dist) / 120) * 0.12;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(124, 92, 252, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawConnections();
            animFrameId = requestAnimationFrame(animateParticles);
        }

        animateParticles();

        // Track mouse for particle interaction
        document.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        document.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });
    }


    // ═══════════════════════════════════════════
    //  2. PARALLAX ORBS — follow mouse gently
    // ═══════════════════════════════════════════
    const orbs = document.querySelectorAll('.hero-orb');
    const hero = document.querySelector('.hero');

    if (hero && orbs.length) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const cx = (e.clientX - rect.left) / rect.width - 0.5;
            const cy = (e.clientY - rect.top) / rect.height - 0.5;

            orbs.forEach((orb, i) => {
                const speed = (i + 1) * 15;
                const x = cx * speed;
                const y = cy * speed;
                orb.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }


    // ═══════════════════════════════════════════
    //  3. TYPING EFFECT
    // ═══════════════════════════════════════════
    const roles = [
        'AI Эксперт',
        'Предприниматель',
        'Визионер',
        'Преподаватель',
        'Event-организатор',
        'Основатель AREY'
    ];
    const typedEl = document.getElementById('typedRole');
    let roleIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 80;

    function typeRole() {
        const current = roles[roleIndex];
        if (isDeleting) {
            typedEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 35;
        } else {
            typedEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 75;
        }
        if (!isDeleting && charIndex === current.length) {
            typingSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 350;
        }
        setTimeout(typeRole, typingSpeed);
    }
    typeRole();


    // ═══════════════════════════════════════════
    //  4. NAVBAR SCROLL
    // ═══════════════════════════════════════════
    const navbar = document.getElementById('navbar');
    function handleNavScroll() {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();


    // ═══════════════════════════════════════════
    //  5. MOBILE MENU
    // ═══════════════════════════════════════════
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });


    // ═══════════════════════════════════════════
    //  6. SCROLL ANIMATIONS (staggered)
    // ═══════════════════════════════════════════
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => scrollObserver.observe(el));


    // ═══════════════════════════════════════════
    //  7. COUNTER ANIMATION (spring feel)
    // ═══════════════════════════════════════════
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    let countersAnimated = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
                counterObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) counterObserver.observe(heroStats);

    function animateCounters() {
        statNumbers.forEach(numEl => {
            const target = parseInt(numEl.dataset.target);
            const suffix = numEl.dataset.suffix || '';
            const duration = 2000;
            const start = performance.now();

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Spring ease out
                const eased = 1 - Math.pow(1 - progress, 4);
                numEl.textContent = Math.round(eased * target) + suffix;
                if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
        });
    }


    // ═══════════════════════════════════════════
    //  8. 3D TILT CARDS + SHINE
    // ═══════════════════════════════════════════
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        const inner = card.querySelector('.tilt-card-inner');
        const shine = card.querySelector('.card-shine');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            if (shine) {
                const shineX = (x / rect.width) * 100;
                const shineY = (y / rect.height) * 100;
                shine.style.setProperty('--shine-x', shineX + '%');
                shine.style.setProperty('--shine-y', shineY + '%');
            }
        });

        card.addEventListener('mouseleave', () => {
            inner.style.transform = 'rotateX(0) rotateY(0)';
        });
    });


    // ═══════════════════════════════════════════
    //  9. MAGNETIC BUTTONS
    // ═══════════════════════════════════════════
    const magneticBtns = document.querySelectorAll('[data-magnetic]');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });


    // ═══════════════════════════════════════════
    //  10. SMOOTH SCROLL + ACTIVE NAV
    // ═══════════════════════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    function highlightNav() {
        const scrollY = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navAnchors.forEach(a => {
                    a.classList.toggle('active-link', a.getAttribute('href') === '#' + id);
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });
});
