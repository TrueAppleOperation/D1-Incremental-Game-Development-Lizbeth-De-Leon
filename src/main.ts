import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter: number = 0;
let lastTime: number | null = null;
let growthRate: number = 0;

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
  <p><span id="counter">0</span> Stars!</p>
  <button id="increment">🌟</button>
  <button id="upgrade">Buy Auto-Clicker [20 stars]</button>
`;

const clickButton = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;
const upgradeButton = document.getElementById("upgrade")!;

clickButton.addEventListener("click", () => {
  counter++;
  counterElement.textContent = counter.toString();
  console.log("Counter-keeping:", clickButton, counterElement, counter);
  console.log("Star button was clicked!");
  updateUpgradeButton();
});

upgradeButton.addEventListener("click", () => {
  if (counter >= 20) {
    counter -= 20;
    growthRate += 1;
    counterElement.textContent = counter.toFixed(2);
    console.log("Upgrade purchased! Growth rate:", growthRate);
    updateUpgradeButton();
  }
});

function updateUpgradeButton() {
  upgradeButton.disabled = counter < 20; // check to fix later
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
    updateUpgradeButton(); // Check affordability
  }

  requestAnimationFrame(autoClicker);
}

requestAnimationFrame(autoClicker);
updateUpgradeButton();
