"use strict";
const boles_clifford_comprehensifier_1 = require("./boles-clifford-comprehensifier");
const dictionary_comprehensifier_1 = require("./dictionary-comprehensifier");
const markov_comprehensifier_1 = require("./markov-comprehensifier");
class Comprehensible {
    static bolesCliffordComprehensifier(distance = 10) {
        return new boles_clifford_comprehensifier_1.BolesCliffordComprehensifier(distance);
    }
    static dictionaryComprehensifier(words) {
        return new dictionary_comprehensifier_1.DictionaryComprehensifier(words);
    }
    static markovComprehensifier(sequences, size = 100, markovOrder = 2, maxLength = 20) {
        return new markov_comprehensifier_1.MarkovComprehensifier(sequences, size, markovOrder, maxLength);
    }
}
module.exports = Comprehensible;
