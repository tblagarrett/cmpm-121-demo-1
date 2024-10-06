export class ChairManager {
  private path: string;
  public container: HTMLElement;
  private currentYOffset: number;

  constructor(imagePath: string) {
    this.path = imagePath;
    this.container = this.createChairImageContainer();
    this.currentYOffset = 0;
    document.body.appendChild(this.container);
  }

  addChairToPage() {
    const img = document.createElement("img");
    img.src = this.path;
    img.alt = "Chair Image";

    img.style.position = "absolute";
    img.style.bottom = `${this.currentYOffset}px`;
    img.style.zIndex = this.currentYOffset.toString();
    img.style.transform = "translate(0, 70%)";

    this.currentYOffset += 10;

    this.container.insertBefore(img, this.container.firstChild);
  }

  createChairImageContainer() {
    const chairImageContainer = document.createElement("div");
    chairImageContainer.id = "chairImageContainer";
    chairImageContainer.style.position = "fixed";
    chairImageContainer.style.bottom = "50%";
    chairImageContainer.style.left = "50%"; // Center horizontally
    chairImageContainer.style.transform = "translate(-50%, 40%)"; // Offset to position below center
    chairImageContainer.style.zIndex = "1000"; // Ensure the image is on top of other elements

    chairImageContainer.style.display = "flex";
    chairImageContainer.style.flexDirection = "column-reverse";
    chairImageContainer.style.alignItems = "center";
    return chairImageContainer;
  }
}
