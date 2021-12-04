
const instructionsButton = document.querySelector('.menu-instructions-btn');
console.log(document.querySelector("menu-instructions"));
const instructionsReturnButton = document.querySelector('.instructions-return');

instructionsButton.addEventListener('click', () => {
	document.querySelector('.instructions').classList.toggle('hide');
})

instructionsReturnButton.addEventListener('click', () => {
	document.querySelector('.instructions').classList.toggle('hide');
})