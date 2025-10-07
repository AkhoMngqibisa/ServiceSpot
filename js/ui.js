/**
 * ServiceSpot Application Logic
 * Visuals & DOM Interaction
 * UI interactions (Modal, Toasts, Filters)
 */

let body;
let closeModalBtn;
let counter;
let currentFilter = "All";
let description;
let filterBtns;
let form;
let modalOverlay;
let openModalBtn;
let servicesGrid;
let searchInput;
let serviceList = [];

document.addEventListener("DOMContentLoaded", function () {
  body = document.body;
  closeModalBtn = document.getElementById("closeModalBtn");
  counter = document.getElementById('counter');
  description = document.getElementById('description');
  filterBtns = document.querySelectorAll(".filter-btn");
  form = document.getElementById("addServiceForm");
  modalOverlay = document.getElementById("modalOverlay");
  openModalBtn = document.getElementById("openModalBtn")
  servicesGrid = document.getElementById("servicesGrid");
  searchInput = document.getElementById("searchInput");
  initializeData();
  inputEventListener();
  imageEventListener();
});

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
                <h3 class="card-title">${escapeHtml(item.title)}</h3>
                <div class="card-provider">
                  <i class="fas fa-user-circle"></i> ${escapeHtml(item.provider)}
                </div>
                <p class="card-desc"> ${escapeHtml(item.description)}</p>
                <div class="card-footer">
                <span class="price">R ${escapeHtml(item.price)}</span>
                <button class="btn btn-outline" style="padding: 5px 12px; font-size: 0.85rem;" onclick="contactProvider('${item.provider}','${item.cell}')">
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

function contactProvider(providerName, providerCell) {
  if (
    providerCell === "" ||
    providerCell == null ||
    providerCell.toLowerCase() == "null"
  ) {
    showToast("Provider has not set up contact information", "error");
  } else {
    const message = `Hi ${providerName}, I found your listing on ServiceSpot and am interested in your services.`;
    sendWhatsAppMessage(providerCell, message);
  }
}

function openModal() {
  body.classList.add("no-scroll");
  modalOverlay.classList.add("open");
}

function closeModal() {
  form.reset();
  document.querySelectorAll('.error-message').forEach(span => {
    span.textContent = '';
  });
  body.classList.remove("no-scroll");
  closeModalBtn.classList.remove("open");
  modalOverlay.classList.remove("open");
}

function inputEventListener() {
  description.addEventListener('input', () => {
    counter.textContent = `${description.value.length}/${description.maxLength}`
  });
}

function imageEventListener() {
  document.getElementById('image').addEventListener('change', function(e){
    const file = e.target.files[0];
    const preview = document.getElementById('imagePreview');

    if(file) {
      // Show preview
      const reader = new FileReader();
      reader.onload = function(e) {
        preview.src = e.target.result;
        preview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    } else {
      preview.style.display = 'none';
      preview.src = '';
    }
  });
}

function validateForm() {
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const provider = document.getElementById("provider").value;
  const title = document.getElementById("title").value;

  let cell = document.getElementById("cell").value;
  let image = document.getElementById("image").value;
  let isValid = true;

  if (title === '') {
    document.querySelector('.error-message[data-index="1"]').textContent = 'Please enter a title';
    isValid = false;
  }

  if (provider === '') {
    document.querySelector('.error-message[data-index="2"]').textContent = 'Please enter the provider name';
    isValid = false
  }

  if (cell !== '' && !validateSAMobile(cell)) {
    document.querySelector('.error-message[data-index="3"]').textContent = 'Please provide a valid mobile number';
    isValid = false;
  }

  if (price > 9999.99) {
    document.querySelector('.error-message[data-index="4"]').textContent = 'Price cannot exceed 9999.99';
  }

  if (!image.trim()) {
    const seed = Math.random().toString(36).substring(7);
    image = `https://picsum.photos/seed/${seed}/400/300`;
  }

  if (isValid) {
    cell = normalizeSAMobile(cell);
    const newService = {
      id: Date.now(),
      title,
      category,
      provider,
      cell,
      price,
      description,
      image,
    };
    addService(newService);
    closeModal();
  }
  return false;
}
