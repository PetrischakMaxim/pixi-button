import {Container} from "pixi.js";
import Symbol from "./symbol";

interface Options {
    count: number;
    speed: number;
    countToMove: number;
}

export default class Reel extends Container {
    _options: Options;
    prevPosition: number;
    symbols: Array<Symbol>;

    constructor(options: Options) {
        super();
        this._options = {...options};
        this.symbols = [];
        this.prevPosition = 0;
    }

    addSymbols(symbol: Symbol) {
        for (let i = 0; i <= this._options.count;i++) {
            this.symbols.push(symbol);
        }
    }
}