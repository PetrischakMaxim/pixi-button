import {Application, Container, Loader,Graphics} from "pixi.js";
import Button from "./button";
import Symbol from "./symbol";

const app = new Application({backgroundColor: 0x1099bb});

document.body.appendChild(app.view);

Loader.shared
    .add("up", "./images/button.png")
    .add("down", "./images/button-active.png")
    .add("hover", "./images/button-hover.png")
    .add("disabled", "./images/button-disabled.png")
    .add("symbol-1", "./images/symbol-1.png")
    .add("symbol-2", "./images/symbol-2.png")
    .add("symbol-3", "./images/symbol-3.png")
    .load(initScene);

function createButton() {
    const {up, down, hover, disabled} = Loader.shared.resources;

    const textures = {
        default: up.texture,
        down: down.texture,
        hover: hover.texture,
        disabled: disabled.texture,
    };

    const button = new Button({textures});
    button.x = app.view.width / 2 - button.width / 2;
    button.y = app.view.height - button.height;

    return button;
}

function createReel(count = 3) {
    const reelSize = 100;
    const reelContainer = new Container();

    reelContainer.width = reelContainer.height = reelSize;
    reelContainer.x = app.view.width / 2 ;
    reelContainer.y = 50;

    for (let i = 1; i <= count; i++) {
        const offset = i - 1;
        const symbol = new Symbol(Loader.shared.resources[`symbol-${i}`].texture);
        symbol.anchor.set(0.5);
        symbol.width = symbol.height = reelSize;
        symbol.y = offset * 5 + symbol.height * offset;
        reelContainer.addChild(symbol);
    }
    return reelContainer;
}

function initScene() {
    const button = createButton();
    const reelContainer = createReel();

    app.stage.addChild(button, reelContainer);
}


