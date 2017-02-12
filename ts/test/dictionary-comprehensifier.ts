import {expect} from "chai";
import {DictionaryComprehensifier} from "../main/dictionary-comprehensifier";

describe("Dictionary Comprehensifier", () => {
	it("should encode one-word terms", () => {
		const vocabulary = ["Lorem", "Ipsum", "Dolor"];
		const comprehensifier = new DictionaryComprehensifier(vocabulary);
		expect(comprehensifier.comprehensify(0)).to.equal("Lorem");
	});

	it("should encode multi-word terms", () => {
		const vocabulary = ["Lorem", "Ipsum", "Dolor"];
		const comprehensifier = new DictionaryComprehensifier(vocabulary);
		expect(comprehensifier.comprehensify(9)).to.equal("Ipsum Lorem Lorem");
	});

	it("should decode one-word terms", () => {
		const vocabulary = ["Lorem", "Ipsum", "Dolor"];
		const comprehensifier = new DictionaryComprehensifier(vocabulary);
		expect(comprehensifier.uncomprehensify("Lorem")).to.equal(0);
	});

	it("should decode multi-word terms", () => {
		const vocabulary = ["Lorem", "Ipsum", "Dolor"];
		const comprehensifier = new DictionaryComprehensifier(vocabulary);
		expect(comprehensifier.uncomprehensify("Ipsum Lorem Lorem")).to.equal(9);
	});
});
