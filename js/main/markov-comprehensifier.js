"use strict";
const comprehensifier_1 = require("./comprehensifier");
const markov_1 = require("./markov");
class MarkovComprehensifier extends comprehensifier_1.Comprehensifier {
    constructor(sequences, size = 100, markovOrder = 2, maxLength = 20) {
        super();
        this.words = [];
        this.markov = new markov_1.Markov(sequences, markovOrder, maxLength);
        this.generateWords(size);
    }
    getWords() {
        return this.words;
    }
    split(message) {
        return message.split(" ");
    }
    join(words) {
        return words.join(" ");
    }
    generateWords(size) {
        let skips = 0;
        while (this.getWords().length < size) {
            let word = MarkovComprehensifier.capitalizeWord(this.markov.generate().join(""));
            if (this.getWords().indexOf(word) === -1) {
                this.getWords().push(word);
            }
            else {
                // TODO make this less of a heuristic
                if (this.getWords().length >= 1 && skips > 10 * this.getWords().length) {
                    throw new Error("Can't generate corpus for given specifications. Try reducing the number of words or increasing their length.");
                }
                skips++;
            }
        }
    }
    static capitalizeWord(word) {
        return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    }
}
exports.MarkovComprehensifier = MarkovComprehensifier;
