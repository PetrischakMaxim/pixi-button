import {Sprite, Texture} from "pixi.js";
import {gsap} from "gsap";
import TweenVars = gsap.TweenVars;

interface SlotSymbol {
    startBounce(): Promise<void>;

    moveOneSlot(): Promise<void>;

    endBounce(): Promise<void>;

    setSymbol(name: Texture): void;
}

interface AnimationConfig {
    start: Partial<TweenVars>,
    move: Partial<TweenVars>,
    end: Partial<TweenVars>,
}

interface Options {
    texture: Texture,
    size: number,
    position: {
        x: number,
        y: number,
    }
}

export default class Symbol extends Sprite implements SlotSymbol {

    private _animationConfig: AnimationConfig;
    public size: number;

    constructor(options: Options) {
        super(options.texture);
        this.size = options.size;
        this.position.set(options.position.x, options.position.y);
        this.anchor.set(0.5);
        this.scale.x = this.scale.y = Math.min(this.size / this.width, this.size / this.height);
    }

    public setupAnimation(duration: number, offset: number, isBounced: boolean) {

        const config = {
            duration,
            y: `-=${offset}`,
            yoyo: isBounced,
            repeat: isBounced ? 1 : 0
        };

        this._animationConfig = {
            start: config,
            move: {
                duration
            },
            end: config
        }
    }

    public async startBounce() {
        await gsap.to(this, this._animationConfig.start);
    }

    public async moveOneSlot() {
        await gsap.to(this, this._animationConfig.move);
    }

    public async endBounce() {
        await gsap.to(this, this._animationConfig.end);
    }

    public setSymbol(name: Texture): void {
        this.texture = name;
    }
}