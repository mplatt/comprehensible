import {expect} from "chai";
import {Comprehensifier} from "../main/comprehensifier";

describe("Comprehensifier", () => {
	it("should encode to binary base", () => {
		const comprehensifier = new BinaryComprehensifier();
		expect(comprehensifier.comprehensify(0)).to.equal((0).toString(2));
		expect(comprehensifier.comprehensify(1337)).to.equal((1337).toString(2));
	});

	it("should encode to large base", () => {
		const comprehensifier = new LargeBaseComprehensifier();
		expect(comprehensifier.comprehensify(0)).to.equal("0:");
		expect(comprehensifier.comprehensify(40)).to.equal("40:");
		expect(comprehensifier.comprehensify(41)).to.equal("1:0:");
	});
});

class BinaryComprehensifier extends Comprehensifier {
	words: Array<string>;

	constructor() {
		super();
		this.words = ["0", "1"];
	}
}

class LargeBaseComprehensifier extends Comprehensifier {
	words: Array<string>;

	constructor() {
		super();
		this.words = [
			"0:",
			"1:",
			"2:",
			"3:",
			"4:",
			"5:",
			"6:",
			"7:",
			"8:",
			"9:",
			"10:",
			"11:",
			"12:",
			"14:",
			"14:",
			"15:",
			"16:",
			"17:",
			"18:",
			"19:",
			"20:",
			"21:",
			"22:",
			"23:",
			"24:",
			"25:",
			"26:",
			"27:",
			"28:",
			"29:",
			"30:",
			"31:",
			"32:",
			"33:",
			"34:",
			"35:",
			"36:",
			"37:",
			"38:",
			"39:",
			"40:"
		];
	}
}
