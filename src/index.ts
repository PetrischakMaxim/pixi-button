import {Application, Loader} from "pixi.js";
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
    button.anchor.set(0.5);
    button.x = app.view.width / 2;
    button.y = app.view.height - button.height - 50;

    return button;
}

function createSymbol() {
    const symbolSize = 100;
    const startY= symbolSize * 3;

    const animationOptions = {
        start: {
            duration: 1,
            y: `-=${symbolSize}`,
            repeat: 1,
            yoyo: true,
        },
        move: {
            duration: 1,
            y: `-=${symbolSize}`,
        },
        end: {
            duration: 1,
            y: startY,
            ease: "bounce",
        }
    };

    const options = {
        texture: Loader.shared.resources[`symbol-${getRandomInt(1, 3)}`].texture,
        x: app.view.width / 2,
        y: startY,
        size: symbolSize,
        animation: animationOptions
    }

    return new Symbol(options);
}

function init() {
    const button = createButton();
    const symbol = createSymbol();

    button.setCallback(onButtonClick);

    app.stage.addChild(button, symbol);

    async function onButtonClick() {
        this.disable()
        await symbol.startBounce()
        await symbol.moveOneSlot()
        await symbol.moveOneSlot()
        await symbol.endBounce()
        await this.enable()
    }
}


