import {expect} from "chai";
import {Markov} from "../main/markov";

describe("Markov words", () => {
	it("should be reproducible for the same input", () => {
		const markov1 = new Markov(["sassafras", "mississippi"], 1);
		const markov2 = new Markov(["sassafras", "mississippi"], 1);
		const otherMarkov = new Markov(["mississippi", "sassafras"], 1);

		expect(markov1.generate()).to.not.deep.equal(otherMarkov.generate());
		expect(markov2.generate()).to.not.deep.equal(otherMarkov.generate());
		expect(markov1.generate()).to.deep.equal(markov2.generate());

		expect(markov1.generate()).to.deep.equal(markov2.generate());

		expect(markov1.generate()).to.deep.equal(markov2.generate());

		expect(markov1.generate()).to.deep.equal(markov2.generate());

		expect(markov1.generate()).to.deep.equal(markov2.generate());
	});
});
