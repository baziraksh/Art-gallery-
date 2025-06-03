// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');

function setTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme === 'dark');

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(!isDark);
});

// Mobile menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && 
        !navLinks.contains(e.target) && 
        navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = '';
    }
});

// Close menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = '';
    });
});
