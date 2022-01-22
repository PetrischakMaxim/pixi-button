import {Sprite, Texture} from "pixi.js";
import {gsap} from "gsap";

interface SlotSymbol {
    startBounce(): Promise<void>;

    moveOneSlot(): Promise<void>;

    endBounce(): Promise<void>;

    setSymbol(name: Texture): void;
}

export default class Symbol extends Sprite implements SlotSymbol {

    constructor(texture: Texture) {
        super(texture);
    }

    _bounce() {
        gsap.to(this,
            {
                duration:  2 + Math.random() * (5 - 2),
                y: 2 + Math.random() * (5 - 2),
                ease: "bounce",
            }
        );
    }

    public startBounce(): Promise<void> {
        return new Promise((resolve) => {
            gsap.to(this,
                {
                    duration: 1.5,
                    ease: "bounce",
                    y: this.y + 50,
                    onComplete: resolve,
                }
            );
        });
    }

    public moveOneSlot(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public endBounce(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public setSymbol(name: Texture): void {
        this.texture = name;
    }
}