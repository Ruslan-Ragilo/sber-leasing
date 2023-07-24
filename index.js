const dataMap = [
    {
        id: 'Vladivostok',
        name: 'Владивосток'
    },
    {
        id: 'Voronezh',
        name: 'Воронеж'
    },
    {
        id: 'Rostov-on-Don',
        name: 'Ростов-на-Дону'
    },
    {
        id: 'Novorossiysk',
        name: 'Новороссийск'
    },
    {
        id: 'Samara',
        name: 'Самара'
    },
    {
        id: 'Yekaterinburg',
        name: 'Екатеринбург'
    },
    {
        id: 'Arkhangelsk',
        name: 'Архангельск'
    },
    {
        id: 'Barnaul',
        name: 'Барнаул'
    },
    {
        id: 'Kurgan',
        name: 'Курган'
    },
    {
        id: 'Petrozavodsk',
        name: 'Петрозаводск'
    },
    {
        id: 'Cherepovets',
        name: 'Череповец'
    },
    {
        id: 'Veliky Novgorod',
        name: 'Великий Новгород'
    },
    {
        id: 'Pskov',
        name: 'Псков'
    },
    {
        id: 'Krasnodar',
        name: 'Краснодар'
    },
    {
        id: 'Stavropol',
        name: 'Ставрополь'
    },
    {
        id: 'Penza',
        name: 'Пенза'
    },
    {
        id: 'Orenburg',
        name: 'Оренбург'
    },
    {
        id: 'Omsk',
        name: 'Омск'
    },
    {
        id: 'Chelyabinsk',
        name: 'Челябинск'
    },
    {
        id: 'Belgorod',
        name: 'Белгород'
    },
    {
        id: 'Novokuznetsk',
        name: 'Новокузнецк'
    },
    {
        id: 'Chita',
        name: 'Чита'
    },
    {
        id: 'Ulan-Ude',
        name: 'Улан-Удэ'
    },
    {
        id: 'Bryansk',
        name: 'Брянск'
    },
    {
        id: 'Oryol',
        name: 'Орел'
    },
    {
        id: 'Smolensk',
        name: 'Смоленск'
    },
    {
        id: 'Blagoveshchensk',
        name: 'Благовещенск'
    },
    {
        id: 'Yakutsk',
        name: 'Якутск'
    },
    {
        id: 'Vladimir',
        name: 'Владимир'
    },
    {
        id: 'Ryazan',
        name: 'Рязань'
    },
    {
        id: 'Tyumen',
        name: 'Тюмень'
    },
    {
        id: 'Ufa',
        name: 'Уфа'
    },
    {
        id: 'Ulyanovsk',
        name: 'Ульяновск'
    },
    {
        id: 'Saransk',
        name: 'Саранск'
    },
    {
        id: 'Naberezhnye Chelny',
        name: 'Набережные Челны'
    },
    {
        id: 'Izhevsk',
        name: 'Ижевск'
    },
    {
        id: 'Kazan',
        name: 'Казань'
    },
    {
        id: 'Khabarovsk',
        name: 'Хабаровск'
    },
    {
        id: 'Yuzhno-Sakhalinsk',
        name: 'Южно-Сахалинск'
    },
    {
        id: 'Ivanovo',
        name: 'Иваново'
    },
    {
        id: 'Saratov',
        name: 'Саратов'
    },
    {
        id: 'Kirov',
        name: 'Киров'
    },
    {
        id: 'Syktyvkar',
        name: 'Сыктывкар'
    },
    {
        id: 'Cheboksary',
        name: 'Чебоксары'
    },
    {
        id: 'Kaliningrad',
        name: 'Калининград'
    },
    {
        id: 'Kaluga',
        name: 'Калуга'
    },
    {
        id: 'Tula',
        name: 'Тула'
    },
    {
        id: 'Kemerovo',
        name: 'Кемерово'
    },
    {
        id: 'Nizhnevartovsk',
        name: 'Нижневартовск'
    },
    {
        id: 'Surgut',
        name: 'Сургут'
    },
    {
        id: 'Lipetsk',
        name: 'Липецк'
    },
    {
        id: 'Tver',
        name: 'Тверь'
    },
    {
        id: 'Tolyatti',
        name: 'Тольятти'
    },
    {
        id: 'Tomsk',
        name: 'Томск'
    },
    {
        id: 'Volgodonsk',
        name: 'Волгодонск'
    },
    {
        id: 'Pyatigorsk',
        name: 'Пятигорск'
    },
    {
        id: 'Volgograd',
        name: 'Волгоград'
    },
    {
        id: 'Krasnoyarsk',
        name: 'Красноярск'
    },
    {
        id: 'Novy Urengoy',
        name: 'Новый Уренгой'
    },
    {
        id: 'Salekhard',
        name: 'Салехард'
    },
    {
        id: 'Perm',
        name: 'Пермь'
    },
    {
        id: 'Kursk',
        name: 'Курск'
    },
    {
        id: 'Tambov',
        name: 'Тамбов'
    },
    {
        id: 'Magadan',
        name: 'Магадан'
    },
    {
        id: 'Vologda',
        name: 'Вологда'
    },
    {
        id: 'Yaroslavl',
        name: 'Ярославль'
    },
    {
        id: 'Astrakhan',
        name: 'Астрахань'
    },
    {
        id: 'Moscow1',
        name: 'Москва'
    },
    {
        id: 'Moscow2',
        name: 'Москва'
    },
    {
        id: 'Saint Petersburg',
        name: 'Санкт-Петербург'
    },
    {
        id: 'Nizhny Novgorod',
        name: 'Нижний Новгород'
    },
    {
        id: 'Irkutsk',
        name: 'Иркутск'
    },
    {
        id: 'Novosibirsk',
        name: 'Новосибирск'
    }
];

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

dataMap.forEach((city) => {
    const currentCity = document.getElementById(city.id);
    currentCity.addEventListener('mouseenter', (e) => showTooltip(e, city.name));
    currentCity.addEventListener('mouseleave', hideTooltip);
});
