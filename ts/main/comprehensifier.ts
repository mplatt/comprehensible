export abstract class Comprehensifier {
	comprehensify(message: Uint8Array): string {
		Comprehensifier.ensureDictionarylength(this.getWords());
		return this.join(this.toDigits(Comprehensifier.toBigInteger(message)));
	}

	uncomprehensify(message: string): Uint8Array {
		Comprehensifier.ensureValidMessage(message);
		Comprehensifier.ensureDictionarylength(this.getWords());
		return Comprehensifier.fromBigInteger(this.fromDigits(this.split(message)));
	}

	abstract getWords(): Array<string>

	abstract split(message: string): Array<string>

	abstract join(words: Array<string>): string

	private toDigits(data: BigInteger, dictionary: Array<string> = this.getWords()): Array<string> {
		const base = dictionary.length;
		let r = data.mod(base);
		const result = [dictionary[r.toJSNumber()]];
		let q = data.divide(base);

		while (!q.equals(0)) {
			r = q.mod(base);
			q = q.divide(base);
			result.unshift(dictionary[r.toJSNumber()])
		}
		return result;
	}

	private fromDigits(data: Array<string>, dictionary: Array<string> = this.getWords()): BigInteger {
		let value = bigInt.zero;

		for (let word in data) {
			value = value.multiply(dictionary.length).add(dictionary.indexOf(word));
		}

		if (value.lesser(0)) {
			return bigInt.zero;
		}

		let r = value.mod(10);
		let result = r;
		let q = value.divide(10);

		while (!q.equals(0)) {
			let d = q.divmod(10);
			r = d.remainder;
			q = d.quotient;
			result = result.plus(r)
		}

		return result;
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

	private static toBigInteger(message: Uint8Array): BigInteger {
		let hex = Array.from(message).map(function (value) {
			return value.toString(16);
		}).join("");

		return bigInt(hex, 16);
	}

	private static fromBigInteger(number: BigInteger): Uint8Array {
		return undefined;
	}
}
