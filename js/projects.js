// Theme switching functionality
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

// Set initial theme
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.checked = false;
}

// Theme toggle event
themeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// Mobile menu toggle
document.getElementById('mobileMenuBtn').addEventListener('click', function() {
    document.getElementById('navMobile').classList.toggle('active');
});

// Close modal
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
});

// Projects Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
});

// Animation on scroll
function checkScroll() {
    const elements = document.querySelectorAll('.animate');
    elements.forEach(el => {
        const position = el.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
            el.style.opacity = 1;
        }
    });
}

// Initialize animations
document.querySelectorAll('.animate').forEach(el => {
    el.style.opacity = 0;
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Модальное окно авторизации - функционал
const profileIcon = document.getElementById('profileIcon');
const authModal = document.getElementById('authModal');
const closeAuthModal = document.getElementById('closeAuthModal');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

// Открытие модального окна при клике на значок профиля
if (profileIcon) {
    profileIcon.addEventListener('click', function() {
        authModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
    });
}

// Закрытие модального окна
if (closeAuthModal) {
    closeAuthModal.addEventListener('click', function() {
        authModal.style.display = 'none';
        document.body.style.overflow = ''; // Восстанавливаем прокрутку
    });
}

// Закрытие модального окна при клике вне его
window.addEventListener('click', function(event) {
    if (event.target === authModal) {
        authModal.style.display = 'none';
        document.body.style.overflow = ''; // Восстанавливаем прокрутку
    }
});

// Закрытие модального окна по клавише Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && authModal.style.display === 'flex') {
        authModal.style.display = 'none';
        document.body.style.overflow = ''; // Восстанавливаем прокрутку
    }
});

// Обработка формы регистрации
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // После успешной регистрации перенаправляем на profile.html
        window.location.href = 'profile.html';
    });
}

// Обработка формы входа
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        window.location.href = 'admin.html';
    });
}