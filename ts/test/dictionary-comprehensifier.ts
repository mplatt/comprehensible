import {expect} from "chai";
import {DictionaryComprehensifier} from "../main/dictionary-comprehensifier";

const shortDictionary = ["Lorem", "Ipsum", "Dolor"];
const longDictionary = ["Amount", "Argument", "Art", "Be", "Beautiful", "Belief", "Cause", "Certain", "Chance", "Change", "Clear", "Common", "Comparison", "Condition", "Connection", "Copy", "Decision", "Degree", "Desire", "Development", "Different", "Do", "Education", "End", "Event", "Examples", "Existence", "Experience", "Fact", "Fear", "Feeling", "Fiction", "Force", "Form", "Free", "General", "Get", "Give", "Good", "Government", "Happy", "Have", "History", "Idea", "Important", "Interest", "Knowledge", "Law", "Let", "Level", "Living", "Love", "Make", "Material", "Measure", "Mind", "Motion", "Name", "Nation", "Natural", "Necessary", "Normal", "Number", "Observation", "Opposite", "Order", "Organization", "Part", "Place", "Pleasure", "Possible", "Power", "Probable", "Property", "Purpose", "Quality", "Question", "Reason", "Relation", "Representative", "Respect", "Responsible", "Right", "Same", "Say", "Science", "See", "Seem", "Sense", "Sign", "Simple", "Society", "Sort", "Special", "Substance", "Thing", "Thought", "True", "Use", "Way", "Wise", "Word", "Work"];

describe("Dictionary comprehensifier", () => {
	it("should encode Uint8Array data with a short dictionary", () => {
		const comprehensifier = new DictionaryComprehensifier(shortDictionary);

		expect(comprehensifier.comprehensifyUint8Array(Uint8Array.of(0))).to.equal("Lorem");
		expect(comprehensifier.uncomprehensifyUint8Array("Lorem")).to.deep.equal(Uint8Array.of(0));

		expect(comprehensifier.comprehensifyUint8Array(Uint8Array.of(90))).to.equal("Ipsum Lorem Ipsum Lorem Lorem");
		expect(comprehensifier.uncomprehensifyUint8Array("Ipsum Lorem Ipsum Lorem Lorem")).to.deep.equal(Uint8Array.of(90));
	});

	it("should encode Uint8Array data with a long dictionary", () => {
		const comprehensifier = new DictionaryComprehensifier(longDictionary);

		expect(comprehensifier.comprehensifyUint8Array(Uint8Array.of(0))).to.equal("Amount");
		expect(comprehensifier.uncomprehensifyUint8Array("Amount")).to.deep.equal(Uint8Array.of(0));

		expect(comprehensifier.comprehensifyUint8Array(Uint8Array.of(120))).to.equal("Argument Degree");
		expect(comprehensifier.uncomprehensifyUint8Array("Argument Degree")).to.deep.equal(Uint8Array.of(120));
	});

	it("should encode number data with a short dictionary", () => {
		const comprehensifier = new DictionaryComprehensifier(shortDictionary);

		expect(comprehensifier.comprehensifyNumber(0)).to.equal("Lorem");
		expect(comprehensifier.uncomprehensifyNumber("Lorem")).to.equal(0);

		expect(comprehensifier.comprehensifyNumber(1337)).to.equal("Ipsum Dolor Ipsum Ipsum Ipsum Ipsum Dolor");
		expect(comprehensifier.uncomprehensifyNumber("Ipsum Dolor Ipsum Ipsum Ipsum Ipsum Dolor")).to.equal(1337);
	});

	it("should encode number data with a long dictionary", () => {
		const comprehensifier = new DictionaryComprehensifier(longDictionary);

		expect(comprehensifier.comprehensifyNumber(0)).to.equal("Amount");
		expect(comprehensifier.uncomprehensifyNumber("Amount")).to.equal(0);

		expect(comprehensifier.comprehensifyNumber(1337)).to.equal("Comparison Word");
		expect(comprehensifier.uncomprehensifyNumber("Comparison Word")).to.equal(1337);
	});

	it("should encode UUID data with a short dictionary", () => {
		const comprehensifier = new DictionaryComprehensifier(shortDictionary);

		expect(comprehensifier.comprehensifyUUID("f81d4fae-7dec-11d0-a765-00a0c91e6bf6")).to.equal("Dolor Lorem Dolor Lorem Lorem Dolor Lorem Ipsum Dolor Lorem Dolor Dolor Dolor Dolor Dolor Ipsum Ipsum Dolor Lorem Ipsum Ipsum Lorem Lorem Dolor Lorem Ipsum Dolor Lorem Ipsum Lorem Dolor Ipsum Lorem Lorem Dolor Dolor Dolor Ipsum Dolor Ipsum Lorem Ipsum Dolor Dolor Ipsum Dolor Dolor Ipsum Dolor Lorem Dolor Ipsum Ipsum Dolor Lorem Ipsum Lorem Dolor Lorem Dolor Lorem Dolor Dolor Dolor Dolor Lorem Lorem Ipsum Lorem Ipsum Ipsum Dolor Dolor Dolor Lorem Dolor Ipsum Dolor Dolor Ipsum Ipsum");
		expect(comprehensifier.uncomprehensifyUUID("Dolor Lorem Dolor Lorem Lorem Dolor Lorem Ipsum Dolor Lorem Dolor Dolor Dolor Dolor Dolor Ipsum Ipsum Dolor Lorem Ipsum Ipsum Lorem Lorem Dolor Lorem Ipsum Dolor Lorem Ipsum Lorem Dolor Ipsum Lorem Lorem Dolor Dolor Dolor Ipsum Dolor Ipsum Lorem Ipsum Dolor Dolor Ipsum Dolor Dolor Ipsum Dolor Lorem Dolor Ipsum Ipsum Dolor Lorem Ipsum Lorem Dolor Lorem Dolor Lorem Dolor Dolor Dolor Dolor Lorem Lorem Ipsum Lorem Ipsum Ipsum Dolor Dolor Dolor Lorem Dolor Ipsum Dolor Dolor Ipsum Ipsum")).to.equal("f81d4fae-7dec-11d0-a765-00a0c91e6bf6");
	});

	it("should encode UUID data with a long dictionary", () => {
		const comprehensifier = new DictionaryComprehensifier(longDictionary);

		expect(comprehensifier.comprehensifyUUID("f81d4fae-7dec-11d0-a765-00a0c91e6bf6")).to.equal("Argument Simple Purpose Living Copy Let Event Society Cause Form Sign Different Fact Use Science Education Connection Be Interest Place");
		expect(comprehensifier.uncomprehensifyUUID("Argument Simple Purpose Living Copy Let Event Society Cause Form Sign Different Fact Use Science Education Connection Be Interest Place")).to.equal("f81d4fae-7dec-11d0-a765-00a0c91e6bf6");
	});
});
