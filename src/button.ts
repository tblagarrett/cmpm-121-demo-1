import { Counter } from "./counter";

export class ChairButton {
  public button: HTMLButtonElement;
  public counter: Counter;

  constructor(
    containerId: string,
    buttonId: string,
    buttonText: string,
    counter: Counter
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
  public purchaseButtons: PurchaseButton[];

  constructor(counter: Counter, containerId: string) {
    this.counter = counter;
    this.container =
      document.getElementById(containerId) || this.createContainer(containerId);
    this.buttonCount = 0;
    this.setupContainerStyles();
    this.purchaseButtons = [];
  }

  createButton(
    name: string,
    description: string,
    cost: number,
    costScaling: number,
    incrementIncrease: number
  ): PurchaseButton {
    const button = new PurchaseButton(
      this.counter,
      name,
      description,
      cost,
      costScaling,
      incrementIncrease,
      this.container
    );
    this.buttonCount++;
    this.purchaseButtons.push(button);
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
  public description: string;
  public button: HTMLButtonElement;
  public cost: number;
  private costScaling: number;
  private incrementIncrease: number;
  private costButton: HTMLButtonElement;
  private purchaseCount: number;

  constructor(
    counter: Counter,
    name: string,
    description: string,
    cost: number,
    costScaling: number,
    incrementIncrease: number,
    container: HTMLElement
  ) {
    this.counter = counter;
    this.name = name;
    this.description = description;
    this.cost = cost;
    this.costScaling = costScaling;
    this.incrementIncrease = incrementIncrease;
    this.purchaseCount = 0;

    this.button = this.createPurchaseButton();
    this.costButton = this.createCostDisplay();

    // Wrap buttons and description
    const descriptionWrapper = document.createElement("div");

    // Wrap both buttons in a div
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex"; // Use flex to align buttons horizontally
    wrapper.appendChild(this.button);
    wrapper.appendChild(this.costButton);

    descriptionWrapper.appendChild(wrapper);
    descriptionWrapper.appendChild(this.createDescriptionElement());

    // Append button to the container
    container.appendChild(descriptionWrapper);

    this.button.addEventListener("click", () => this.makePurchase());
  }

  private makePurchase() {
    this.counter.incrementCounter(-this.cost);
    this.counter.addToIncrementAmount(this.incrementIncrease);
    this.cost *= this.costScaling;
    this.purchaseCount++;
    this.counter.updateText();
    this.updateText();
  }

  private updateText() {
    this.button.innerText = `${this.name}: ${this.purchaseCount}`;

    if (this.cost % 1 <= 0.001) {
      this.costButton.innerText = `Cost: ${this.cost.toString()}`;
    } else {
      this.costButton.innerText = `Cost: ${this.cost.toFixed(1)}`;
    }
  }

  private createPurchaseButton(): HTMLButtonElement {
    const button = document.createElement("button");
    button.innerText = `${this.name}: ${this.purchaseCount}`;
    button.id = this.name;
    button.classList.add("purchasebutton");

    // Add button styles
    button.style.margin = "10px";
    button.style.marginBottom = "5px";
    button.style.textShadow = "0px 0.5px 0 black";

    return button;
  }

  private createCostDisplay(): HTMLButtonElement {
    const costButton = document.createElement("button");
    costButton.innerText = `Cost: ${this.cost}`;
    costButton.disabled = true; // Disabled button for cost
    costButton.classList.add("costbutton");
    costButton.style.backgroundColor = "gray"; // Different color for cost
    costButton.style.cursor = "default";
    costButton.style.border = "1px solid transparent";
    costButton.style.borderRadius = "8px";
    costButton.style.color = "white";
    costButton.style.marginTop = "10px";
    costButton.style.marginBottom = "5px";
    return costButton;
  }

  private createDescriptionElement(): HTMLButtonElement {
    const descriptionButton = document.createElement("button");
    descriptionButton.innerText = this.description;
    descriptionButton.disabled = true; // Disabled button for cost
    descriptionButton.classList.add("descriptionButton");
    descriptionButton.style.backgroundColor = "#f9f9f9"; // Different color for cost
    descriptionButton.style.cursor = "default";
    descriptionButton.style.border = "1px solid transparent";
    descriptionButton.style.borderRadius = "8px";
    descriptionButton.style.color = "gray";
    descriptionButton.style.marginTop = "0px";
    descriptionButton.style.marginBottom = "15px";
    descriptionButton.style.marginLeft = "10px";
    return descriptionButton;
  }
}
