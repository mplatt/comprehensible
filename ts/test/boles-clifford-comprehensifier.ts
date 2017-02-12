import {expect} from "chai";
import {BolesCliffordComprehensifier} from "../main/boles-clifford-comprehensifier";

describe("Visual Comprehensifier", () => {
	it("should encode longer message", () => {
		const comprehensifier = new BolesCliffordComprehensifier(0);
		expect(comprehensifier.comprehensify(199399426)).to.equal("Bogus");
		expect(comprehensifier.uncomprehensify("Bogus")).to.equal(199399426);
	});

	it("should encode using the whole available range for 0 distance", () => {
		const comprehensifier = new BolesCliffordComprehensifier(0);
		expect(comprehensifier.comprehensify(51)).to.equal("Z");
		expect(comprehensifier.uncomprehensify("Z")).to.equal(51);
	});

	it("should use the proper alphabet for distance 0", () => {
		const comprehensifier = new BolesCliffordComprehensifier(0);
		expect(comprehensifier.getWords().join("")).to.equal("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
	});

	it("should use the proper alphabet for distance 5", () => {
		const comprehensifier = new BolesCliffordComprehensifier(5);
		expect(comprehensifier.getWords().join("")).to.equal("abdefhjmnrtyABDEFGHJLMNQRTY");
	});

	it("should use the proper alphabet for distance 10", () => {
		const comprehensifier = new BolesCliffordComprehensifier(10);
		expect(comprehensifier.getWords().join("")).to.equal("fhrtyABDGHLMNRY");
	});

	it("should use the proper alphabet for distance 15", () => {
		const comprehensifier = new BolesCliffordComprehensifier(15);
		expect(comprehensifier.getWords().join("")).to.equal("AHL");
	});
});
