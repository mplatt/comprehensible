export abstract class Comprehensifier {
	abstract words: Array<string>;

	comprehensify(message: number): string {
		Comprehensifier.ensurePositiveInt(message);
		return this.baseShift(message);
	}

	private baseShift(dec: number): string {
		this.ensureDictionaylength();

		const base = this.words.length;
		let encoded: Array<string> = [];

		if (dec === 0) {
			return this.words[0];
		}

		while (dec > 0) {
			encoded.unshift(this.words[dec % base]);
			dec = (dec - (dec % base)) / base;
		}

		return this.join(encoded);
	}

	private ensureDictionaylength() {
		if (this.words.length < 2) {
			throw new Error(`Invalid dictionary provided: ${this.words}`);
		}
	}

	private join(words: Array<string>): string {
		return words.join("");
	}

	static ensurePositiveInt(num: number) {
		if (! Number.isInteger(num)) {
			throw new Error("Non-integer number provided");
		}

		if (num < 0) {
			throw new Error("Negative number provided");
		}
	}
}
