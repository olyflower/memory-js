import { shuffleCards } from "../utils/helper.js";

class MemoryGame {
	constructor(selector) {
		this.cards = document.querySelectorAll(selector);
		this.flipped = false;
		this.clickBlock = false;
		this.firstCard = null;
		this.secondCard = null;
		this.startTime = null;
		this.endTime = null;
		this.modal = document.getElementById("modal");
		this.modalMessage = document.getElementById("modal-message");
		this.restartButton = document.getElementById("restart-button");
		this.restartButton.addEventListener("click", () => this.restartGame());
		this.init();
	}

	init() {
		shuffleCards(this.cards);

		this.startTime = Date.now();

		this.cards.forEach((card) => {
			card.addEventListener("click", (e) => this.flipCard(e));
		});
	}

	flipCard(e) {
		if (this.clickBlock) return;
		const target = e.target.parentElement;

		if (target === this.firstCard) return;
		target.classList.add("flip");

		if (!this.flipped) {
			this.flipped = true;
			this.firstCard = target;
		} else {
			this.flipped = false;
			this.secondCard = target;
			this.match();
		}
	}

	match() {
		const isEqual =
			this.firstCard.dataset.item === this.secondCard.dataset.item;
		isEqual ? this.disableCard() : this.unFlipCard();

		if (this.isAllCardsFlliped()) {
			this.endTime = Date.now();
			this.displayTime();
		}
	}

	isAllCardsFlliped() {
		return [...this.cards].every((card) => card.classList.contains("flip"));
	}

	disableCard() {
		this.firstCard.removeEventListener("click", this.flipCard);
		this.secondCard.removeEventListener("click", this.flipCard);
	}

	unFlipCard() {
		this.clickBlock = true;
		setTimeout(() => {
			this.firstCard.classList.remove("flip");
			this.secondCard.classList.remove("flip");
			this.reset();
		}, 1000);
	}

	reset() {
		[this.flipped, this.clickBlock] = [false, false];
		[this.firstCard, this.secondCard] = [null, null];
	}

	displayTime() {
		const time = ((this.endTime - this.startTime) / 1000).toFixed(2);
		this.modalMessage.textContent = `Congratulations! You have completed the game in ${time} s.`;
		setTimeout(() => {
			this.modal.style.display = "flex";
		}, 1000);
	}

	restartGame() {
		this.modal.style.display = "none";
		this.reset();
		shuffleCards(this.cards);
		this.cards.forEach((card) => {
			card.classList.remove("flip");
			card.addEventListener("click", (e) => this.flipCard(e));
		});
		this.startTime = Date.now();
	}
}

document.addEventListener("DOMContentLoaded", () => new MemoryGame(".card"));
