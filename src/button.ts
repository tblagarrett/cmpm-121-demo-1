export class ChairButton {
  private button: HTMLButtonElement;
  private counter: number;
  public incrementAmount: number;
  private previousFrameTime: number;

  constructor(containerId: string, buttonId: string, buttonText: string) {
    this.counter = 0;
    this.incrementAmount = 0;
    this.previousFrameTime = Date.now();

    // Create the button element
    this.button = document.createElement("button");
    this.button.id = buttonId;
    this.button.innerText = buttonText;

    // Add click event listener
    this.button.addEventListener("click", () => this.incrementCounter(1));

    // Insert the button into the DOM
    const container = document.getElementById(containerId);
    if (container) {
      container.appendChild(this.button);
    } else {
      console.error(`Container with ID ${containerId} not found`);
    }
  }

  private updateButtonText() {
    this.button.innerText = Math.floor(this.counter).toString();
  }

  private incrementCounter(amount: number) {
    this.counter += amount;
    this.updateButtonText();
  }

  public addToIncrementAmount(addition: number) {
    this.incrementAmount += addition;
  }

  public periodicIncrement() {
    const now = Date.now();
    const elapsedMilliseconds = now - this.previousFrameTime;
    const incrementFraction = elapsedMilliseconds / 1000;

    this.counter += this.incrementAmount * incrementFraction;
    this.previousFrameTime = now;

    this.updateButtonText();
    requestAnimationFrame(() => this.periodicIncrement());
  }
}

export class PurchaseButtonManager {
  private container: HTMLElement;
  private buttonCount: number;

  constructor(containerId: string) {
    this.container =
      document.getElementById(containerId) || this.createContainer(containerId);
    this.buttonCount = 0;
    this.setupContainerStyles();
  }

  createButton(name: string) {
    const button = document.createElement("button");
    button.innerText = name;
    button.id = `button${this.buttonCount}`;

    // Add button styles
    button.style.padding = "10px 20px";
    button.style.margin = "10px";

    // Append button to the container
    this.container.appendChild(button);
    this.buttonCount++;
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
