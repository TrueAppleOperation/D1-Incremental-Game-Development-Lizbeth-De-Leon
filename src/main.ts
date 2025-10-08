import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
  <button id="increment">🌟</button>
`;

const button = document.getElementById("increment")!;

button.addEventListener("click", () => {
  console.log("Star button was clicked!");
});