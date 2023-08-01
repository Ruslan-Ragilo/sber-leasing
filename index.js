import {DataMap} from "./constants.js";

const tooltip = document.getElementById('map-city-tooltip');

const showTooltip = (e, name) => {
    const cityRect = e.target.getBoundingClientRect();
    tooltip.classList.add('visible');
    tooltip.textContent = name;

    const tooltipRect = tooltip.getBoundingClientRect();
    const cityPosition = {
        x:
            e.target.getBoundingClientRect().left - (tooltipRect.width / 2),
        y: cityRect.y + window.scrollY - tooltipRect.height - 4
    };
    tooltip.style.left = cityPosition.x + 'px';
    tooltip.style.top = cityPosition.y + 'px';
};

const hideTooltip = () => {
    tooltip.classList.remove('visible');
};

DataMap.forEach((city) => {
    const currentCity = document.getElementById(city.id);
    currentCity.addEventListener('mouseenter', (e) => showTooltip(e, city.name));
    currentCity.addEventListener('mouseleave', hideTooltip);
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
//     console.log(wrapperMain);
//     if (this.window.innerWidth <= 780 && screen.orientation.type === 'portrait-primary') {
//         this.document.body.style.overflow = 'hidden'
//         // wrapperMain.style.display = 'none'
//         mobSection.style.display = 'flex'
//     }
// });

