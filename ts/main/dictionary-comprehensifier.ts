import {Comprehensifier} from "./comprehensifier";

export class DictionaryComprehensifier extends Comprehensifier {
	private words: Array<string>;
	constructor(words: Array<string>) {
		super();
		this.words = DictionaryComprehensifier.ensureUniqueness(words);
	}

	split(message: string): Array<string> {
		return message.split(" ");
	}

	join(words: Array<string>): string {
		return words.join(" ");
	}

	getWords(): Array<string> {
		return this.words;
	}

	private static ensureUniqueness(words: Array<string>): Array<string> {
		return [...new Set(words)];
	}
}
