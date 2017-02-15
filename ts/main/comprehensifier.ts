const bigInt = require("big-integer");

export abstract class Comprehensifier {
	public comprehensifyUint8Array(message: Uint8Array): string {
		Comprehensifier.ensureDictionarylength(this.getWords());
		return this.join(this.toDigits(Comprehensifier.toBigInteger(message)));
	}

	public comprehensifyNumber(message: number): string {
		Comprehensifier.ensureDictionarylength(this.getWords());
		return this.join(this.toDigits(bigInt(message)));
	}

	public comprehensifyUUID(message: string): string {
		Comprehensifier.ensureDictionarylength(this.getWords());
		return this.join(this.toDigits(Comprehensifier.uuidToNumber(message)));
	}

	public uncomprehensifyUint8Array(message: string): Uint8Array {
		Comprehensifier.ensureValidMessage(message);
		Comprehensifier.ensureDictionarylength(this.getWords());
		return Comprehensifier.fromBigInteger(this.fromDigits(this.split(message)));
	}

	public uncomprehensifyNumber(message: string): number {
		Comprehensifier.ensureValidMessage(message);
		Comprehensifier.ensureDictionarylength(this.getWords());
		return this.fromDigits(this.split(message)).toJSNumber();
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
			result.unshift(dictionary[r.toJSNumber()]);
		}
		return result;
	}

	private fromDigits(data: Array<string>, dictionary: Array<string> = this.getWords()): BigInteger {
		let value = bigInt(0);

		for (let word of data.reverse().entries()) {
			let x = bigInt(dictionary.indexOf(word[1])).times(bigInt(dictionary.length).pow(word[0]));
			value = value.plus(x);
		}

		return value;
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
			let s = value.toString(16);
			return (s.length === 2) ? s : `0${s}`;
		}).join("");
		return bigInt(hex, 16);
	}

	private static fromBigInteger(message: BigInteger): Uint8Array {
		if (message.lesser(0)) {
			return bigInt.zero;
		}

		let r = message.mod(256).toJSNumber();
		let result = [r];
		let q = message.divide(256);

		while (!q.equals(0)) {
			let d = q.divmod(256);
			q = d.quotient;
			result.unshift(d.remainder.toJSNumber());
		}

		return Uint8Array.from(result);
	}

	private static uuidToNumber(message: string): BigInteger {
		return bigInt(message.replace(/[^A-Fa-f0-9]/g, ""));
	}
}
