import {Sprite, Texture} from "pixi.js";
import {gsap} from "gsap";
import TweenVars = gsap.TweenVars;

interface SlotSymbol {
    startBounce(): Promise<void>;

    moveOneSlot(): Promise<void>;

    endBounce(): Promise<void>;

    setSymbol(name: Texture): void;
}

interface GsapConfig {
    start: Partial<TweenVars>,
    move: Partial<TweenVars>,
    end: Partial<TweenVars>,
}

interface Options {
    texture: Texture,
    x: number,
    y: number,
    size: number,
    animation: GsapConfig
}

export default class Symbol extends Sprite implements SlotSymbol {

    private _options: Options;

    constructor(options: Options) {
        super(options.texture);
        this._options = options;
        this.x = this._options.x;
        this.y = this._options.y;
        this.anchor.set(0.5);
        this.scale.x = this.scale.y = Math.min(this._options.size / this.width, this._options.size / this.height);
    }

    public async startBounce() {
        await gsap.to(this, this._options.animation.start);
    }

    public async moveOneSlot() {
        await gsap.to(this, this._options.animation.move);
    }

    public async endBounce() {
        await gsap.to(this, this._options.animation.end);
    }

    public setSymbol(name: Texture): void {
        this.texture = name;
    }
}