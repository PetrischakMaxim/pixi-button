export default class Button extends PIXI.Container {

    constructor(options = {}) {
        super();
        this.options = this.setOptions(options);
        this.init();
    }

    setOptions(options) {
        const defaultOptions = {
            width: 160,
            height: 40,
            texture: null,
            x: 0,
            y: 0,
            fill: 0xFF3300,
            label: 'Default button',
            labelStyle: {
                fill: '#ffffff',
                fontSize: '16px',
                fontFamily: 'Arial, sans-serif',
            },
            disabled: false,
        };

        return {...defaultOptions, ...options};
    }

    init() {
        this.id = this._generateId();
        this.element = null;
        this.buttonMode = true;
        this.interactive = true;
        this.x = this.options.x;
        this.y = this.options.y;
        this.disabled = this.options.disabled;

        if(this.options.texture) {
            this.drawTexture(this.options.texture);
            return;
        }
        this.drawGraphics();
    }

    drawTexture(texture) {
        this.element = new PIXI.Sprite(texture);
        this.element.width = this.options.width;
        this.element.height = this.options.height;
        this.addChild(this.element);
    }

    drawGraphics() {
        this.element = new PIXI.Graphics();
        this.element.x = this.x;
        this.element.y = this.y;
        this.element.beginFill(this.options.fill);
        this.element.drawRect(0, 0, this.options.width, this.options.height);
        this.element.endFill();

        if(this.options.label) {
            this.addLabel();
        }
        this.addChild(this.element);
    }

    addLabel() {
        this.label = new PIXI.Text(this.options.label, this.options.labelStyle);
        this.label.anchor.set(0.5);
        this.label.x = this.element.width / 2;
        this.label.y = this.element.height / 2;
        this.element.addChild(this.label);
    }

    updateLabel(label) {
        this.label.text = label;
    }

    updateTexture(texture = this.options.texture) {
        this.element.texture = texture;
    }

    setDisabled() {
       this.disabled = true;
       this.interactive = false;
       this.alpha = 0.5;
    }

    addAction(actionType, callback) {
        this.on(actionType, callback);
        return this;
    }

    _generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}