const likes = document.querySelectorAll('.dish_day-stat-like');

// В каждом элементе выбираем плюс и минус. Навешиваем на событие клик функцию render()
likes.forEach(like => {
	const plus = like.querySelector('.dish_day-like_pic');
	const counter_element = like.querySelector('.dish_day-like');

    let counter = 0;

    plus.addEventListener('click', () => {
        if(counter === 0){
        	render(++counter, counter_element);
        }
        else if (counter > 0) {
        	render(--counter, counter_element);
        }
  	});
});
// Функция обновляет текст
const render = (counter, counter_element) => counter_element.innerText = counter;

// VALIDATION form registration start
function checkFormRegistration(el) {
	var reg_name = el.reg_name.value;
	var reg_login = el.reg_login.value;
	var reg_pass = el.reg_pass.value;
	var reg_repass = el.reg_repass.value;

	var fail = "";

	if(reg_name == "" || reg_pass == "")
		fail = "Заполните все поля формы";
	else if(reg_name.length <= 2 || reg_name.length > 30)
		fail = "Введите корректное имя";
	else if(reg_pass.length <= 7)
		fail = "Минимальная длина пароля - 8 символов";
	else if(reg_pass != reg_repass)
		fail = "Пароли не совпадают";

	if(fail != "") {
		document.getElementById('errorRegistr').innerHTML = fail;
		return false;
	}
	else {
		alert("Все данные корректно заполнены");
		return true;
	}
}
// VALIDATION form registration end

//LOGIN form start
function checkPassword() {
	let logins = document.getElementById("aut_login");
	let passwords = document.getElementById("aut_pass");

	var err = "";

	let loginEntered = logins.value;
	let passwordEntered = passwords.value;
	
	if(loginEntered === "login" && passwordEntered === "password") {
		alert("Добро пожаловать!");
		window.location = 'index.html';
		return true;
	}
	else {
		if(loginEntered == "" || passwordEntered == "") {
			err = "Заполните все поля формы";
		}
		else if(loginEntered != "login" || passwordEntered != "password"){
			err = "Неверный логин или пароль!";
		}
		document.getElementById('errorLogin').innerHTML = err;
		return false;
	}
	document.getElementById('aut_login').value='';
	document.getElementById('aut_pass').value='';
}
//LOGIN form end


//POP-UP login start
const popupLinks = document.querySelectorAll('.btn-open-form'); //получаем все объекты с классом popup-link

let unlock = true; //чтобы не было двойных нажатий

if (popupLinks.length > 0) { //проверка на наличие ссылок с классом popup-link на странице
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index]; //записываем каждую найденную ссылку в переменную
		popupLink.addEventListener("click", function (e) { //вешаем событие при клике на ссылку
			const popupName = popupLink.getAttribute('href').replace('#', ''); // удаление решетки из адресной строки
			const curentPopup = document.getElementById(popupName); // замена этой решетки на имена записанное в id
			popupOpen(curentPopup); // отправка полученной ссылки в функцию popupOpen для открытия окна popup
			e.preventDefault(); // запрет на перезагрузки страницы при переходе в popup
		});
	}
}

const popupCloseIcon = document.querySelectorAll('.button-form-close');
if (popupCloseIcon.length > 0) { //проверка на наличие ссылок с классом popup-link на странице
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index]; //записываем каждую найденную ссылку в переменную
		el.addEventListener('click', function (e) { //вешаем событие при клике на ссылку
			popupClose(el.closest('.popup')); // отправка полученной ссылки в функцию popupClose для закрытия (ищет ближайшего родителя с классом popup)
			
			document.getElementById('reg_name').value='';
			document.getElementById('reg_login').value='';
			document.getElementById('reg_pass').value='';
			document.getElementById('reg_repass').value='';
			document.getElementById('errorRegistr').remove();

			document.getElementById('aut_login').value='';
			document.getElementById('aut_pass').value='';
			document.getElementById('errorLogin').remove();

			e.preventDefault(); // запрет на перезагрузки страницы при переходе в popup
		});
	}
}

//когда в popup есть ссылка на другой popup
function popupOpen(curentPopup) { //передаем готовый объект по его id
	if (curentPopup && unlock) { //проверка на наличие такого объекта и открыт ли unlock (по умолчанию она открыта "true")
		const popupActive = document.querySelector('.popup.open'); //получаем открытый popup у которого есть класс open
		if (popupActive) { //если он существует...
			popupClose(popupActive, false); //закрыть его
		} 
		curentPopup.classList.add('open'); //добавляем открывшемуся popup класс open
		curentPopup.addEventListener("click", function (e) { // для открывшегося popup вешаем событие при клике
			if (!e.target.closest('.pop-up_body')) { // если у нажатого объекта в родителях нет объекта с классом popup__content, то (для закрытия popup при нажатии на область вне формы)
				popupClose(e.target.closest('.popup')); // закрываем popup

				document.getElementById('reg_name').value='';
				document.getElementById('reg_login').value='';
				document.getElementById('reg_pass').value='';
				document.getElementById('reg_repass').value='';
				document.getElementById('errorRegistr').remove();

				document.getElementById('aut_login').value='';
				document.getElementById('aut_pass').value='';
				document.getElementById('errorLogin').remove();
			}
		});
	}
}

//закрытие формы
function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
	}
}
// POPUp login end