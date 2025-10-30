import "./style.css";
import exampleIconUrl from "./we'reCooked.jpg";

// For Button/Counter Data
const GAME_DATA = {
  counter: 0,
  lastTime: null as number | null,
  growthRate: 0,
  items: [
    {
      id: 1,
      name: '"Consumer Responsibility" Campaigns',
      basePrice: 10,
      baseGrowth: 1,
      owned: 0,
      currentPrice: 10,
      growthRate: "Growth: +1",
    },
    {
      id: 2,
      name: "Deforestation Corportations",
      basePrice: 25,
      baseGrowth: 2,
      owned: 0,
      currentPrice: 25,
      growthRate: "Growth: +2",
    },
    {
      id: 3,
      name: "Increased Use of AI",
      basePrice: 38,
      baseGrowth: 3,
      owned: 0,
      currentPrice: 38,
      growthRate: "Growth: +3",
    },
    {
      id: 4,
      name: "Delayed Action & Normalization",
      basePrice: 44,
      baseGrowth: 4,
      owned: 0,
      currentPrice: 44,
      growthRate: "Growth: +4",
    },
    {
      id: 5,
      name: "Defeatism Mentality",
      basePrice: 57,
      baseGrowth: 5,
      owned: 0,
      currentPrice: 57,
      growthRate: "Growth: +5",
    },
  ],
};

// For Opening Text
const NARRATIVE = {
  opening: "Climate Change",
  counterLabel: "Global Greenhouse Gas Emissions Built Up: ",
  clickButton: "🌡️",
};

function setupUI() {
  // Create main container
  const container = document.createElement("div");

  // Create image element
  const img = document.createElement("img");
  img.src = exampleIconUrl;
  img.className = "icon";
  const imgParagraph = document.createElement("p");
  imgParagraph.appendChild(img);
  container.appendChild(imgParagraph);

  // Create title
  const title = document.createElement("p");
  title.textContent = NARRATIVE.opening;
  container.appendChild(title);

  // Create counter display
  const counterParagraph = document.createElement("p");
  counterParagraph.textContent = NARRATIVE.counterLabel;
  const counterElement = document.createElement("span");
  counterElement.id = "counter";
  counterElement.textContent = "0";
  counterParagraph.appendChild(counterElement);
  container.appendChild(counterParagraph);

  // Create growth rate display
  const growthRateParagraph = document.createElement("p");
  growthRateParagraph.textContent = "Growth Rate: ";
  const growthRateElement = document.createElement("span");
  growthRateElement.id = "growthRate";
  growthRateElement.textContent = "0";
  growthRateParagraph.appendChild(growthRateElement);
  growthRateParagraph.append(" per second");
  container.appendChild(growthRateParagraph);

  // Create click button
  const clickButton = document.createElement("button");
  clickButton.id = "increment";
  clickButton.textContent = NARRATIVE.clickButton;
  container.appendChild(clickButton);

  // Add line breaks
  container.appendChild(document.createElement("br"));
  container.appendChild(document.createElement("br"));

  // Create upgrades container
  const upgradesContainer = document.createElement("div");
  upgradesContainer.style.display = "flex";
  upgradesContainer.style.flexWrap = "wrap";
  upgradesContainer.style.gap = "10px";

  // Create upgrade buttons
  const upgradeButtons: HTMLButtonElement[] = [];
  GAME_DATA.items.forEach((item) => {
    const upgradeButton = document.createElement("button");
    upgradeButton.className = "upgrade";
    upgradeButton.id = `upgrade${item.id}`;
    upgradeButtons.push(upgradeButton);
    upgradesContainer.appendChild(upgradeButton);
  });

  container.appendChild(upgradesContainer);

  // Clear body and append new UI
  document.body.innerHTML = "";
  document.body.appendChild(container);

  // Return the elements that need to be used elsewhere
  return {
    clickButton,
    counterElement,
    growthRateElement,
    upgradeButtons,
  };
}

// Initialize UI and get element references
const { clickButton, counterElement, growthRateElement, upgradeButtons } =
  setupUI();

// Event listeners and game logic (identical to original)
clickButton.addEventListener("click", () => {
  GAME_DATA.counter++;
  counterElement.textContent = Math.floor(GAME_DATA.counter).toString();
  updateDisplay();
  updateUpgradeButtons();
});

upgradeButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const item = GAME_DATA.items[index];
    if (GAME_DATA.counter >= item.currentPrice) {
      GAME_DATA.counter -= item.currentPrice;
      GAME_DATA.growthRate += item.baseGrowth; // Different growth rate for each
      item.owned += 1;
      item.currentPrice += 4 * item.owned; // Increase prices
      counterElement.textContent = GAME_DATA.counter.toFixed(2);
      updateDisplay();
      updateUpgradeButtons();
    }
  });
});

function updateDisplay() { //shows growth rate
  counterElement.textContent = GAME_DATA.counter.toFixed(1);
  growthRateElement.textContent = GAME_DATA.growthRate.toFixed(1);
}

function updateUpgradeButtons() {
  upgradeButtons.forEach((button, index) => {
    const item = GAME_DATA.items[index];
    button.disabled = GAME_DATA.counter < item.currentPrice;
    button.innerHTML =
      `${item.name}<br>${item.growthRate}<br>Owned: ${item.owned}<br>Cost: ${item.currentPrice}`;
  });
}

function autoClicker(timestamp: number) {
  if (GAME_DATA.lastTime === null) {
    GAME_DATA.lastTime = timestamp;
  }

  const deltaTime = (timestamp - GAME_DATA.lastTime) / 1000; // Increases based on real time
  GAME_DATA.lastTime = timestamp;

  if (GAME_DATA.growthRate > 0) {
    GAME_DATA.counter += deltaTime * GAME_DATA.growthRate;
    counterElement.textContent = GAME_DATA.counter.toFixed(2);
    updateDisplay();
    updateUpgradeButtons(); // Check affordability
  }

  requestAnimationFrame(autoClicker);
}

requestAnimationFrame(autoClicker);
updateDisplay();
updateUpgradeButtons();
