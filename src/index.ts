import {Application, Loader} from "pixi.js";
import Button from "./button";
import Symbol from "./symbol";
import Reel from "./reel";

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
    button.anchor.set(0.5);
    button.x = app.view.width / 2;
    button.y = app.view.height - button.height - 50;

    return button;
}

function createSymbol(index: number, size: number = 100) {
    const options = {
        texture: Loader.shared.resources[`symbol-${index}`].texture,
        size: size,
        position: {
            x: 0,
            y: index * size,
        },
        animationDuration: 0.5,
    };

    return new Symbol(options);
}

function createReelWithSymbols() {

    const reel = new Reel({
        count: 3,
        speed: 3,
        countToMove: 1
    });

    for (let i = 1; i <= reel.count; i++) {
        const symbol = createSymbol(i);
        reel.addChild(symbol);
    }

    reel.position.set(app.view.width / 2, 0);

    return reel;
}

function init() {

    const reelElement = createReelWithSymbols();
    const reelSymbols = reelElement.children as Array<Symbol>;

    const buttonElement = createButton();

    buttonElement.setCallback(onButtonClick);

    async function onButtonClick() {
        this.disable();

        await Promise.all(reelSymbols.map(async (symbol) => {
            await symbol.startBounce()
            await symbol.moveOneSlot()
            await symbol.moveOneSlot()
            await symbol.endBounce()
        }));

        await this.enable();
    }

    app.stage.addChild(buttonElement, reelElement);
}



