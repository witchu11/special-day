// This function runs when the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bg-music');
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const enterButton = document.getElementById('enter-button');
    const loginBox = document.querySelector('.login-box');

    // Add a click listener to the enter button
    enterButton.addEventListener('click', () => {
        // Try to play the music. This should now work because it's triggered by a user click.
        bgMusic.play().catch(error => {
            console.error("Audio playback failed:", error);
            // Audio couldn't play, but we can still continue with the site.
        });

        // Hide the welcome overlay and show the login form
        welcomeOverlay.style.display = 'none';
        loginBox.style.display = 'block';
    });
});


// --- The rest of your original login.js code remains unchanged below ---

// --- Page Navigation ---
function checkPassword() {
    if (document.getElementById("password").value === "1108") {
        alert("Welcome to the surprise, Saachi! 💖");
        window.location.href = 'main.html';
    } else {
        alert("Oops! Wrong love code 🥺");
    }
    return false; // Prevent form submission
}

// --- Initialization Functions ---
function initializeLogin() {
    setInterval(updateCountdown, 1000);
    updateCountdown();

    const loginHeartContainer = document.getElementById('login-heart-container');
    const loginBubbleContainer = document.getElementById('login-bubble-container');
    setInterval(() => {
        createFloatingElement("heart", loginHeartContainer);
        createFloatingElement("bubble", loginBubbleContainer);
    }, 300);
}

// --- Login Page Scripts ---
const countdownEl = document.getElementById('timer');
const targetDate = new Date("2025-08-11T00:00:00");

function updateCountdown() {
    const diff = targetDate - new Date();
    if (diff <= 0) {
        countdownEl.innerHTML = "🎉 Happy Birthday! 🎉";
        return;
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);
    countdownEl.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
}

function createFloatingElement(className, container) {
    const el = document.createElement("div");
    el.className = className;
    el.style.left = `${Math.random() * 100}vw`;
    el.style.animationDuration = `${5 + Math.random() * 5}s`;
    container.appendChild(el);
    setTimeout(() => el.remove(), 10000);
}

// --- Start the login animations ---
initializeLogin();