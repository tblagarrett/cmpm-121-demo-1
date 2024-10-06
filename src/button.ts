export class ChairButton {
  private button: HTMLButtonElement;
  private counter: number;

  constructor(containerId: string, buttonId: string, buttonText: string) {
    this.counter = 0;

    // Create the button element
    this.button = document.createElement("button");
    this.button.id = buttonId;
    this.button.innerText = buttonText;

    // Add click event listener
    this.button.addEventListener("click", () => this.incrementCounter());

    // Insert the button into the DOM
    const container = document.getElementById(containerId);
    if (container) {
      container.appendChild(this.button);
    } else {
      console.error(`Container with ID ${containerId} not found`);
    }
  }

  private incrementCounter() {
    this.counter++;
    this.button.innerText = this.counter.toString();
  }
}
