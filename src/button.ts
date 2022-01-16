import {Sprite, Text} from "pixi.js";

interface Options {
    label?: {
        text: string,
        style: object
    };
    textures?: { [index: string]: any };

}

export default class Button extends Sprite {
    private _options: Options;
    private _label: Text;
    private _isPressed: boolean;
    private _isHover: boolean;
    private _isEnabled: boolean;

    buttonMode: boolean;
    interactive: boolean;

    constructor(options: object) {
        super();
        this._options = options;
        this._init();
    }

    private _init() {
        this.buttonMode = true;
        this._isPressed = false;
        this._isHover = false;
        this._switchEnabledState(true);
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
        this._updateTexture("default");
    }

    private _onDown() {
        this._isPressed = true;
        this._updateTexture("down");
    }

    private _onUp() {
        this._isPressed = false;
        this._updateTexture(this._isHover ? "hover" : "default");
    }

    private _switchEnabledState(isEnabled: boolean): void {
        this._updateTexture(isEnabled ? "default" : "disabled");
        this._isEnabled = isEnabled;
        this.interactive = isEnabled;
    }

    private _updateTexture(sourceName: string): void {
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
        this._switchEnabledState(false);
    }

    public enable() {
        this._switchEnabledState(true);
    }
}