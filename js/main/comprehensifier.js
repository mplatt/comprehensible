"use strict";
const bigInt = require("big-integer");
class Comprehensifier {
    comprehensify(message) {
        Comprehensifier.ensureDictionarylength(this.getWords());
        return this.join(this.toDigits(Comprehensifier.toBigInteger(message)));
    }
    uncomprehensify(message) {
        Comprehensifier.ensureValidMessage(message);
        Comprehensifier.ensureDictionarylength(this.getWords());
        return Comprehensifier.fromBigInteger(this.fromDigits(this.split(message)));
    }
    toDigits(data, dictionary = this.getWords()) {
        const base = dictionary.length;
        let r = data.mod(base);
        const result = [dictionary[r.toJSNumber()]];
        let q = data.divide(base);
        while (!q.equals(0)) {
            r = q.mod(base);
            q = q.divide(base);
            result.unshift(dictionary[r.toJSNumber()]);
        }
        return result;
    }
    fromDigits(data, dictionary = this.getWords()) {
        let value = bigInt(0);
        for (let word of data.reverse().entries()) {
            let x = bigInt(dictionary.indexOf(word[1])).times(bigInt(dictionary.length).pow(word[0]));
            value = value.plus(x);
        }
        return value;
    }
    static ensureDictionarylength(words) {
        if (words.length < 2) {
            throw new Error(`Invalid dictionary provided: ${words}`);
        }
    }
    static ensureValidMessage(message) {
        if (message.length < 1) {
            throw new Error("Invalid message provided");
        }
    }
    static toBigInteger(message) {
        let hex = Array.from(message).map(function (value) {
            let s = value.toString(16);
            return (s.length === 2) ? s : `0${s}`;
        }).join("");
        return bigInt(hex, 16);
    }
    static fromBigInteger(message) {
        if (message.lesser(0)) {
            return bigInt.zero;
        }
        let r = message.mod(256).toJSNumber();
        let result = [r];
        let q = message.divide(256);
        while (!q.equals(0)) {
            let d = q.divmod(256);
            q = d.quotient;
            result.unshift(d.remainder.toJSNumber());
        }
        return Uint8Array.from(result);
    }
}
exports.Comprehensifier = Comprehensifier;
