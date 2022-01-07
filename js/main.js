import Button from "./button.js";

const {Application, Loader} = PIXI;
const app = new Application({backgroundColor: 0x1099bb});

document.body.appendChild(app.view);

Loader.shared
    .add("default", "./images/button.png")
    .add("pressed", "./images/button-active.png")
    .add("over", "./images/button-hover.png")
    .load(setup);

function setup() {
    createDefaultButton();
    createDefaultButton2();
    createButtonWithTexture();
}

function createButtonWithTexture() {
    const {resources} = Loader.shared;

    const defaultTexture = resources.default.texture;
    const pressedTexture = resources.pressed.texture;
    const overTexture = resources.over.texture;

    const button = new Button({
        x: 20,
        y: 20,
        width: 226,
        height: 96,
        texture: defaultTexture,
    });

    button
        .addAction('pointerdown', onButtonDown)
        .addAction('pointerup', onButtonUp)
        .addAction('pointerover', onButtonOver)
        .addAction('pointerout', onButtonOut);

    function onButtonDown() {
        this.updateTexture(pressedTexture);
    }
    function onButtonUp() {
        this.updateTexture(defaultTexture);
    }

    function onButtonOver() {
        this.updateTexture(overTexture);
    }

    function onButtonOut() {
        this.updateTexture(defaultTexture);
    }

    app.stage.addChild(button);
}

function createDefaultButton() {

    const button = new Button({
        x: 200,
        y: 200,
        label: 'Button 1',
    });

    button.addAction('pointerdown', onButtonDown);

    function onButtonDown() {
       this.setDisabled();
       this.updateLabel('Disabled button');
    }

    app.stage.addChild(button);
}

function createDefaultButton2() {

    const button = new Button({
        width: 200,
        height: 60,
        x: 150,
        y: 150,
        fill: 0x33FF98,
        label: 'Button 2',
        labelStyle: {
            fontSize: '20px',
            fill: 'green',
            fontFamily: 'Ubuntu, monospace'
        }
    });

    button
        .addAction('pointerover', onButtonOver)
        .addAction('pointerout', onButtonOut);

    function onButtonOver() {
        this.alpha = 0.5;
        this.fill = 0x33FF60;
        this.label.style.fill = "#fff";
    }

    function onButtonOut() {
        this.alpha = 1;
        this.fill = this.options.fill;
        this.label.style.fill = this.options.labelStyle.fill;
    }

    app.stage.addChild(button);
}


