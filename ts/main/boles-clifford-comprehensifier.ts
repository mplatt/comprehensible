import {Comprehensifier} from "./comprehensifier";

// Boles, D.B. & Clifford, J.E. Behavior Research Methods, Instruments, & Computers (1989) 21: 579. doi:10.3758/BF03210580
export class BolesCliffordComprehensifier extends Comprehensifier {
	private words: Array<string>;

	constructor(distance: number = 10) {
		super();
		this.words = BolesCliffordComprehensifier.getAlphabet(distance);
	}

	getWords(): Array<string> {
		return this.words;
	}

	split(message: string): Array<string> {
		return message.split("");
	}

	join(words: Array<string>): string {
		return words.join("");
	}

	private static getAlphabet(distance: number): Array<string> {
		const alphabet0 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
		const alphabet5 = BolesCliffordComprehensifier.reduceAlphabet(alphabet0, "lZzSsCcOoKkXxWwVvUuIigqPp".split(""));
		const alphabet10 = BolesCliffordComprehensifier.reduceAlphabet(alphabet5, "EFmnQJjiTaedb".split(""));
		const alphabet15 = BolesCliffordComprehensifier.reduceAlphabet(alphabet10, "NMBDGyYfthrR".split(""));

		if (distance < 5) {
			return alphabet0;
		} else if (distance < 10) {
			return alphabet5;
		} else if (distance < 15) {
			return alphabet10;
		} else if (distance <= 20) {
			return alphabet15;
		} else {
			throw new Error(`Invalid distance value ${distance})`);
		}
	}

	private static reduceAlphabet(alphabet: Array<string>, by: Array<string>): Array<string> {
		return alphabet.filter(word => (by.indexOf(word) === -1));
	}
}
