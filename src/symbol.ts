import {Sprite, Texture} from "pixi.js";
import {gsap} from "gsap";
import TweenVars = gsap.TweenVars;

interface SlotSymbol {
    startBounce(config: Partial<TweenVars>): Promise<void>;

    moveOneSlot(config: Partial<TweenVars>): Promise<void>;

    endBounce(config: Partial<TweenVars>): Promise<void>;

    setSymbol(name: Texture): void;
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

    public startPosition: {
        x: number,
        y: number,
    };

    public size: number;

    constructor(options: Options) {
        super(options.texture);
        this.startPosition = options.position;
        this.size = options.size;
        this.position.set(options.position.x, options.position.y);
        this.anchor.set(0.5);
        this.scale.x = this.scale.y = Math.min(this.size / this.width, this.size / this.height);
    }

    public async startBounce(config: Partial<TweenVars>) {
        await gsap.to(this, config);
    };

    public async moveOneSlot(config: Partial<TweenVars>) {
        await gsap.to(this, config);
    }

    public async endBounce(config: Partial<TweenVars>) {
        await gsap.to(this, config);
    }

    public setSymbol(name: Texture): void {
        this.texture = name;
    }
}