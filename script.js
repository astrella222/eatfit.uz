// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ И КОНСТАНТЫ =====
const DOM_ELEMENTS = {
    // Основные элементы
    loader: document.getElementById('loader'),
    navbar: document.getElementById('navbar'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    closeMenu: document.getElementById('closeMenu'),
    mobileMenu: document.getElementById('mobileMenu'),
    contactForm: document.getElementById('contactForm'),
    videoModal: document.getElementById('videoModal'),
    chatWidget: document.getElementById('chatWidget'),
    notification: document.getElementById('notification'),
    backToTop: document.querySelector('.back-to-top'),
    themeToggle: document.querySelector('.theme-toggle'),
    
    // Админ элементы
    adminPanel: document.getElementById('adminPanel'),
    adminLoginModal: document.getElementById('adminLoginModal'),
    adminPassword: document.getElementById('adminPassword'),
    
    // Элементы для редактирования
    siteTitle: document.getElementById('mainTitle'),
    heroSubtitle: document.getElementById('heroSubtitle'),
    footerDescription: document.getElementById('footerDescription'),
    innovationBadge: document.getElementById('innovationBadge'),
    statStudents: document.getElementById('statStudents'),
    statSuccess: document.getElementById('statSuccess'),
    statExperts: document.getElementById('statExperts'),
    siteYear: document.getElementById('siteYear'),
    footerYear: document.getElementById('footerYear'),
    
    // Форма редактирования
    editSiteTitle: document.getElementById('editSiteTitle'),
    editHeroText: document.getElementById('editHeroText'),
    editFooterText: document.getElementById('editFooterText'),
    editStudents: document.getElementById('editStudents'),
    editSuccess: document.getElementById('editSuccess'),
    editExperts: document.getElementById('editExperts')
};

// Конфигурация
const CONFIG = {
    ADMIN_PASSWORD: '2026',
    SAVE_DELAY: 1000,
    VISITOR_KEY: 'eatfit_visitors_2026',
    APPLICATIONS_KEY: 'eatfit_applications_2026',
    CONTENT_KEY: 'eatfit_content_2026',
    SETTINGS_KEY: 'eatfit_settings_2026'
};

// Состояние приложения
let APP_STATE = {
    isAdmin: false,
    isAdminPanelOpen: false,
    theme: 'light',
    visitorCount: 0,
    applicationsCount: 0,
    lastSave: null,
    chatMessages: [],
    isLoading: true
};

// Данные для AI чата
const AI_RESPONSES = {
    greeting: [
        "Привет! Я AI-помощник EatFit 2026. Чем могу помочь?",
        "Здравствуйте! Готов рассказать о технологиях питания будущего.",
        "Добрый день! Я ваш виртуальный нутрициолог."
    ],
    technologies: [
        "Мы используем нейросетевые алгоритмы для анализа 150+ параметров здоровья.",
        "VR-тренировки позволяют полностью погрузиться в процесс трансформации.",
        "Генетический анализ помогает создать идеальный рацион именно для вас."
    ],
    program: [
        "Программа состоит из 3 этапов: диагностика, персонализация и трансформация.",
        "За 12 недель вы полностью измените свои привычки с помощью AI-коучинга.",
        "Каждую неделю AI оптимизирует ваш план на основе полученных данных."
    ],
    results: [
        "96% наших клиентов достигают поставленных целей.",
        "Средняя потеря веса - 8.5 кг за 12 недель.",
        "Уровень удовлетворенности - 99% по отзывам."
    ],
    contact: [
        "Вы можете оставить заявку на сайте или написать на eatfit.2026@mail.ru",
        "Наш AI-помощник работает 24/7, готов ответить на любые вопросы.",
        "Также мы доступны по телефону +998 95 628-80-00 и в Telegram @eatfit"
    ],
    default: [
        "Интересный вопрос! Могу рассказать подробнее о наших технологиях.",
        "Для точного ответа мне нужно больше информации. Задайте уточняющий вопрос.",
        "Это отличный вопрос! Рекомендую посмотреть демо на главной странице."
    ]
};

// ===== ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    console.log('🚀 EatFit 2026 инициализирован');
    
    // Инициализация всех компонентов
    initLoader();
    initNavigation();
    initMobileMenu();
    initScrollAnimations();
    initCounters();
    initContactForm();
    initVideoModal();
    initChatWidget();
    initTheme();
    initScrollToTop();
    initTooltips();
    initParallax();
    initAdminPanel();
    
    // Загрузка сохраненных данных
    loadSavedData();
    
    // Обновление статистики
    updateVisitorCount();
    updateApplicationsCount();
    
    // Установка текущего года
    updateCurrentYear();
    
    // Проверка админского доступа
    checkAdminAccess();
    
    // Инициализация завершена
    setTimeout(() => {
        APP_STATE.isLoading = false;
        console.log('✅ Все компоненты инициализированы');
    }, 2000);
}

// ===== ЛОАДЕР =====
function initLoader() {
    if (!DOM_ELEMENTS.loader) return;
    
    // Имитация прогресса загрузки
    let progress = 0;
    const progressBar = DOM_ELEMENTS.loader.querySelector('.loader-progress');
    
    const interval = setInterval(() => {
        progress += 2;
        if (progressBar) {
            progressBar.style.width = Math.min(progress, 100) + '%';
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            
            // Плавное скрытие лоадера
            setTimeout(() => {
                DOM_ELEMENTS.loader.classList.add('fade-out');
                
                setTimeout(() => {
                    DOM_ELEMENTS.loader.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    
                    showNotification('🚀 Добро пожаловать в EatFit 2026! Технологии будущего уже здесь.', 'success');
                    
                    // Подсказка про админ-панель
                    setTimeout(() => {
                        showNotification('🔐 Админ-панель доступна по паролю 2026', 'info');
                    }, 2000);
                }, 500);
            }, 300);
        }
    }, 30);
}

// ===== НАВИГАЦИЯ И ПРОКРУТКА =====
function initNavigation() {
    if (!DOM_ELEMENTS.navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            DOM_ELEMENTS.navbar.classList.add('scrolled');
        } else {
            DOM_ELEMENTS.navbar.classList.remove('scrolled');
        }
        
        highlightActiveSection();
        updateScrollToTopButton();
    });
    
    document.querySelectorAll('.nav-item, .mobile-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                scrollToSection(targetId);
            }
        });
    });
}

function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');
    const mobileItems = document.querySelectorAll('.mobile-item');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    updateActiveMenuItem(navItems, currentSection);
    updateActiveMenuItem(mobileItems, currentSection);
}

function updateActiveMenuItem(items, currentSection) {
    items.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        if (href && href.substring(1) === currentSection) {
            item.classList.add('active');
        }
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const navbarHeight = DOM_ELEMENTS.navbar ? DOM_ELEMENTS.navbar.offsetHeight : 80;
    const sectionPosition = section.offsetTop - navbarHeight;
    
    window.scrollTo({
        top: sectionPosition,
        behavior: 'smooth'
    });
    
    closeMobileMenu();
}

// ===== МОБИЛЬНОЕ МЕНЮ =====
function initMobileMenu() {
    if (!DOM_ELEMENTS.mobileMenuBtn || !DOM_ELEMENTS.closeMenu || !DOM_ELEMENTS.mobileMenu) return;
    
    DOM_ELEMENTS.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    DOM_ELEMENTS.closeMenu.addEventListener('click', closeMobileMenu);
    
    DOM_ELEMENTS.mobileMenu.addEventListener('click', (e) => {
        if (e.target === DOM_ELEMENTS.mobileMenu) {
            closeMobileMenu();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && DOM_ELEMENTS.mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    DOM_ELEMENTS.mobileMenu.classList.toggle('active');
    DOM_ELEMENTS.mobileMenuBtn.classList.toggle('active');
    document.body.style.overflow = DOM_ELEMENTS.mobileMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    DOM_ELEMENTS.mobileMenu.classList.remove('active');
    DOM_ELEMENTS.mobileMenuBtn.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== АНИМАЦИИ И СЧЕТЧИКИ =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                if (entry.target.classList.contains('stat-number') || 
                    entry.target.classList.contains('result-number')) {
                    startCounter(entry.target);
                }
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    
    document.querySelectorAll('[data-aos], .stat-number, .result-number').forEach(el => {
        observer.observe(el);
    });
}

function initCounters() {
    const counters = document.querySelectorAll('.stat-number, .result-number');
    counters.forEach(counter => {
        counter.dataset.original = counter.textContent;
        counter.dataset.animated = 'false';
    });
}

function startCounter(element) {
    if (element.dataset.animated === 'true') return;
    
    const originalText = element.textContent;
    let target;
    
    // Определяем целевое значение
    if (originalText.includes('%')) {
        target = parseInt(originalText.replace('%', ''));
    } else if (originalText.includes('+')) {
        target = parseInt(originalText.replace('+', '').replace(',', ''));
    } else if (originalText.includes('.')) {
        target = parseFloat(originalText);
    } else {
        target = parseInt(originalText);
    }
    
    if (isNaN(target)) return;
    
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    element.dataset.animated = 'true';
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (element.classList.contains('result-number') || originalText.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (originalText.includes('+')) {
            element.textContent = Math.floor(current).toLocaleString() + '+';
        } else if (originalText.includes('.')) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// ===== ПАРАЛЛАКС =====
function initParallax() {
    const floatItems = document.querySelectorAll('.float-item');
    
    if (floatItems.length === 0) return;
    
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        floatItems.forEach(item => {
            const speed = parseFloat(item.dataset.speed) || 1;
            item.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}

// ===== ФОРМА КОНТАКТОВ =====
function initContactForm() {
    if (!DOM_ELEMENTS.contactForm) return;
    
    DOM_ELEMENTS.contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            submitContactForm();
        }
    });
    
    DOM_ELEMENTS.contactForm.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

function validateForm() {
    let isValid = true;
    const requiredFields = DOM_ELEMENTS.contactForm.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    clearFieldError(field);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Это поле обязательно для заполнения');
        isValid = false;
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Введите корректный email');
            isValid = false;
        }
    }
    
    if (isValid) {
        field.style.borderColor = '#10B981';
    }
    
    return isValid;
}

function showFieldError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#EF4444';
}

function clearFieldError(field) {
    const error = field.parentNode.querySelector('.error-message');
    if (error) {
        error.remove();
    }
    field.style.borderColor = '';
}

function submitContactForm() {
    const formData = new FormData(DOM_ELEMENTS.contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // Добавляем дополнительные данные
    data.timestamp = new Date().toISOString();
    data.date = new Date().toLocaleDateString('ru-RU');
    
    // Сохраняем заявку
    saveApplication(data);
    
    // Показываем уведомление
    showNotification('✅ Заявка отправлена! Наш AI-помощник свяжется с вами в течение 15 минут.', 'success');
    
    // Сброс формы
    DOM_ELEMENTS.contactForm.reset();
    
    // Обновление статистики
    updateApplicationsCount();
}

// ===== ВИДЕО МОДАЛЬНОЕ ОКНО =====
function initVideoModal() {
    if (!DOM_ELEMENTS.videoModal) return;
    
    document.querySelectorAll('.hero-btn[onclick*="openVideoModal"]').forEach(el => {
        el.addEventListener('click', openVideoModal);
    });
    
    DOM_ELEMENTS.videoModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay') || e.target === DOM_ELEMENTS.videoModal) {
            closeVideoModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && DOM_ELEMENTS.videoModal.getAttribute('aria-hidden') === 'false') {
            closeVideoModal();
        }
    });
}

function openVideoModal() {
    DOM_ELEMENTS.videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    DOM_ELEMENTS.videoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// ===== ЧАТ С AI =====
function initChatWidget() {
    const chatBtn = document.querySelector('.chat-button');
    const closeChatBtn = document.querySelector('.close-chat');
    const chatInput = document.querySelector('#chatInput');
    
    if (!chatBtn || !DOM_ELEMENTS.chatWidget) return;
    
    chatBtn.addEventListener('click', openChat);
    if (closeChatBtn) closeChatBtn.addEventListener('click', closeChat);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendChatMessage();
        });
    }
}

function handleChatKeypress(e) {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
}

function openChat() {
    DOM_ELEMENTS.chatWidget.classList.add('active');
    DOM_ELEMENTS.chatWidget.setAttribute('aria-hidden', 'false');
    const chatInput = document.querySelector('#chatInput');
    if (chatInput) chatInput.focus();
}

function closeChat() {
    DOM_ELEMENTS.chatWidget.classList.remove('active');
    DOM_ELEMENTS.chatWidget.setAttribute('aria-hidden', 'true');
}

function sendChatMessage() {
    const input = document.querySelector('#chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Добавляем сообщение пользователя
    addChatMessage(message, 'user');
    input.value = '';
    
    // Генерируем ответ AI
    generateAIResponse(message);
}

function generateAIResponse(userMessage) {
    let response = '';
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('привет') || lowerMessage.includes('здравствуй')) {
        response = getRandomResponse('greeting');
    } else if (lowerMessage.includes('технолог') || lowerMessage.includes('ai') || lowerMessage.includes('нейросеть')) {
        response = getRandomResponse('technologies');
    } else if (lowerMessage.includes('программ') || lowerMessage.includes('курс') || lowerMessage.includes('обучен')) {
        response = getRandomResponse('program');
    } else if (lowerMessage.includes('результат') || lowerMessage.includes('статистик') || lowerMessage.includes('отзыв')) {
        response = getRandomResponse('results');
    } else if (lowerMessage.includes('контакт') || lowerMessage.includes('телефон') || lowerMessage.includes('email') || lowerMessage.includes('telegram')) {
        response = getRandomResponse('contact');
    } else if (lowerMessage.includes('админ') || lowerMessage.includes('пароль')) {
        response = '🔐 Для доступа к админ-панели используйте пароль, связанный с годом проекта.';
    } else {
        response = getRandomResponse('default');
    }
    
    // Имитация задержки ответа AI
    setTimeout(() => {
        addChatMessage(response, 'bot');
    }, 1000);
}

function getRandomResponse(category) {
    const responses = AI_RESPONSES[category] || AI_RESPONSES.default;
    return responses[Math.floor(Math.random() * responses.length)];
}

function addChatMessage(text, sender) {
    const chatBody = document.querySelector('.chat-body');
    if (!chatBody) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${text}</p>
        </div>
        <div class="message-time">${new Date().toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'})}</div>
    `;
    
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// ===== ТЕМА =====
function initTheme() {
    if (!DOM_ELEMENTS.themeToggle) return;
    
    const savedTheme = localStorage.getItem('eatfit_theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        APP_STATE.theme = savedTheme;
        updateThemeIcon(savedTheme);
    }
    
    if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        APP_STATE.theme = 'dark';
        updateThemeIcon('dark');
    }
    
    DOM_ELEMENTS.themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('eatfit_theme', newTheme);
    APP_STATE.theme = newTheme;
    updateThemeIcon(newTheme);
    
    showNotification(`Тема изменена на ${newTheme === 'dark' ? 'темную 🌙' : 'светлую ☀️'}`, 'info');
}

function updateThemeIcon(theme) {
    const icon = DOM_ELEMENTS.themeToggle.querySelector('i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ===== КНОПКА "НАВЕРХ" =====
function initScrollToTop() {
    if (!DOM_ELEMENTS.backToTop) return;
    
    DOM_ELEMENTS.backToTop.addEventListener('click', scrollToTop);
}

function updateScrollToTopButton() {
    if (!DOM_ELEMENTS.backToTop) return;
    
    if (window.scrollY > 500) {
        DOM_ELEMENTS.backToTop.classList.add('visible');
    } else {
        DOM_ELEMENTS.backToTop.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== ПОДСКАЗКИ =====
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltipText = e.target.getAttribute('data-tooltip');
    if (!tooltipText) return;
    
    const tooltipEl = document.createElement('div');
    tooltipEl.className = 'custom-tooltip';
    tooltipEl.textContent = tooltipText;
    
    document.body.appendChild(tooltipEl);
    
    const rect = e.target.getBoundingClientRect();
    tooltipEl.style.cssText = `
        position: fixed;
        top: ${rect.top - 40}px;
        left: ${rect.left + rect.width / 2}px;
        transform: translateX(-50%);
        background: var(--bg-tertiary);
        color: var(--text-primary);
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-size: 0.8rem;
        white-space: nowrap;
        z-index: 10000;
        pointer-events: none;
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-md);
    `;
    
    e.target.tooltipElement = tooltipEl;
}

function hideTooltip(e) {
    if (e.target.tooltipElement) {
        e.target.tooltipElement.remove();
        e.target.tooltipElement = null;
    }
}

// ===== УВЕДОМЛЕНИЯ =====
function showNotification(message, type = 'info') {
    if (!DOM_ELEMENTS.notification) return;
    
    DOM_ELEMENTS.notification.textContent = message;
    DOM_ELEMENTS.notification.className = `notification ${type}`;
    
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        info: '#3B82F6',
        warning: '#F59E0B'
    };
    
    DOM_ELEMENTS.notification.style.background = colors[type] || colors.info;
    DOM_ELEMENTS.notification.classList.add('active');
    
    setTimeout(() => {
        DOM_ELEMENTS.notification.classList.remove('active');
    }, 3000);
}

// ===== АДМИН ПАНЕЛЬ =====
function initAdminPanel() {
    if (!DOM_ELEMENTS.adminPanel) return;
    
    // Загружаем сохраненные данные в форму
    loadAdminFormData();
}

function showAdminLogin() {
    DOM_ELEMENTS.adminLoginModal.style.display = 'block';
    setTimeout(() => {
        DOM_ELEMENTS.adminLoginModal.setAttribute('aria-hidden', 'false');
    }, 10);
}

function closeAdminLogin() {
    DOM_ELEMENTS.adminLoginModal.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
        DOM_ELEMENTS.adminLoginModal.style.display = 'none';
    }, 300);
}

function togglePasswordVisibility() {
    const passwordField = DOM_ELEMENTS.adminPassword;
    const toggleBtn = passwordField.nextElementSibling.querySelector('button i');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleBtn.className = 'fas fa-eye-slash';
    } else {
        passwordField.type = 'password';
        toggleBtn.className = 'fas fa-eye';
    }
}

function checkAdminPassword(e) {
    e.preventDefault();
    
    const password = DOM_ELEMENTS.adminPassword.value.trim();
    
    if (password === CONFIG.ADMIN_PASSWORD) {
        APP_STATE.isAdmin = true;
        showNotification('🔓 Админ-панель разблокирована', 'success');
        closeAdminLogin();
        toggleAdminPanel();
        
        // Сохраняем сессию
        localStorage.setItem('eatfit_admin_session', Date.now().toString());
    } else {
        showNotification('❌ Неверный пароль', 'error');
        DOM_ELEMENTS.adminPassword.value = '';
        DOM_ELEMENTS.adminPassword.focus();
    }
}

function toggleAdminPanel() {
    if (!APP_STATE.isAdmin) {
        showAdminLogin();
        return;
    }
    
    DOM_ELEMENTS.adminPanel.classList.toggle('active');
    APP_STATE.isAdminPanelOpen = !APP_STATE.isAdminPanelOpen;
    
    if (APP_STATE.isAdminPanelOpen) {
        showNotification('⚙️ Админ-панель открыта', 'info');
    }
}

function lockAdminPanel() {
    APP_STATE.isAdmin = false;
    DOM_ELEMENTS.adminPanel.classList.remove('active');
    APP_STATE.isAdminPanelOpen = false;
    localStorage.removeItem('eatfit_admin_session');
    showNotification('🔒 Админ-панель заблокирована', 'warning');
}

function loadAdminFormData() {
    // Загружаем текущие значения в форму
    if (DOM_ELEMENTS.editSiteTitle && DOM_ELEMENTS.siteTitle) {
        DOM_ELEMENTS.editSiteTitle.value = DOM_ELEMENTS.siteTitle.textContent.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');
    }
    
    if (DOM_ELEMENTS.editHeroText && DOM_ELEMENTS.heroSubtitle) {
        DOM_ELEMENTS.editHeroText.value = DOM_ELEMENTS.heroSubtitle.textContent;
    }
    
    if (DOM_ELEMENTS.editFooterText && DOM_ELEMENTS.footerDescription) {
        DOM_ELEMENTS.editFooterText.value = DOM_ELEMENTS.footerDescription.textContent;
    }
    
    // Загружаем статистику
    if (DOM_ELEMENTS.editStudents) DOM_ELEMENTS.editStudents.value = 12500;
    if (DOM_ELEMENTS.editSuccess) DOM_ELEMENTS.editSuccess.value = 96;
    if (DOM_ELEMENTS.editExperts) DOM_ELEMENTS.editExperts.value = 48;
}

function saveContent(type) {
    if (!APP_STATE.isAdmin) {
        showNotification('❌ Требуется доступ администратора', 'error');
        return;
    }
    
    let element, input;
    
    switch(type) {
        case 'siteTitle':
            element = DOM_ELEMENTS.siteTitle;
            input = DOM_ELEMENTS.editSiteTitle;
            break;
        case 'heroText':
            element = DOM_ELEMENTS.heroSubtitle;
            input = DOM_ELEMENTS.editHeroText;
            break;
        case 'footerText':
            element = DOM_ELEMENTS.footerDescription;
            input = DOM_ELEMENTS.editFooterText;
            break;
        default:
            return;
    }
    
    if (element && input) {
        const newValue = input.value.trim();
        if (newValue) {
            element.textContent = newValue;
            saveToLocalStorage('content', type, newValue);
            showNotification(`✅ Текст "${type}" сохранен`, 'success');
        }
    }
}

function saveStat(type) {
    if (!APP_STATE.isAdmin) {
        showNotification('❌ Требуется доступ администратора', 'error');
        return;
    }
    
    let element, input;
    
    switch(type) {
        case 'students':
            element = DOM_ELEMENTS.statStudents;
            input = DOM_ELEMENTS.editStudents;
            break;
        case 'success':
            element = DOM_ELEMENTS.statSuccess;
            input = DOM_ELEMENTS.editSuccess;
            break;
        case 'experts':
            element = DOM_ELEMENTS.statExperts;
            input = DOM_ELEMENTS.editExperts;
            break;
        default:
            return;
    }
    
    if (element && input) {
        const newValue = parseInt(input.value);
        if (!isNaN(newValue)) {
            const originalText = element.textContent;
            let newText;
            
            if (originalText.includes('%')) {
                newText = newValue + '%';
            } else if (originalText.includes('+')) {
                newText = newValue.toLocaleString() + '+';
            } else {
                newText = newValue.toLocaleString();
            }
            
            element.textContent = newText;
            element.dataset.original = newText;
            element.dataset.animated = 'false';
            
            saveToLocalStorage('stats', type, newValue);
            showNotification(`✅ Статистика "${type}" обновлена`, 'success');
        }
    }
}

function saveToLocalStorage(category, key, value) {
    const data = JSON.parse(localStorage.getItem(`eatfit_${category}`) || '{}');
    data[key] = value;
    localStorage.setItem(`eatfit_${category}`, JSON.stringify(data));
    APP_STATE.lastSave = new Date();
}

function exportData() {
    if (!APP_STATE.isAdmin) {
        showNotification('❌ Требуется доступ администратора', 'error');
        return;
    }
    
    const data = {
        content: JSON.parse(localStorage.getItem('eatfit_content') || '{}'),
        stats: JSON.parse(localStorage.getItem('eatfit_stats') || '{}'),
        settings: JSON.parse(localStorage.getItem('eatfit_settings') || '{}'),
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eatfit-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('📁 Данные экспортированы', 'success');
}

function importData() {
    if (!APP_STATE.isAdmin) {
        showNotification('❌ Требуется доступ администратора', 'error');
        return;
    }
    
    showNotification('Функция импорта в разработке', 'info');
}

function resetToDefault() {
    if (!APP_STATE.isAdmin) {
        showNotification('❌ Требуется доступ администратора', 'error');
        return;
    }
    
    if (confirm('Вы уверены, что хотите сбросить все изменения к значениям по умолчанию?')) {
        // Сбрасываем контент
        if (DOM_ELEMENTS.siteTitle) DOM_ELEMENTS.siteTitle.textContent = 'ПИТАНИЕ БУДУЩЕГО УЖЕ ЗДЕСЬ';
        if (DOM_ELEMENTS.heroSubtitle) DOM_ELEMENTS.heroSubtitle.textContent = 'Персонализированные планы питания с AI-анализом, нейросетевые рекомендации, VR-тренировки и генетический подход для идеального здоровья в 2026 году';
        if (DOM_ELEMENTS.footerDescription) DOM_ELEMENTS.footerDescription.textContent = 'Инновационная платформа для здорового питания нового поколения. Технологии будущего уже сегодня.';
        
        // Сбрасываем статистику
        if (DOM_ELEMENTS.statStudents) {
            DOM_ELEMENTS.statStudents.textContent = '12,500+';
            DOM_ELEMENTS.statStudents.dataset.animated = 'false';
        }
        if (DOM_ELEMENTS.statSuccess) {
            DOM_ELEMENTS.statSuccess.textContent = '96%';
            DOM_ELEMENTS.statSuccess.dataset.animated = 'false';
        }
        if (DOM_ELEMENTS.statExperts) {
            DOM_ELEMENTS.statExperts.textContent = '48';
            DOM_ELEMENTS.statExperts.dataset.animated = 'false';
        }
        
        // Обновляем форму
        loadAdminFormData();
        
        // Очищаем localStorage
        localStorage.removeItem('eatfit_content');
        localStorage.removeItem('eatfit_stats');
        
        showNotification('🔄 Настройки сброшены к значениям по умолчанию', 'success');
    }
}

// ===== LOCALSTORAGE И ДАННЫЕ =====
function loadSavedData() {
    // Загружаем контент
    const savedContent = JSON.parse(localStorage.getItem('eatfit_content') || '{}');
    Object.entries(savedContent).forEach(([key, value]) => {
        applyContentToElement(key, value);
    });
    
    // Загружаем статистику
    const savedStats = JSON.parse(localStorage.getItem('eatfit_stats') || '{}');
    Object.entries(savedStats).forEach(([key, value]) => {
        applyStatToElement(key, value);
    });
    
    // Загружаем настройки
    const savedSettings = JSON.parse(localStorage.getItem('eatfit_settings') || '{}');
    if (savedSettings.theme) {
        document.documentElement.setAttribute('data-theme', savedSettings.theme);
        APP_STATE.theme = savedSettings.theme;
        updateThemeIcon(savedSettings.theme);
    }
}

function applyContentToElement(key, value) {
    let element;
    switch(key) {
        case 'siteTitle':
            element = DOM_ELEMENTS.siteTitle;
            break;
        case 'heroText':
            element = DOM_ELEMENTS.heroSubtitle;
            break;
        case 'footerText':
            element = DOM_ELEMENTS.footerDescription;
            break;
        default:
            return;
    }
    
    if (element && value) {
        element.textContent = value;
    }
}

function applyStatToElement(key, value) {
    let element;
    switch(key) {
        case 'students':
            element = DOM_ELEMENTS.statStudents;
            break;
        case 'success':
            element = DOM_ELEMENTS.statSuccess;
            break;
        case 'experts':
            element = DOM_ELEMENTS.statExperts;
            break;
        default:
            return;
    }
    
    if (element && value) {
        const originalText = element.textContent;
        let newText;
        
        if (originalText.includes('%')) {
            newText = value + '%';
        } else if (originalText.includes('+')) {
            newText = value.toLocaleString() + '+';
        } else {
            newText = value.toLocaleString();
        }
        
        element.textContent = newText;
        element.dataset.original = newText;
        element.dataset.animated = 'false';
    }
}

function saveApplication(data) {
    const applications = JSON.parse(localStorage.getItem(CONFIG.APPLICATIONS_KEY) || '[]');
    applications.push(data);
    localStorage.setItem(CONFIG.APPLICATIONS_KEY, JSON.stringify(applications));
    APP_STATE.applicationsCount = applications.length;
}

function updateVisitorCount() {
    let visitors = parseInt(localStorage.getItem(CONFIG.VISITOR_KEY) || '0');
    visitors++;
    localStorage.setItem(CONFIG.VISITOR_KEY, visitors.toString());
    APP_STATE.visitorCount = visitors;
}

function updateApplicationsCount() {
    const applications = JSON.parse(localStorage.getItem(CONFIG.APPLICATIONS_KEY) || '[]').length;
    APP_STATE.applicationsCount = applications;
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
function updateCurrentYear() {
    const yearElements = document.querySelectorAll('.logo-year, .year-badge');
    yearElements.forEach(el => {
        el.textContent = '2026';
    });
}

function checkAdminAccess() {
    const sessionTime = localStorage.getItem('eatfit_admin_session');
    if (sessionTime) {
        const sessionAge = Date.now() - parseInt(sessionTime);
        if (sessionAge < 2 * 60 * 60 * 1000) {
            APP_STATE.isAdmin = true;
        }
    }
}

// Делегирование событий
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]') && e.target.getAttribute('href') !== '#') {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        scrollToSection(targetId);
    }
});

// Оптимизация ресайза
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        highlightActiveSection();
        updateScrollToTopButton();
    }, 250);
});

// Инициализация при полной загрузке
window.addEventListener('load', () => {
    document.querySelectorAll('.stat-number, .result-number').forEach(counter => {
        if (isElementInViewport(counter)) {
            startCounter(counter);
        }
    });
    
    updateCurrentYear();
    
    console.log('✅ EatFit 2026 полностью загружен');
});

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===== ГЛОБАЛЬНЫЕ ЭКСПОРТЫ =====
window.scrollToSection = scrollToSection;
window.scrollToTop = scrollToTop;
window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;
window.openChat = openChat;
window.closeChat = closeChat;
window.toggleTheme = toggleTheme;
window.closeMobileMenu = closeMobileMenu;
window.sendChatMessage = sendChatMessage;
window.showAdminLogin = showAdminLogin;
window.closeAdminLogin = closeAdminLogin;
window.togglePasswordVisibility = togglePasswordVisibility;
window.checkAdminPassword = checkAdminPassword;
window.toggleAdminPanel = toggleAdminPanel;
window.lockAdminPanel = lockAdminPanel;
window.saveContent = saveContent;
window.saveStat = saveStat;
window.exportData = exportData;
window.importData = importData;
window.resetToDefault = resetToDefault;
window.handleChatKeypress = handleChatKeypress;

console.log('🚀 EatFit 2026 готов к работе!');