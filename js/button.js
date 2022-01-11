export default class Button extends PIXI.Sprite {
    constructor(options = {}) {
        super();
        this._options = options;
        this._init();
    }

    _init() {
        this.buttonMode = true;
        this._isActive = false;
        this._isHover = false;
        this._switchEnabledState(true);
        this._setEvents();
        if (this._options.label) {
            this._addLabel();
        }
    }

    _setEvents() {
        this.on("pointerover", this._onHover)
            .on("pointerout", this._onOut)
            .on("pointerdown", this._onDown)
            .on("pointerup", this._onUp)
            .on("pointerupoutside", this._onUp);
    }

    _onHover() {
        this._isHover = true;
        if (this._isActive) {
            return;
        }
        this._updateTexture("hover");
    }

    _onOut() {
        this._isHover = false;
        if (this._isActive) {
            return;
        }
        this._updateTexture("default");
    }

    _onDown() {
        this._isActive = true;
        this._updateTexture("down");
    }

    _onUp() {
        this._isActive = false;
        if (this._isHover) {
            this._updateTexture("hover");
            return;
        }
        this._updateTexture("default");
    }

    _switchEnabledState(isEnabled) {
        if (!isEnabled) {
            this._updateTexture("disabled");
        } else {
            this._updateTexture("default");
        }
        this._isEnabled = isEnabled;
        this.interactive = isEnabled;
    }

    _updateTexture(texture) {
        if (!this._options.textures[texture]) {
            return;
        }
        this.texture = this._options.textures[texture];
    }

    _addLabel() {
        this._label = new PIXI.Text(this._options.label.text, this._options.label.style);
        this._label.anchor.set(0.5);
        this._label.x = this.width / 2;
        this._label.y = this.height / 2;
        this.addChild(this._label);
    }

    setCallback(callback) {
        this.on("pointertap", callback);
    }

    disable() {
        this._switchEnabledState(false);
    }

    enable() {
        this._switchEnabledState(true);
    }
}