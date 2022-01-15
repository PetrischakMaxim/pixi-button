export default class Button extends PIXI.Sprite {
    constructor(options) {
        super();
        this._options = options;
        this._init();
    }
    _init() {
        this.buttonMode = true;
        this._isPressed = false;
        this._isHover = false;
        this._switchEnabledState(true);
        this._setEvents();
        if (this._options.label) {
            this._addLabel();
        }
    }
    _setEvents() {
        this._addEvent("pointerover", this._onHover);
        this._addEvent("pointerout", this._onOut);
        this._addEvent("pointerdown", this._onDown);
        this._addEvent("pointerup", this._onUp);
        this._addEvent("pointerupoutside", this._onUp);
    }
    _addEvent(eventName, callback) {
        super.on(eventName, callback);
    }
    _onHover() {
        this._isHover = true;
        if (this._isPressed) {
            return;
        }
        this._updateTexture("hover");
    }
    _onOut() {
        this._isHover = false;
        if (this._isPressed) {
            return;
        }
        this._updateTexture("default");
    }
    _onDown() {
        this._isPressed = true;
        this._updateTexture("down");
    }
    _onUp() {
        this._isPressed = false;
        this._updateTexture(this._isHover ? "hover" : "default");
    }
    _switchEnabledState(isEnabled) {
        this._updateTexture(isEnabled ? "default" : "disabled");
        this._isEnabled = isEnabled;
        this.interactive = isEnabled;
    }
    _updateTexture(texture) {
        if (this._options.textures[texture]) {
            this.texture = this._options.textures[texture];
        }
    }
    _addLabel() {
        this._label = new PIXI.Text(this._options.label.text, this._options.label.style);
        this._label.anchor.set(0.5);
        this._label.x = this.width / 2;
        this._label.y = this.height / 2;
        super.addChild(this._label);
    }
    setCallback(callback) {
        this._addEvent("pointertap", callback);
    }
    disable() {
        this._switchEnabledState(false);
    }
    enable() {
        this._switchEnabledState(true);
    }
}
