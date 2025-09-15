/**
 * ServiceSpot Application Logic
 * Visuals & DOM Interaction
 * UI interactions (Modal, Toasts, Filters)
 */

function displayData(filteredListings, servicesGrid) {
  // Check if there is already services added
  if (filteredListings.length === 0) {
    servicesGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No services found</h3>
                <p>Try adjusting your search or be the first to post in this category!</p>
            </div>
        `;
    return;
  }

  filteredListings.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
              <div class="card-img">
                <img src="${item.image}" alt="${item.image}" loading="lazy">
                <span class="category">${item.category}</span>
                <button class="delete-btn" onclick="deleteService(${item.id})" 
                  title="Delete Service"><i class="fas fa-trash"> </i></button>
              </div>
              <div class="card-body">
                <h3 class="card-title">${item.title}</h3>
                <div class="card-provider">
                  <i class="fas fa-user-circle"></i> ${item.provider}
                </div>
                <p class="card-desc"> ${item.description}</p>
                <div class="card-footer">
                <span class="price">${item.price}</span>
                <button class="btn btn-outline" style="padding: 5px 12px; font-size: 0.85rem;">
                  Contact
                </button>
                </div>
              </div>
    `;
    servicesGrid.appendChild(card);
  });
}

function search() {
  searchInput.addEventListener("input", renderData);
  // Categories
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update UI
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      // Update State
      currentFilter = btn.dataset.category;
      renderData();
    });
  });
}

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
