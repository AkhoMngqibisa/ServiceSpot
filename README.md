ServiceSpot 🚀
A hyper-local marketplace for community services. Built with vanilla HTML, CSS, and JavaScript, ServiceSpot allows local professionals (barbers, tutors, handymen) to advertise their services without needing a backend server or database.

Status: Active
Tech: HTML, CSS, JS

📋 Features
1. Zero Configuration: Runs directly in the browser with no installation required.
2. Persistent Data: Uses localStorage to save listings even after you close the tab.
3. Full CRUD: Create, Read, and Delete service listings.
4. Image Uploads: Users can upload images from their PC (processed via Base64).
5. Smart Contacting: Integrated WhatsApp "Click to Chat" with automatic country code detection.
6. Search & Filter: Real-time filtering by category (Barber, Salon, etc.) and text search.
7. Responsive UI: Modern, clean interface that works on mobile and desktop.

Getting Started

Prerequisites
You only need a modern web browser (Chrome, Firefox, Safari, Edge). No Node.js, Python, or database server is required.

Installation
1. Clone or Download the project files.
2. Navigate to the project folder.
3. Open index.html in your browser.

That's it! The app is ready to use.

📂 Project Structure
The project follows a modular architecture separating Logic, UI, and Utilities.

ServiceSpot/
├── index.html          # Main HTML structure
├── README.md           # This file
├── css/
│   └── style.css       # All styling (Variables, Grid, Modal, Toasts)
├── js/
│   ├── app.js          # Data Logic (LocalStorage, CRUD operations)
│   ├── ui.js           # View Logic (DOM manipulation, Event Listeners)
│   └── utils.js        # Helper functions (XSS prevention, WhatsApp links)
└── assets/             # (Optional) Local images or icons

🧩 Technical Implementation

1. Data Storage (LocalStorage)
Instead of a database, ServiceSpot uses the browser's localStorage.

Key: servicespot_listings
Format: JSON String.
Limitation: Browsers allow ~5MB of storage. Large images will fill this up quickly. Users are advised to upload optimized images (< 500KB).

2. File Uploads
Since there is no server to store files, images are converted to Base64 strings using the FileReader API. This allows images to be displayed directly in the <img> tags.

3. Contact System
The app supports two main contact methods out of the box:

WhatsApp: Uses the https://wa.me/ API. The utils.js file automatically cleans phone numbers and adds a default country code (set to 1 by default) to ensure links work globally.
Formspree: The form structure supports adding a Formspree endpoint ID for professional email handling without a backend.

4. Architecture
The codebase is separated into three distinct files to maintain scalability:

app.js: Handles the Model (Data) and Controller (Logic). It decides what data exists.
ui.js: Handles the View (DOM). It decides how data looks and responds to clicks.
utils.js: Contains Pure Functions (Helpers). No side effects, just inputs and outputs.