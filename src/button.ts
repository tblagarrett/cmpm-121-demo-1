import { Counter } from "./counter";

export class ChairButton {
  public button: HTMLButtonElement;
  public counter: Counter;

  constructor(
    containerId: string,
    buttonId: string,
    buttonText: string,
    counter: Counter,
  ) {
    this.counter = counter;

    // Create the button element
    this.button = document.createElement("button");
    this.button.id = buttonId;
    this.button.innerText = buttonText;

    // Add click event listener
    this.button.addEventListener("click", () => counter.incrementCounter(1));

    // Insert the button into the DOM
    const container = document.getElementById(containerId);
    if (container) {
      container.appendChild(this.button);
    } else {
      console.error(`Container with ID ${containerId} not found`);
    }
  }

  public updateButtonText() {
    this.button.innerText = Math.floor(this.counter.count).toString();
  }
}

export class PurchaseButtonManager {
  private container: HTMLElement;
  private buttonCount: number;
  private counter: Counter;

  constructor(counter: Counter, containerId: string) {
    this.counter = counter;
    this.container =
      document.getElementById(containerId) || this.createContainer(containerId);
    this.buttonCount = 0;
    this.setupContainerStyles();
  }

  createButton(
    name: string,
    cost: number,
    costScaling: number,
    incrementIncrease: number,
  ): PurchaseButton {
    const button = new PurchaseButton(
      this.counter,
      name,
      cost,
      costScaling,
      incrementIncrease,
      this.container,
    );
    this.buttonCount++;
    return button;
  }

  private createContainer(containerId: string): HTMLElement {
    const newContainer = document.createElement("div");
    newContainer.id = containerId;
    document.body.appendChild(newContainer);
    return newContainer;
  }

  private setupContainerStyles() {
    this.container.style.display = "flex";
    this.container.style.flexDirection = "column";
    this.container.style.position = "fixed";
    this.container.style.top = "0px";
    this.container.style.left = "0px";
    this.container.style.zIndex = "1000";
  }
}

export class PurchaseButton {
  private counter: Counter;
  public name: string;
  public button: HTMLButtonElement;
  public cost: number;
  private costScaling: number;
  private incrementIncrease: number;

  constructor(
    counter: Counter,
    name: string,
    cost: number,
    costScaling: number,
    incrementIncrease: number,
    container: HTMLElement,
  ) {
    this.counter = counter;
    this.name = name;
    this.cost = cost;
    this.costScaling = costScaling;
    this.incrementIncrease = incrementIncrease;

    this.button = document.createElement("button");
    this.button.innerText = name;
    this.button.id = name;
    this.button.classList.add("purchasebutton");

    // Add button styles
    this.button.style.padding = "10px 20px";
    this.button.style.margin = "10px";

    // Append button to the container
    container.appendChild(this.button);

    this.button.addEventListener("click", () => this.makePurchase());
  }

  private makePurchase() {
    this.counter.incrementCounter(-this.cost);
    this.counter.addToIncrementAmount(this.incrementIncrease);
    this.cost *= this.costScaling;
    this.counter.updateText();
  }
}
