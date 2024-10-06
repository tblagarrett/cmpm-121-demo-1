import { ChairButton } from "./button";

export class Counter {
  public count;
  public totalCount;
  public incrementAmount: number;
  private previousFrameTime: number;
  private _chairButton: ChairButton | null = null;

  constructor() {
    this.count = 0;
    this.totalCount = 0;
    this.incrementAmount = 0;
    this.previousFrameTime = Date.now();
  }

  public set chairButton(value: ChairButton) {
    if (!value) {
      throw new Error("Chair Button cannot be empty");
    }

    this._chairButton = value;
  }

  public incrementCounter(amount: number) {
    this.count += amount;
    this.totalCount += amount;

    this.updateText();
  }

  public addToIncrementAmount(addition: number) {
    this.incrementAmount += addition;
  }

  public periodicIncrement() {
    const now = Date.now();
    const elapsedMilliseconds = now - this.previousFrameTime;
    const incrementFraction = elapsedMilliseconds / 1000;

    this.incrementCounter(this.incrementAmount * incrementFraction);
    this.previousFrameTime = now;
  }

  public updateText() {
    if (this._chairButton != null) {
      this._chairButton.updateButtonText();
    }
  }
}
