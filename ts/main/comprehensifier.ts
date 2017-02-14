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

	private toDigits(data: BigInteger): Array<string> {
		const base = this.getWords().length;
		let r = data.mod(base);
		const result = [this.getWords()[r.toJSNumber()]];
		let q = data.divide(base);

		while (!q.equals(0)) {
			r = q.mod(base);
			q = q.divide(base);
			result.unshift(this.getWords()[r.toJSNumber()])
		}
		return result;
	}

	private fromDigits(data: Array<string>): BigInteger {
		let value = bigInt(0);

		for (let word in data) {
			value = value.multiply(this.getWords().length).add(this.getWords().indexOf(word));
		}

		if (value.lesser(0)) {
			return bigInt(0);
		}

		let r = value.mod(10);
		let result = r;
		let q = value.divide(10);

		while(!q.equals(0)) {
			r = q.mod(10);
			q = q.divide(10);
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
}
