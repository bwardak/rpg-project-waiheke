import "./scss/style.scss";

let homes: string[] = [];
let axes: string[] = [];
let pickaxes: string[] = [];
let weapons: string[] = [];
let bed: string[] = [];
let wood: string[] = [];
let woodGained: number = 0;
let stone: string[] = [];
let stoneGained: number = 0;
let iron: string[] = [];
let ironGained: number = 0;
let diamond: string[] = [];
let diamondGained: number = 0;
let meat: string[] = [];
let meatGained: number = 0;
let wool: string[] = [];
let woolGained: number = 0;
let antler: string[] = [];
let antlerGained: number = 0;
let wolfBlood: string[] = [];
let wolfBloodGained: number = 0;
let water: string[] = [];
let waterGained: number = 0;
let healthPotion: string[] = [];
let mutton: string[] = [];
let deerStew: string[] = [];
let wolfCurry: string[] = [];
let deleteInterval: number;
let energyLevel: number = 100;
let healthLevel: number = 100;
let hungerLevel: number = 100;
let wolfHealth: number = 100;
let monsterHealth: number = 200;
let fistDamage: number = 5;
let swordDamage: number = 7;
let wolfDamage: number = 3;
let monsterDamage: number = 5;
let runAxePickaxeLogOnceWood: boolean = false;
let runAxePickaxeLogOnceStone: boolean = false;
let runSwordLogOnceStone: boolean = false;
let runHealingPotionLogOnce: boolean = false;
let runMeatCookingLogOnce: boolean = false;
let showMinesInTravelMenu: boolean = false;
let showBossFight: boolean = false;
let wolfDead: boolean = false;
let monsterDead: boolean = false;
let wolfEncounterInterval: number;
let textTimeout: number;


let travelButtonPreviousFunction: (() => void) | null = null; 
let craftingButtonPreviousFunction: (() => void) | null = null;
let sleepButtonPreviousFunction: (() => void) | null = null;
let inventoryButtonPreviousFunction: (() => void) | null = null;
let cookingButtonPreviousFunction: (() => void) | null = null;
let button6PreviousFunction: (() => void) | null = null;

const statsContainer = document.querySelector<HTMLElement>(
  ".game-block__interactions-container__stats"
);
if (!statsContainer) {
  throw new Error("Error with Stats Container selector");
}

const hiddenParagraphIron =
  document.querySelector<HTMLParagraphElement>("#hide-iron");
if (!hiddenParagraphIron) {
  throw new Error("Error with Hidden Paragraph Iron selector");
}

const hiddenParagraphCoal =
  document.querySelector<HTMLParagraphElement>("#hide-coal");
if (!hiddenParagraphCoal) {
  throw new Error("Error with Hidden Paragraph Coal selector");
}

const buttonStartGame =
  document.querySelector<HTMLButtonElement>(".start-game");
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

const button5 = document.querySelector<HTMLButtonElement>(".button--5");
if (!button5) {
  throw new Error("Error with Button 5 selector");
}

const button6 = document.querySelector<HTMLButtonElement>(".button--6");
if (!button6) {
  throw new Error("Error with Button 6 selector");
}

const gameContainer = document.querySelector<HTMLDivElement>(".game-container");
if (!gameContainer) {
  throw new Error("Error with Game Container selector");
}

const buttonInfo = document.querySelector<HTMLParagraphElement>(".button-info");
if (!buttonInfo) {
  throw new Error("Error with Button Info selector");
}

const logText = document.querySelector<HTMLParagraphElement>(".log-text");
if (!logText) {
  throw new Error("Error with Log Text selector");
}

const locationImage =
  document.querySelector<HTMLImageElement>(".location-image");
if (!locationImage) {
  throw new Error("Error with Image Container selector");
}

const narrativeText =
  document.querySelector<HTMLParagraphElement>(".narrative-text");
if (!narrativeText) {
  throw new Error("Error with Narrative Text selector");
}

const backgroundColor = document.querySelector<HTMLDivElement>("#background");
if (!backgroundColor) {
  throw new Error("Error with Background Color selector");
}

const woodAmount = document.querySelector<HTMLParagraphElement>(".wood");
if (!woodAmount) {
  throw new Error("Error with Wood Amount selector");
}

const stoneAmount = document.querySelector<HTMLParagraphElement>(".stone");
if (!stoneAmount) {
  throw new Error("Error with Stone Amount selector");
}

const energyAmount = document.querySelector<HTMLParagraphElement>(".energy");
if (!energyAmount) {
  throw new Error("Error with Energy Amount selector");
}

const buttonSleep = document.querySelector<HTMLButtonElement>(".button--sleep");
if (!buttonSleep) {
  throw new Error("Error with Sleep Button selector");
}

const buttonInventory =
  document.querySelector<HTMLButtonElement>(".button--inventory");
if (!buttonInventory) {
  throw new Error("Error with Inventory Button selector");
}

const buttonAll = document.querySelectorAll<HTMLButtonElement>(".button");
if (!buttonAll) {
  throw new Error("Error with Button All selector");
}

const healthAmount = document.querySelector<HTMLParagraphElement>(".health");
if (!healthAmount) {
  throw new Error("Error with Health Amount selector");
}

const hungerAmount = document.querySelector<HTMLParagraphElement>(".hunger");
if (!hungerAmount) {
  throw new Error("Error with Hunger Amount selector");
}

const meatAmount = document.querySelector<HTMLParagraphElement>(".meat");
if (!meatAmount) {
  throw new Error("Error with Meat Amount selector");
}

const woolAmount = document.querySelector<HTMLParagraphElement>(".wool");
if (!woolAmount) {
  throw new Error("Error with Wool Amount selector");
}

const antlerAmount = document.querySelector<HTMLParagraphElement>(".antler");
if (!antlerAmount) {
  throw new Error("Error with Antler Amount selector");
}

const wolfBloodAmount =
  document.querySelector<HTMLParagraphElement>(".wolfblood");
if (!wolfBloodAmount) {
  throw new Error("Error with Wolf Blood Amount selector");
}

const waterAmount = document.querySelector<HTMLParagraphElement>(".water");
if (!waterAmount) {
  throw new Error("Error with Water Amount selector");
}

const ironAmount = document.querySelector<HTMLParagraphElement>(".iron");
if (!ironAmount) {
  throw new Error("Error with Iron Amount selector");
}

const diamondAmount = document.querySelector<HTMLParagraphElement>(".diamond");
if (!diamondAmount) {
  throw new Error("Error with Diamond Amount selector");
}

const body = document.querySelector<HTMLBodyElement>('body')
if (!body) {
  throw new Error("Error with Body selector");
}

const dev = document.querySelector<HTMLHeadingElement>(".dev")
if (!dev) {
  throw new Error("Error with Dev selector");
}

gameContainer.style.display = "none";


type Areas = {
  name: string;
  imageSrc: string;
  "button text": string[];
  "button action": any[];
  areaText: string;
  backgroundColor: string;
  areaLogText: string;
};

type AreasArray = Areas[];

const handleChangingScreenContent = (area: Areas) => {
  clearInterval(wolfEncounterInterval);
  clearInterval(deleteInterval);
  clearInterval(textTimeout);
  locationImage.src = area.imageSrc;
  
  textTypewriting(narrativeText, area.areaText);

  backgroundColor.style.backgroundColor = area.backgroundColor;

  buttonTravel.style.display = "initial";
  buttonTravel.innerText = area["button text"][0];
  if (buttonTravel.innerText === "") {
    buttonTravel.style.display = "none";
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

  button5.style.display = "initial";
  button5.innerText = area["button text"][4];
  if (button5.innerText === "") {
    button5.style.display = "none";
  }

  button6.style.display = "initial";
  button6.innerText = area["button text"][5];
  if (button6.innerText === "") {
    button6.style.display = "none";
  }

  if (travelButtonPreviousFunction) {
    buttonTravel.removeEventListener("click", travelButtonPreviousFunction);
  }
  buttonTravel.addEventListener("click", area["button action"][0]);
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
    buttonInventory.removeEventListener(
      "click",
      inventoryButtonPreviousFunction
    );
  }
  buttonInventory.addEventListener("click", area["button action"][3]);
  inventoryButtonPreviousFunction = area["button action"][3];

  if (cookingButtonPreviousFunction) {
    button5.removeEventListener("click", cookingButtonPreviousFunction);
  }
  button5.addEventListener("click", area["button action"][4]);
  cookingButtonPreviousFunction = area["button action"][4];

  if (button6PreviousFunction) {
    button6.removeEventListener("click", button6PreviousFunction);
  }
  button6.addEventListener("click", area["button action"][5]);
  button6PreviousFunction = area["button action"][5];

  logText.innerText = area.areaLogText;
};

const disableButtons = () => {
  buttonAll.forEach((button) => {
    button.disabled = true;
  })
}

const enableButtons = () => {
  buttonAll.forEach((button) => {
    button.disabled = false;
  });
}

const handleGoHome = () => {
  handleChangingScreenContent(areas[0]);
  buttonAll.forEach((button) => {
    button.style.display = "initial";
    if (button.innerText === "") {
      button.style.display = "none";
    }
  });
  handleBossEncounter();
  if (!showBossFight) {
    button6.style.display = "none";
  } else if (showBossFight) {
    button6.style.display = "inline-flex";
  }
  if (homes.length === 1) {
    locationImage.src = "./images/cabin.jpeg";
    clearInterval(textTimeout);
    narrativeText.innerText = "";
    textTypewriting(
      narrativeText,
      "In the comforting embrace of his secluded cabin, he settled by the fading fire's glow, surrounded by the remnants of a world now reduced to ashes. Amidst the quiet solitude, he sought solace in the crackling flames, finding a glimmer of hope amidst the desolation. As the night grew still, he contemplated his next steps, acknowledging that from the ashes of loss, resilience would eventually emerge."
    );
  }
};

const handleGoToTravel = () => {
  buttonSleep.style.display = "initial";
  clearInterval(deleteInterval);
  handleChangingScreenContent(areas[1]);
  handleChanceOfFindingCaves();
};

const handleChanceOfFindingCaves = () => {
  if (buttonSleep.innerText === "Cave" && !showMinesInTravelMenu) {
    buttonSleep.style.display = "none";
  }
  let chanceOfCaves = Math.floor(Math.random() * 10 - 1 + 1) + 1;
  if (chanceOfCaves > 8 && !showMinesInTravelMenu) {
    buttonSleep.style.display = "initial";
    showMinesInTravelMenu = true;
    logText.innerText = `**YOU HAVE DISCOVERED A CAVE!**`;
  }
};

const handleGoToCave = () => {
  handleChangingScreenContent(areas[6]);
};

const handleMine = () => {
  if (pickaxes.length === 0) {
    logText.innerText = `Mining without a pickaxe doesnt seem like a good idea...`;
  }

  if (pickaxes.length === 1) {
    stoneGained += Math.floor(Math.random() * (5 - 2 + 1)) + 2;
    ironGained += Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    diamondGained += 1;
    let ironChance = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    let coalChance = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    if (ironChance > 5) {
      for (let i: number = 0; i < stoneGained; i++) {
        stone.push("S");
      }
      for (let i: number = 0; i < ironGained; i++) {
        iron.push("I");
      }
      logText.innerText = `Jackpot! \n+${stoneGained} stone... \n +${ironGained} iron... \n`;
      stoneGained = 0;
      ironGained = 0;
      stoneAmount.innerText = `Stone: ${stone.length.toString()}`;
      ironAmount.innerText = `Iron: ${iron.length.toString()}`;
    } else if (ironChance <= 5) {
      ironGained = 0;
      for (let i: number = 0; i < stoneGained; i++) {
        stone.push("S");
      }
      logText.innerText = `Just useless rocks... \n+${stoneGained} stone... \n`;
      stoneGained = 0;
      stoneAmount.innerText = `Stone: ${stone.length.toString()}`;
    }

    if (coalChance > 5) {
      for (let i: number = 0; i < diamondGained; i++) {
        diamond.push("C");
      }
      logText.innerText += `+1 coal... \n`;
      diamondGained = 0;
      diamondAmount.innerText = `Coal: ${diamond.length.toString()}`;
    }
  }
  handleIfIronOrCoalGained();
  // statsContainer.style.gridTemplate = "repeat(6, 1fr) / 1fr 1fr";
  // hiddenParagraph.forEach((paragraph) => {
  //   paragraph.style.display = "flex"
  // })
};

const handleIfIronOrCoalGained = () => {
  if (iron.length === 1 || diamond.length === 1) {
    statsContainer.style.gridTemplate = "repeat(6, 1fr) / 1fr 1fr";
  }

  if (iron.length === 1) {
    hiddenParagraphIron.style.display = "flex";
  }

  if (diamond.length === 1) {
    hiddenParagraphCoal.style.display = "flex";
  }
};

const handleGoTooWoods = () => {
  handleChangingScreenContent(areas[2]);
  logText.innerText = "You enter the still woods...";
  wolfDead = false;
};

const handleCraftingMenu = () => {
  handleChangingScreenContent(areas[3]);
  buttonAll.forEach((button) => {
    button.style.display = "none";
  });
  buttonTravel.style.display = "initial";
  handleCraftsShowing();
};

const handleCookingMenu = () => {
  handleChangingScreenContent(areas[5]);
  buttonAll.forEach((button) => {
    button.style.display = "none";
  });
  buttonTravel.style.display = "initial";
  handleCookingShowing();
};

const handleCraftsShowing = () => {
  if (wood.length >= 3 && stone.length >= 3) {
    buttonCrafting.style.display = "initial";
    buttonSleep.style.display = "initial";
  }

  if (wood.length >= 10 && wool.length >= 4) {
    buttonInventory.style.display = "initial";
  }

  if (wood.length >= 4 && antler.length >= 2) {
    button5.style.display = "initial";
  }

  if (
    wood.length >= 100 &&
    stone.length >= 100 &&
    wool.length >= 15 &&
    antler.length >= 15
  ) {
    button6.style.display = "initial";
  }
};

const handleCookingShowing = () => {
  if (wolfBlood.length >= 1 && water.length >= 5) {
    buttonCrafting.style.display = "initial";
  } else {
    buttonCrafting.style.display = "none";
  }

  if (meat.length >= 2) {
    buttonInventory.style.display = "initial";
    buttonSleep.style.display = "initial";
    button5.style.display = "initial";
  } else {
    buttonInventory.style.display = "none";
    buttonSleep.style.display = "none";
    button5.style.display = "none";
  }
};

const handleInventoryShowing = () => {
  if (healthPotion.length >= 1) {
    buttonCrafting.style.display = "initial"
  }
  if (mutton.length >= 1) {
    buttonSleep.style.display = "initial";
  }
  if (deerStew.length >= 1) {
    buttonInventory.style.display = "initial";
  }
  if (wolfCurry.length >= 1) {
    button5.style.display = "initial";
  }
}

const buyAxe = () => {
  if (wood.length >= 3 && stone.length >= 3 && axes[0] !== "stone axe") {
    axes.push("stone axe");
    wood.splice(0, 3);
    stone.splice(0, 3);
    woodAmount.innerText = `Wood: ${wood.length.toString()}`;
    stoneAmount.innerText = `Stone: ${stone.length.toString()}`;
    logText.innerText = "You made a stone axe!";
  } else if (axes[0] === "stone axe") {
    logText.innerText = "You already own a stone axe!";
  }
  handleCraftingMenu();
};

const buyPickaxe = () => {
  if (
    wood.length >= 3 &&
    stone.length >= 3 &&
    pickaxes[0] !== "stone pickaxe"
  ) {
    pickaxes.push("stone pickaxe");
    wood.splice(0, 3);
    stone.splice(0, 3);
    woodAmount.innerText = `Wood: ${wood.length.toString()}`;
    stoneAmount.innerText = `Stone: ${stone.length.toString()}`;
    logText.innerText = "You made a stone pickaxe!";
  } else if (pickaxes[0] === "stone pickaxe") {
    logText.innerText = "You already own a stone pickaxe!";
  }
  handleCraftingMenu();
};

const buyBed = () => {
  if (wood.length >= 10 && wool.length >= 4 && bed[0] !== "bed") {
    bed.push("bed");
    wood.splice(0, 10);
    wool.splice(0, 4);
    woodAmount.innerText = `Wood: ${wood.length.toString()}`;
    woolAmount.innerText = `Wool: ${wool.length.toString()}`;
    logText.innerText = "You made a bed!";
  } else if (bed[0] === "bed") {
    logText.innerText = "You already own a bed!";
  }
  handleCraftingMenu();
};

const buySword = () => {
  if (wood.length >= 4 && antler.length >= 2) {
    weapons.push("sword");
    wood.splice(0, 4);
    antler.splice(0, 2);
    woodAmount.innerText = `Wood: ${wood.length.toString()}`;
    antlerAmount.innerText = `Antlers: ${antler.length.toString()}`;
    logText.innerText = "You made a sword!";
  } else if (weapons[0] === "sword") {
    logText.innerText = "You already own a sword!";
  }
  handleCraftingMenu();
};

const buyCabin = () => {
  if (
    wood.length >= 100 &&
    stone.length >= 100 &&
    wool.length >= 15 &&
    antler.length >= 15
  ) {
    homes.push("cabin");
    wood.splice(0, 100);
    stone.splice(0, 100);
    wool.splice(0, 15);
    antler.splice(0, 15);
    woodAmount.innerText = `Wood: ${wood.length.toString()}`;
    stoneAmount.innerText = `Stone: ${stone.length.toString()}`;
    woolAmount.innerText = `Wool: ${wool.length.toString()}`;
    antlerAmount.innerText = `Antlers: ${antler.length.toString()}`;
    logText.innerText = `Home sweet home! You remade your beloved cabin!`;
  } else if (homes[0] === "cabin") {
    logText.innerText = "You already own a cabin!";
  }
  handleCraftingMenu();
};

const cookHealingPotion = () => {
  if (healthPotion.length < 1) {
    healthPotion.push("potion");
    wolfBlood.splice(0, 1);
    water.splice(0, 5);
    wolfBloodAmount.innerText = `Wolf Blood: ${wolfBlood.length.toString()}`;
    waterAmount.innerText = `Water: ${water.length.toString()}`;
    logText.innerText = "You made a healing potion!";
  } else if (healthPotion.length >= 1) {
    logText.innerText = "You can only carry one potion at a time!";
  }
  handleCookingShowing();
};

const cookMutton = () => {
  mutton.push("mutton");
  meat.splice(0, 2);
  meatAmount.innerText = `Meat: ${meat.length.toString()}`;
  logText.innerText = "You cooked some mutton! Tastes bland...";
  handleCookingShowing();
};

const cookDeerStew = () => {
  deerStew.push("stew");
  meat.splice(0, 2);
  meatAmount.innerText = `Meat: ${meat.length.toString()}`;
  logText.innerText = "You cooked some deer stew! Its a bit too thick...";
  handleCookingShowing();
};

const cookWolfCurry = () => {
  wolfCurry.push("curry");
  meat.splice(0, 2);
  meatAmount.innerText = `Meat: ${meat.length.toString()}`;
  logText.innerText = "You cooked some wolf curry! Wait wtf ew...";
  handleCookingShowing();
};

const handleSleepOption = () => {
  if (homes.length === 0) {
    if (bed[0] !== "bed") {
      if (energyLevel < 50) {
        energyLevel += 50;
        energyAmount.innerText = `Energy: ${energyLevel}`;
      } else if (energyLevel >= 50) {
        energyLevel = 100;
        energyAmount.innerText = `Energy: ${energyLevel}`;
      }
    } else if (bed[0] === "bed") {
      energyLevel = 100;
      energyAmount.innerText = `Energy: ${energyLevel}`;
    }
    logText.innerText = "You rest...";
  } else if (homes.length === 1) {
    if (bed[0] !== "bed") {
      if (energyLevel < 100) {
        energyLevel += 50;
        energyAmount.innerText = `Energy: ${energyLevel}`;
      } else if (energyLevel >= 100) {
        energyLevel = 150;
        energyAmount.innerText = `Energy: ${energyLevel}`;
      }
    } else if (bed[0] === "bed") {
      energyLevel = 150;
      energyAmount.innerText = `Energy: ${energyLevel}`;
    }
    logText.innerText = "You rest...";
  }
};

const handleOpenInventory = () => {
  handleChangingScreenContent(areas[4]);
  buttonAll.forEach((button) => {
    button.style.display = "none";
  });
  buttonTravel.style.display = "initial";
  handleInventoryShowing();
  buttonCrafting.innerText += ` (${healthPotion.length.toString()})`;
  buttonSleep.innerText += ` (${mutton.length.toString()})`;
  buttonInventory.innerText += ` (${deerStew.length.toString()})`;
  button5.innerText += ` (${wolfCurry.length.toString()})`;
};

const drinkHealthPotion = () => {
  if (healthPotion.length !== 0){
    healthPotion.splice(0, 1);
    if (buttonCrafting.innerText !== "Block") {
      buttonCrafting.innerText = `Health Pot (${healthPotion.length.toString()})`;
    }
    if (homes.length === 0 && healthLevel === 100) {
      logText.innerText = `You already have maximum health!`;
    } else if (homes.length === 0 && healthLevel < 100) {
      healthLevel = 100;
      healthAmount.innerText = `Health: ${healthLevel}`;
      logText.innerText = `You drank a health potion...`;
    } else if (homes.length === 1 && healthLevel === 150) {
      logText.innerText = `You already have maximum health!`;
    } else if (homes.length === 1 && healthLevel < 150) {
      healthLevel = 150;
      healthAmount.innerText = `Health: ${healthLevel}`;
      logText.innerText = `You drank a health potion...`;
    }
  } else {
    logText.innerText = "You dont have any potions..."
  }
  
};

const eatFood = () => {
  if (homes.length === 0) {
    if (hungerLevel >= 80) {
      hungerLevel = 100;
      hungerAmount.innerText = `Hunger: ${hungerLevel}`;
      logText.innerText = `You ate a meal... You feel full...`;
    } else {
      hungerLevel += 20;
      hungerAmount.innerText = `Hunger: ${hungerLevel}`;
      logText.innerText = `You ate a meal... You feel full...`;
    }
  } else if (homes.length === 1) {
    if (hungerLevel >= 130) {
      hungerLevel = 150;
      hungerAmount.innerText = `Hunger: ${hungerLevel}`;
      logText.innerText = `You ate a meal... You feel full...`;
    } else {
      hungerLevel += 20;
      hungerAmount.innerText = `Hunger: ${hungerLevel}`;
      logText.innerText = `You ate a meal... You feel full...`;
    }
  }
};

const eatMutton = () => {
  mutton.splice(0, 1);
  buttonSleep.innerText = `Mutton (${mutton.length.toString()})`;
  eatFood();
};

const eatDeerStew = () => {
  deerStew.splice(0, 1);
  buttonInventory.innerText = `Deer Stew (${deerStew.length.toString()})`;
  eatFood();
};

const eatWolfCurry = () => {
  wolfCurry.splice(0, 1);
  button5.innerText = `Wolf Curry (${wolfCurry.length.toString()})`;
  eatFood();
};

const handleStartOfGameScreen = () => {
  gameContainer.style.display = "initial";
  buttonStartGame.style.display = "none";
  handleGoHome();
};

const handleGatherWater = () => {
  if (
    logText.innerText.charAt(0) === "Y" ||
    logText.innerText.charAt(1) === "*"
  ) {
    logText.innerText = "";
  }
  waterGained += Math.floor(Math.random() * (2 - 1 + 1)) + 1;
  logText.innerText += `+${waterGained} water... \n`;
  for (let i: number = 0; i < waterGained; i++) {
    water.push("water");
  }
  waterGained = 0;
  waterAmount.innerText = `Water: ${water.length.toString()}`;
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
    deleteInterval = setInterval(deleteWoodText, 1000);
  }
  energyLevel -= 12;
  energyAmount.innerText = `Energy: ${energyLevel}`;

  if (water.length >= 5 && wolfBlood.length >= 1 && !runHealingPotionLogOnce) {
    clearInterval(deleteInterval);
    logText.innerText = `**YOU CAN NOW COOK HEALING POTIONS!** \n`;
    runHealingPotionLogOnce = true;
  }
};

const handleGatherWood = () => {
  if (
    logText.innerText.charAt(0) === "Y" ||
    logText.innerText.charAt(1) === "*"
  ) {
    logText.innerText = "";
  }
  if (axes.length === 0) {
    woodGained += Math.floor(Math.random() * (2 - 1 + 1)) + 1;
  } else if (axes.length === 1) {
    woodGained += Math.floor(Math.random() * (5 - 2 + 1)) + 2;
  }

  logText.innerText += `+${woodGained} wood...${"\u200B"}\n`;

  for (let i: number = 0; i < woodGained; i++) {
    wood.push("W");
  }
  woodGained = 0;
  woodAmount.innerText = `Wood: ${wood.length.toString()}`;
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
    deleteInterval = setInterval(deleteWoodText, 1000);
  }
  energyLevel -= 12;
  energyAmount.innerText = `Energy: ${energyLevel}`;

  if (
    wood.length >= 3 &&
    stone.length >= 3 &&
    logText.innerText.charAt(1) != "*" &&
    !runAxePickaxeLogOnceWood
  ) {
    clearInterval(deleteInterval);
    logText.innerText = `**YOU CAN NOW CRAFT A STONE AXE!**\n`;
    logText.innerText += `**YOU CAN NOW CRAFT A STONE PICKAXE!**`;
    runAxePickaxeLogOnceWood = true;
    runAxePickaxeLogOnceStone = true;
  }

  if (wood.length >= 4 && antler.length >= 2 && !runSwordLogOnceStone) {
    clearInterval(deleteInterval);
    logText.innerText = `**YOU CAN NOW CRAFT A BASIC SWORD!** \n`;
    runSwordLogOnceStone = true;
  }
};

const handleGatherStone = () => {
  if (
    logText.innerText.charAt(0) === "Y" ||
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
  energyLevel -= 12;
  energyAmount.innerText = `Energy: ${energyLevel}`;

  if (wood.length >= 3 && stone.length >= 3 && !runAxePickaxeLogOnceStone) {
    clearInterval(deleteInterval);
    logText.innerText = `**YOU CAN NOW CRAFT A STONE AXE!** \n`;
    logText.innerText += `**YOU CAN NOW CRAFT A STONE PICKAXE!**`;
    runAxePickaxeLogOnceStone = true;
    runAxePickaxeLogOnceWood = true;
  }
};

const deleteWoodText = () => {
  let splitLogText = logText.innerText.split("");
  splitLogText.splice(0, 12);
  logText.innerText = splitLogText.join("");
  if (logText.innerText.length < 12) {
    clearInterval(deleteInterval);
    logText.innerText = "You walk around the baren woods...";
  }
};

const deleteStoneText = () => {
  let splitLogText = logText.innerText.split("");
  splitLogText.splice(0, 12);
  logText.innerText = splitLogText.join("");
  if (logText.innerText.length < 12) {
    clearInterval(deleteInterval);
    logText.innerText = "You walk around the baren woods...";
  }
};

const handleWolfEncounter = () => {
  clearInterval(wolfEncounterInterval);
  clearInterval(deleteInterval);
  wolfHealth = 100;
  wolfDead = false;
  handleChangingScreenContent(areas[7]);
};

const handleWolfAttack = () => {
  let wolfDamageAmount =
    wolfDamage * (Math.floor(Math.random() * 11 - 1 + 1) + 1);
  healthLevel -= wolfDamageAmount;
  healthAmount.innerText = `Health: ${healthLevel}`;
  logText.innerText += `The wolf attacks and deals ${wolfDamageAmount}... Ouch... \n`;
  wolfDamage = 3;
  enableButtons()
  if (healthLevel <= 0) {
    wolfDead = true;
    loseFight();
  }
};

const winFight = () => {
  logText.innerText = `**YOU DEFEAT THE WOLF!** \n \n+2 meat... \n+1 Wolf Blood... `;
  meat.push("meat", "meat");
  wolfBlood.push("blood");
  meatAmount.innerText = `Meat: ${meat.length.toString()}`;
  wolfBloodAmount.innerText = `Meat: ${wolfBlood.length.toString()}`;
  wolfDead = true;
  wolfEncounterInterval = setInterval(() => {
    wolfDead = false;
    handleGoTooWoods();
  }, 2000);
};

const loseFight = () => {
  handleChangingScreenContent(areas[8]);
  clearInterval(constantLoss);
};

const handleGameRestart = () => {
  homes = [];
  axes = [];
  pickaxes = [];
  weapons = [];
  bed = [];
  wood = [];
  woodGained = 0;
  stone = [];
  stoneGained = 0;
  iron = [];
  ironGained = 0;
  diamond = [];
  diamondGained = 0;
  meat = [];
  meatGained = 0;
  wool = [];
  woolGained = 0;
  antler = [];
  antlerGained = 0;
  wolfBlood = [];
  wolfBloodGained = 0;
  water = [];
  waterGained = 0;
  healthPotion = [];
  mutton = [];
  deerStew = [];
  wolfCurry = [];
  energyLevel = 100;
  healthLevel = 100;
  hungerLevel = 100;
  wolfHealth = 100;
  healthAmount.innerText = "Health: 100";
  hungerAmount.innerText = "Hunger: 100";
  energyAmount.innerText = "Energy: 100";
  woodAmount.innerText = "Wood: 0";
  stoneAmount.innerText = "Stone: 0";
  meatAmount.innerText = "Meat: 0";
  woolAmount.innerText = "Wool: 0";
  waterAmount.innerText = "Water: 0";
  antlerAmount.innerText = "Antler: 0";
  wolfBloodAmount.innerText = "Wolf Blood: 0";
  ironAmount.innerText = "Iron: 0";
  diamondAmount.innerText = "Coal: 0";
  runAxePickaxeLogOnceWood = false;
  runAxePickaxeLogOnceStone = false;
  runSwordLogOnceStone = false;
  runHealingPotionLogOnce = false;
  runMeatCookingLogOnce = false;
  showMinesInTravelMenu = false;
  wolfDead = false;
  handleGoHome();
};

const handleAttack = () => {
  logText.innerText = "";
  if (
    fistDamage === 10 ||
    fistDamage === 7.5 ||
    swordDamage === 14 ||
    swordDamage === 10.5
  ) {
    logText.innerText = `**COUNTER ATTACK** \n \n`;
  }
  let damageAmount;
  if (weapons.length === 0) {
    damageAmount = fistDamage * (Math.floor(Math.random() * 6 - 1 + 1) + 1);
    wolfHealth -= damageAmount;
  } else if (weapons.length === 1) {
    damageAmount = swordDamage * (Math.floor(Math.random() * 6 - 1 + 1) + 1);
    wolfHealth -= damageAmount;
  }
  if (wolfHealth <= 0) {
    winFight();
  }
  narrativeText.innerText = `You encounter a wolf! \n Health: ${wolfHealth}`;
  if (wolfDead) {
    return null;
  }
  logText.innerText += `You attack the wolf and deal ${damageAmount} damage! \n \n`;
  disableButtons();
  setTimeout(handleWolfAttack, 1000);

  fistDamage = 5;
  swordDamage = 7;
};

const handleBossEncounter = () => {
  if (
    homes.length >= 1 &&
    axes.length >= 1 &&
    pickaxes.length >= 1 &&
    weapons.length >= 1 &&
    bed.length >= 1 &&
    iron.length >= 5 &&
    healthPotion.length >= 1
  ) {
    showBossFight = true;
  }
};

const handleGoToBossFight = () => {
  monsterDead = false;
  handleChangingScreenContent(areas[9]);
};

const handleBossAttack = () => {
  let monsterDamageAmount =
    monsterDamage * (Math.floor(Math.random() * 11 - 1 + 1) + 1);
  healthLevel -= monsterDamageAmount;
  healthAmount.innerText = `Health: ${healthLevel}`;
  logText.innerText += `The monster attacks and deals ${monsterDamageAmount}... Ouch... \n`;
  monsterDamage = 5;
  enableButtons();
  if (healthLevel <= 0) {
    monsterDead = true;
    logText.innerText = "**YOU TAKE FATAL DAMAGE!**";
    setTimeout(loseFightBoss, 1500);
  }
};

const loseFightBoss = () => {
  handleChangingScreenContent(areas[0]);
  healthLevel = 150;
  healthAmount.innerText = `Health: ${healthLevel}`;
  energyLevel = 150;
  energyAmount.innerText = `Health: ${energyLevel}`;
  hungerLevel = 150;
  hungerAmount.innerText = `Health: ${hungerLevel}`;
  logText.innerText = `You barely escape death and return home...`;
};

const winGame = () => {
  monsterDead = true;
  handleChangingScreenContent(areas[10]);
};

const handleAttackBoss = () => {
  logText.innerText = "";
  if (
    fistDamage === 10 ||
    fistDamage === 7.5 ||
    swordDamage === 14 ||
    swordDamage === 10.5
  ) {
    logText.innerText = `**COUNTER ATTACK** \n \n`;
  }
  let damageAmount;
  if (weapons.length === 0) {
    damageAmount = fistDamage * (Math.floor(Math.random() * 5 - 1 + 1) + 1);
    monsterHealth -= damageAmount;
  } else if (weapons.length === 1) {
    damageAmount = swordDamage * (Math.floor(Math.random() * 5 - 1 + 1) + 1);
    monsterHealth -= damageAmount;
  }
  if (monsterHealth <= 0) {
    winGame();
  }
  if (monsterDead) {
    return null;
  }
  narrativeText.innerText = `You face off versus the dreaded monster... \n \n Health: ${monsterHealth}`;

  logText.innerText += `You attack the monster and deal ${damageAmount} damage! \n \n`;

  disableButtons();
  setTimeout(handleBossAttack, 1000);

  fistDamage = 5;
  swordDamage = 7;
};

const handleBlockBoss = () => {
  logText.innerText = `You stance to block the next attack! \n \n`;
  monsterDamage = 2;

  let chanceForDoubleDamage = Math.floor(Math.random() * 15 - 1 + 1) + 1;
  if (chanceForDoubleDamage > 10) {
    fistDamage = 10;
    swordDamage = 14;
  }
  disableButtons();
  setTimeout(handleBossAttack, 1000);
};

const handleBlock = () => {
  logText.innerText = `You stance to block the next attack! \n \n`;
  wolfDamage = 1;

  let chanceForDoubleDamage = Math.floor(Math.random() * 15 - 1 + 1) + 1;
  if (chanceForDoubleDamage > 10) {
    fistDamage = 10;
    swordDamage = 14;
  }
  disableButtons();
  setTimeout(handleWolfAttack, 1000);
};

const handleDodgeBoss = () => {
  logText.innerText = ``;
  let chanceForDodge = Math.floor(Math.random() * 10 - 1 + 1) + 1;
  if (chanceForDodge > 5) {
    setTimeout(() => {
      logText.innerText = "You dodged the attack";
    }, 1000);
    fistDamage = 7.5;
    swordDamage = 10.5;
    disableButtons();
    setTimeout(enableButtons, 1000)
  } else {
    setTimeout(() => {
      logText.innerText = "You failed to dodge the attack \n \n";
    }, 1000);
    monsterDamage = 4;
    disableButtons();
    setTimeout(handleBossAttack, 2000);
  }
};

const handleDodge = () => {
  logText.innerText = ``;
  let chanceForDodge = Math.floor(Math.random() * 10 - 1 + 1) + 1;
  if (chanceForDodge > 5) {
    setTimeout(() => {
      logText.innerText = "You dodged the attack";
    }, 1000);
    fistDamage = 7.5;
    swordDamage = 10.5;
  } else {
    setTimeout(() => {
      logText.innerText = "You failed to dodge the attack \n \n";
    }, 1000);
    wolfDamage = 2;
    disableButtons();
    setTimeout(handleWolfAttack, 2000);
  }
};

const handleFlee = () => {
  logText.innerText = `You manage to flee, only losing 10 health...`;
  healthLevel -= 10;
  healthAmount.innerText = `Health: ${healthLevel}`;
  setTimeout(handleGoTooWoods, 2000);
};

const handleGoHunt = () => {
  clearInterval(deleteInterval);
  logText.innerText = "";
  let animalChance = Math.floor(Math.random() * 16 - 1 + 1) + 1;

  if (weapons.length === 0) {
    let meatGainedChance = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    if (meatGainedChance > 3) {
      meatGained += 1;
    } else if (meatGainedChance > 0) {
      meatGained += 0;
    }
    woolGained += 1;
    antlerGained += 1;
    wolfBloodGained += 1;
  } else if (weapons.length === 1) {
    meatGained += Math.floor(Math.random() * (3 - 0 + 1));
    woolGained += Math.floor(Math.random() * (3 - 0 + 1));
    antlerGained += Math.floor(Math.random() * (2 - 0 + 1));
    wolfBloodGained += Math.floor(Math.random() * (2 - 0 + 1));
  }

  if (animalChance >= 9) {
    let woolChance = Math.floor(Math.random() * 10 - 1 + 1) + 1;
    if (woolChance > 5) {
      if (meatGained === 0) {
        logText.innerText += `You failed to find something. \n`;
      } else {
        logText.innerText += `You found a sheep: \n+${meatGained} meat... \n+${woolGained} wool... \n`;
        for (let i: number = 0; i < meatGained; i++) {
          meat.push("meat");
        }
        for (let i: number = 0; i < woolGained; i++) {
          wool.push("wool");
        }
        energyLevel -= 12;
        energyAmount.innerText = `Energy: ${energyLevel}`;
      }
    } else {
      if (meatGained === 0) {
        logText.innerText += `You failed to find something. \n`;
      } else {
        for (let i: number = 0; i < meatGained; i++) {
          meat.push("meat");
        }
        logText.innerText += `You found a sheep: \n+${meatGained} meat... \n`;
        energyLevel -= 12;
        energyAmount.innerText = `Energy: ${energyLevel}`;
      }
    }
  } else if (animalChance >= 3) {
    let antlerChance = Math.floor(Math.random() * 10 - 1 + 1) + 1;
    if (antlerChance > 5) {
      if (meatGained === 0) {
        logText.innerText += `You failed to find something. \n`;
      } else {
        logText.innerText += `You found a deer: \n+${meatGained} meat... \n+${antlerGained} antlers... \n`;
        for (let i: number = 0; i < meatGained; i++) {
          meat.push("meat");
        }
        for (let i: number = 0; i < antlerGained; i++) {
          antler.push("antler");
        }
        energyLevel -= 12;
        energyAmount.innerText = `Energy: ${energyLevel}`;
      }
    } else {
      if (meatGained === 0) {
        logText.innerText += `You failed to find something. \n`;
      } else {
        for (let i: number = 0; i < meatGained; i++) {
          meat.push("meat");
        }
        logText.innerText += `You found a deer: \n+${meatGained} meat... \n`;
        energyLevel -= 12;
        energyAmount.innerText = `Energy: ${energyLevel}`;
      }
    }
  } else if (animalChance >= 1) {
    handleWolfEncounter();
    
  }

  if (wood.length >= 4 && antler.length >= 2 && !runSwordLogOnceStone) {
    clearInterval(deleteInterval);
    logText.innerText = `**YOU CAN NOW CRAFT A BASIC SWORD!** \n`;
    runSwordLogOnceStone = true;
  }

  if (water.length >= 5 && wolfBlood.length >= 1 && !runHealingPotionLogOnce) {
    clearInterval(deleteInterval);
    logText.innerText = `**YOU CAN NOW COOK HEALING POTIONS!** \n`;
    runHealingPotionLogOnce = true;
  }

  if (meat.length >= 2 && !runMeatCookingLogOnce) {
    clearInterval(deleteInterval);
    logText.innerText = `**YOU CAN NOW COOK MUTTON!** \n **YOU CAN NOW COOK DEER STEW!** \n **YOU CAN NOW COOK WOLF CURRY** \n`;
    runMeatCookingLogOnce = true;
  }

  meatAmount.innerText = `Meat: ${meat.length.toString()}`;
  woolAmount.innerText = `Wool: ${wool.length.toString()}`;
  antlerAmount.innerText = `Antler: ${antler.length.toString()}`;
  wolfBloodAmount.innerText = `Wolf Blood: ${wolfBlood.length.toString()}`;

  woolGained = 0;
  antlerGained = 0;
  meatGained = 0;
  wolfBloodGained = 0;
};

const textTypewriting = (
  element: HTMLParagraphElement,
  text: string,
  i = 0
) => {
  if (i === 0) {
    element.textContent = "";
  }

  element.textContent += text[i];

  if (i === text.length - 1) {
    return;
  }

  textTimeout = setTimeout(() => textTypewriting(element, text, i + 1), 25);
};

const loseHungerAndEnergy = () => {
  hungerLevel -= 2;
  energyLevel -= 2;
  hungerAmount.innerText = `Hunger: ${hungerLevel}`;
  energyAmount.innerText = `Energy: ${energyLevel}`;

  if (energyLevel <= 0) {
    energyLevel = 0;
    healthLevel -= 40;
    healthAmount.innerText = `Health: ${healthLevel}`;
    handleGoHome();
    energyLevel = 50;
    logText.innerText = `You collapsed from no energy yet somehow made your way home... remember to sleep!`;
    if (healthLevel <= 0) {
      loseFight();
    }
  }

  if (hungerLevel <= 0) {
    hungerLevel = 0;
    healthLevel -= 40;
    healthAmount.innerText = `Health: ${healthLevel}`;
    handleGoHome();
    hungerLevel = 50;
    logText.innerText = `You collapsed from no food yet somehow made your way home... remember to sleep!`;
    if (healthLevel <= 0) {
      loseFight();
    }
  }
};

const devCheats = () => {
  homes = ["W"];
  axes = ["W"];
  pickaxes = ["W"];
  weapons = ["W"];
  bed = ["W"];
  iron = ["W", "W", "W", "W", "W"];
  healthPotion = ["W", "W", "W"];
  wolfBlood = ["W"];
  water = ["W", "W", "W", "W", "W"]
  healthLevel = 150;
  energyLevel = 150;
  hungerLevel = 150;
  healthAmount.innerText = `Health: ${healthLevel}`
  energyAmount.innerText = `Health: ${energyLevel}`;
  hungerAmount.innerText = `Health: ${hungerLevel}`;
  handleGoHome()
}


const constantLoss = setInterval(loseHungerAndEnergy, 3000);

const areas: AreasArray = [
  {
    name: "Home",
    imageSrc: "./images/campfire.jpeg",
    "button text": [
      "Travel",
      "Crafting",
      "Sleep",
      "Inventory",
      "Cooking",
      "Boss Fight",
    ],
    "button action": [
      handleGoToTravel,
      handleCraftingMenu,
      handleSleepOption,
      handleOpenInventory,
      handleCookingMenu,
      handleGoToBossFight,
    ],
    areaText:
      "Alone in the woods, he sat by the fire's dwindling light, a silent witness to his world reduced to ash. With nothing left but memories, he found solace in the crackling flames, a flicker of hope amidst the desolation. In the stillness of the night, he pondered his next move, knowing that from the embers of loss, resilience would rise anew.",
    backgroundColor: "#261705",
    areaLogText: "You have started your journey survivor.",
  },
  {
    name: "travel",
    imageSrc: "./images/travel.jpeg",
    "button text": ["Home", "Woods", "Cave", "", "", ""],
    "button action": [handleGoHome, handleGoTooWoods, handleGoToCave],
    areaText:
      "As he ventured deeper into the woods, the trees whispered secrets of ancient times, their shadows dancing in the dimming light. With each step, he felt the weight of solitude press upon him, yet he pressed on, drawn by an unseen force. In the heart of the forest, surrounded by nature's symphony, he found himself lost in contemplation, seeking answers amidst the wilderness's enigmatic embrace.",
    backgroundColor: "null",
    areaLogText: "You have chosen to set out...",
  },
  {
    name: "woods",
    imageSrc: "./images/woods.jpeg",
    "button text": [
      "Gather Wood",
      "Gather Stone",
      "Hunt",
      "Get Water",
      "Travel",
      "",
    ],
    "button action": [
      handleGatherWood,
      handleGatherStone,
      handleGoHunt,
      handleGatherWater,
      handleGoToTravel,
    ],
    areaText:
      "As you step into the woods, a chill runs down your spine, the canopy above casting the forest floor in a dim, dappled light. The ancient trees loom over you like silent sentinels, their gnarled branches reaching out as if to grasp at your very essence. The air is thick with the scent of damp earth and decaying leaves, and every rustle of movement sets your heart racing. You tread carefully, the path winding ahead, each twist and turn a potential new discovery or danger lurking in the shadows.",
    backgroundColor: "#111a10",
    areaLogText: "You enter the still woods...",
  },
  {
    name: "crafting",
    imageSrc: "./images/man-crafting.jpeg",
    "button text": [
      "Go back",
      "Stone Axe",
      "Stone Pickaxe",
      "Bed",
      "Sword",
      "Cabin",
    ],
    "button action": [
      handleGoHome,
      buyAxe,
      buyPickaxe,
      buyBed,
      buySword,
      buyCabin,
    ],
    areaText: "You trudge over to your workbench",
    backgroundColor: "#261705",
    areaLogText: "You go to your crafting station",
  },
  {
    name: "inventory",
    imageSrc: "./images/campfire.jpeg",
    "button text": [
      "Close",
      `Health Pot`,
      `Mutton`,
      `Deer Stew `,
      `Wolf Curry `,
      "",
    ],
    "button action": [
      handleGoHome,
      drinkHealthPotion,
      eatMutton,
      eatDeerStew,
      eatWolfCurry,
    ],
    areaText: "You open your inventory...",
    backgroundColor: "#261705",
    areaLogText: "You open your inventory...",
  },
  {
    name: "cooking",
    imageSrc: "./images/campfire.jpeg",
    "button text": [
      "Go back",
      "Healing potion",
      "Mutton",
      "Deer Stew",
      "Wolf Curry",
      "",
    ],
    "button action": [
      handleGoHome,
      cookHealingPotion,
      cookMutton,
      cookDeerStew,
      cookWolfCurry,
    ],
    areaText: "You go to your stove...",
    backgroundColor: "#261705",
    areaLogText: "You go to your stove...",
  },
  {
    name: "mines",
    imageSrc: "./images/mines.jpeg",
    "button text": ["Go back", "Mine", "", "", "", ""],
    "button action": [handleGoToTravel, handleMine],
    areaText:
      "Entering the cavernous depths, he felt the earth's ancient pulse reverberating through his bones, guiding him deeper into the labyrinth of stone. With each pick of his axe, echoes of determination rang out, carving pathways through the darkness. Illuminated by the flickering glow of his lantern, he delved into the unknown, driven by the promise of treasures buried within the veins of the earth. Amidst the echoing silence, he forged ahead, a solitary miner seeking fortune amidst the timeless embrace of the underground realm.",
    backgroundColor: "#3c3d3d",
    areaLogText: "You enter the caves...",
  },
  {
    name: "wolf",
    imageSrc: "./images/wolf.jpeg",
    "button text": ["Attack", "Block", "Dodge", "Drink Potion", "Flee", ""],
    "button action": [
      handleAttack,
      handleBlock,
      handleDodge,
      drinkHealthPotion,
      handleFlee,
    ],
    areaText: `You encounter a wolf! \n \n Health: ${wolfHealth}`,
    backgroundColor: "#3c3d3d",
    areaLogText: "You run into a wolf...",
  },
  {
    name: "restart",
    imageSrc: "./images/dead.jpeg",
    "button text": ["Restart", "", "", "", "", ""],
    "button action": [handleGameRestart],
    areaText: `You have died... rest in peace...`,
    backgroundColor: "#680506",
    areaLogText: "Rest in piece...",
  },
  {
    name: "boss",
    imageSrc: "./images/monster.jpeg",
    "button text": ["Attack", "Block", "Dodge", "Drink Potion", "Flee", ""],
    "button action": [
      handleAttackBoss,
      handleBlockBoss,
      handleDodgeBoss,
      drinkHealthPotion,
      handleFlee,
    ],
    areaText: `You face off versus the dreaded monster... \n \n Health: ${monsterHealth}`,
    backgroundColor: "#4b4e01",
    areaLogText: "You face the monster...",
  },
  {
    name: "win game",
    imageSrc: "./images/win-game.jpeg",
    "button text": ["Restart game", "", "", "", "", ""],
    "button action": [handleGameRestart],
    areaText: `You have defeated the monster and reunited with your dog to live a long safe life within your cabin`,
    backgroundColor: "#158733",
    areaLogText: "**YOU WIN THE GAME! CONGRATS!**",
  },
];

buttonStartGame.addEventListener("click", handleStartOfGameScreen);
dev.addEventListener("click", devCheats)
