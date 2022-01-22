import {Application, Container, Loader, Graphics, Sprite} from "pixi.js";
import {getRandomInt} from "./utils";
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
    .load(init);

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

function createReel(count = 1) {
    const SYMBOL_SIZE = 100;

    const reelContainer = new Container();

    for (let j = 0; j < count; j++) {
        const symbol = new Symbol(Loader.shared.resources[`symbol-${getRandomInt(1, 3)}`].texture);
        symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
        symbol.y = SYMBOL_SIZE * 3;
        reelContainer.addChild(symbol);
    }

    reelContainer.x = app.view.width / 2 - reelContainer.width / 2;
    reelContainer.y = 0;

    return reelContainer;
}

function init() {
    const button = createButton();
    const reelContainer = createReel();
    const symbol = reelContainer.children[0];

    button.setCallback(onButtonClick);

    function onButtonClick() {
        this.disable()
        symbol.startBounce()
            .then(() => symbol.moveOneSlot())
            .then(() => symbol.moveOneSlot())
            .then(() => symbol.endBounce())
            .then(() => symbol.setSymbol(Loader.shared.resources[`symbol-${getRandomInt(1, 3)}`].texture))
            .then(() => this.enable())
    }

    app.stage.addChild(button, reelContainer);
}


