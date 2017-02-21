import {Comprehensifier} from "./comprehensifier";
import {Markov} from "./markov";

export class MarkovComprehensifier extends Comprehensifier {
	private words: Array<string>;
	private markov: Markov;

	constructor(sequences: Array<string>, size: number = 100, markovOrder: number = 2, maxLength = 20) {
		super();
		this.words = [];
		this.markov = new Markov(sequences, markovOrder, maxLength);
		this.generateWords(size);
	}

	getWords(): Array<string> {
		return this.words;
	}

	split(message: string): Array<string> {
		return message.split(" ");
	}

	join(words: Array<string>): string {
		return words.join(" ");
	}

	private generateWords(size: number) {
		let skips = 0;
		while (this.getWords().length < size) {
			let word: any = MarkovComprehensifier.capitalizeWord(this.markov.generate().join(""));

			if (this.getWords().indexOf(word) === -1) {
				this.getWords().push(word);
			} else {
				// TODO make this less of a heuristic
				if (this.getWords().length >= 1 && skips > 10 * this.getWords().length) {
					throw new Error("Can't generate corpus for given specifications. Try reducing the number of words or increasing their length.");
				}
				skips++;
			}
		}
	}

	private static capitalizeWord(word: string) {
		return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
	}
}
