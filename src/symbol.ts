import {Sprite, Texture} from "pixi.js";
import {gsap} from "gsap";
import {getRandomInt} from "./utils";

interface SlotSymbol {
    startBounce(): Promise<void>;
    moveOneSlot(): Promise<void>;
    endBounce(): Promise<void>;
    setSymbol(name: Texture): void;
}

export default class Symbol extends Sprite implements SlotSymbol {

    private _startPosition: {x:number, y: number};

    constructor(texture: Texture) {
        super(texture);
    }

    public startBounce(): Promise<void> {
        return new Promise((resolve) => {
            gsap.to(this,
                {
                    duration: getRandomInt(1, 2),
                    y: this.y - getRandomInt(5, 50),
                    ease: "bounce",
                    onComplete: resolve
                }
            );
        });
    }

    public moveOneSlot(): Promise<void> {
        return new Promise((resolve) => {
            gsap.to(this,
                {
                    duration: getRandomInt(0.5, 1.5),
                    y: this.y - this.height,
                    onComplete: resolve
                }
            );
        });
    }

    public endBounce(): Promise<void> {
        return new Promise((resolve) => {
            gsap.to(this,
                {
                    duration: getRandomInt(0.5, 1.5),
                    y: this._startPosition.y,
                    ease: "bounce",
                    onComplete: resolve
                }
            );
        });
    }

    public setSymbol(name: Texture): void {
        this.texture = name;
    }

    public saveStartPosition(x: number, y: number) {
        this._startPosition = {x, y};
    }
}