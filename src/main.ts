import "./style.css";
import { ChairButton } from "./button.ts";
import { PurchaseButtonManager } from "./button.ts";

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
const button = new ChairButton("ChairButtonContainer", "ChairButton", "0");

const purchaseButtonManager = new PurchaseButtonManager(
  "PurchaseButtonContainer"
);
purchaseButtonManager.createButton("Elementary School Boys");

requestAnimationFrame(() => button.periodicIncrement());
