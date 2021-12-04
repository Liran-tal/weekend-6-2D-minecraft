
const instructionsButton = document.querySelector('.menu-instructions-btn');
const instructionsReturnButton = document.querySelector('.instructions-return');

instructionsButton.addEventListener('click', () => {
	document.querySelector('.instructions').classList.toggle('hide');
})

instructionsReturnButton.addEventListener('click', () => {
	document.querySelector('.instructions').classList.toggle('hide');
})