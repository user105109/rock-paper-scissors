const volumeBtn = document.querySelector('.volume')
const homeBtn = document.querySelector('.backArrow')

homeBtn.addEventListener('click', e => {
    e.preventDefault(); // Prevent immediate navigation
    document.body.classList.add('fade-out');
    
    setTimeout(() => {
        window.location.href = '../pages/welcome.html';
    }, 500);
})

const modeBtns = document.querySelector('.mode-buttons');

modeBtns.addEventListener('click', e => {
    const modeBtnTrigger = e.target.closest('.btn-mode');
    if(!modeBtnTrigger) return;

    const rounds = modeBtnTrigger.dataset.rounds;

    localStorage.setItem('maxRounds', rounds);

    document.body.classList.add('fade-out');

    setTimeout(() => {
            window.location.href = '../pages/play.html';
    }, 500);
})