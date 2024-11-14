/**
 * The main canvas element for the game.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * The main World instance representing the game world.
 * @type {World}
 */
let world;

/**
 * The keyboard input handler.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Indicates if the game is in fullscreen mode.
 * @type {boolean}
 */
let isFullscreen = false;

/**
 * Indicates if audio is enabled, initialized from localStorage.
 * @type {boolean}
 */
let audio = localStorage.getItem('audio') === 'false' ? false : true;

/**
 * Initializes the game by setting up the canvas, world, and initial audio state.
 */
function init() {
    canvas = document.querySelector('#canvas');
    world = new World(canvas, keyboard);
    updateAudioIcon();
}

/**
 * Handles keydown events to set the appropriate keyboard state.
 * @param {KeyboardEvent} e - The keyboard event.
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

/**
 * Handles keyup events to reset the appropriate keyboard state.
 * @param {KeyboardEvent} e - The keyboard event.
 */
window.addEventListener("keyup", (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});

/**
 * Toggles the audio state between on and off, updates the audio icon,
 * and saves the state in localStorage.
 */
function setAudio() {
    audio = !audio;
    updateAudioIcon();
    localStorage.setItem('audio', audio);
    
    if (world) {
        world.audio = audio;
    }
}

/**
 * Updates the audio icon to reflect the current audio state.
 */
function updateAudioIcon() {
    let volume = document.querySelector('#volume');
    volume.src = audio ? 'img/10_icons/volume.png' : 'img/10_icons/mute.png';
}

/**
 * Restarts the game by hiding the given element and displaying the start screen.
 * @param {string} id - The ID of the element to hide.
 */
function restart(id) {
    let content = document.querySelector('#' + id);
    content.classList.add('d-none');
    document.querySelector('#startscreen').classList.remove('d-none');
}

/**
 * Opens the settings menu and switches the settings button to close mode.
 */
function openSettings() {
    let btn = document.querySelector('#settingsBtn');
    let settingsContainer = document.querySelector('#settings');
    
    btn.setAttribute('onclick', 'closeSettings()');
    btn.src = 'img/10_icons/settings-icon.png'
    
    settingsContainer.classList.remove('d-none');
    settingsContainer.addEventListener('click', closeSettings);
}

/**
 * Closes the settings menu and switches the settings button to open mode.
 */
function closeSettings() {
    let btn = document.querySelector('#settingsBtn');
    btn.setAttribute('onclick', 'openSettings()');
    btn.src = 'img/10_icons/settings-icon.png'
    document.querySelector('#settings').classList.add('d-none');
}

/**
 * Toggles the fullscreen mode for the game content.
 */
function toggleFullscreen() {
    const content = document.querySelector('#content');

    if (!isFullscreen) {
        fullscreenON(content);
    } else {
        fullscreenOFF();
    }
}

/**
 * Enables fullscreen mode for the specified content.
 * @param {HTMLElement} content - The content element to display in fullscreen.
 */
function fullscreenON(content) {
    if (content.requestFullscreen) {
        content.requestFullscreen();
    } else if (content.mozRequestFullScreen) {
        content.mozRequestFullScreen();
    } else if (content.webkitRequestFullscreen) {
        content.webkitRequestFullscreen();
    } else if (content.msRequestFullscreen) {
        content.msRequestFullscreen();
    }

    isFullscreen = true;
}

/**
 * Disables fullscreen mode.
 */
function fullscreenOFF() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }

    isFullscreen = false;
}