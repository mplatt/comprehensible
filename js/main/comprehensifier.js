"use strict";
const bigInt = require("big-integer");
class Comprehensifier {
    comprehensifyNumber(message) {
        Comprehensifier.ensureDictionarylength(this.getWords());
        return this.join(Comprehensifier.toDigits(bigInt(message), this.getWords()));
    }
    uncomprehensifyNumber(message) {
        Comprehensifier.ensureValidMessage(message);
        Comprehensifier.ensureDictionarylength(this.getWords());
        return this.fromDigits(this.split(message), this.getWords()).toJSNumber();
    }
    comprehensifyUUID(message) {
        Comprehensifier.ensureDictionarylength(this.getWords());
        return this.join(Comprehensifier.toDigits(Comprehensifier.uuidToBigInteger(message), this.getWords()));
    }
    uncomprehensifyUUID(message) {
        Comprehensifier.ensureValidMessage(message);
        Comprehensifier.ensureDictionarylength(this.getWords());
        return Comprehensifier.bigIntegerToUUID(this.fromDigits(this.split(message), this.getWords()));
    }
    comprehensifyUint8Array(message) {
        Comprehensifier.ensureDictionarylength(this.getWords());
        return this.join(Comprehensifier.toDigits(Comprehensifier.uint8ArraytoBigInteger(message), this.getWords()));
    }
    uncomprehensifyUint8Array(message) {
        Comprehensifier.ensureValidMessage(message);
        Comprehensifier.ensureDictionarylength(this.getWords());
        return Comprehensifier.bigIntegerToUint8Array(this.fromDigits(this.split(message), this.getWords()));
    }
    static toDigits(data, dictionary) {
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
    fromDigits(data, dictionary) {
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
    static uint8ArraytoBigInteger(message) {
        let hex = Array.from(message).map(function (value) {
            let s = value.toString(16);
            return Comprehensifier.pad(s, 2);
        }).join("");
        return bigInt(hex, 16);
    }
    static bigIntegerToUint8Array(message) {
        if (message.lesser(0)) {
            throw new Error(`Invalid message provided: ${message.toString()}`);
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
    static uuidToBigInteger(message) {
        if (message.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i) === null) {
            throw new Error(`Invalid UUID provided: ${message}`);
        }
        return bigInt(message.replace(/[^A-Fa-f0-9]/g, ""), 16);
    }
    static bigIntegerToUUID(message) {
        if (message.lesser(0) || message.greater(bigInt("f".repeat(32), 16))) {
            throw new Error(`Can't convert message ${message} to UUID`);
        }
        const hexString = Comprehensifier.pad(Comprehensifier.toDigits(message, "0123456789abcdef".split("")).join(""), 32);
        const uuid = hexString.match(/(.{8})(.{4})(.{4})(.{4})(.{12})/);
        return `${uuid[1]}-${uuid[2]}-${uuid[3]}-${uuid[4]}-${uuid[5]}`;
    }
    static pad(value, length, padding = "0") {
        return (value.length < length) ? Comprehensifier.pad(`${padding}${value}`, length, padding) : value;
    }
}
exports.Comprehensifier = Comprehensifier;
