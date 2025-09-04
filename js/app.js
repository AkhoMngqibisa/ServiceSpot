/**
 * ServiceSpot Application Logic
 * Uses LocalStorage for data persistence.
 */

const STORAGE_KEY = "servicespot_listings";

let serviceList = [];
let currentFilter = "All";

// DOM Elements
const servicesList = document.getElementById("servicesList");

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
        image: "/assets/Men's Haircut.jpg",
      },
      {
        id: 2,
        title: "Bridal Styling",
        category: "Salon",
        provider: "Bella Beauty",
        price: "R80+",
        description:
          "Special occasion hair styling and makeup trials available at home or studio.",
        image: "/assets/Bridal Styling.jpeg",
      },
      {
        id: 3,
        title: "Math Tutoring (High School)",
        category: "Tutor",
        provider: "Akhona Mngqibisa",
        price: "R150/hr",
        description:
          "Certified teacher helping with Algebra, Calculus, and SAT prep. Group discounts available.",
        image: "/assets/Maths Tutor.jpg",
      },
    ];
    saveDataToLocalStorage();
  }
}

function saveDataToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(serviceList));
}
