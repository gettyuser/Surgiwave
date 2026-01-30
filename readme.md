# Surgi-Wave 🌊✋

**A Touchless Medical Image Interface for Sterile Environments.**

Surgi-Wave is a gesture-controlled image viewer designed for operating rooms. It allows surgeons to manipulate medical imagery (zoom, pan, scroll) without touching screens or peripherals, preserving sterility. It features a "Hub & Spoke" architecture, allowing external devices (like phones) to act as wireless capture tools and passive screens to act as remote viewers.

![Status](https://img.shields.io/badge/Status-Prototype-green)
![Tech](https://img.shields.io/badge/Tech-MediaPipe%20%7C%20PeerJS%20%7C%20WebRTC-blue)

## 🚀 Features

* **Touchless Navigation:** precise hand tracking using Google MediaPipe.
* **Safety Lock:** "Dead man's switch" logic ensures the cursor never drifts unintentionally.
* **Multi-Device Hub:**
    * **Sender (Hub):** The central controller. Handles gestures and file management.
    * **Receiver:** Passive display for students or secondary monitors.
    * **Camera Remote:** Connect any smartphone to beam high-res photos directly to the Hub.
* **Strict Gesture Recognition:** Advanced anatomical vector checks to prevent false positives (e.g., distinguishing a fist from a thumbs-up).
* **Local Privacy:** All processing happens in the browser. No data is sent to the cloud (P2P only).

## 🛠️ Installation & Usage

### Prerequisites
Because this app uses the **Camera** and **WebRTC**, browsers require it to be served over **HTTPS** (or `localhost`). You cannot simply drag the HTML files into your browser if you want to connect a phone.

### The Workflow
1.  **Open `sender.html`** on the main computer (The Hub).
    * Click "Copy ID".
2.  **Open `receiver.html`** on a second screen.
    * Paste the Sender ID and connect.

## 🖐️ Gesture Guide

| Gesture | Action | Visual Feedback |
| :--- | :--- | :--- |
| **Open Hand** ✋ | **Scan / Move** | Cursor turns **GREEN**. |
| **3 Fingers** ✌️+☝️ | **Lock Position** | Cursor turns **BLUE**. Image freezes. |
| **Fist** ✊ | **Idle / Hide** | Cursor disappears. |
| **Thumbs Up** 👍 | **Transfer** | Cursor turns **GOLD**. Sends current view to Receiver. |
| **Hold Open Hand** ✋ | **Unlock Safety** | Hold for **0.25s** to unlock a locked image. |

## ⚙️ Technology Stack

* **Core:** HTML5, CSS3, Vanilla JavaScript (ES6).
* **Computer Vision:** [MediaPipe Hands](https://developers.google.com/mediapipe/solutions/vision/hand_landmarker).
* **Networking:** [PeerJS](https://peerjs.com/) (WebRTC wrapper for P2P data).

## ⚠️ Troubleshooting

* **Camera not working on phone?** Ensure you are accessing the site via `HTTPS`, not `HTTP`. Mobile browsers block camera access on insecure connections.
* **"Connecting..." forever?** Ensure both devices are on the same network or allow P2P traffic through your firewall.

## 📄 License
MIT License. Free for educational and medical research use.
