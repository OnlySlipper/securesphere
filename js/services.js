
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.checked = false;
}

// Theme
themeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// Mobile menu
document.getElementById('mobileMenuBtn').addEventListener('click', function() {
    document.getElementById('navMobile').classList.toggle('active');
});

// Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});


const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const icon = header.querySelector('i');
        
        content.classList.toggle('active');
        
        if (content.classList.contains('active')) {
            icon.style.transform = 'rotate(180deg)';
        } else {
            icon.style.transform = 'rotate(0deg)';
        }
    

        accordionHeaders.forEach(otherHeader => {
            if (otherHeader !== header) {
                const otherContent = otherHeader.nextElementSibling;
                const otherIcon = otherHeader.querySelector('i');
                
                otherContent.classList.remove('active');
                otherIcon.style.transform = 'rotate(0deg)';
            }
        });
    });
});

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
        document.body.style.overflow = ''; 
    });
}

// Закрытие модального окна при клике вне его
window.addEventListener('click', function(event) {
    if (event.target === authModal) {
        authModal.style.display = 'none';
        document.body.style.overflow = ''; 
    }
});

// Закрытие модального окна  Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && authModal.style.display === 'flex') {
        authModal.style.display = 'none';
        document.body.style.overflow = ''; 
    }
});

if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        window.location.href = 'profile.html';
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        window.location.href = 'admin.html';
    });
}

// scroll
function checkScroll() {
    const elements = document.querySelectorAll('.animate');
    elements.forEach(el => {
        const position = el.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
            el.style.opacity = 1;
        }
    });
}

document.querySelectorAll('.animate').forEach(el => {
    el.style.opacity = 0;
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);