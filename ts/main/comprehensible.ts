import {BolesCliffordComprehensifier} from "./boles-clifford-comprehensifier";
import {DictionaryComprehensifier} from "./dictionary-comprehensifier";

class Comprehensible {
	static bolesCliffordComprehensifier(distance: number = 10): BolesCliffordComprehensifier {
		return new BolesCliffordComprehensifier(distance)
	}

	static dictionaryComprehensifier(words: Array<string>): DictionaryComprehensifier {
		return new DictionaryComprehensifier(words)
	}
}

module.exports = Comprehensible;
