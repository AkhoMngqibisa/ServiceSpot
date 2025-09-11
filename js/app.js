/**
 * ServiceSpot Application Logic
 * Uses LocalStorage for data persistence.
 */

const STORAGE_KEY = "servicespot_data";

let serviceList = [];
let currentFilter = "All";
let servicesGrid;
let searchInput;

document.addEventListener("DOMContentLoaded", function () {
  servicesGrid = document.getElementById("servicesGrid");
  searchInput = document.getElementById("searchInput");
  initializeData();
});

function initializeData() {
  loadData();
  renderData();
}

function loadData() {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    serviceList = JSON.parse(storedData);
  } else {
    serviceList = [
      {
        id: 1,
        title: "Men's Haircut",
        category: "Barber",
        provider: "Micheal Dok",
        price: "R100+",
        description:
          "Professional cuts, hot towel shaves, and a friendly atmosphere. Walk-ins welcome.",
        image: "/assets/Men's Haircut.png",
      },
      {
        id: 2,
        title: "Bridal Styling",
        category: "Salon",
        provider: "Bella Beauty",
        price: "R80+",
        description:
          "Special occasion hair styling and makeup trials available at home or studio.",
        image: "/assets/Bridal Styling.png",
      },
      {
        id: 3,
        title: "Math Tutoring (High School)",
        category: "Tutor",
        provider: "Akhona Mngqibisa",
        price: "R150/hr",
        description:
          "Certified teacher helping with Algebra, Calculus, and SAT prep. Group discounts available.",
        image: "/assets/Maths Tutor.png",
      },
    ];
    saveDataToLocalStorage();
  }
}

function saveDataToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(serviceList));
}

function renderData() {
  servicesGrid.innerHTML = "";

  const searchItem = searchInput.value.toLowerCase();

  const filteredListings = serviceList.filter((item) => {
    const matchesCategory = currentFilter === "All" || item.category === currentFilter; 
    const matchesSearch = item.title.toLowerCase().includes(searchItem) || 
    item.description.toLowerCase().includes(searchItem) 
    item.provider.toLowerCase().includes(searchItem);

    return matchesCategory && matchesSearch;
  });

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
    const card = document.createElement('article');
    card.className = "card";
    card.innerHTML = `
              <div class="card-img">
                <img src="${item.image}" alt="${item.image}" loading="lazy">
                <span class="category">${item.category}</span>
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
    `
    servicesGrid.appendChild(card);
  });
}
