class ImageSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.totalSlides = this.slides.length;
        this.isPlaying = false;
        this.slideInterval = null;
        this.slideDelay = 3000; // 3 секунды

        this.initializeElements();
        this.bindEvents();
        this.updateSlideInfo();
    }

    initializeElements() {
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.prevControlBtn = document.getElementById('prevControlBtn');
        this.nextControlBtn = document.getElementById('nextControlBtn');
        this.playBtn = document.getElementById('playBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
    }

    bindEvents() {
        // Кнопки навигации
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Кнопки навигации в панели управления
        this.prevControlBtn.addEventListener('click', () => this.previousSlide());
        this.nextControlBtn.addEventListener('click', () => this.nextSlide());

        // Кнопки управления воспроизведением
        this.playBtn.addEventListener('click', () => this.startSlideshow());
        this.pauseBtn.addEventListener('click', () => this.stopSlideshow());

        // Индикаторы
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Управление с клавиатуры
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                    this.nextSlide();
                    break;
                case ' ':
                    e.preventDefault();
                    this.toggleSlideshow();
                    break;
            }
        });

        // Пауза при наведении мыши
        const sliderContainer = document.querySelector('.slider-container');
        sliderContainer.addEventListener('mouseenter', () => {
            if (this.isPlaying) {
                this.pauseSlideshow();
            }
        });

        sliderContainer.addEventListener('mouseleave', () => {
            if (this.isPlaying) {
                this.resumeSlideshow();
            }
        });

        // Поддержка свайпов на мобильных устройствах
        let startX = 0;
        let endX = 0;
        
        sliderContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        sliderContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Свайп влево - следующий слайд
                this.nextSlide();
            } else {
                // Свайп вправо - предыдущий слайд
                this.previousSlide();
            }
        }
    }

    goToSlide(slideIndex) {
        // Убираем активный класс с текущего слайда и индикатора
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');

        // Устанавливаем новый текущий слайд
        this.currentSlide = slideIndex;

        // Добавляем активный класс к новому слайду и индикатору
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');

        this.updateSlideInfo();
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }

    startSlideshow() {
        this.isPlaying = true;
        this.playBtn.style.display = 'none';
        this.pauseBtn.style.display = 'inline-block';
        
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.slideDelay);
    }

    stopSlideshow() {
        this.isPlaying = false;
        this.playBtn.style.display = 'inline-block';
        this.pauseBtn.style.display = 'none';
        
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }

    pauseSlideshow() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }

    resumeSlideshow() {
        if (this.isPlaying && !this.slideInterval) {
            this.slideInterval = setInterval(() => {
                this.nextSlide();
            }, this.slideDelay);
        }
    }

    toggleSlideshow() {
        if (this.isPlaying) {
            this.stopSlideshow();
        } else {
            this.startSlideshow();
        }
    }

    updateSlideInfo() {
        // Метод оставлен для совместимости, но больше не используется
    }
}

// Инициализация слайдера после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    const slider = new ImageSlider();
    
    // Добавляем плавную анимацию появления
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        container.style.transition = 'all 0.8s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
});

// Дополнительные функции для улучшения пользовательского опыта
document.addEventListener('DOMContentLoaded', () => {
    // Предзагрузка изображений
    const images = document.querySelectorAll('.slide img');
    images.forEach(img => {
        const imageLoader = new Image();
        imageLoader.src = img.src;
    });

    // Добавляем эффект загрузки
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        const img = slide.querySelector('img');
        img.addEventListener('load', () => {
            slide.classList.add('loaded');
        });
    });
});