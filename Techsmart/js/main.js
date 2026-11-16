// TechSmart demo interactions.
// Replace this with the real shop WhatsApp number before publishing.
// Use international format without +, spaces or dashes, e.g. 2547XXXXXXXX.
const SHOP_WHATSAPP_NUMBER = "254700000000";

// Light / dark theme switch
const themeButtons = document.querySelectorAll(".theme-toggle");
const savedTheme = localStorage.getItem("techsmart-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}

function updateThemeButton() {
  themeButtons.forEach((button) => {
    button.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  });
}
updateThemeButton();

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("techsmart-theme", theme);
    updateThemeButton();
  });
});

// Mobile navigation
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.textContent = isOpen ? "✕" : "☰";
  });
}

// Simple product search on the shop page
const searchInput = document.querySelector("#productSearch");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    document.querySelectorAll(".shop-section .product-card").forEach((card) => {
      card.style.display = card.textContent.toLowerCase().includes(searchTerm) ? "" : "none";
    });
  });
}

// Repair booking: creates a WhatsApp message.
// This does not store a booking in a database; it opens WhatsApp for the customer.
const repairForm = document.querySelector("#repairForm");
if (repairForm) {
  repairForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectedRepair = document.querySelector('input[name="repair"]:checked');
    if (!selectedRepair) {
      alert("Please select the type of repair you need.");
      return;
    }

    const formData = new FormData(repairForm);
    const message = [
      "Hello TechSmart, I would like to book a repair.",
      `Repair needed: ${selectedRepair.value}`,
      `Name: ${formData.get("name")}`,
      `Phone: ${formData.get("phone")}`,
      `Device: ${formData.get("device")}`,
      `Problem: ${formData.get("details")}`
    ].join("\\n");

    const whatsappUrl = `https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  });
}
