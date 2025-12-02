/**
 * 스크롤 애니메이션 기능
 * Intersection Observer를 사용하여 슬라이드가 뷰포트에 들어올 때 애니메이션 적용
 */

export function initScrollAnimations() {
    const targets = document.querySelectorAll('.animate-on-scroll');
    if (!('IntersectionObserver' in window) || !targets.length) {
        targets.forEach(target => {
            target.style.opacity = '1';
            target.style.transform = 'none';
        });
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'none';
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -80px 0px' });

    targets.forEach(target => {
        target.style.opacity = '0';
        target.style.transform = 'translateY(32px)';
        target.style.transition = 'opacity 600ms ease, transform 600ms ease';
        observer.observe(target);
    });
}

