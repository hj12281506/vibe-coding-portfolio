/**
 * 로그인 페이지 상호작용
 */
function initPasswordToggle() {
    const toggle = document.querySelector('[data-password-toggle]');
    const passwordInput = document.getElementById('password');
    if (!toggle || !passwordInput) return;

    toggle.addEventListener('click', () => {
        const isHidden = passwordInput.type === 'password';
        passwordInput.type = isHidden ? 'text' : 'password';
        toggle.textContent = isHidden ? '숨기기' : '보기';
        toggle.setAttribute('aria-pressed', String(isHidden));
    });
}

function initForm() {
    const form = document.querySelector('.login-form');
    const message = document.querySelector('.form-message');
    if (!form || !message) return;

    form.addEventListener('submit', evt => {
        evt.preventDefault();
        if (!form.reportValidity()) {
            message.textContent = '필수 항목을 모두 입력해 주세요.';
            return;
        }
        const formData = new FormData(form);
        const email = formData.get('email');
        message.textContent = `${email} 계정으로 로그인 중입니다...`;
        setTimeout(() => {
            message.textContent = '보안을 위해 2차 인증 코드가 발송되었습니다.';
        }, 1400);
    });
}

function initQuickActions() {
    const buttons = document.querySelectorAll('[data-quick-action]');
    const message = document.querySelector('.form-message');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const provider = button.dataset.quickAction;
            if (message) {
                message.textContent = `${provider?.toUpperCase()} 인증 창을 열고 있습니다...`;
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initPasswordToggle();
    initForm();
    initQuickActions();
});

