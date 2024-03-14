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

const locationImage = document.querySelector<HTMLImageElement>(".location-image")
if (!locationImage) {
  throw new Error("Error with Image Container selector");
}

const narrativeText = document.querySelector<HTMLParagraphElement>(".narrative-text")
if (!narrativeText) {
  throw new Error("Error with Narrative Text selector");
}

const backgroundColor = document.querySelector<HTMLDivElement>("#background")
if (!backgroundColor) {
  throw new Error("Error with Background Color selector");
}

// gameContainer.style.display = "none"   // Uncomment this in the end and remove the line below
buttonStartGame.style.display = "none"

type travel = {
  name: string;
  "button text": string;
  "button functions"?: void;
  areaText: string;
}

const travel = [
  {
    name: "Woods",
    "button text": "Woods",
    // "button function": ,
    text: "As you step into the woods, a chill runs down your spine, the canopy above casting the forest floor in a dim, dappled light. The ancient trees loom over you like silent sentinels, their gnarled branches reaching out as if to grasp at your very essence. The air is thick with the scent of damp earth and decaying leaves, and every rustle of movement sets your heart racing. You tread carefully, the path winding ahead, each twist and turn a potential new discovery or danger lurking in the shadows."
  }
]
  


const handleStartOfGameScreen = () => {
  gameContainer.style.display = "initial"
  buttonStartGame.style.display = "none"
}

const handleTravelMenu = () => {
  buttonTravel.innerText = "Woods";
  buttonCrafting.style.display = "none";
  buttonInfo.innerText = "Where to: "
  logText.innerText = "You have chosen to set out..."

  buttonTravel.removeEventListener("click", handleTravelMenu)
  buttonTravel.addEventListener("click", handleGoToWoods)
};

const handleGoToWoods = () => {
  locationImage.src = "https://t3.ftcdn.net/jpg/05/62/56/46/360_F_562564643_OSsBfTgR7mLjKtY5TCHrwGA2auYkou2T.jpg";
  narrativeText.innerText = "As you step into the woods, a chill runs down your spine, the canopy above casting the forest floor in a dim, dappled light. The ancient trees loom over you like silent sentinels, their gnarled branches reaching out as if to grasp at your very essence. The air is thick with the scent of damp earth and decaying leaves, and every rustle of movement sets your heart racing. You tread carefully, the path winding ahead, each twist and turn a potential new discovery or danger lurking in the shadows."
  backgroundColor.style.backgroundColor = "#111a10";
  buttonInfo.innerText = "Choose an action...";
  buttonCrafting.style.display = "initial";
  buttonCrafting.innerText = "Gather stone";
  buttonTravel.innerText = "Gather wood"
  logText.innerText = "You enter the still woods..."


  buttonTravel.removeEventListener("click", handleTravelMenu);
  buttonTravel.addEventListener("click", handleGoToWoods);
}

buttonStartGame.addEventListener("click", handleStartOfGameScreen)

buttonTravel.addEventListener("click", handleTravelMenu);















