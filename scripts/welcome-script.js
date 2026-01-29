const beginBtn = document.querySelector('#begin-button');

beginBtn.addEventListener('click', e => {
    e.preventDefault(); // Prevent immediate navigation
    document.body.classList.add('fade-out');
    
    setTimeout(() => {
        window.location.href = '../pages/select-mode.html';
    }, 500); // Wait for fade to finish (matches transition duration)
})
