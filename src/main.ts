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
      name: "Wrongful Deportations of US Citizens and Immigrants",
      basePrice: 10,
      baseGrowth: 1,
      owned: 0,
      currentPrice: 10,
    },
    {
      id: 2,
      name: "Pardoning Capitol Rioters",
      basePrice: 25,
      baseGrowth: 2,
      owned: 0,
      currentPrice: 25,
    },
    {
      id: 3,
      name: "US's Involvement in Supporting the Genocide of Gaza",
      basePrice: 38,
      baseGrowth: 3,
      owned: 0,
      currentPrice: 38,
    },
    {
      id: 4,
      name: "Weaponization of Trade Policy",
      basePrice: 44,
      baseGrowth: 4,
      owned: 0,
      currentPrice: 44,
    },
    {
      id: 5,
      name: "Threatening Heavy Force against Peaceful Protesters",
      basePrice: 57,
      baseGrowth: 5,
      owned: 0,
      currentPrice: 57,
    },
  ],
};

// For Opening Text
const NARRATIVE = {
  opening: "It seems we are living through some interesting yet tough times!",
  subtitle: "How many disappointments have there been since Nov 6th 2024?",
  counterLabel: "Disappointments",
  clickButton: "👎",
};

document.body.innerHTML = `
  <p><img src="${exampleIconUrl}" class="icon" /></p>
  <p>${NARRATIVE.opening} <br> ${NARRATIVE.subtitle}<p>
  <p><span id="counter">0</span> ${NARRATIVE.counterLabel}</p>
  <button id="increment">${NARRATIVE.clickButton}</button>
  <br>
  <br>
  <div style="display: flex; flex-wrap: wrap; gap: 10px;">
    ${
  GAME_DATA.items.map((item) =>
    `<button class="upgrade" id="upgrade${item.id}">${item.name}</button>`
  ).join("")
}
  </div>
`;

const clickButton = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;
const upgradeButtons = GAME_DATA.items.map((item) =>
  document.getElementById(`upgrade${item.id}`)! as HTMLButtonElement
); // Sums up what I had previously

clickButton.addEventListener("click", () => {
  GAME_DATA.counter++;
  counterElement.textContent = Math.floor(GAME_DATA.counter).toString();
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
      updateUpgradeButtons();
    }
  });
});

function updateUpgradeButtons() {
  upgradeButtons.forEach((button, index) => {
    const item = GAME_DATA.items[index];
    button.disabled = GAME_DATA.counter < item.currentPrice;
    button.innerHTML =
      `${item.name}<br>Owns: ${item.owned}<br>Cost: ${item.currentPrice}`;
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
    updateUpgradeButtons(); // Check affordability
  }

  requestAnimationFrame(autoClicker);
}

requestAnimationFrame(autoClicker);
updateUpgradeButtons();
