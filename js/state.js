import { CONFIG } from './config.js';

export const state = {
    mode: 'IDLE',
    connected: false,
    unlockStart: 0,
    hasImage: true,
    physics: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
    mediaLib: [{ id: 0, url: CONFIG.DEFAULT_IMG }],
    curIdx: 0,
    currentImg: { w: 1, h: 1, url: CONFIG.DEFAULT_IMG }
};