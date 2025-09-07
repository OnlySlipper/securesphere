
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

        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });

        document.getElementById('mobileMenuBtn').addEventListener('click', function() {
            document.getElementById('navMobile').classList.toggle('active');
        });

        const profileIcon = document.getElementById('profileIcon');
        const authModal = document.getElementById('authModal');
        const closeAuthModal = document.getElementById('closeAuthModal');
        const registerForm = document.getElementById('registerForm');
        const loginForm = document.getElementById('loginForm');

        // Открытие модального окна при клике на значок профиля
        if (profileIcon) {
            profileIcon.addEventListener('click', function() {
                authModal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; 
            });
        }

        if (closeAuthModal) {
            closeAuthModal.addEventListener('click', function() {
                authModal.style.display = 'none';
                document.body.style.overflow = '';
            });
        }

        window.addEventListener('click', function(event) {
            if (event.target === authModal) {
                authModal.style.display = 'none';
                document.body.style.overflow = ''; 
            }
        });

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

   
        function openModal(type) {
            const modal = document.getElementById('modal');
            const modalContent = document.getElementById('modalContent');
            
            let title = '';
            let content = '';
            
            switch(type) {
                case 'protection':
                    title = 'Защита информации';
                    content = '<p>Мы предоставляем полный спектр услуг по защите информации, включая:</p><ul><li>Защиту информационных систем персональных данных (ИСПДн)</li><li>Защиту государственной и коммерческой тайны</li><li>Аудит соответствия требованиям регуляторов</li><li>Разработку политик информационной безопасности</li></ul>';
                    break;
                case 'kii':
                    title = 'Критические информационные инфраструктуры (КИИ)';
                    content = '<p>Организуем защиту предприятий, от правильного функционирования которых зависит безопасность страны. Наши услуги включают:</p><ul><li>Аудит объектов КИИ</li><li>Разработку моделей угроз</li><li>Внедрение систем защиты</li><li>Сопровождение и мониторинг</li></ul>';
                    break;
                default:
                    title = 'Информация';
                    content = '<p>Средства антивирусной защиты — это программное обеспечение, которое предназначено для обнаружения, перехвата и обезвреживания вредоносного программного обеспечения на компьютерах и других устройствах. </p>';
            }
            
            modalContent.innerHTML = `<h2>${title}</h2>${content}`;
            modal.style.display = 'flex';
        }

        // Close modal
        document.getElementById('closeModal').addEventListener('click', function() {
            document.getElementById('modal').style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target === document.getElementById('modal')) {
                document.getElementById('modal').style.display = 'none';
            }
        });

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