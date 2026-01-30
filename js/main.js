import { initVision } from './vision.js';
import { initNetwork } from './network.js';
import { state } from './state.js';
import { CONFIG } from './config.js';

// DOM Elements needed for initialization
const uploadTrigger = document.getElementById('upload-trigger');
const fileInput = document.getElementById('file-input');
const gallery = document.getElementById('gallery');
const viewport = document.getElementById('viewport');
const optic = document.querySelector('.optic');

document.addEventListener('DOMContentLoaded', () => {
    console.log("SurgiWave System Initializing...");

    // 1. Initialize Communication & AI Hand Tracking
    // We pass 'false' to indicate this is the Sender Hub, not the Receiver
    initNetwork(false);
    initVision(false);

    // 2. Load Default Image into Viewport
    loadInitialView();

    // 3. Setup Local File Upload Event Listeners
    setupUploadHandlers();
});

/**
 * Loads the default medical image defined in config.js
 */
function loadInitialView() {
    viewport.style.backgroundImage = `url(${CONFIG.DEFAULT_IMG})`;
    optic.style.backgroundImage = `url(${CONFIG.DEFAULT_IMG})`;
    
    const img = new Image();
    img.src = CONFIG.DEFAULT_IMG;
    img.onload = () => {
        state.currentImg.w = img.width;
        state.currentImg.h = img.height;
        
        // Create the first thumbnail in the gallery
        const t = document.createElement('div');
        t.className = 'thumb active';
        t.innerHTML = `<img src="${CONFIG.DEFAULT_IMG}">`;
        gallery.appendChild(t);
    };
}

/**
 * Handles clicks on the upload button and processes local files
 */
function setupUploadHandlers() {
    uploadTrigger.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const url = ev.target.result;
                
                // Add to state library
                const newId = state.mediaLib.length;
                state.mediaLib.push({ id: newId, url: url });

                // Create UI Thumbnail
                const t = document.createElement('div');
                t.className = 'thumb';
                t.innerHTML = `<img src="${url}">`;
                
                // Handle thumbnail click to switch images
                t.onclick = () => {
                    document.querySelectorAll('.thumb').forEach(el => el.classList.remove('active'));
                    t.classList.add('active');
                    state.curIdx = newId;
                    viewport.style.backgroundImage = `url(${url})`;
                    optic.style.backgroundImage = `url(${url})`;
                };

                gallery.appendChild(t);
            };
            reader.readAsDataURL(file);
        });
    });
}