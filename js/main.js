import Button from "./button.js";

const {Application, Loader} = PIXI;
const app = new Application({backgroundColor: 0x1099bb});

document.body.appendChild(app.view);

Loader.shared
    .add("up", "./images/button.png")
    .add("down", "./images/button-active.png")
    .add("hover", "./images/button-hover.png")
    .add("disabled", "./images/button-disabled.png")
    .load(setup);

function setup() {
    createButton();
}

function createButton() {
    const {up, down, hover, disabled} = Loader.shared.resources;

    const textures = {
        up: up.texture,
        down: down.texture,
        hover: hover.texture,
        disabled: disabled.texture
    };
    const label = {
        text: 'Default button',
        style: {
            fill: '#ffffff',
            fontSize: '16px',
            fontFamily: 'Arial, sans-serif',
        },
    };

    const button = new Button({
        textures,
        label
    });

    console.log(button)

    app.stage.addChild(button);
    //button.disable();

    // const button = new Button({
    //     x: 20,
    //     y: 20,
    //     width: 226,
    //     height: 96,
    //     texture: defaultTexture,
    // });
    //
    // button
    //     .addAction('pointerdown', onButtonDown)
    //     .addAction('pointerup', onButtonUp)
    //     .addAction('pointerover', onButtonOver)
    //     .addAction('pointerout', onButtonOut);
    //
    // function onButtonDown() {
    //     this.updateTexture(pressedTexture);
    // }
    // function onButtonUp() {
    //     this.updateTexture(defaultTexture);
    // }
    //
    // function onButtonOver() {
    //     this.updateTexture(overTexture);
    // }
    //
    // function onButtonOut() {
    //     this.updateTexture(defaultTexture);
    // }
    //

}



