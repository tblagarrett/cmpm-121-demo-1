import "./style.css";
import { ChairButton } from "./button.ts";
import { PurchaseButtonManager } from "./button.ts";
import { Counter } from "./counter.ts";
import { ChairManager } from "./chairs.ts";
import imgUrl from "../images/chair.png";

interface Item {
  name: string;
  description: string;
  cost: number;
  rate: number;
}

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
const incrementRateText = addIncrementRateText();

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

const costScaling: number = 1.15;
const availableItems: Item[] = [
  {
    name: "Enthusiastic Helper",
    description: "A student really wants to show off his strength.",
    cost: 10,
    rate: 0.1,
  },
  {
    name: "Chair Stacking Machine",
    description: "A machine can stack chairs higher than a human ever could",
    cost: 100,
    rate: 2,
  },
  {
    name: "Stacking Factory",
    description:
      "With these factories, we will stack beyond our wildest dreams",
    cost: 1000,
    rate: 50,
  },
  {
    name: "Country-Wide Stacking Program",
    description: "Recruit all of our brightest minds to reach the stars",
    cost: 10000,
    rate: 275,
  },
  {
    name: "Chair-Stacking God",
    description:
      "Our newest recruit will allow us to stack beyond the bounds of our Universe",
    cost: 100000,
    rate: 3000,
  },
  {
    name: "Man-Made Chair Stacking Horrors",
    description:
      "We have stacked too high and learned the unknowable secrets of chair stacking",
    cost: 1000000,
    rate: 50000,
  },
];

for (const item of availableItems) {
  purchaseButtonManager.createButton(
    item.name,
    item.description,
    item.cost,
    costScaling,
    item.rate,
  );
}

// Set up chair images
const chairManager: ChairManager = new ChairManager(imgUrl);
chairManager.addChairToPage();
let countForNextChair = 5;
const chairRequirementScaleFactor = 1.5;

requestAnimationFrame(handleFrames);

function handleFrames() {
  counter.periodicIncrement();
  handlePurchaseButtons();
  handleChairImages();
  updateIncrementRateText(incrementRateText);

  // loop
  requestAnimationFrame(handleFrames);

  function handlePurchaseButtons() {
    for (const purchaseButton of purchaseButtonManager.purchaseButtons) {
      if (counter.count < purchaseButton.cost) {
        purchaseButton.button.disabled = true;
      } else {
        purchaseButton.button.disabled = false;
      }
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
    "chairs per second: " + counter.incrementAmount.toFixed(1).toString();
}
