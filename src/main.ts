import "./style.css";
import exampleIconUrl from "./we'reCooked.jpg";

let counter: number = 0;
let lastTime: number | null = null;
let growthRate: number = 0;

document.body.innerHTML = `
  <p><img src="${exampleIconUrl}" class="icon" /></p>
  <p>It seems we are living through some interesting yet tough times!<p>
  <p>How many disspointments have there been since Nov 6th 2024?<p>
  <p><span id="counter">0</span> Disappointments</p>
  <button id="increment">👎</button>
  <br>
  <button id="upgrade">11/6/24 Grand Announcement Auto-Clicker!</button>
`;

const clickButton = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;
const upgradeButton = document.getElementById("upgrade")! as HTMLButtonElement;

clickButton.addEventListener("click", () => {
  counter++;
  counterElement.textContent = counter.toString();
  console.log("Counter-keeping:", clickButton, counterElement, counter);
  console.log("Star button was clicked!");
  updateUpgradeButton();
});

upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 1;
    counterElement.textContent = counter.toFixed(2);
    console.log("Upgrade purchased! Growth rate:", growthRate);
    updateUpgradeButton();
  }
});

function updateUpgradeButton() {
  upgradeButton.disabled = counter < 10; // fixed with "as HTMLButtonElement"
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
