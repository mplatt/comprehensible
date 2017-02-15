import {expect} from "chai";
import {DictionaryComprehensifier} from "../main/dictionary-comprehensifier";

// describe("Dictionary Comprehensifier", () => {
// 	it("should encode one-word terms", () => {
// 		const vocabulary = ["Lorem", "Ipsum", "Dolor"];
// 		const comprehensifier = new DictionaryComprehensifier(vocabulary);
// 		expect(comprehensifier.comprehensifyUint8Array(0)).to.equal("Lorem");
// 	});
//
// 	it("should encode multi-word terms", () => {
// 		const vocabulary = ["Lorem", "Ipsum", "Dolor"];
// 		const comprehensifier = new DictionaryComprehensifier(vocabulary);
// 		expect(comprehensifier.comprehensifyUint8Array(9)).to.equal("Ipsum Lorem Lorem");
// 	});
//
// 	it("should decode one-word terms", () => {
// 		const vocabulary = ["Lorem", "Ipsum", "Dolor"];
// 		const comprehensifier = new DictionaryComprehensifier(vocabulary);
// 		expect(comprehensifier.uncomprehensifyUint8Array("Lorem")).to.equal(0);
// 	});
//
// 	it("should decode multi-word terms", () => {
// 		const vocabulary = ["Lorem", "Ipsum", "Dolor"];
// 		const comprehensifier = new DictionaryComprehensifier(vocabulary);
// 		expect(comprehensifier.uncomprehensifyUint8Array("Ipsum Lorem Lorem")).to.equal(9);
// 	});
//
// 	it("should encode to binary base", () => {
// 		const comprehensifier = new DictionaryComprehensifier(["0", "1"]);
// 		expect(comprehensifier.comprehensifyUint8Array(0)).to.equal((0).toString(2));
// 		expect(comprehensifier.comprehensifyUint8Array(1337)).to.equal((1337).toString(2).split("").join(" "));
// 	});
// });
