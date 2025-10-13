import "./style.css";
import exampleIconUrl from "./we'reCooked.jpg";

let counter: number = 0;
let lastTime: number | null = null;
let growthRate: number = 0;
const itemOwned: number[] = [0, 0, 0, 0, 0];
const itemPrices: number[] = [10, 25, 38, 44, 57];

const buttonTexts = [ // different texts for each button
  "Wrongful Deportations of US Citizens and Immigrants",
  "Pardoning Capitol Rioters",
  "US's Involvement in Supporting the Genocide of Gaza",
  "Weaponization of Trade Policy",
  "Threatening Heavy Force against Peaceful Protesters",
];

document.body.innerHTML = `
  <p><img src="${exampleIconUrl}" class="icon" /></p>
  <p>It seems we are living through some interesting yet tough times! <br> How many disappointments have there been since Nov 6th 2024?<p>
  <p><span id="counter">0</span> Disappointments</p>
  <button id="increment">👎</button>
  <br>
  <br>
<div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <button class="upgrade" id="upgrade1">${buttonTexts[0]}</button>
    <button class="upgrade" id="upgrade2">${buttonTexts[1]}</button>
    <button class="upgrade" id="upgrade3">${buttonTexts[2]}</button>
    <button class="upgrade" id="upgrade4">${buttonTexts[3]}</button>
    <button class="upgrade" id="upgrade5">${buttonTexts[4]}</button>
  </div>
`;

const clickButton = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;
const upgradeButtons = [
  document.getElementById("upgrade1")! as HTMLButtonElement,
  document.getElementById("upgrade2")! as HTMLButtonElement,
  document.getElementById("upgrade3")! as HTMLButtonElement,
  document.getElementById("upgrade4")! as HTMLButtonElement,
  document.getElementById("upgrade5")! as HTMLButtonElement,
];

clickButton.addEventListener("click", () => {
  counter++;
  counterElement.textContent = counter.toString();
  console.log("Counter-keeping:", clickButton, counterElement, counter);
  console.log("Star button was clicked!");
  updateUpgradeButtons();
});

upgradeButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (counter >= itemPrices[index]) {
      counter -= itemPrices[index];
      growthRate += index + 1; //different growth rate for each
      itemOwned[index] += 1;
      itemPrices[index] += 4 * itemOwned[index]; // increase prices
      counterElement.textContent = counter.toFixed(2);
      console.log(`Upgrade ${index + 1} purchased! Growth rate:`, growthRate);
      updateUpgradeButtons();
    }
  });
});

function updateUpgradeButtons() {
  upgradeButtons.forEach((button, index) => {
    button.disabled = counter < itemPrices[index];
    button.innerHTML = button.innerHTML = `${buttonTexts[index]}<br>Owns: ${
      itemOwned[index]
    }<br>Cost: ${itemPrices[index]}`;
  });
}

function autoClicker(timestamp: number) {
  if (lastTime === null) {
    lastTime = timestamp;
  }

  const deltaTime = (timestamp - lastTime) / 1000; // increases based on real time
  lastTime = timestamp;

  if (growthRate > 0) {
    counter += deltaTime * growthRate;
    counterElement.textContent = counter.toFixed(2);
    updateUpgradeButtons(); // Check affordability
  }

  requestAnimationFrame(autoClicker);
}

requestAnimationFrame(autoClicker);
updateUpgradeButtons();
