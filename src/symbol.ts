import {Sprite, Texture} from "pixi.js";
import {gsap} from "gsap";
import TweenVars = gsap.TweenVars;

interface SlotSymbol {
    startBounce(): Promise<void>;

    moveOneSlot(): Promise<void>;

    endBounce(): Promise<void>;

    setSymbol(name: Texture): void;
}

interface AnimationOptions {
    start: Partial<TweenVars>,
    move: Partial<TweenVars>,
    end: Partial<TweenVars>,
}

export default class Symbol extends Sprite implements SlotSymbol {

    private _animationOptions: AnimationOptions;

    constructor(texture: Texture, size: number) {
        super(texture);
        this.anchor.set(0.5);
        this.scale.x = this.scale.y = Math.min(size / this.width, size / this.height);
    }

    public setupAnimation(options: AnimationOptions) {
        this._animationOptions = {...options};
    }

    public async startBounce() {
        await gsap.to(this, this._animationOptions.start);
    }

    public async moveOneSlot() {
        await gsap.to(this, this._animationOptions.move);
    }

    public async endBounce() {
        await gsap.to(this, this._animationOptions.end);
    }

    public setSymbol(name: Texture): void {
        this.texture = name;
    }
}