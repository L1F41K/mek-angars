document.addEventListener('DOMContentLoaded', () => {
	const burgerBtn = document.querySelector('.burger')
	const menuOverlay = document.getElementById('burgerMenu')
	const menuCloseBtn = document.getElementById('menuClose')
	const body = document.body

	// Открытие меню
	if (burgerBtn && menuOverlay) {
		burgerBtn.addEventListener('click', () => {
			menuOverlay.classList.add('is-open')
			body.classList.add('no-scroll') // Отключаем скролл сайта на фоне
		})
	}

	// Закрытие меню
	if (menuCloseBtn && menuOverlay) {
		menuCloseBtn.addEventListener('click', () => {
			menuOverlay.classList.remove('is-open')
			body.classList.remove('no-scroll') // Возвращаем скролл сайта
		})
	}
})
document.addEventListener('DOMContentLoaded', () => {
	// Получаем все текстовые блоки слева
	const advantageItems = document.querySelectorAll('.advantage-item')

	// Ищем ВСЕ счетчики на странице (и в картинке, и в мобильном блоке)
	const currentCounters = document.querySelectorAll('.slider-counter .current')
	const totalCounters = document.querySelectorAll('.slider-counter .total')

	const swiper = new Swiper('.swiper', {
		loop: false,
		speed: 800,
		effect: 'fade', // Мягкая смена фото, как на макете
		fadeEffect: {
			crossFade: true,
		},
		// Передаем Swiper сразу обе пары кнопок через запятую. Теперь и десктоп, и мобилка управляют им нативно!
		navigation: {
			nextEl: '.next, .js-mob-next',
			prevEl: '.prev, .js-mob-prev',
		},
		on: {
			// Инициализация общего количества слайдов для ВСЕХ счетчиков
			init: function () {
				if (totalCounters.length > 0) {
					const totalText = String(this.slides.length).padStart(2, '0')
					totalCounters.forEach(counter => {
						counter.textContent = totalText
					})
				}
			},
			// Основная логика смены контента
			slideChange: function () {
				const activeIndex = this.activeIndex

				// 1. Обновляем ВСЕ текущие счетчики (и на десктопе, и на мобилке)
				if (currentCounters.length > 0) {
					const currentText = String(activeIndex + 1).padStart(2, '0')
					currentCounters.forEach(counter => {
						counter.textContent = currentText
					})
				}

				// 2. Синхронизируем текст слева (остается без изменений)
				advantageItems.forEach((item, index) => {
					if (index === activeIndex) {
						item.classList.add('active')
						item.style.display = 'block' // Показываем нужный
					} else {
						item.classList.remove('active')
						item.style.display = 'none' // Скрываем остальные
					}
				})
			},
		},
	})
})
document.addEventListener('DOMContentLoaded', () => {
	// Выбираем только те карточки, которые содержат контент (исключаем кнопку)
	const hangarCards = document.querySelectorAll(
		'.hangar-card:not(.hangar-card--button)',
	)

	hangarCards.forEach(card => {
		card.addEventListener('click', function () {
			// Логика работает только на экранах мобильного разрешения
			if (window.innerWidth <= 990) {
				// Если карточка уже открыта — закрываем её
				if (this.classList.contains('is-active')) {
					this.classList.remove('is-active')
				} else {
					// Закрываем все остальные, чтобы одновременно была открыта только одна
					hangarCards.forEach(c => c.classList.remove('is-active'))

					// Открываем текущую карточку
					this.classList.add('is-active')
				}
			}
		})
	})
})
const projectItems = document.querySelectorAll('.project-item')
const projectViews = document.querySelectorAll('.project-view')

// Универсальная функция переключения активного проекта
function changeProject(item) {
	const projectId = item.getAttribute('data-project')

	// 1. Переключаем активный класс для пунктов СЛЕВА
	projectItems.forEach(el => el.classList.remove('active'))
	item.classList.add('active')

	// 2. Переключаем контент СПРАВА/СНИЗУ
	projectViews.forEach(view => {
		view.classList.remove('active')
	})

	const targetView = document.getElementById(`project-${projectId}`)
	if (targetView) {
		targetView.classList.add('active')
	}
}

// Навешиваем события в зависимости от типа устройства
projectItems.forEach(item => {
	// Для десктопов: смена при наведении мыши
	item.addEventListener('mouseenter', () => {
		if (window.innerWidth > 990) {
			changeProject(item)
		}
	})

	// Для мобилок: наведение не работает, меняем строго по клику/тапу
	item.addEventListener('click', () => {
		if (window.innerWidth <= 990) {
			changeProject(item)
		}
	})
})
