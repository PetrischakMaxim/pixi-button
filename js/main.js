import Button from "./button.js";

const { Application, Loader } = PIXI;
const app = new Application({ backgroundColor: 0x1099bb });

document.body.appendChild(app.view);

Loader.shared
    .add("up", "./images/button.png")
    .add("down", "./images/button-active.png")
    .add("hover", "./images/button-hover.png")
    .add("disabled", "./images/button-disabled.png")
    .load(createButtons);

function createButtons() {
    const { up, down, hover, disabled } = Loader.shared.resources;

    const textures = {
        default: up.texture,
        down: down.texture,
        hover: hover.texture,
        disabled: disabled.texture,
    };

    const label = {
        text: "Label text",
        style: {
            fill: "green",
            fontSize: "26px",
            fontFamily: "Arial, sans-serif",
        },
    };

    const button = new Button({
        textures,
        label,
    });

    app.stage.addChild(button);

    const button2 = new Button({textures});
    button2.x = 250;
    button2.y = 250;
    button2.setCallback(button2.disable);

    app.stage.addChild(button2);
}
