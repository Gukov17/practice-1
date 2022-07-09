'use strict'


const iconBurger = document.querySelector('.header__burger');
const headerList = document.querySelector('.header__menu');
const headerMenu = document.querySelectorAll('.header__link[data-goto]') //Ищем все класс ссылок с аттрибутом data-goto
//Меню бургер
if (iconBurger) {
   iconBurger.addEventListener("click", function (e) {
      document.body.classList.toggle('_lock');
      iconBurger.classList.toggle('_active');
      headerList.classList.toggle('_active');
   });
}


/* Прокрутка по странице*/

if (headerMenu.length > 0) { // Проверяем есть ли такие ссылки
   headerMenu.forEach(menuLink => {
      menuLink.addEventListener("click", onMenuLinkClick); // Навешиваем событие клик на ссылку и выполнение функции при клике
   });

   function onMenuLinkClick(e) { //Ыункция скрола
      const menuLink = e.target; // Получаем объект клика
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) { //проверка заполнен ли аттрибут ДатаГо у ссылки и проверка есть ли такой атрибут в документе у объекта скрола
         const gotoSection = document.querySelector(menuLink.dataset.goto); // объект с атрибутом
         const gotoSectionValue = gotoSection.getBoundingClientRect().top + window.pageYOffset - document.querySelector('header').offsetHeight;
         /*gotoSection.getBoundingClientRect().top - местоположение объекта в пикселях с верху
         window.pageYOffset - количество уже прокрученых пикселей
         document.querySelector('header').offsetHeight - вычитаем высоту шапки, получаем точный доезд
*/

         if (iconBurger.classList.contains('_active')) {
            document.body.classList.remove('_lock');
            iconBurger.classList.remove('_active');
            headerList.classList.remove('_active');
         }

         window.scrollTo({ //скролим 
            top: gotoSectionValue, //координаты
            behavior: "smooth" // плавная прокрутка
         });
         e.preventDefault();//отключаем работу ссылки, т.е. атрибута href
      }
   }
}

