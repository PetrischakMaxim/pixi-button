export default class Button extends PIXI.Sprite {

    constructor(options = {}) {
        super();
        this._options = options;
        this._init();
    }

    _init() {
        this._setTexture("up");
        this.buttonMode = true;
        this.interactive = true;
        this._isEnabled = true;
    }

    _setTexture(texture) {
        if (!this._options.textures) {
            return
        }
        this.texture = this._options.textures[texture];
    }

    _updateTexture(texture) {
        this.texture = texture;
    }

    _addLabel() {
        this.label = new PIXI.Text(this.options.label.text, this.options.label.style);
        this.label.anchor.set(0.5);
        this.label.x = this.width / 2;
        this.label.y = this.height / 2;
        this.addChild(this.label);
    }

    _checkDisabledState(isEnabled) {
        if(!isEnabled) {
            this._setTexture("disabled");
        } else {
            this._setTexture("up");
        }
        this._isEnabled = isEnabled;
        this.buttonMode = isEnabled;
        this.interactive = isEnabled;
    }

    setCallback(callback) {
        callback();
    }

    disable() {
        this._checkDisabledState(false);
    }

    enable() {
        this._checkDisabledState(true);
    }
}