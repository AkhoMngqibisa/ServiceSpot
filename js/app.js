/**
 * ServiceSpot Application Logic
 * Uses LocalStorage for data persistence.
 * Main logic (State, Render, LocalStorage)
 */

const STORAGE_KEY = "servicespot_data";

function initializeData() {
  loadData();
  renderData();
  search();
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
        cell: null,
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
        cell: "+27621982193",
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
        cell: "+27621982193",
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
  const filteredListings = filterData(serviceList);

  displayData(filteredListings, servicesGrid);
}

function filterData(serviceList) {
  const searchItem = searchInput.value.toLowerCase();
  const filteredListings = serviceList.filter((item) => {
    const matchesCategory = currentFilter === "All" || item.category === currentFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchItem) ||
      item.description.toLowerCase().includes(searchItem) ||
      item.provider.toLowerCase().includes(searchItem) ||
      item.category.toLowerCase().includes(searchItem);

    return matchesCategory && matchesSearch;
  });

  return filteredListings;
}

function deleteService(id) {
  if (confirm("Are you sure you want to remove this service?")) {
    serviceList = serviceList.filter((item) => item.id !== id);
    saveDataToLocalStorage();
    renderData();
    showToast("Service removed", "success");
  }
}

function validateForm() {
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const providerCell = document.getElementById("cell").value;
  const providerName = document.getElementById("provider").value;
  const title = document.getElementById("title").value;

  let errorMessage = document.getElementById("errorMessage");
  let image = document.getElementById("image").value;
  let isValidd = true;

  errorMessage.textContent = '';
  if (!isValidd) return false;
}