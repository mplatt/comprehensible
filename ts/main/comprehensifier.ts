export abstract class Comprehensifier {
	comprehensify(message: Uint8Array): string {
		Comprehensifier.ensureDictionarylength(this.getWords());
		return this.join(this.toDigits(message));
	}

	uncomprehensify(message: string): Uint8Array {
		Comprehensifier.ensureValidMessage(message);
		Comprehensifier.ensureDictionarylength(this.getWords());
		return this.fromDigits(this.split(message));
	}

	abstract getWords(): Array<string>

	abstract split(message: string): Array<string>

	abstract join(words: Array<string>): string

	private toDigits(data: Uint8Array): Array<string> {
		const sourceLength = this.getWords().length;
		let destinationLength = 0;
		const numberLength = data.length;

		for (let i = 0; i < numberLength; i++) {
			destinationLength = destinationLength * Math.pow(2, 8) + data[i];
		}

		if (destinationLength < 0) {
			return [];
		}

		let r = destinationLength % sourceLength;
		const c = [this.getWords()[r]];
		let q = Math.floor(destinationLength / sourceLength);

		while (q) {
			r = q % sourceLength;
			q = Math.floor(q / sourceLength);
			c.unshift(this.getWords()[r]);
		}

		return c;
	}

	private fromDigits(data: Array<string>): Uint8Array {
		return undefined;
	}

	private static ensureDictionarylength(words: Array<string>) {
		if (words.length < 2) {
			throw new Error(`Invalid dictionary provided: ${words}`);
		}
	}

	private static ensureValidMessage(message: string) {
		if (message.length < 1) {
			throw new Error("Invalid message provided");
		}
	}
}
