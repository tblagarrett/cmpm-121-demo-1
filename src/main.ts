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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const button = 
new ChairButton("ChairButtonContainer", "ChairButton", "0");
