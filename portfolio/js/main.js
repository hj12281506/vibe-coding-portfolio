/**
 * 메인 초기화 파일
 * 모든 기능 모듈을 통합하여 초기화
 */

import { initScrollAnimations } from './scroll-animations.js';
import { initTouchEvents } from './touch-events.js';

function initNavigation() {
    const header = document.querySelector('.site-header');
    const nav = document.getElementById('site-nav');
    const navToggle = document.getElementById('nav-toggle');
    const scrollTopButton = document.getElementById('scroll-top');
    const links = nav ? nav.querySelectorAll('a[href^="#"]') : [];
    const sections = document.querySelectorAll('[data-section]');

    function setActiveLink() {
        const offset = window.innerHeight * 0.25;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isActive = rect.top <= offset && rect.bottom >= offset;
            const link = nav?.querySelector(`a[href="#${section.id}"]`);
            if (link) {
                link.classList.toggle('is-active', isActive);
            }
        });
    }

    navToggle?.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        nav?.classList.toggle('is-open');
    });

    links.forEach(link => {
        link.addEventListener('click', evt => {
            const hash = link.getAttribute('href');
            if (hash?.startsWith('#')) {
                evt.preventDefault();
                const target = document.querySelector(hash);
                target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                nav?.classList.remove('is-open');
                navToggle?.setAttribute('aria-expanded', 'false');
            }
        });
    });

    window.addEventListener('scroll', () => {
        const sticky = window.scrollY > 40;
        header?.classList.toggle('is-sticky', sticky);
        scrollTopButton?.classList.toggle('is-visible', window.scrollY > 600);
        setActiveLink();
    });

    scrollTopButton?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const yearHolder = document.querySelector('[data-year]');
    if (yearHolder) {
        yearHolder.textContent = new Date().getFullYear();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initTouchEvents();
});

