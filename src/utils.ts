export function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomPositions() {
    let x = getRandomInt(0, 100);
    if (x > 50) {
        x = getRandomInt(0, 6);
        return [x, x, x];
    }
    return [getRandomInt(0, 6), getRandomInt(0, 6), getRandomInt(0, 6)];
}