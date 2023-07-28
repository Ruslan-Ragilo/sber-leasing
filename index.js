import {DataMap} from "./constants.js";

const tooltip = document.getElementById('map-city-tooltip');

const showTooltip = (e, name) => {
    const cityRect = e.target.getBoundingClientRect();
    tooltip.classList.add('visible');
    tooltip.textContent = name;

    const tooltipRect = tooltip.getBoundingClientRect();
    const cityPosition = {
        x:
            cityRect.x +
            window.scrollX -
            tooltipRect.width / 2 +
            e.target.r.baseVal.value / 2,
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

// chronology blocks for scene generation

