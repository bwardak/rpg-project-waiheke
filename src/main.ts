import './style.scss'

let axes: string[] = [];
let pickaxes: string[] = [];
let wood: string[] = [];
let woodGained: number = 0;
let stone: string [] = [];
let stoneGained: number = 0;
let deleteInterval: number;
let energyLevel: number = 100;

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

const woodAmount = document.querySelector<HTMLParagraphElement>(".wood")
if (!woodAmount) {
  throw new Error("Error with Wood Amount selector");
}

const stoneAmount = document.querySelector<HTMLParagraphElement>(".stone")
if (!stoneAmount) {
  throw new Error("Error with Stone Amount selector");
}

const energyAmount = document.querySelector<HTMLParagraphElement>(".energy")
if (!energyAmount) {
  throw new Error("Error with Energy Amount selector");
}
gameContainer.style.display = "none"   // Uncomment this in the end and remove the line below
// buttonStartGame.style.display = "none"

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


  buttonTravel.removeEventListener("click", handleGoToWoods);
  buttonTravel.addEventListener("click", handleGatherWood);
  // buttonCrafting.removeEventListener("click", handleCraftingMenu)
  buttonCrafting.addEventListener("click", handleGatherStone)
}

const handleGatherWood = () => {
  if (
    logText.innerText === "You enter the still woods..." ||
    logText.innerText ===  "You walk around the baren woods..."
  ) {
    logText.innerText = "";
  } 
  if (axes.length === 0){
    woodGained += Math.floor(Math.random() * (2 - 1 + 1)) + 1;
  };  
  console.log(woodGained);

  
  
  logText.innerText += `+${woodGained} wood... \n`
  
  for (let i: number = 0; i < woodGained; i++){
    wood.push("W");
  }
  woodGained = 0;
  woodAmount.innerText = `Wood: ${wood.length.toString()}`
  if (logText.innerText.length > 55) {
    let splitLogText = logText.innerText.split("")
    splitLogText.splice(0, 11)
    logText.innerText = splitLogText.join("")
  }
  clearInterval(deleteInterval);
  if (logText.innerText !== "You enter the still woods..." && logText.innerText.length >= 11 && logText.innerText !== "You walk around the baren woods...") {
     deleteInterval = setInterval(deleteWoodText, 1000)
  }

  energyAmount.innerText = `Energy: ${energyLevel - 12}`
  energyLevel -= 12
}

const handleGatherStone = () => {
   if (
     logText.innerText === "You enter the still woods..." ||
     logText.innerText === "You walk around the baren woods..."
   ) {
     logText.innerText = "";
   }
   if (pickaxes.length === 0) {
     stoneGained += Math.floor(Math.random() * (2 - 1 + 1)) + 1;
   }
   logText.innerText += `+${stoneGained} stone... \n`;
   for (let i: number = 0; i < stoneGained; i++) {
     stone.push("W");
   }
   stoneGained = 0;
   stoneAmount.innerText = `Wood: ${stone.length.toString()}`;
   if (logText.innerText.length > 60) {
     let splitLogText = logText.innerText.split("");
     splitLogText.splice(0, 12);
     logText.innerText = splitLogText.join("");
   }
   clearInterval(deleteInterval);
   if (
     logText.innerText !== "You enter the still woods..." &&
     logText.innerText.length >= 12 &&
     logText.innerText !== "You walk around the baren woods..."
   ) {
     deleteInterval = setInterval(deleteStoneText, 1000);
   }

   energyAmount.innerText = `Energy: ${energyLevel - 12}`;
   energyLevel -= 12;
}

const deleteWoodText = () => {
  let splitLogText = logText.innerText.split("");
  splitLogText.splice(0, 11);
  logText.innerText = splitLogText.join("");
  if (logText.innerText.length < 11) {
  clearInterval(deleteInterval);
  logText.innerText = "You walk around the baren woods..."
  }  
}

const deleteStoneText = () => {
  let splitLogText = logText.innerText.split("");
  splitLogText.splice(0, 12);
  logText.innerText = splitLogText.join("");
  if (logText.innerText.length < 12) {
    clearInterval(deleteInterval);
    logText.innerText = "You walk around the baren woods...";
  }
};



buttonStartGame.addEventListener("click", handleStartOfGameScreen)

buttonTravel.addEventListener("click", handleTravelMenu);















