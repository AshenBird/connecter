export function jClone(simpleObject) {
    let r;
    const { stringify, parse } = JSON;
    try {
        r = parse(stringify(simpleObject));
    }
    catch (e) {
        throw new Error('not simple Object');
    }
    return r;
}
//# sourceMappingURL=utils.js.map