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

function createSymbol(index: number, size: number = 75) {
    const options = {
        texture: Loader.shared.resources[`symbol-${index}`].texture,
        size: size,
        position: {
            x: 0,
            y: index * size,
        },
    };

    return new Symbol(options);
}

function createReelWithSymbols() {

    const reel = new Reel({
        symbolsCount: 3,
        moveCount: 2,
        animationSpeed: 0.5,
    });

    reel.addSymbols(createSymbol);
    reel.position.set(app.view.width / 2, 100);

    return reel;
}

function init() {
    const reel = createReelWithSymbols();
    const symbols = reel.children as Array<Symbol>;
    const button = createButton();

    async function animateSymbols() {
        await Promise.all(symbols.map(async (symbol) => {

            await symbol.startBounce({
                duration: reel.animationSpeed,
                y: `-=${symbol.size}`,
                repeat: 2,
                yoyo: true,
            });

           await reel.moveSlots(async() => {
                await symbol.moveOneSlot({
                    duration: reel.animationSpeed,
                    y: `-=${symbol.size}`,
                });
            });

            await symbol.endBounce({
                duration: reel.animationSpeed,
                y: symbol.startPosition.y,
                ease: "bounce",
            });
        }));
    }

    async function onButtonClick() {
        this.disable();
        await animateSymbols();
        await this.enable();
    }

    button.setCallback(onButtonClick);

    app.stage.addChild(button, reel);
}



