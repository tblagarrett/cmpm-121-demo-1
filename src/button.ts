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
