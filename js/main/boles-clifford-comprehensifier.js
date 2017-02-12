"use strict";
const comprehensifier_1 = require("./comprehensifier");
// The sub alphabets are modelled after letter similarity measures published in Boles, D.B. & Clifford, J.E.
// Behavior Research Methods, Instruments, & Computers (1989) 21: 579. doi:10.3758/BF03210580
class BolesCliffordComprehensifier extends comprehensifier_1.Comprehensifier {
    constructor(distance = 10) {
        super();
        this.words = BolesCliffordComprehensifier.getAlphabet(distance);
    }
    getWords() {
        return this.words;
    }
    split(message) {
        return message.split("");
    }
    join(words) {
        return words.join("");
    }
    static getAlphabet(distance) {
        const alphabet0 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        const alphabet5 = BolesCliffordComprehensifier.reduceAlphabet(alphabet0, "lZzSsCcOoKkXxWwVvUuIigqPp".split(""));
        const alphabet10 = BolesCliffordComprehensifier.reduceAlphabet(alphabet5, "EFmnQJjiTaedb".split(""));
        const alphabet15 = BolesCliffordComprehensifier.reduceAlphabet(alphabet10, "NMBDGyYfthrR".split(""));
        if (distance < 5) {
            return alphabet0;
        }
        else if (distance < 10) {
            return alphabet5;
        }
        else if (distance < 15) {
            return alphabet10;
        }
        else if (distance <= 20) {
            return alphabet15;
        }
        else {
            throw new Error(`Invalid distance value ${distance})`);
        }
    }
    static reduceAlphabet(alphabet, by) {
        return alphabet.filter(word => (by.indexOf(word) === -1));
    }
}
exports.BolesCliffordComprehensifier = BolesCliffordComprehensifier;
