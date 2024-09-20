const icons = [
    'fa-heart', 'fa-star', 'fa-cloud', 'fa-bolt',
    'fa-sun', 'fa-moon', 'fa-tree', 'fa-car'
];

const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const triesElement = document.getElementById('tries');
const darkModeCheckbox = document.getElementById('dark-mode-checkbox');

let cards = [];
let flippedCards = [];
let score = 0;
let tries = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    gameBoard.innerHTML = '';
    cards = [];
    flippedCards = [];
    tries = 0;
    updateTries();

    const shuffledIcons = shuffleArray([...icons, ...icons]);
    shuffledIcons.forEach((icon, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<i class="fas ${icon}"></i>`;
        card.dataset.icon = icon;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !flippedCards.includes(this)) {
        this.querySelector('i').style.display = 'block';
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            tries++;
            updateTries();
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.icon === card2.dataset.icon) {
        score += 1;
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
    } else {
        card1.querySelector('i').style.display = 'none';
        card2.querySelector('i').style.display = 'none';
    }
    flippedCards = [];
    updateScore();
    checkGameEnd();
}

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

function updateTries() {
    triesElement.textContent = `Tries: ${tries}`;
}

function checkGameEnd() {
    if (cards.every(card => card.querySelector('i').style.display === 'block')) {
        setTimeout(() => {
            alert(`Congratulations! You've completed the game with a score of ${score} in ${tries} tries.`);
            createBoard();
        }, 500);
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

darkModeCheckbox.addEventListener('change', toggleDarkMode);

createBoard();