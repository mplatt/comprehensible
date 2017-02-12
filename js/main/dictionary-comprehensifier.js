"use strict";
const comprehensifier_1 = require("./comprehensifier");
class DictionaryComprehensifier extends comprehensifier_1.Comprehensifier {
    constructor(words) {
        super();
        this.words = DictionaryComprehensifier.ensureUniqueness(words);
    }
    split(message) {
        return message.split(" ");
    }
    join(words) {
        return words.join(" ");
    }
    getWords() {
        return this.words;
    }
    static ensureUniqueness(words) {
        return [...new Set(words)];
    }
}
exports.DictionaryComprehensifier = DictionaryComprehensifier;
