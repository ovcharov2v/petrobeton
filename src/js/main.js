import './vendor';
import MicroModal from 'micromodal';

document.addEventListener("DOMContentLoaded", function () {});

window.onload = function () {
	//Мобильное меню
	document.querySelector('#mobile-menu-toggle').addEventListener('click', function () {
		document.body.classList.toggle('mobile-menu')
	})

	//Слайдер в блоке Фото и видео галерея	
	const galleryThumbs = new Swiper('.section--gallery .gallery-slider-thumb', {
		spaceBetween: 23,
		slidesPerView: 4,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
	});
	const gallerySlider = new Swiper('.section--gallery .slider-col .swiper-container', {
		navigation: {
			nextEl: '.section--gallery .slider-col .swiper-next',
			prevEl: '.section--gallery .slider-col .swiper-prev',
		},
		thumbs: {
			swiper: galleryThumbs,
		},
	})

	//Слайдер в блоке Каталог типовых изделий
	const swiperNavMenu = {
		name: 'swiperNavMenu',
		params: {
			navMenuEl: false,
		},
		on: {
			init: function (swiper) {
				if (!swiper.params.navMenuEl) return;

				const sliderMenuLinks = document.querySelectorAll(swiper.params.navMenuEl + ' li a')

				sliderMenuLinks.forEach(function (link) {
					link.addEventListener('click', function (event) {
						event.preventDefault()
						const firstSlideInGroup = document.querySelector(swiper.params.el + ' .swiper-slide[data-group="' + this.dataset.group + '"]')
						const firstSlideInGroupIndex = [].indexOf.call(firstSlideInGroup.parentElement.children, firstSlideInGroup)
						swiper.slideTo(firstSlideInGroupIndex)
						return false;
					})
				})
			},
			slideChange: function (swiper) {
				if (!swiper.params.navMenuEl) return;
				const activeSlidesGroup = document.querySelectorAll(swiper.params.el + ' .swiper-slide')[this.activeIndex].dataset.group
				const sliderMenuLinks = document.querySelectorAll(swiper.params.navMenuEl + ' li a')
				sliderMenuLinks.forEach(function (link) {
					(link.dataset.group == activeSlidesGroup) ? link.classList.add('active'): link.classList.remove('active')
				})
			},
		},
	};
	Swiper.use(swiperNavMenu);

	const catTypicalSlider = new Swiper('.section--catalog-typical .swiper-container', {
		slidesPerView: 2,
		spaceBetween: 60,
		navigation: {
			nextEl: '.section--catalog-typical .swiper-next',
			prevEl: '.section--catalog-typical .swiper-prev',
		},
		navMenuEl: '.section--catalog-typical .slider-nav-menu',
		breakpoints: {
			0: {
				slidesPerView: 1.3,
				spaceBetween: 20,
			},
			400: {
				slidesPerView: 1.5,
				spaceBetween: 20,
			},
			600: {
				slidesPerView: 3.5,
				spaceBetween: 20,
			},
			1025: {
				slidesPerView: 2,
				spaceBetween: 60,
			},
		}
	})


	//Слайдер в блоке Изделия по индивидуальному проекту	
	const catIndividualSlider = new Swiper('.section--catalog-individual .swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 50,
		watchSlidesProgress: true,
		watchSlidesVisibility: true,
		navigation: {
			nextEl: '.section--catalog-individual .swiper-next',
			prevEl: '.section--catalog-individual .swiper-prev',
		},
		persenPosition: true,
		breakpoints: {
			0: {
				slidesPerView: 1.2,
				spaceBetween: 15,
				centeredSlides: true,
			},
			400: {
				slidesPerView: 1.5,
				spaceBetween: 15,
				centeredSlides: true,
			},
			600: {
				slidesPerView: 2.5,
				spaceBetween: 15,
				centeredSlides: true,
			},
			1025: {
				slidesPerView: 'auto',
				spaceBetween: 30,
				centeredSlides: false,
				loop: false,
			},
			1500: {
				spaceBetween: 50,
				centeredSlides: false,
			},
		}
	})

	function catIndividualSlider_setSlide() {
		if (window.innerWidth <= 1024 && catIndividualSlider.activeIndex == 0) {
			catIndividualSlider.slideTo(1)
		}
	}

	catIndividualSlider_setSlide()

	window.addEventListener("resize", function () {
		catIndividualSlider_setSlide()
	}, false);

	//Управление
	const swiperRange = document.querySelector('.section--catalog-individual input[type="range"]')
	if (swiperRange)
		rangeSlider.create(swiperRange, {
			polyfill: true,
			root: document,
			rangeClass: 'rangeSlider',
			disabledClass: 'rangeSlider--disabled',
			fillClass: 'rangeSlider__fill',
			bufferClass: 'rangeSlider__buffer',
			handleClass: 'rangeSlider__handle',
			startEvent: ['mousedown', 'touchstart', 'pointerdown'],
			moveEvent: ['mousemove', 'touchmove', 'pointermove'],
			endEvent: ['mouseup', 'touchend', 'pointerup'],
			min: 0,
			max: document.querySelectorAll('.section--catalog-individual .swiper-container .swiper-slide').length - 4,
			step: 0.01,
			value: 0,
			onSlideStart: function (position, value) {
				document.querySelector('.section--catalog-individual .rangeSlider').classList.add('active')
			},
			onSlide: function (position, value) {
				catIndividualSlider.slideTo(position)
			},
			onSlideEnd: function (position, value) {
				document.querySelector('.section--catalog-individual .rangeSlider').classList.remove('active')
			},
		});

	catIndividualSlider.on('slideChange', function () {
		if (!document.querySelector('.section--catalog-individual .rangeSlider').classList.contains('active')) {
			swiperRange.rangeSlider.update({
				value: catIndividualSlider.activeIndex,
			}, false);
		}
	});


	//Слайдер в блоке Инстаграм виджет
	const instaSliderInterval = setInterval(function () {
		if (document.querySelectorAll('.section--instagram .swiper-container .swiper-slide').length > 0) {
			const instaSlider = new Swiper('.section--instagram .swiper-container', {
				slidesPerView: 4,
				spaceBetween: 20,
				grabCursor: true,
				preloadImages: true,
				navigation: {
					nextEl: '.section--instagram .swiper-next',
					prevEl: '.section--instagram .swiper-prev',
				},
				breakpoints: {
					0: {
						slidesPerView: 1.2,
						spaceBetween: 15,
					},
					550: {
						slidesPerView: 2.5,
						spaceBetween: 15,
					},
					769: {
						slidesPerView: 4,
						spaceBetween: 20,
					},
				}
			})
			clearTimeout(instaSliderInterval)
		}
	}, 1000);


	//Слайдер в блоке Отзывы наших клиентов
	const reviewsSlider = new Swiper('.section--reviews .swiper-container', {
		slidesPerView: 3,
		spaceBetween: 40,
		navigation: {
			nextEl: '.section--reviews .swiper-next',
			prevEl: '.section--reviews .swiper-prev',
		},
		breakpoints: {
			0: {
				slidesPerView: 1.2,
				spaceBetween: 20,
			},
			450: {
				slidesPerView: 2.5,
				spaceBetween: 20,
			},
			769: {
				slidesPerView: 3,
				spaceBetween: 40,
			},
		}
	})

	//Раскрытие элементов аккордеона в FAQ
	const faqElems = document.querySelectorAll('.section--faq .faq .faq__elem')
	faqElems.forEach(function (elem) {
		elem.querySelector('.faq__title').addEventListener('click', function (event) {
			faqElems.forEach(function (elem) {
				(elem !== event.target.closest('.faq__elem')) ? elem.classList.remove('opened'): ''
			})
			event.target.closest('.faq__elem').classList.toggle('opened')
		})
	});

	//Показать все вопросы
	const faqLoadMore = document.querySelector('.section--faq .faq-load-more')
	if (faqLoadMore !== null)
		faqLoadMore.addEventListener('click', function (event) {
			faqElems.forEach(function (elem) {
				(elem.classList.contains('d-none')) ? elem.classList.remove('d-none'): ''
			});
			event.target.style.display = 'none'
		})


	//Галереи
	const galleries = document.querySelectorAll('.gallery')

	galleries.forEach(function (gallery) {
		lightGallery(gallery, {
			'selector': 'a'
		});
	});

	//Карта
	const mapContainer = document.querySelector('#map')
	if (mapContainer !== null) {
		const script = document.createElement('script')
		script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A9e336a8b3d6ddda15a1470c6a205e03ba6c38e26cd7b19df37147c53b74fc4cb&amp;width=100%25&amp;height=502&amp;lang=ru_RU&amp;scroll=true';
		setTimeout(function () {
			mapContainer.appendChild(script);
		}, 1000);
	}

	//Слайдер с картинками на текстовой странице
	const textImageSlider = document.querySelectorAll('.section--text-type2 .swiper-container')
	if (textImageSlider)
		textImageSlider.forEach(function (slider) {
			new Swiper('#' + slider.id, {
				slidesPerView: 2,
				spaceBetween: 40,
				breakpoints: {
					0: {
						slidesPerView: 1.2,
						spaceBetween: 20,
					},
					600: {
						slidesPerView: 2,
						spaceBetween: 40,
					},
				}
			})
		})


	//Ховер на хлебных крошках
	const breadcrumbsLinks = document.querySelectorAll('.breadcrumbs a')
	const breadcrumbsSpan = document.querySelector('.breadcrumbs span')

	breadcrumbsLinks.forEach(function (link) {
		link.addEventListener('mouseenter', function () {
			breadcrumbsSpan.classList.add('disabled')
		});
		link.addEventListener('mouseleave', function () {
			breadcrumbsSpan.classList.remove('disabled')
		});
	})

	//Ховер на элементах меню
	const mainMenu = document.querySelector('.header__nav ul');
	const mainMenuActiveLink = document.querySelector('.header__nav .current-menu-item a span');
	const mainMenuLinks = document.querySelectorAll('.header__nav a');
	const activeLine = document.querySelector('.header__nav .line')

	function returnToActivePosition() {
		if (mainMenuActiveLink !== null) {
			activeLine.style.transform = "translate(" + (mainMenuActiveLink.getBoundingClientRect().left - mainMenu.getBoundingClientRect().left) + "px, 0)"
			activeLine.style.width = mainMenuActiveLink.getBoundingClientRect().width + "px"
		}
	}

	mainMenuLinks.forEach(function(link) {
		link.addEventListener('mouseenter', function(event){			
			const linkRect = event.target.querySelector('span').getBoundingClientRect()			
			activeLine.style.transform = "translate(" + ( linkRect.left - mainMenu.getBoundingClientRect().left ) + "px, 0)"
			activeLine.style.width = linkRect.width + "px"
		})
		link.addEventListener('mouseleave', function(){
			returnToActivePosition()			
		})
	})

	returnToActivePosition()

	mainMenu.classList.add('active-line')

	window.addEventListener("resize", function () {
		returnToActivePosition()
	}, false);


	//Маска для поля телефон
	const inputsTypeTel = document.querySelectorAll('input[type="tel"]');
	const im = new Inputmask('+7 999 999 99 99');
	im.mask(inputsTypeTel);

	//Модальные окна
	const modalParams = {
		onShow: function (modal) {
			document.body.classList.add('overflow-hidden')
		},
		onClose: function (modal) {
			document.body.classList.remove('overflow-hidden')
		}
	}
	MicroModal.init(modalParams);

	//Формы
	document.querySelectorAll('.form input').forEach(function (input) {
		input.addEventListener('input', function () {
			this.classList.remove('wpcf7-not-valid')
		})
	})

	//Сообщение об успешной отправке
	document.addEventListener('wpcf7mailsent', function (response) {
		const openedModal = document.querySelector('.modal.is-open')
		if (openedModal) {
			openedModal.classList.remove('is-open')
		}

		setTimeout(function () {
			MicroModal.show('modal-success', modalParams)
		}, 200);
	}, false)
};
