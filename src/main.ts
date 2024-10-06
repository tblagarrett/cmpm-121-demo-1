import "./style.css";
import { ChairButton } from "./button.ts";
import { PurchaseButtonManager } from "./button.ts";
import { PurchaseButton } from "./button.ts";
import { Counter } from "./counter.ts";
import { ChairManager } from "./chairs.ts";

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
  counter
);
counter.chairButton = chairButton;

const purchaseButtonManager = new PurchaseButtonManager(
  counter,
  "PurchaseButtonContainer"
);

const costScaling: number = 1.15;
const enthusiasticHelper: PurchaseButton = purchaseButtonManager.createButton(
  "Enthusiastic Helper",
  10, // cost
  costScaling, // cost scaling
  0.1 // increment amount
);

const chairStackingMachine: PurchaseButton = purchaseButtonManager.createButton(
  "Chair Stacking Machine",
  100, // cost
  costScaling, // cost scaling
  2 // increment amount
);

const stackingFactory: PurchaseButton = purchaseButtonManager.createButton(
  "Stacking Factory",
  1000, // cost
  costScaling, // cost scaling
  50 // increment amount
);

// Set up chair images
const chairManager: ChairManager = new ChairManager("./assets/chair.png");
chairManager.addChairToPage();
let countForNextChair = 5;
const chairRequirementScaleFactor = 1.5;

requestAnimationFrame(handleFrames);

function handleFrames() {
  counter.periodicIncrement();
  handlePurchaseButtons();
  handleChairImages();
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

    // Chair Stacking Machine
    if (counter.count < chairStackingMachine.cost) {
      chairStackingMachine.button.disabled = true;
    } else {
      chairStackingMachine.button.disabled = false;
    }

    // Stacking Factory
    if (counter.count < stackingFactory.cost) {
      stackingFactory.button.disabled = true;
    } else {
      stackingFactory.button.disabled = false;
    }
  }

  function handleChairImages() {
    if (counter.totalCount > countForNextChair) {
      chairManager.addChairToPage();
      countForNextChair *= chairRequirementScaleFactor;
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
