document.getElementById('login-page').onclick = () => window.location.href = 'login.html';
const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const step1 = document.getElementById('step-1');
        const step2 = document.getElementById('step-2');

        nextBtn.addEventListener('click', function() {
            step1.classList.add('hidden');
            step2.classList.remove('hidden');
        });

        prevBtn.addEventListener('click', function() {
            step2.classList.add('hidden');
            step1.classList.remove('hidden');
        });