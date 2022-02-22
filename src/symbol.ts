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
    animationDuration: number,
}

export default class Symbol extends Sprite implements SlotSymbol {

    private _animationConfig: AnimationConfig;
    private readonly _size: number;
    private _animationDuration: number;
    private _startPosition: {
        x: number,
        y: number,
    };

    constructor(options: Options) {
        super(options.texture);
        this._size = options.size;
        this._startPosition = options.position;
        this.position.set(options.position.x, options.position.y);
        this.anchor.set(0.5);
        this.scale.x = this.scale.y = Math.min(this._size / this.width, this._size / this.height);
        this._addAnimation(options.animationDuration, this._size, this._startPosition.y);
    }

    private _addAnimation(duration: number, size: number, posY: number) {
        this._animationDuration = duration;
        this._animationConfig = {
            start: {
                duration: this._animationDuration,
                y: `-=${size}`,
                repeat: 0,
                yoyo: true,
            },
            move: {
                duration: this._animationDuration,
                y: `-=${size}`,
            },
            end: {
                duration: this._animationDuration,
                y: posY,
                ease: "bounce",
            }
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