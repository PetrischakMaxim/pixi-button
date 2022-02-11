import {Application, Loader} from "pixi.js";
import {getRandomInt} from "./utils";
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

function init() {

    const reel = new Reel({
        count: 3,
        speed: 3,
        countToMove: 1
    });

    const symbolSize = 100;
    const startY = symbolSize * 3;

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

    for (let i = 0; i < 3;i++) {
        const symbol = new Symbol(
            Loader.shared.resources[`symbol-${getRandomInt(1, 3)}`].texture,
            symbolSize,
        );
        symbol.position.set(app.view.width / 2,symbolSize * i + 10);
        symbol.setupAnimation(animationOptions);
        reel.addChild(symbol);
    }

    const symbol = reel.symbols[0];
    const button = createButton();

    button.setCallback(onButtonClick);
    async function onButtonClick() {
        this.disable()
        await symbol.startBounce()
        await symbol.moveOneSlot()
        await symbol.moveOneSlot()
        await symbol.endBounce()
        await this.enable()
    }

    app.stage.addChild(button, reel);
}


