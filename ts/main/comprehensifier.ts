export abstract class Comprehensifier {
	comprehensify(message: number): string {
		Comprehensifier.ensurePositiveInt(message);
		Comprehensifier.ensureDictionarylength(this.getWords());
		return this.toDigits(message);
	}

	uncomprehensify(message: string): number {
		Comprehensifier.ensureValidMessage(message);
		Comprehensifier.ensureDictionarylength(this.getWords());
		return this.fromDigits(message);
	}

	abstract getWords(): Array<string>

	abstract split(message: string): Array<string>

	abstract join(words: Array<string>): string

	private toDigits(dec: number): string {
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

	private fromDigits(message: string): number {
		const base = this.getWords().length;
		let decoded = 0;

		for (let word of this.split(message)) {
			decoded = base * decoded + this.position(word)
		}

		return decoded;
	}

	private position(word: string): number {
		return this.getWords().indexOf(word);
	}

	private static ensureDictionarylength(words: Array<string>) {
		if (words.length < 2) {
			throw new Error(`Invalid dictionary provided: ${words}`);
		}
	}

	private static ensurePositiveInt(num: number) {
		if (!Number.isInteger(num)) {
			throw new Error("Non-integer number provided");
		}

		if (num < 0) {
			throw new Error("Negative number provided");
		}
	}

	private static ensureValidMessage(message: string) {
		if (message.length < 1) {
			throw new Error("Invalid message provided");
		}
	}
}
