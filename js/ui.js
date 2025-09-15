/**
 * ServiceSpot Application Logic
 * Uses LocalStorage for data persistence.
 * UI interactions (Modal, Toasts, Filters)
 */

function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
      <i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"}"></i>
      <span> ${message} </span>
  `;
  container.appendChild(toast);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.animation = "fadeOut 0.3s ease-out forwards";
    toast.addEventListener("animationend", () => {
      toast.remove();
    });
  }, 3000);
}
