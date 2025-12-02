/**
 * 터치 이벤트 처리
 * 모바일에서 스와이프 제스처를 통한 스크롤 제어
 */

let touchStartY = 0;
let touchEndY = 0;
let sections = [];

function findCurrentSection() {
    const midpoint = window.scrollY + window.innerHeight / 2;
    let closest = sections[0];
    let minDiff = Infinity;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const diff = Math.abs(top - midpoint);
        if (diff < minDiff) {
            minDiff = diff;
            closest = section;
        }
    });

    return closest;
}

function goToSection(direction) {
    const current = findCurrentSection();
    const idx = sections.indexOf(current);
    const nextIdx = Math.min(sections.length - 1, Math.max(0, idx + direction));
    const target = sections[nextIdx];

    if (target && target !== current) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function handleTouchStart(e) {
    touchStartY = e.changedTouches[0].screenY;
}

function handleTouchEnd(e) {
    touchEndY = e.changedTouches[0].screenY;
    const diff = touchStartY - touchEndY;
    const threshold = 60;

    if (Math.abs(diff) > threshold) {
        goToSection(diff > 0 ? 1 : -1);
    }
}

export function initTouchEvents() {
    sections = Array.from(document.querySelectorAll('.page-section'));
    if (sections.length < 2) return;

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
}

