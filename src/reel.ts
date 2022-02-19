import {Container} from "pixi.js";

interface Options {
    symbolsCount: number;
    animationSpeed: number;
    moveCount: number;
}

export default class Reel extends Container {

    private _options: Options;

    constructor(options: Options) {
        super();
        this._options = {...options};
    }

    public async moveSlots(callback: Function) {
        for (let i = 0; i < this._options.moveCount; i++) {
            await callback();
        }
    }

    public addSymbols(callback: Function) {
        for (let i = 1; i <= this._options.symbolsCount; i++) {
            const symbol = callback(i);
            this.addChild(symbol);
        }
    }

    get animationSpeed() {
        return this._options.animationSpeed;
    }
}