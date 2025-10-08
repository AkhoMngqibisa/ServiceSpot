/**
 * utils.js - Helper functions
 */

function validateSAMobile(number) {
  const regex = /^(?:\+27|27|0)(6|7|8)\d{8}$/;
  return regex.test(number);
}

function normalizeSAMobile(number) {
  number = number.replace(/\s+/g, "");

  if (number.startsWith("0")) {
    return "+27" + number.slice(1);
  }
  if (number.startsWith("27")) {
    return "+27" + number.slice(2);
  }

  return number;
}

function sendWhatsAppMessage(recipientCell, recipientMessage) {
  // Remove spaces of dashes from the phone number
  const cell = recipientCell.replace(/[^0-9]/g, "");
  window.open(
    `https://wa.me/${cell}?text=${encodeURIComponent(recipientMessage)}`,
    "_blank",
  );
}

function escapeHtml(text) {
  if (!text) return text;
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Generates a random Picsum image URL
 */
function getRandomImage() {
  const seed = Math.random().toString(36).substring(7);
  return `https://picsum.photos/seed/${seed}/400/300`;
}

/**
 * Reads a file object and converts it to Base64
 * Returns a Promise for better async handling
 */
function processFileUploads(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file provided");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      resolve(e.target.result); // Returns the Base64 string
    };

    reader.onerror = (e) => {
      reject("Error on reading the file");
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Finalizes the submission (Saves data, resets UI)
 */
function finalizeSubmission(formData, finalImageUrl) {
  const newService = {
    ...formData,
    image: finalImageUrl
  };

  // Save to App Logic
  addService(newService);

  // Reset the Form
  form.reset();

  // Reset the Preview Image (UI cleanup)
  const preview = document.getElementById('imagePreview');
  preview.style.display = 'none';
  preview.src = '';

  // Close the modal
  closeModal();
}
