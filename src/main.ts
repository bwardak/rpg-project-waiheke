import './style.scss'

let axes: string[] = [];
let pickaxes: string[] = [];
let wood: string[] = [];
let woodGained: number = 0;
let stone: string [] = [];
let stoneGained: number = 0;
let deleteInterval: number;
let energyLevel: number = 100;
let runAxePickaxeLogOnceWood: boolean = false;
let runAxePickaxeLogOnceStone: boolean = false;
let currentImageSrc: string = "https://storage.googleapis.com/pai-images/fb8618776e8645a5bb6dae2e1cc00e1b.jpeg"
let currentBackgroundColor: string = "rgb(56, 34, 8)";
let lastFunction;

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

const buttonSleep = document.querySelector<HTMLButtonElement>(".button--sleep")
if (!buttonSleep) {
  throw new Error("Error with Sleep Button selector");
}

const buttonInventory = document.querySelector<HTMLButtonElement>(".button--inventory");
if (!buttonInventory) {
  throw new Error("Error with Inventory Button selector");
}

const buttonAll = document.querySelectorAll<HTMLButtonElement>(".button")
if (!buttonAll) {
  throw new Error("Error with Button All selector");
}

// gameContainer.style.display = "none"   // Uncomment this in the end and remove the line below
buttonStartGame.style.display = "none"

type Areas = {
  name: string;
  imageSrc: string;
  "button text": string[];
  "button action": any[];
  areaText: string;
  backgroundColor: string;
  areaLogText: string;
}

type AreasArray = Areas[];




  
const handleChangingScreenContent = (area: Areas) => {
  locationImage.src = area.imageSrc
  backgroundColor.style.backgroundColor = area.backgroundColor
  buttonTravel.innerText = area["button text"][0];
  if (buttonTravel.innerText === ""){
    buttonTravel.style.display = "none"
  }
  buttonCrafting.innerText = area["button text"][1];
  if (buttonCrafting.innerText === "") {
    buttonCrafting.style.display = "none";
  }
  buttonSleep.innerText = area["button text"][2];
  if (buttonSleep.innerText === "") {
    buttonSleep.style.display = "none";
  }
  buttonInventory.innerText = area["button text"][3];
  if (buttonInventory.innerText === "") {
    buttonInventory.style.display = "none";
  }
  
  // buttonTravel.removeEventListener("click", handleTravelMenu)
  buttonTravel.addEventListener("click", area["button action"][0])

  lastFunction = area["button action"][0];

  logText.innerHTML = area.areaLogText
  console.log("I am used");
  
}

const handleGoHome = () => {
  handleChangingScreenContent(areas[0])
  currentImageSrc =
    "https://storage.googleapis.com/pai-images/fb8618776e8645a5bb6dae2e1cc00e1b.jpeg";
}

const handleGoToTravel = () => {
  handleChangingScreenContent(areas[1])
}

const handleGoTooWoods = () => {
  handleChangingScreenContent(areas[2])
  currentImageSrc =
    "https://t3.ftcdn.net/jpg/05/62/56/46/360_F_562564643_OSsBfTgR7mLjKtY5TCHrwGA2auYkou2T.jpg";
  currentBackgroundColor = "#111a10";
}

const handleCraftingMenu = () => {
  console.log("hi")
}

const handleSleepOption = () => {
  console.log("hi")
}

const handleStartOfGameScreen = () => {
  gameContainer.style.display = "initial"
  buttonStartGame.style.display = "none"
}



const handleGatherWood = () => {
  console.log(logText.innerText);
  
  if (
    logText.innerText === "You enter the still woods..." ||
    logText.innerText === "You walk around the baren woods..." ||
    logText.innerText.charAt(1) === "*"
  ) {
    logText.innerText = "";
  } 
  if (axes.length === 0){
    woodGained += Math.floor(Math.random() * (2 - 1 + 1)) + 1;
  };  

  
  
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

  if (
    wood.length >= 3 &&
    stone.length >= 3 &&
    logText.innerText.charAt(1) != "*" &&
    !runAxePickaxeLogOnceWood
  ) {
    clearInterval(deleteInterval);
    logText.innerText = `**YOU CAN NOW CRAFT A STONE AXE!**\n`;
    logText.innerText += `**YOU CAN NOW CRAFT A STONE PICKAXE!**`;
    console.log(logText.innerText);
    console.log(logText.innerText.charAt(1));
    runAxePickaxeLogOnceWood = true;
    runAxePickaxeLogOnceStone = true;
  }
}

const handleGatherStone = () => {
   if (
     logText.innerText === "You enter the still woods..." ||
     logText.innerText === "You walk around the baren woods..." ||
     logText.innerText.charAt(1) === "*"
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

   if (wood.length >= 3 && stone.length >= 3 && !runAxePickaxeLogOnceStone) {
     clearInterval(deleteInterval);
     logText.innerText = `**YOU CAN NOW CRAFT A STONE AXE!** \n`;
     logText.innerText += `**YOU CAN NOW CRAFT A STONE PICKAXE!**`;
     runAxePickaxeLogOnceStone = true;
     runAxePickaxeLogOnceWood = true;
   }
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

if (wood.length >= 3 && stone.length >= 3) {

  
}

const areas: AreasArray = [
  {
    name: "Home",
    imageSrc:
      "https://storage.googleapis.com/pai-images/fb8618776e8645a5bb6dae2e1cc00e1b.jpeg",
    "button text": ["Travel", "Crafting", "Sleep", "Inventory"],
    "button action": [handleGoToTravel, handleCraftingMenu, handleSleepOption],
    areaText: narrativeText.innerText,
    backgroundColor: "rgb(56, 34, 8)",
    areaLogText: "You have started your journey survivor.",
  },
  {
    name: "travel",
    imageSrc: currentImageSrc,
    "button text": ["Woods", "Home", "", ""],
    "button action": [handleGoTooWoods, handleGoHome],
    areaText:
      "As you step into the woods, a chill runs down your spine, the canopy above casting the forest floor in a dim, dappled light. The ancient trees loom over you like silent sentinels, their gnarled branches reaching out as if to grasp at your very essence. The air is thick with the scent of damp earth and decaying leaves, and every rustle of movement sets your heart racing. You tread carefully, the path winding ahead, each twist and turn a potential new discovery or danger lurking in the shadows.",
    backgroundColor: currentBackgroundColor,
    areaLogText: "You have chosen to set out...",
  },
  {
    name: "woods",
    imageSrc:
      "https://t3.ftcdn.net/jpg/05/62/56/46/360_F_562564643_OSsBfTgR7mLjKtY5TCHrwGA2auYkou2T.jpg",
    "button text": ["Gather Wood", "Gather Stone", "Travel", ""],
    "button action": [handleGatherWood, handleGatherStone, handleGoToTravel],
    areaText:
      "As you step into the woods, a chill runs down your spine, the canopy above casting the forest floor in a dim, dappled light. The ancient trees loom over you like silent sentinels, their gnarled branches reaching out as if to grasp at your very essence. The air is thick with the scent of damp earth and decaying leaves, and every rustle of movement sets your heart racing. You tread carefully, the path winding ahead, each twist and turn a potential new discovery or danger lurking in the shadows.",
    backgroundColor: "#111a10",
    areaLogText: "You enter the still woods...",
  },
];

buttonStartGame.addEventListener("click", handleStartOfGameScreen)

buttonTravel.addEventListener("click", handleGoToTravel);
// buttonTravel.onclick = handleGoToTravel















