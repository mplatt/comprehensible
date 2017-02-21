import {BolesCliffordComprehensifier} from "./boles-clifford-comprehensifier";
import {DictionaryComprehensifier} from "./dictionary-comprehensifier";
import {MarkovComprehensifier} from "./markov-comprehensifier";

class Comprehensible {
	static bolesCliffordComprehensifier(distance: number = 10): BolesCliffordComprehensifier {
		return new BolesCliffordComprehensifier(distance);
	}

	static dictionaryComprehensifier(words: Array<string>): DictionaryComprehensifier {
		return new DictionaryComprehensifier(words);
	}

	static markovComprehensifier(sequences: Array<string>, size: number = 100, markovOrder: number = 2, maxLength = 20): MarkovComprehensifier {
		return new MarkovComprehensifier(sequences, size, markovOrder, maxLength);
	}
}

module.exports = Comprehensible;
