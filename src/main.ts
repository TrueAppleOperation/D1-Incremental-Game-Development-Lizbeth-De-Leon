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

document.body.innerHTML = `
  <p><img src="${exampleIconUrl}" class="icon" /></p>
  <p>${NARRATIVE.opening}<p>
  <p>${NARRATIVE.counterLabel}<span id="counter">0</span></p>
  <p>Growth Rate: <span id="growthRate">0</span> per second</p>
  <button id="increment">${NARRATIVE.clickButton}</button>
  <br>
  <br>
  <div style="display: flex; flex-wrap: wrap; gap: 10px;">
    ${
  GAME_DATA.items.map((item) =>
    `<button class="upgrade" id="upgrade${item.id}"></button>`
  ).join("")
}
  </div>
`;

const clickButton = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;
const growthRateElement = document.getElementById("growthRate")!;
const upgradeButtons = GAME_DATA.items.map((item) =>
  document.getElementById(`upgrade${item.id}`)! as HTMLButtonElement
); // Sums up what I had previously

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
