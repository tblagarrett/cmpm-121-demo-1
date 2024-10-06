export class ChairButton {
  private button: HTMLButtonElement;
  private counter: number;
  public incrementAmount: number;

  constructor(containerId: string, buttonId: string, buttonText: string) {
    this.counter = 0;
    this.incrementAmount = 1;

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
    this.button.innerText = this.counter.toString();
  }

  private incrementCounter(amount: number) {
    this.counter += amount;
    this.updateButtonText();
  }

  public addToIncrementAmount(addition: number) {
    this.incrementAmount += addition;
  }

  public periodicIncrement() {
    this.counter += this.incrementAmount;
    this.updateButtonText();
  }
}
