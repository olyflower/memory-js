export const shuffleCards = (cards) => {
	cards.forEach((card) => {
		card.style.order = Math.floor(Math.random() * cards.length);
	});
};
