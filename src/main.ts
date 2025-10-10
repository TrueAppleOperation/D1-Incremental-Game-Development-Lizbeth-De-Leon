import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter: number = 0;
let lastTime: number | null = null;

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
  <p><span id="counter">0</span> Stars!</p>
  <button id="increment">🌟</button>
`;

const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  counter++;
  counterElement.textContent = counter.toString();
  console.log("Counter-keeping:", button, counterElement, counter);
  console.log("Star button was clicked!");
});

function autoClicker(timestamp: number) {
  if (lastTime === null) {
    lastTime = timestamp;
  }
  
  const deltaTime = (timestamp - lastTime) / 1000; // increases based on real time
  lastTime = timestamp;
  
  counter += deltaTime;
  counterElement.textContent = counter.toFixed(2);
  
  requestAnimationFrame(autoClicker);
}

requestAnimationFrame(autoClicker); //starts animation loop