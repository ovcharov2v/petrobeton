import './vendor';

document.addEventListener("DOMContentLoaded", function () {

});

window.onload = function () {

	//Слайдер в блоке Фото и видео галерея	
	var galleryThumbs = new Swiper('.section--gallery .gallery-slider-thumb', {
		spaceBetween: 23,
		slidesPerView: 4,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
	});
	var gallerySlider = new Swiper('.section--gallery .slider-col .swiper-container', {
		navigation: {
			nextEl: '.section--gallery .slider-col .swiper-next',
			prevEl: '.section--gallery .slider-col .swiper-prev',
		},
		thumbs: {
			swiper: galleryThumbs,
		},
	})
	
	//Слайдер в блоке Каталог типовых изделий
	var swiperNavMenu = {
		name: 'swiperNavMenu',
		params: {
			navMenuEl: false,
		},
		on: {
			init: function (swiper) {
				if (!swiper.params.navMenuEl) return;

				const sliderMenuLinks = document.querySelectorAll(swiper.params.navMenuEl + ' li a')
				
				sliderMenuLinks.forEach(function(link) {
					link.addEventListener('click', function(event) {
						event.preventDefault()
						var firstSlideInGroup = document.querySelector(swiper.params.el + ' .swiper-slide[data-group="' + this.dataset.group + '"]')
						var firstSlideInGroupIndex = [].indexOf.call(firstSlideInGroup.parentElement.children, firstSlideInGroup)
						swiper.slideTo(firstSlideInGroupIndex)
						return false;
					})
				})
			},
			slideChange: function (swiper) {
				if (!swiper.params.navMenuEl) return;
				const activeSlidesGroup = document.querySelectorAll(swiper.params.el + ' .swiper-slide')[this.activeIndex].dataset.group
				const sliderMenuLinks = document.querySelectorAll(swiper.params.navMenuEl + ' li a')
				sliderMenuLinks.forEach(function(link) {
					(link.dataset.group == activeSlidesGroup) ? link.classList.add('active') : link.classList.remove('active')					
				})
			},
		},
	};	
	Swiper.use(swiperNavMenu);
	var catTypicalSlider = new Swiper('.section--catalog-typical .swiper-container', {
		slidesPerView: 2,
		spaceBetween: 60,
		navigation: {
			nextEl: '.section--catalog-typical .swiper-next',
			prevEl: '.section--catalog-typical .swiper-prev',
		},
		navMenuEl: '.section--catalog-typical .slider-nav-menu'
	})

	//Слайдер в блоке Изделия по индивидуальному проекту	
	var catIndividualSlider = new Swiper('.section--catalog-individual .swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 50,
		watchSlidesProgress: true,
		watchSlidesVisibility: true,
		navigation: {
			nextEl: '.section--catalog-individual .swiper-next',
			prevEl: '.section--catalog-individual .swiper-prev',
		}
	})

	//Слайдер в блоке Инстаграм виджет
	var instaSlider = new Swiper('.section--instagram .swiper-container', {
		slidesPerView: 4,
		spaceBetween: 20,
		grabCursor: true,
		navigation: {
			nextEl: '.section--instagram .swiper-next',
			prevEl: '.section--instagram .swiper-prev',
		},
	})

	//Слайдер в блоке Отзывы наших клиентов
	var reviewsSlider = new Swiper('.section--reviews .swiper-container', {
		slidesPerView: 3,
		spaceBetween: 40,
		navigation: {
			nextEl: '.section--reviews .swiper-next',
			prevEl: '.section--reviews .swiper-prev',
		},
	})

	//Раскрытие элементов аккордеона в FAQ
	const faqElems = document.querySelectorAll('.section--faq .faq .faq__elem')
	faqElems.forEach(function (elem) {
		elem.querySelector('.faq__toggle').addEventListener('click', function (event) {
			faqElems.forEach(function (elem) {
				(elem !== event.target.parentNode.parentNode) ? elem.classList.remove('opened'): ''
			})
			event.target.parentNode.parentNode.classList.toggle('opened')
		})
	});

	//Показать все вопросы
	const faqLoadMore = document.querySelector('.section--faq .faq-load-more')
	if(faqLoadMore !== null)
	faqLoadMore.addEventListener('click', function (event) {
		faqElems.forEach(function (elem) {
			(elem.classList.contains('d-none')) ? elem.classList.remove('d-none'): ''
		});
		event.target.style.display = 'none'
	})


	/**
	 * Галереи
	 */
	const galleries = document.querySelectorAll('.gallery')

	galleries.forEach(function (gallery) {
		lightGallery(gallery, {
			'selector': 'a'
		}); 
	});

	
	const mapContainer = document.querySelector('#map')
	if(mapContainer !== null) {
		var script = document.createElement('script')
		script.src = "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A9e336a8b3d6ddda15a1470c6a205e03ba6c38e26cd7b19df37147c53b74fc4cb&amp;width=100%25&amp;height=502&amp;lang=ru_RU&amp;scroll=true";
		setTimeout(function() {
			mapContainer.appendChild(script);			
		}, 1000);
	}

};
