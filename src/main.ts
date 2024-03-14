import './style.scss'

const buttonStartGame = document.querySelector<HTMLButtonElement>(".start-game")
if (!buttonStartGame) {
  throw new Error("Error with Starting Game button selector");
}
const buttonTravel =
  document.querySelector<HTMLButtonElement>(".button--travel");
if (!buttonTravel) {
  throw new Error("Error with Travel button selector");
}

const buttonCrafting =
  document.querySelector<HTMLButtonElement>(".button--crafting");
if (!buttonCrafting) {
  throw new Error("Error with Crafting button selector");
}

const gameContainer = document.querySelector<HTMLDivElement>(".game-container")
if (!gameContainer) {
  throw new Error("Error with Game Container selector");
}

const buttonInfo = document.querySelector<HTMLParagraphElement>(".button-info")
if (!buttonInfo) {
  throw new Error("Error with Button Info selector");
}

const logText = document.querySelector<HTMLParagraphElement>(".log-text")
if (!logText) {
  throw new Error("Error with Log Text selector");
}

gameContainer.style.display = "none"   // Uncomment this in the end and remove the line below
// buttonStartGame.style.display = "none"

const handleStartOfGameScreen = () => {
  gameContainer.style.display = "initial"
  buttonStartGame.style.display = "none"
}

const handleTravelMenu = () => {
  buttonTravel.innerText = "Woods";
  buttonCrafting.style.display = "none";
  buttonInfo.innerText = "Where to: "
  logText.innerText = "You have chosen to set out..."
};

buttonStartGame.addEventListener("click", handleStartOfGameScreen)

buttonTravel.addEventListener("click", handleTravelMenu);















