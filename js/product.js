
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

const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        productCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

const sliderTrack = document.getElementById('sliderTrack');
const sliderPrev = document.getElementById('sliderPrev');
const sliderNext = document.getElementById('sliderNext');
const sliderDots = document.getElementById('sliderDots');
const slides = document.querySelectorAll('.slider-slide');

let currentSlide = 0;

slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        goToSlide(i);
    });
    sliderDots.appendChild(dot);
});

function goToSlide(n) {
    currentSlide = n;
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    document.querySelectorAll('.slider-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

sliderNext.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
});

sliderPrev.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
});

setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
}, 5000);

const products = {
    'sznd': {
        title: 'Средства защиты от несанкционированного доступа (СЗНД)',
        price: 'от 45 000 ₽',
        description: 'Комплексное решение для защиты информационных ресурсов от несанкционированного доступа.',
        features: [
            'Контроль доступа к информации',
            'Аудит действий пользователей',
            'Шифрование конфиденциальных данных',
            'Защита от утечек информации',
            'Соответствие требованиям ФСТЭК России'
        ],
        applications: [
            'Государственные организации',
            'Финансовые учреждения',
            'Корпоративные сети',
            'Объекты КИИ'
        ]
    },
    'obsys': {
        title: 'Обнаружительные системы',
        price: 'от 68 000 ₽',
        description: 'Системы обнаружения и предотвращения вторжений в информационную инфраструктуру.',
        features: [
            'Мониторинг сетевой активности в реальном времени',
            'Обнаружение аномального поведения',
            'Автоматическое блокирование угроз',
            'Детальная отчетность и аналитика',
            'Интеграция с другими системами безопасности'
        ],
        applications: [
            'Корпоративные сети',
            'ЦОДы и серверные фермы',
            'Критически важные объекты',
            'Финансовый сектор'
        ]
    },
    'firewall': {
        title: 'Межсетевые экраны',
        price: 'от 78 000 ₽',
        description: 'Защита периметра сетей от внешних угроз и несанкционированного доступа.',
        features: [
            'Контроль входящего и исходящего трафика',
            'Защита от DDoS-атак',
            'VPN для безопасного удаленного доступа',
            'Антивирусная проверка трафика',
            'Глубокая проверка пакетов (DPI)'
        ],
        applications: [
            'Защита сетевого периметра',
            'Сегментация сетей',
            'Обеспечение удаленного доступа',
            'Защита веб-приложений'
        ]
    },
    'skzi': {
        title: 'Средства криптографической защиты информации (СКЗИ)',
        price: 'от 32 000 ₽',
        description: 'Программно-аппаратные комплексы для защиты информации с использованием криптографических методов.',
        features: [
            'Шифрование данных на лету',
            'Формирование и проверка электронной подписи',
            'Защита каналов связи',
            'Аутентификация пользователей',
            'Сертифицировано ФСБ России'
        ],
        applications: [
            'Защита персональных данных',
            'Электронный документооборот',
            'Защита каналов связи',
            'Аутентификация в информационных системах'
        ]
    },
    'boot': {
        title: 'Средства доверенной загрузки',
        price: 'от 28 000 ₽',
        description: 'Обеспечение целостности и неизменности процесса загрузки операционной системы.',
        features: [
            'Контроль целостности загрузочных файлов',
            'Защита от изменений BIOS/UEFI',
            'Аутентификация на аппаратном уровне',
            'Ведение журнала загрузки',
            'Соответствие требованиям ФСТЭК'
        ],
        applications: [
            'Рабочие станции с конфиденциальной информацией',
            'Серверы обработки персональных данных',
            'АРМ сотрудников с доступом к ГИС'
        ]
    },
    'ids': {
        title: 'Система обнаружения вторжений (IDS)',
        price: 'от 65 000 ₽',
        description: 'Обнаружение и предотвращение сетевых атак и несанкционированных действий.',
        features: [
            'Анализ сетевого трафика в реальном времени',
            'Сигнатурный анализ атак',
            'Поведенческий анализ аномалий',
            'Автоматическое оповещение о инцидентах',
            'Интеграция с SIEM-системами'
        ],
        applications: [
            'Мониторинг корпоративной сети',
            'Защита критической инфраструктуры',
            'Обнаружение внутренних угроз',
            'Аудит сетевой безопасности'
        ]
    },
    'data': {
        title: 'Средства защиты каналов передачи данных',
        price: 'от 53 000 ₽',
        description: 'Обеспечение безопасности передачи информации по каналам связи.',
        features: [
            'Шифрование трафика VPN',
            'Защита от перехвата данных',
            'Аутентификация каналов связи',
            'Контроль целостности передаваемых данных',
            'Поддержка различных протоколов передачи'
        ],
        applications: [
            'Защита данных при передаче по открытым каналам',
            'Организация защищенных VPN-каналов',
            'Передача конфиденциальной информации',
            'Защита беспроводных сетей'
        ]
    },
    'antivirus': {
        title: 'Средства антивирусной защиты',
        price: 'от 25 000 ₽',
        description: 'Комплексная защита от вредоносного программного обеспечения и кибератак.',
        features: [
            'Защита в реальном времени',
            'Проактивная защита от неизвестных угроз',
            'Обновления вирусных баз ежечасно',
            'Централизованное управление и мониторинг',
            'Защита почтового трафика'
        ],
        applications: [
            'Защита рабочих станций и серверов',
            'Защита файловых хранилищ',
            'Сканирование почтовых вложений',
            'Защита от ransomware-атак'
        ]
    },
    'analysis': {
        title: 'Средства анализа защищенности',
        price: 'от 47 000 ₽',
        description: 'Выявление уязвимостей и оценка уровня защищенности информационных систем.',
        features: [
            'Сканирование уязвимостей сетевых служб',
            'Аудит конфигураций безопасности',
            'Проверка на соответствие стандартам',
            'Генерация детальных отчетов',
            'Рекомендации по устранению уязвимостей'
        ],
        applications: [
            'Регулярный аудит безопасности',
            'Подготовка к проверкам регуляторов',
            'Оценка защищенности новых систем',
            'Мониторинг соответствия политикам безопасности'
        ]
    },
    'mobile': {
        title: 'Средства защиты мобильных устройств',
        price: 'от 36 000 ₽',
        description: 'Комплексная защита мобильных устройств и корпоративных данных на них.',
        features: [
            'Защита данных на мобильных устройствах',
            'Управление корпоративными устройствами (MDM)',
            'Шифрование связи и данных',
            'Защита от мобильных угроз',
            'Удаленное стирание данных при утере'
        ],
        applications: [
            'Защита корпоративных мобильных устройств',
            'Защита BYOD (принеси свое устройство)',
            'Безопасный мобильный доступ к корпоративным ресурсам',
            'Защита мобильных приложений'
        ]
    },
    'backup': {
        title: 'Системы резервного копирования',
        price: 'от 41 000 ₽',
        description: 'Обеспечение сохранности и доступности данных при сбоях и авариях.',
        features: [
            'Резервное копирование по расписанию',
            'Инкрементное и дифференциальное копирование',
            'Быстрое восстановление данных',
            'Архивирование на различные носители',
            'Шифрование резервных копий'
        ],
        applications: [
            'Резервное копирование критичных данных',
            'Восстановление после сбоев',
            'Архивирование данных для долгосрочного хранения',
            'Подготовка к аварийным ситуациям'
        ]
    },
    'silm': {
        title: 'Система управления событиями ИБ (SIEM)',
        price: 'от 120 000 ₽',
        description: 'Мониторинг и управление событиями информационной безопасности в реальном времени.',
        features: [
            'Сбор и корреляция событий безопасности',
            'Анализ и расследование инцидентов',
            'Автоматическое реагирование на угрозы',
            'Генерация отчетов для регуляторов',
            'Интеграция с различными источниками данных'
        ],
        applications: [
            'Централизованный мониторинг безопасности',
            'Расследование киберинцидентов',
            'Соответствие требованиям регуляторов',
            'Анализ угроз в реальном времени'
        ]
    }
};

function openProductModal(type) {
    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('productModalContent');
    
    const product = products[type];
    
    if (!product) {
        modalContent.innerHTML = '<h2>Продукт не найден</h2><p>Информация о продукте временно недоступна.</p>';
        modal.style.display = 'flex';
        return;
    }
    
    let featuresHtml = '';
    product.features.forEach(feature => {
        featuresHtml += `<li>${feature}</li>`;
    });
    
    let applicationsHtml = '';
    if (product.applications) {
        applicationsHtml = `<h3>Сферы применения:</h3><ul>`;
        product.applications.forEach(application => {
            applicationsHtml += `<li>${application}</li>`;
        });
        applicationsHtml += `</ul>`;
    }
    
    modalContent.innerHTML = `
        <h2>${product.title}</h2>
        <p class="product-modal-price">${product.price}</p>
        <p>${product.description}</p>
        <h3>Основные возможности:</h3>
        <ul>${featuresHtml}</ul>
        ${applicationsHtml}
        <div class="modal-actions">
            <button class="btn-primary" onclick="openOrderModal('${type}')">Заказать</button>
            <button class="btn-secondary" onclick="closeModal('productModal')">Закрыть</button>
        </div>
    `;
    modal.style.display = 'flex';
}

function openOrderModal(productType) {
    const modal = document.getElementById('orderModal');
    const modalContent = document.getElementById('orderModalContent');
    const product = products[productType];
    
    modalContent.innerHTML = `
        <h2>Заказ: ${product.title}</h2>
        <p class="product-price">${product.price}</p>
        
        <form class="order-form" id="orderForm">
            <div class="form-row">
                <div class="form-group">
                    <label for="order-name">Ваше имя *</label>
                    <input type="text" id="order-name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="order-company">Компания</label>
                    <input type="text" id="order-company" name="company">
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="order-email">Email *</label>
                    <input type="email" id="order-email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="order-phone">Телефон *</label>
                    <input type="tel" id="order-phone" name="phone" required>
                </div>
            </div>
            
            <div class="form-group">
                <label for="order-quantity">Количество</label>
                <select id="order-quantity" name="quantity">
                    <option value="1">1 шт</option>
                    <option value="2-5">2-5 шт</option>
                    <option value="6-10">6-10 шт</option>
                    <option value="10+">Более 10 шт</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="order-message">Дополнительная информация</label>
                <textarea id="order-message" name="message" placeholder="Укажите дополнительные требования или вопросы"></textarea>
            </div>
            
            <div class="order-summary">
                <h4>Сводка заказа</h4>
                <p><strong>Товар:</strong> ${product.title}</p>
                <p><strong>Цена:</strong> ${product.price}</p>
            </div>
            
            <button type="submit" class="btn-primary">Отправить заявку</button>
        </form>
    `;
    
    modal.style.display = 'flex';
    
    document.getElementById('orderForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Ваш заказ принят! Мы свяжемся с вами в ближайшее время.');
        closeModal('orderModal');
    });
}


function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('productModal')) {
        closeModal('productModal');
    }
    if (event.target === document.getElementById('orderModal')) {
        closeModal('orderModal');
    }
});

document.getElementById('closeProductModal').addEventListener('click', function() {
    closeModal('productModal');
});

document.getElementById('closeOrderModal').addEventListener('click', function() {
    closeModal('orderModal');
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal('productModal');
        closeModal('orderModal');
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

// Модальное окно авторизации - функционал
const profileIcon = document.getElementById('profileIcon');
const authModal = document.getElementById('authModal');
const closeAuthModal = document.getElementById('closeAuthModal');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

if (profileIcon) {
    profileIcon.addEventListener('click', function() {
        authModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
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