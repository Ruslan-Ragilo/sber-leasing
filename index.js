import { DataMap } from "./constants.js";

const tooltip = document.getElementById("map-city-tooltip");
const mapRussia = document.querySelector(".map-russia");

window.addEventListener("DOMContentLoaded", function () {
  if (window.screen.width > 1440) {
    mapRussia.setAttribute("width", window.screen.width);
    mapRussia.setAttribute("height", window.innerWidth / 1.85);
  } else {
    mapRussia.setAttribute("width", 1440);
    mapRussia.setAttribute("height", 784);
  }
});

const showTooltip = (e, name) => {
  const cityRect = e.target.getBoundingClientRect();
  tooltip.classList.add("visible");
  tooltip.textContent = name;

  const tooltipRect = tooltip.getBoundingClientRect();
  const cityPosition = {
    x: cityRect.left - tooltipRect.width / 2 + cityRect.width / 2,
    y: cityRect.y + window.scrollY - tooltipRect.height - 8,
  };
  tooltip.style.left = cityPosition.x + "px";
  tooltip.style.top = cityPosition.y + "px";
};

const hideTooltip = () => {
  tooltip.classList.remove("visible");
};

DataMap.forEach((city) => {
  const currentCity = document.getElementById(city.id);
  currentCity.addEventListener("mouseenter", (e) => showTooltip(e, city.name));
  currentCity.addEventListener("mouseleave", hideTooltip);
});

// const wrapperMain = document.querySelector('.wrapper-main');
// const mobSection = document.querySelector('.mob-section');

// Прослушка события смены ориентации
// window.addEventListener("orientationchange", function(e) {
//     wrapperMain.style.display = 'none'
//     this.setTimeout(() => {
//         if (this.window.innerWidth <= 780 && screen.orientation.type === 'portrait-primary') {
//             this.document.body.style.overflow = 'hidden'
//             mobSection.style.display = 'flex'
//         } else {
//             this.document.body.style.overflow = 'scroll'
//             wrapperMain.style.display = 'block'
//             mobSection.style.display = 'none'
//         }
//     },40)
//
// });
// window.addEventListener("DOMContentLoaded", function() {
//     if (this.window.innerWidth <= 780 && screen.orientation.type === 'portrait-primary') {
//         this.document.body.style.overflow = 'hidden'
//         // wrapperMain.style.display = 'none'
//         mobSection.style.display = 'flex'
//     }
// });

// Showing Popups and changing contents

const popup = document.getElementById("popup");
popup.addEventListener("click", (event) => {
  if (
    event.target.matches(".close-popup") ||
    event.target.matches(".popup.open")
  ) {
    popup.classList.remove("open");
  }
});

const bigCities = DataMap.filter((city) => !!city.title);

bigCities.forEach((city) => {
  const currentCity = document.getElementById(city.id);
  currentCity.addEventListener("click", () => showPopup(city));
});

document.addEventListener("keydown", (e) => {
  if (event.key === "Escape") {
    popup.classList.remove("open");
  }
});

function showPopup(city) {
  const avatar = document.getElementById("avatar");
  avatar.src = city.faceImg;

  const bgImg = document.getElementById("bgImg");
  bgImg.src = city.bgImg;

  const title = document.getElementById("title");
  title.textContent = city.title;

  const cityName = document.getElementById("cityName");
  cityName.textContent = city.cityName;

  const manager = document.getElementById("manager");
  manager.textContent = city.manager;

  const position = document.getElementById("position");
  position.textContent = city.position;

  const congrats = document.getElementById("congrats");
  congrats.innerHTML = city.congratsText;

  const foundationYear = document.getElementById("foundationYear");
  foundationYear.textContent = city.foundationYear;

  const employeesNumber = document.getElementById("employeesNumber");
  employeesNumber.textContent = city.employeesNumber;

  const menWomen = document.getElementById("men-women");
  menWomen.textContent = city.menWomen.join("/");

  const clients = document.getElementById("total-clients");
  clients.textContent = city.clients;

  const autosLight = document.getElementById("autosLight");
  autosLight.textContent = city.autosLight;

  const autosCommercial = document.getElementById("autosCommercial");
  autosCommercial.textContent = city.autosCommercial;

  const autosCargo = document.getElementById("autosCargo");
  autosCargo.textContent = city.autosCargo;

  const autosSpecial = document.getElementById("autosSpecial");
  autosSpecial.textContent = city.autosSpecial;

  const buses = document.getElementById("buses");
  buses.textContent = city.buses;

  const equipment = document.getElementById("equipment");
  equipment.textContent = city.equipment;

  popup.classList.add("open");
}

const smallCities = DataMap.filter((city) => !!city.linkTo);

smallCities.forEach((city) => {
  const currentCity = document.getElementById(city.id);
  currentCity.addEventListener("click", () =>
    window.open(city.linkTo, "_blank"),
  );
});
