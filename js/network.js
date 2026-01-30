import { state } from './state.js';

let peer, conn;

export function initNetwork(isReceiver) {
    peer = new Peer();
    peer.on('open', id => document.getElementById('my-id').innerText = id);
    peer.on('connection', c => { conn = c; setupConnection(); });

    document.getElementById('btn-conn').onclick = () => {
        const pid = document.getElementById('partner-id').value;
        conn = peer.connect(pid);
        setupConnection();
    };
}

function setupConnection() {
    conn.on('open', () => {
        state.connected = true;
        document.getElementById('connect-overlay').style.display = 'none';
        document.getElementById('app-container').classList.add('active');
        
        conn.on('data', data => {
            if(data === 'PULL_REQUEST' && state.mode === 'AUTHORIZING') broadcastImage();
            if(data.type === 'BINARY_IMAGE') handleIncomingImage(data);
        });
    });
}

function broadcastImage() {
    // Logic to send current blob via conn.send()
}