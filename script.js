document.addEventListener("DOMContentLoaded", function() {
    // Ladda in navigeringsmenyn
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            const placeholder = document.getElementById('navbar-placeholder');
            if (placeholder) {
                placeholder.innerHTML = data;
            }
        })
        .catch(error => console.error('Kunde inte ladda navigeringsmenyn:', error));

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Utlöses när 10% av elementet syns
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Kör bara animationen en gång
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // --- KARUSELL-LOGIK ---
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        let currentSlide = 0;

        if(slides.length > 0) {
            // Visa första bilden direkt
            slides[0].classList.add('active');

            const showSlide = (index) => {
                slides.forEach(slide => slide.classList.remove('active'));
                slides[index].classList.add('active');
            };

            const nextSlide = () => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            };

            const prevSlide = () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            };

            // Automatisk bläddring var 5:e sekund
            let slideInterval = setInterval(nextSlide, 5000);

            const resetInterval = () => {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            };

            if(nextBtn) nextBtn.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });
            if(prevBtn) prevBtn.addEventListener('click', () => {
                prevSlide();
                resetInterval();
            });
        }
    });

    // --- POPUP LOGIK ---
    const popup = document.getElementById('hire-popup');
    if (popup && !sessionStorage.getItem('popupShown')) {
        setTimeout(() => {
            popup.classList.add('show');
            sessionStorage.setItem('popupShown', 'true');
        }, 1000);
    }

    const closeBtn = document.querySelector('.close-popup');
    const popupOverlay = document.getElementById('hire-popup');

    if (closeBtn && popupOverlay) {
        closeBtn.addEventListener('click', () => popupOverlay.classList.remove('show'));
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) popupOverlay.classList.remove('show');
        });
    }
});