let canvas;
let world;
let keyboard = new Keyboard();
let isFullscreen = false;
let audio = localStorage.getItem('audio') === 'false' ? false : true;

function init() {
    canvas = document.querySelector('#canvas');
    world = new World(canvas, keyboard);
    updateAudioIcon();
}

window.addEventListener("keydown", (e) => {
    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if(e.keyCode == 38) {
        keyboard.UP = true;
    }

    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if(e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (e) => {
    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if(e.keyCode == 38) {
        keyboard.UP = false;
    }

    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if(e.keyCode == 68) {
        keyboard.D = false;
    }
});

function setAudio() {
    audio = !audio;
    updateAudioIcon();
    localStorage.setItem('audio', audio);
    
    if(world) {
        world.audio = audio;
    }
}

function updateAudioIcon() {
    let volume = document.querySelector('#volume');
    volume.src = audio ? 'img/10_icons/volume.png' : 'img/10_icons/mute.png';
}

function restart(id) {
    let content = document.querySelector('#' + id);
    content.classList.add('d-none');
    document.querySelector('#startscreen').classList.remove('d-none');
}

function openSettings() {
    let btn = document.querySelector('#settingsBtn');
    let settingsContainer = document.querySelector('#settings');
    
    btn.setAttribute('onclick', 'closeSettings()');
    btn.src = 'img/10_icons/settings-icon.png'
    
    settingsContainer.classList.remove('d-none');
    settingsContainer.addEventListener('click', closeSettings);
}

function closeSettings() {
    let btn = document.querySelector('#settingsBtn');
    btn.setAttribute('onclick', 'openSettings()');
    btn.src = 'img/10_icons/settings-icon.png'
    document.querySelector('#settings').classList.add('d-none');
}

function toggleFullscreen() {
    const content = document.querySelector('#content');

    if(!isFullscreen) {
      fullscreenON(content);
    } else {
      fullscreenOFF();
    }
}

function fullscreenON(content) {
    if(content.requestFullscreen) {
        content.requestFullscreen();
    } else if(content.mozRequestFullScreen) {
        content.mozRequestFullScreen();
    } else if(content.webkitRequestFullscreen) {
        content.webkitRequestFullscreen();
    } else if(content.msRequestFullscreen) {
        content.msRequestFullscreen();
    }

    isFullscreen = true;
}

function fullscreenOFF() {
    if(document.exitFullscreen) {
        document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if(document.msExitFullscreen) {
        document.msExitFullscreen();
    }

    isFullscreen = false;
}