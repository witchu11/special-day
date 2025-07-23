// --- Page Navigation ---
function showCatGame() {
    window.location.href = 'cat-game.html';
}

// --- Initialization Functions ---
function initializeMainContent() {
    setInterval(createMainHeart, 150);
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => card.classList.toggle('flipped'));
    });
}

// --- Main Content Scripts ---
function createMainHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${100 + Math.random() * 10}%`; // Start from bottom
    heart.style.animationDuration = `${3 + Math.random() * 2}s`;
    document.getElementById('main-heart-container').appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
}

initializeMainContent();