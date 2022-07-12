"use strict"

document.addEventListener('DOMContentLoaded', function() { //Проверка загрузки документа

   const iconBurger = document.querySelector('.header__burger');
   const headerList = document.querySelector('.header__menu');
   const headerMenu = document.querySelectorAll('.header__link[data-goto], .welcome__button[data-goto], .button__link[data-goto]') //Ищем все класс ссылок с аттрибутом data-goto
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

//отправка формы на почту

const form = document.getElementById('form');//Получаем форму по ИД
form.addEventListener('submit', formSend); //Вешаем событие, выполняем функцию отправки формы

async function formSend(e) { // Функция отправки формы
   e.preventDefault(); //Отменяем действие отправки по умолчанию
   let error = formValidate(form); //В переменную получаем ошибки при валидации обязательных полей
   let formData = new FormData(form);

   if (error === 0){
      form.classList.add('_sending');
      let response = await fetch('sendmail.php', {
         method: 'POST',
         body: formData
      });

      if (response.ok){
         let result = await response.json();
         alert(result.message);
         form.reset();
         form.classList.remove('_sending');
      } else {
         alert ("Error!!! Сервер Козел");
         form.classList.remove('_sending');
      }
   } else {
      alert('Заполните обязательные поля');
   }
}

   function formValidate(form) {
   let error = 0;
   let formReq = document.querySelectorAll('._req');
   for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      input.classList.remove('_error');
      //input.parentElement.classList.remove('_error'); // для нарисованного чек-бокса

      if (input.classList.contains('_email')) {
         if (emailTest(input)){
            input.classList.add('_error');
            //input.parentElement.classList.add('_error'); // для нарисованного чек-бокса
            error++;
         }
         } else if (input.value === ''){
            input.classList.add('_error');
            error++;
         }
      }
      return error;
   }

   function emailTest(input){ // Функция проверки почты
   return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
   }
});
