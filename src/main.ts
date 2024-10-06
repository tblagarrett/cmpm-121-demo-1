import "./style.css";
import { ChairButton } from "./button.ts";
import { PurchaseButtonManager } from "./button.ts";
import { PurchaseButton } from "./button.ts";

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

// Set up Buttons
const chairButton = new ChairButton("ChairButtonContainer", "ChairButton", "0");

const purchaseButtonManager = new PurchaseButtonManager(
  "PurchaseButtonContainer",
);

const enthusiasticHelper: PurchaseButton = purchaseButtonManager.createButton(
  "Enthusiastic Helper",
);

requestAnimationFrame(handleFrames);

function handleFrames() {
  chairButton.periodicIncrement();
  handlePurchaseButtons();
  requestAnimationFrame(handleFrames);

  function handlePurchaseButtons() {
    // Enthusiastic Helper
    if (chairButton.counter < 10) {
      enthusiasticHelper.button.disabled = true;
    } else {
      enthusiasticHelper.button.disabled = false;
    }
  }
}
