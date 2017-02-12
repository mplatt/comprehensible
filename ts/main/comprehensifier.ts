export abstract class Comprehensifier {
	comprehensify(message: number): string {
		Comprehensifier.ensurePositiveInt(message);
		return this.baseShift(message);
	}

	abstract getWords(): Array<string>

	abstract join(words: Array<string>): string

	private baseShift(dec: number): string {
		this.ensureDictionaylength();

		const base = this.getWords().length;
		let encoded: Array<string> = [];

		if (dec === 0) {
			return this.getWords()[0];
		}

		while (dec > 0) {
			encoded.unshift(this.getWords()[dec % base]);
			dec = (dec - (dec % base)) / base;
		}

		return this.join(encoded);
	}

	private ensureDictionaylength() {
		if (this.getWords().length < 2) {
			throw new Error(`Invalid dictionary provided: ${this.getWords()}`);
		}
	}

	static ensurePositiveInt(num: number) {
		if (!Number.isInteger(num)) {
			throw new Error("Non-integer number provided");
		}

		if (num < 0) {
			throw new Error("Negative number provided");
		}
	}
}
