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

📝 Usage Guide

For Users
1. Browse: Scroll through the grid or use the Search bar to find a service.
2. Filter: Click "Barber", "Salon", etc., to narrow results.
3. Contact: Click "Contact" on a card to open WhatsApp or copy the provider's info.

For Providers
1. Click the "Post a Service" button in the top right.
2. Fill in the details (Title, Price, Provider Name, Description).
3.  Image: You can leave the image field blank for a random placeholder, or upload a small image from your PC.
4. Click "Post Listing". A Toast notification will confirm success.

⚠️ Known Limitations
1. Storage Quota: Since data lives in the browser, clearing your browser cache (Ctrl+Shift+Delete) will delete all listings. There is no cloud backup.
2. Single Device: Listings are only visible on the specific computer/browser where they were created. To share listings across users, you would need to connect this frontend to a backend (Firebase, MongoDB, etc.).
3. Image Size: Base64 strings are large. Uploading 5 images at 2MB each will crash the app.

🚧 Roadmap / Future Improvements
1. Backend Integration: Connect to Firebase for real-time multi-user data.
2. User Authentication: Login/Signup system.
3. Map Integration: Show provider locations via Google Maps API.
4. Favorites: Allow users to "heart" or save listings.

📄 License
This project is open source and available for educational purposes.