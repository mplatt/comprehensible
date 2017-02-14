"use strict";
class Comprehensifier {
    comprehensify(message) {
        Comprehensifier.ensureDictionarylength(this.getWords());
        return this.join(this.toDigits(message));
    }
    uncomprehensify(message) {
        Comprehensifier.ensureValidMessage(message);
        Comprehensifier.ensureDictionarylength(this.getWords());
        return this.fromDigits(this.split(message));
    }
    toDigits(data) {
        const sourceLength = this.getWords().length;
        let destinationLength = 0;
        const numberLength = data.length;
        for (let i = 0; i < numberLength; i++) {
            destinationLength = destinationLength * Math.pow(2, 8) + data[i];
        }
        if (destinationLength < 0) {
            return [];
        }
        let r = destinationLength % sourceLength;
        const c = [this.getWords()[r]];
        let q = Math.floor(destinationLength / sourceLength);
        while (q) {
            r = q % sourceLength;
            q = Math.floor(q / sourceLength);
            c.unshift(this.getWords()[r]);
        }
        return c;
    }
    fromDigits(data) {
        return undefined;
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
}
exports.Comprehensifier = Comprehensifier;
