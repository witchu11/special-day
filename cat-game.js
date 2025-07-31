// --- Cat Game Scripts ---

// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
    
    // --- Elements ---
    const catImage = document.getElementById('catImage');
    const textInput = document.getElementById('textInput');
    const sendButton = document.getElementById('sendButton');
    const manualMessageButton = document.getElementById('manualMessageButton');
    const bubble = document.getElementById('bubble');
    const letter = document.getElementById('letter');
    const closeLetterButton = document.getElementById('closeLetterButton');
    const gameContainer = document.getElementById('cat-game-container');


    // --- State Variables ---
    let voices = [];
    // Updated messages to sound more cat-like
    const manualMessages = [
       "happy birthday, enjoy your day with joy my idiot!",
      "You're the prettiest person ever, saachi!",
      "You're photos make me smile every day!",
      "You're cute as a kitten!",
      "It is in my nature to go away far from you, wandering around and making sense of life. But I hope you know that I do care for you.!",
      "I need you to know that no matter what happens, it was worth it to me. Being with you, loving you. It was all worth it!",
      "u had the most beautiful thing that I had ever seen And only your laugh to realize that beauty was the least of u ",
      "i could watch your photo for a single minute and find a thousand things that i love about you!",
      "dont be sad, iam here to make u smile!",
      "I keep myself busy with the things I do, But every time I pause, I still think of you",
      "if the destine is with us, we will ....",
      "My heart wont let you go, and I need you to know, I miss you.",
      "waiting for the day we meet again!",
      "Lying next to you or three hundred miles away, I am yours just the same.",
      "We loved with a love that was more than love",
      "we dont need a love scene to show love.",
    ];
    let currentMessageIndex = 0;
    let holdStart = null;
    let holdTimer = null;


    // --- Functions ---
    
    /**
     * NEW FUNCTION: "Catifies" the text by adding meows and purrs.
     * This makes the text sound more like a cat is talking.
     * @param {string} text - The original text.
     * @returns {string} - The modified, cat-like text.
     */
    function catifyText(text) {
        const catSounds = ["Meow!", "Purrrr...", "Mrow!", "Meeeow?"];
        // Add a random cat sound at the beginning of the message.
        const randomSound = catSounds[Math.floor(Math.random() * catSounds.length)];
        return `${randomSound} ${text}`;
    }

    // Load speech synthesis voices
    function loadVoices() {
        voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) {
            window.speechSynthesis.onvoiceschanged = () => {
                voices = window.speechSynthesis.getVoices();
            };
        }
    }

    // Main speak function - unchanged but will receive "catified" text
    function speak(text) {
        if (!text || typeof SpeechSynthesisUtterance === "undefined") {
            console.error("Speech Synthesis is not supported or text is empty.");
            return;
        }
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        // A very high pitch is the key to sounding like a small creature!
        utterance.pitch = 2; // Range is 0 to 2
        utterance.rate = 1.1; // Slightly faster can sound more animated
        
        const voice = voices.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('female'));
        if (voice) {
            utterance.voice = voice;
        }
        
        speechSynthesis.speak(utterance);
    }

    // UPDATED: Now "catifies" the text before speaking
    function speakTypedMessage() {
        const message = textInput.value.trim();
        if (message) {
            const catMessage = catifyText(message); // Convert to cat-speak
            bubble.innerText = catMessage; // Display the new message
            speak(catMessage);
            textInput.value = "";
        }
    }

    // UPDATED: The manual messages are already cat-like
    function speakManualCatMessage() {
        const message = manualMessages[currentMessageIndex];
        bubble.innerText = message;
        speak(message);
        currentMessageIndex = (currentMessageIndex + 1) % manualMessages.length;
    }

    // Show the letter on long-press/hold
    function showLetter() {
        letter.style.display = 'block';
    }

    // Hide the letter
    function hideLetter() {
        letter.style.display = 'none';
    }


    // --- Event Listeners ---
    catImage.addEventListener('click', speakManualCatMessage);
    sendButton.addEventListener('click', speakTypedMessage);
    manualMessageButton.addEventListener('click', speakManualCatMessage);
    textInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            speakTypedMessage();
        }
    });
    closeLetterButton.addEventListener('click', hideLetter);

    // Event listeners for hold gesture to reveal the letter
    const startHold = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        if (clientX < window.innerWidth * 0.3) {
            holdStart = Date.now();
            holdTimer = setTimeout(() => {
                if (holdStart) {
                    showLetter();
                    holdStart = null;
                }
            }, 5000);
        }
    };

    const endHold = () => {
        clearTimeout(holdTimer);
        holdStart = null;
    };

    gameContainer.addEventListener('touchstart', startHold);
    gameContainer.addEventListener('touchend', endHold);
    gameContainer.addEventListener('mousedown', startHold);
    gameContainer.addEventListener('mouseup', endHold);
    gameContainer.addEventListener('mouseleave', endHold);

    // --- Initial Setup ---
    loadVoices();
});