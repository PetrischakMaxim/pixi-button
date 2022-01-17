import {ITextStyle, Sprite, Text, Texture} from "pixi.js";

interface Options {
    label?: {
        text?: string,
        style?: Partial<ITextStyle>
    };
    textures?: { [key: string]: Texture };
}

export default class Button extends Sprite {
    private _options: Options;
    private _label: Text;
    private _isPressed: boolean;
    private _isHover: boolean;

    buttonMode: boolean;
    interactive: boolean;

    constructor(options: Options) {
        super();
        this._options = options;
        this._init();
    }

    private _init() {
        this.buttonMode = true;
        this.interactive = true;
        this._isPressed = false;
        this._isHover = false;
        this._updateTexture();
        this._setEvents();
        if (this._options.label) {
            this._addLabel();
        }
    }

    private _setEvents() {
        this.on("pointerover", this._onHover);
        this.on("pointerout", this._onOut);
        this.on("pointerdown", this._onDown);
        this.on("pointerup", this._onUp);
        this.on("pointerupoutside", this._onUp);
    }

    private _onHover() {
        this._isHover = true;
        if (this._isPressed) {
            return;
        }
        this._updateTexture("hover");
    }

    private _onOut() {
        this._isHover = false;
        if (this._isPressed) {
            return;
        }
        this._updateTexture();
    }

    private _onDown() {
        this._isPressed = true;
        this._updateTexture("down");
    }

    private _onUp() {
        this._isPressed = false;
        this._updateTexture(this._isHover ? "hover" : "default");
    }

    private _updateTexture(sourceName: string = "default"): void {
        if (this._options.textures[sourceName]) {
            this.texture = this._options.textures[sourceName];
        }
    }

    private _addLabel() {
        this._label = new Text(this._options.label.text, this._options.label.style);
        this._label.anchor.set(0.5);
        this._label.x = this.width / 2;
        this._label.y = this.height / 2;
        this.addChild(this._label);
    }

    public setCallback(callback: () => void) {
        this.on("pointertap", callback);
    }

    public disable() {
        this.interactive = false;
        this._updateTexture("disabled");
    }

    public enable() {
        this.interactive = true;
        this._updateTexture();
    }
}