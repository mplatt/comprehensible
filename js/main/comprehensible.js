"use strict";
const boles_clifford_comprehensifier_1 = require("./boles-clifford-comprehensifier");
const dictionary_comprehensifier_1 = require("./dictionary-comprehensifier");
class Comprehensible {
    static bolesCliffordComprehensifier(distance = 10) {
        return new boles_clifford_comprehensifier_1.BolesCliffordComprehensifier(distance);
    }
    static dictionaryComprehensifier(words) {
        return new dictionary_comprehensifier_1.DictionaryComprehensifier(words);
    }
}
module.exports = Comprehensible;
