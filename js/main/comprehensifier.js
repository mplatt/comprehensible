"use strict";
class Comprehensifier {
    comprehensify(message) {
        Comprehensifier.ensurePositiveInt(message);
        Comprehensifier.ensureDictionarylength(this.getWords());
        return this.toDigits(message);
    }
    uncomprehensify(message) {
        Comprehensifier.ensureValidMessage(message);
        Comprehensifier.ensureDictionarylength(this.getWords());
        return this.fromDigits(message);
    }
    toDigits(dec) {
        const base = this.getWords().length;
        let encoded = [];
        if (dec === 0) {
            return this.getWords()[0];
        }
        while (dec > 0) {
            encoded.unshift(this.getWords()[dec % base]);
            dec = (dec - (dec % base)) / base;
        }
        return this.join(encoded);
    }
    fromDigits(message) {
        const base = this.getWords().length;
        let decoded = 0;
        for (let word of this.split(message)) {
            decoded = base * decoded + this.position(word);
        }
        return decoded;
    }
    position(word) {
        return this.getWords().indexOf(word);
    }
    static ensureDictionarylength(words) {
        if (words.length < 2) {
            throw new Error(`Invalid dictionary provided: ${words}`);
        }
    }
    static ensurePositiveInt(num) {
        if (!Number.isInteger(num)) {
            throw new Error("Non-integer number provided");
        }
        if (num < 0) {
            throw new Error("Negative number provided");
        }
    }
    static ensureValidMessage(message) {
        if (message.length < 1) {
            throw new Error("Invalid message provided");
        }
    }
}
exports.Comprehensifier = Comprehensifier;
