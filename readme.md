# Surgiwave 🌊✋

**A Touchless, Modular Medical Imaging Interface for Sterile Environments.**

Surgiwave is a professional-grade, gesture-controlled system designed for operating rooms and clinical settings. It enables medical professionals to navigate, zoom, and transfer diagnostic imagery without physical contact, preserving the sterile field and eliminating the need for unsterile peripherals.

![Status](https://img.shields.io/badge/Status-Operational-success)
![Tech](https://img.shields.io/badge/Stack-Modular%20JS%20%7C%20MediaPipe%20%7C%20PeerJS-blue)
![Deployment](https://img.shields.io/badge/Hosted-Vercel-black)

---

## 🌐 Live Demo & Real-World Testing

You can test the P2P gesture control system in real-time using the links below. For the best experience, open the **Sender** on a laptop and the **Receiver** on a separate screen or tablet.

* **[Control Hub (Sender)](https://surgiwav.vercel.app/sender.html)**: Primary interface for image manipulation and transmission.
* **[Monitor View (Receiver)](https://surgiwav.vercel.app/reciever.html)**: Passive display for receiving beamed imagery.

---

## 🛠️ System Architecture

The project utilizes a **Modular Design Pattern**, separating core logic into specialized services. This architecture ensures high maintainability and professional-grade code organization.

* **`index.html` (The Hub):** The primary control unit used by the lead surgeon for data loading and gesture input.
* **`receiver.html` (The Monitor):** A passive display unit for secondary monitors or observation decks.
* **`js/vision.js`:** High-performance AI engine utilizing **Google MediaPipe** for real-time hand landmarking.
* **`js/network.js`:** Peer-to-Peer data synchronization via **PeerJS (WebRTC)** for instant image beaming.
* **`js/state.js`:** A centralized reactive state manager handling cross-module data flow.

---

## 🚀 Key Features

### 1. Anatomical Gesture Recognition
Surgiwave implements advanced joint-angle calculations to eliminate false positives in surgical environments:
* **Strict Thumb Rule:** Anatomically differentiates between a closed fist and a thumbs-up by calculating the Thumb Tip elevation relative to the Index Finger MCP joint.
* **Safety Latch Logic:** A "Dead Man's Switch" mechanism that freezes the cursor immediately when a gesture is released.

### 2. Sterile Control Workflow
* **Open Hand ✋:** Initiates spatial scanning and image panning.
* **3-Finger Latch ✌️+☝️:** High-precision coordinate lock to freeze the view on a specific ROI.
* **Safety Unlock (0.25s):** Requires a sustained open-hand hold to prevent accidental cursor drift.
* **Strict Thumbs-Up 👍:** Triggers a P2P binary transfer (Blob) of the current image to the Receiver node.

### 3. Data Integrity & Privacy
By utilizing **WebRTC**, medical images are transmitted directly between local browsers. No data is stored on a server, ensuring a privacy-first approach for sensitive clinical imagery.

---

## 📂 Project Structure

```text
Surgiwave/
├── index.html            # Hub Interface
├── receiver.html         # Monitor Interface
├── css/
│   ├── main.css          # Design Manifest
│   ├── layout.css        # Spatial Grid
│   └── components.css    # UI/UX Elements
└── js/
    ├── main.js           # Bootloader
    ├── config.js         # Global Constants
    ├── state.js          # App State Management
    ├── network.js        # PeerJS Communication
    └── vision.js         # MediaPipe AI Logic
