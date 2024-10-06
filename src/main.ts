import "./style.css";
import { ChairButton } from "./button.ts";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Chair Stack";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const chairButtonContainer = document.createElement("div");
chairButtonContainer.id = "ChairButtonContainer";
app.append(chairButtonContainer);

const button = new ChairButton("ChairButtonContainer", "ChairButton", "0");

setInterval(() => button.periodicIncrement(), 1000);
