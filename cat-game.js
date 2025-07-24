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
      "You're the sweetest person ever, my idiot!",
      "You're photos make me smile every day!",
      "You're as cute as a kitten!",
      "keep smiling, keep achiving, keep shining!",
      "your smile will make my day!",
      "iam here for u at any time ",
      "dont worry, iam always with u!",
      "dont be sad, iam here to make u smile!",
      "dont easyly trust someone, be strong in life and keep going dont feel for anything",
      "if the destine is with us, we will ....",
      "waiting for the day we meet again!",
      "still loving, still caring....",
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