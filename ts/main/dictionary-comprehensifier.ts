import {Comprehensifier} from "./comprehensifier";

export class DictionaryComprehensifier extends Comprehensifier {
	private words: Array<string>;

	constructor(words: Array<string>) {
		super();
		this.words = words;
	}

	join(words: Array<string>): string {
		return words.join(" ");
	}

	getWords(): Array<string> {
		return this.words;
	}
}
