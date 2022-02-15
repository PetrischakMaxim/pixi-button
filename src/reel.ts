import {Container} from "pixi.js";
import Symbol from "./symbol";

interface Options {
    count: number;
    speed: number;
    countToMove: number;
}

export default class Reel extends Container {
    private _options: Options;
    prevPosition: number;

    constructor(options: Options) {
        super();
        this._options = {...options};
        this.prevPosition = 0;
    }

    get count() {
        return this._options.count;
    }
}