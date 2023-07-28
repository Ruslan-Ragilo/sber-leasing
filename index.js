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


// var html = document.documentElement;
// var body = document.body;

// var scroller = {
//   target: document.querySelector("#scroll-container"),
//   ease: 0.05, // <= scroll speed
//   endY: 0,
//   y: 0,
//   resizeRequest: 1,
//   scrollRequest: 0,
// };

// var requestId = null;

// TweenLite.set(scroller.target, {
//   rotation: 0.01,
//   force3D: true
// });

// window.addEventListener("load", onLoad);

// function onLoad() {    
//   updateScroller();  
//   window.focus();
//   window.addEventListener("resize", onResize);
//   document.addEventListener("scroll", onScroll); 
// }

// function updateScroller() {
  
//   var resized = scroller.resizeRequest > 0;
    
//   if (resized) {    
//     var height = scroller.target.clientHeight;
//     body.style.height = height + "px";
//     scroller.resizeRequest = 0;
//   }
      
//   var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

//   scroller.endY = scrollY;
//   scroller.y += (scrollY - scroller.y) * scroller.ease;

//   if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
//     scroller.y = scrollY;
//     scroller.scrollRequest = 0;
//   }
  
//   TweenLite.set(scroller.target, { 
//     y: -scroller.y 
//   });
  
//   requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
// }

// function onScroll() {
//   scroller.scrollRequest++;
//   if (!requestId) {
//     requestId = requestAnimationFrame(updateScroller);
//   }
// }

// function onResize() {
//   scroller.resizeRequest++;
//   if (!requestId) {
//     requestId = requestAnimationFrame(updateScroller);
//   }
// }

const tooltip = document.getElementById('map-city-tooltip');

const showTooltip = (e, name) => {
	const cityRect = e.target.getBoundingClientRect();
	console.log(cityRect);
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
