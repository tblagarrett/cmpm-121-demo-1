import "./style.css";
import { ChairButton } from "./button.ts";
import { PurchaseButtonManager } from "./button.ts";
import { PurchaseButton } from "./button.ts";
import { Counter } from "./counter.ts";

const app: HTMLDivElement = document.querySelector("#app")!;

// Game overview
const gameName = "Chair Stack";
document.title = gameName;

// Add elements
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const chairButtonContainer = document.createElement("div");
chairButtonContainer.id = "ChairButtonContainer";
app.append(chairButtonContainer);

// Initialize Counter
const counter = new Counter();
const IncrementRateText = addIncrementRateText();

// Set up Buttons
const chairButton = new ChairButton(
  "ChairButtonContainer",
  "ChairButton",
  "0",
  counter,
);
counter.chairButton = chairButton;

const purchaseButtonManager = new PurchaseButtonManager(
  counter,
  "PurchaseButtonContainer",
);

const enthusiasticHelper: PurchaseButton = purchaseButtonManager.createButton(
  "Enthusiastic Helper",
  10, // cost
  1, // cost scaling
  1, // increment amount
);

requestAnimationFrame(handleFrames);

function handleFrames() {
  counter.periodicIncrement();
  handlePurchaseButtons();
  updateIncrementRateText(IncrementRateText);

  // loop
  requestAnimationFrame(handleFrames);

  function handlePurchaseButtons() {
    // Enthusiastic Helper
    if (counter.count < enthusiasticHelper.cost) {
      enthusiasticHelper.button.disabled = true;
    } else {
      enthusiasticHelper.button.disabled = false;
    }
  }
}

function addIncrementRateText(): HTMLDivElement {
  const textElem = document.createElement("div");
  textElem.id = "topRightText";
  updateIncrementRateText(textElem);

  // Add styling
  textElem.style.position = "fixed";
  textElem.style.top = "0";
  textElem.style.right = "0";
  textElem.style.padding = "10px";
  textElem.style.backgroundColor = "#333";
  textElem.style.color = "white";
  textElem.style.fontSize = "1.2em";
  textElem.style.zIndex = "1000";

  // Append to the body
  document.body.appendChild(textElem);
  return textElem;
}

function updateIncrementRateText(incrementRateText: HTMLDivElement) {
  incrementRateText.innerText =
    "rate: " + counter.incrementAmount.toFixed(1).toString() + "/sec";
}
