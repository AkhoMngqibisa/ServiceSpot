/**
 * ServiceSpot Application Logic
 * Uses LocalStorage for data persistence.
 */

const STORAGE_KEY = "servicespot_listings";

let serviceList = [];
let currentFilter = "All";

