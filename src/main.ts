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
// let currentImageSrc: string = "https://storage.googleapis.com/pai-images/fb8618776e8645a5bb6dae2e1cc00e1b.jpeg"
let currentBackgroundColor: string = "rgb(56, 34, 8)";
let travelButtonPreviousFunction: (() => void) | null = null;
let craftingButtonPreviousFunction: (() => void) | null = null;
let sleepButtonPreviousFunction: (() => void) | null = null;
let inventoryButtonPreviousFunction: (() => void) | null = null;

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

gameContainer.style.display = "none"   // Uncomment this in the end and remove the line below
// buttonStartGame.style.display = "none"

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
  // currentImageSrc = locationImage.src

  narrativeText.innerText = area.areaText
  
  backgroundColor.style.backgroundColor = area.backgroundColor

  buttonTravel.style.display = "initial";
  buttonTravel.innerText = area["button text"][0];
  if (buttonTravel.innerText === ""){
    buttonTravel.style.display = "none"
  }

  buttonCrafting.style.display = "initial";
  buttonCrafting.innerText = area["button text"][1];
  if (buttonCrafting.innerText === "") {
    buttonCrafting.style.display = "none";
  }

  buttonSleep.style.display = "initial";
  buttonSleep.innerText = area["button text"][2];
  if (buttonSleep.innerText === "") {
    buttonSleep.style.display = "none";
  }

  buttonInventory.style.display = "initial";
  buttonInventory.innerText = area["button text"][3];
  if (buttonInventory.innerText === "") {
    buttonInventory.style.display = "none";
  }
  
  if (travelButtonPreviousFunction) {
    buttonTravel.removeEventListener("click", travelButtonPreviousFunction);
  }
  buttonTravel.addEventListener("click", area["button action"][0])
  travelButtonPreviousFunction = area["button action"][0];

  if (craftingButtonPreviousFunction) {
    buttonCrafting.removeEventListener("click", craftingButtonPreviousFunction);
  }
  buttonCrafting.addEventListener("click", area["button action"][1]);
  craftingButtonPreviousFunction = area["button action"][1];

  if (sleepButtonPreviousFunction) {
    buttonSleep.removeEventListener("click", sleepButtonPreviousFunction);
  }
  buttonSleep.addEventListener("click", area["button action"][2]);
  sleepButtonPreviousFunction = area["button action"][2];

  if (inventoryButtonPreviousFunction) {
    buttonInventory.removeEventListener("click", inventoryButtonPreviousFunction);
  }
  buttonInventory.addEventListener("click", area["button action"][3]);
  inventoryButtonPreviousFunction = area["button action"][3];

  logText.innerText = area.areaLogText

  
  console.log("I am used");
  
}

const handleGoHome = () => {
  handleChangingScreenContent(areas[0])
  // areas[1].imageSrc =
  //   "https://storage.googleapis.com/pai-images/fb8618776e8645a5bb6dae2e1cc00e1b.jpeg";
  // areas[1].backgroundColor = "rgb(56, 34, 8)";
  buttonAll.forEach((button) => {
    button.style.display = "initial"
  })
}

const handleGoToTravel = () => {
  console.log("called");
  // console.log(currentImageSrc);
  console.log(locationImage.src);
  
  // currentImageSrc = areas[1].imageSrc
  
  
  handleChangingScreenContent(areas[1])
}

const handleGoTooWoods = () => {
  console.log("function called");
  
  handleChangingScreenContent(areas[2])
  areas[1].imageSrc =
    "https://t3.ftcdn.net/jpg/05/62/56/46/360_F_562564643_OSsBfTgR7mLjKtY5TCHrwGA2auYkou2T.jpg";
  areas[1].backgroundColor = "#111a10";
  logText.innerText = "You enter the still woods...";
  console.log("woods");
  
}

const handleCraftingMenu = () => {
  handleChangingScreenContent(areas[3])
  buttonAll.forEach((button) => {
    button.style.display = "none"
  })
  buttonTravel.style.display = "initial";
  handleAxeAndPickaxeCraftStone();
  // locationImage.style.height = "450px"
  // locationImage.style.width = "900px"
  
}

const handleAxeAndPickaxeCraftStone = () => {
  if(wood.length >= 3 && stone.length >= 3){
    buttonCrafting.style.display = "initial";
    buttonSleep.style.display = "initial"
  };
}

const buyAxe = () => {
  if(wood.length >= 3 && stone.length >= 3 && axes[0] !== "stone axe"){
    axes.push("stone axe");
    console.log(wood, stone);
    wood.splice(0, 3)
    stone.splice(0, 3)
    woodAmount.innerText = `Wood: ${wood.length.toString()}`
    stoneAmount.innerText = `Stone: ${stone.length.toString()}`
    console.log(wood, stone);
    logText.innerText = "You made a stone axe!";
  } else if(axes[0] === "stone axe") {
    logText.innerText = "You already own a stone axe!"
  }
}

const buyPickaxe = () => {
  if (wood.length >= 3 && stone.length >= 3 && pickaxes[0] !== "stone pickaxe") {
    pickaxes.push("stone pickaxe");
    console.log(wood, stone);
    wood.splice(0, 3);
    stone.splice(0, 3);
    woodAmount.innerText = `Wood: ${wood.length.toString()}`;
    stoneAmount.innerText = `Stone: ${stone.length.toString()}`;
    console.log(wood, stone);
    logText.innerText = "You made a stone pickaxe!";
  } else if (axes[0] === "stone axe") {
    logText.innerText = "You already own a stone pickaxe!";
  }
};

const handleSleepOption = () => {
  console.log("hi")
  energyLevel = 100;
  energyAmount.innerText = `Energy: ${energyLevel}`
  
}

const handleStartOfGameScreen = () => {
  gameContainer.style.display = "initial"
  buttonStartGame.style.display = "none"
  handleGoHome()
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
  } else if (axes.length === 1) {
    woodGained += Math.floor(Math.random() * (5 - 2 + 1)) + 2;
  }

  
  
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
   } else if (pickaxes.length === 1) {
    stoneGained += Math.floor(Math.random() * (5 - 2 + 1)) + 2;
   }


   logText.innerText += `+${stoneGained} stone... \n`;
   for (let i: number = 0; i < stoneGained; i++) {
     stone.push("S");
   }
   stoneGained = 0;
   stoneAmount.innerText = `Stone: ${stone.length.toString()}`;
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
  if (
    logText.innerText.length < 11 ) {
    clearInterval(deleteInterval);
    logText.innerText = "You walk around the baren woods...";
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
    imageSrc: "./src/images/campfire.jpeg",
    "button text": ["Travel", "Crafting", "Sleep", "Inventory"],
    "button action": [handleGoToTravel, handleCraftingMenu, handleSleepOption],
    areaText:
      "Alone in the woods, he sat by the fire's dwindling light, a silent witness to his world reduced to ash. With nothing left but memories, he found solace in the crackling flames, a flicker of hope amidst the desolation. In the stillness of the night, he pondered his next move, knowing that from the embers of loss, resilience would rise anew.",
    backgroundColor: "rgb(56, 34, 8)",
    areaLogText: "You have started your journey survivor.",
  },
  {
    name: "travel",
    imageSrc: "./src/images/travel.jpeg",
    "button text": ["Woods", "Home", "", ""],
    "button action": [handleGoTooWoods, handleGoHome],
    areaText: "The woods beckon",
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
  {
    name: "crafting",
    imageSrc: "./src/images/man-crafting.jpeg",
    "button text": [
      "Back to campfire",
      "Craft Stone Axe",
      "Craft Stone Pickaxe",
      "",
    ],
    "button action": [handleGoHome, buyAxe, buyPickaxe],
    areaText: "You trudge over to your workbench",
    backgroundColor: "#5e3718",
    areaLogText: "You go to your crafting station",
  },
];

buttonStartGame.addEventListener("click", handleStartOfGameScreen)


// buttonTravel.onclick = handleGoToTravel















