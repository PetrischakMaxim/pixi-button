import {Container} from "pixi.js";
import Symbol from "./symbol";

export default class Reel extends Container {

    private _symbolsBeforeStop: number;
    public symbolsCount: number;
    public symbols: Array<Symbol>;

    constructor(symbolsCount: number) {
        super();
        this.symbolsCount = symbolsCount;
        this.symbols = [];
    }

    private async _doSpin() {
        await this._moveOneSlot();
        this._symbolsBeforeStop--;

        if (this._symbolsBeforeStop > 0) {
            await this._doSpin();
        } else {
            await Promise.all(this.symbols.map(sym => sym.endBounce()));
        }
    }

    private _removeLastSymbol() {
        const lastSymbol = this.symbols.pop();
        this.symbols.unshift(lastSymbol);
    }

    private _changeSymbolsPosition() {
        this.symbols.forEach((sym,i) => sym.y = sym.size * i + sym.size);
    }

    private async _moveOneSlot() {
        await Promise.all(this.symbols.map(sym => sym.moveOneSlot()));
        this._removeLastSymbol();
        this._changeSymbolsPosition();
    }

    public addSymbols(create: Function) {
        for (let i = 1; i <= this.symbolsCount; i++) {
            const symbol = create(i);
            this.addChild(symbol);
            this.symbols.push(symbol);
        }
    }

    public async start(symNumToSpin: number) {
        this._symbolsBeforeStop = symNumToSpin;
        await Promise.all(this.symbols.map(sym => sym.startBounce()));
        await this._doSpin();
    }
}