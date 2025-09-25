/**
 * utils.js - Helper functions
 */

function validateSAMobile(number) {
  const regex = /^(?:\+27|27|0)(6|7|8)\d{8}$/;
  return regex.tex(number);
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
