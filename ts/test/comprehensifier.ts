import {expect} from "chai";
import {Comprehensifier} from "../main/comprehensifier";

describe("Comprehensifier", () => {
	it("should encode to binary base", () => {
		const comprehensifier = new BinaryComprehensifier();
		expect(comprehensifier.comprehensify(Uint8Array.of(0))).to.equal((0).toString(2));
		expect(comprehensifier.comprehensify(Uint8Array.of(222))).to.equal((222).toString(2));
		expect(comprehensifier.comprehensify(Uint8Array.from([1, 0]))).to.equal((256).toString(2));
		expect(comprehensifier.comprehensify(Uint8Array.from([1, 2, 3, 4, 5, 6, 7]))).to.equal((256).toString(2));
	});

	it("should handle data larger than Number.MAX_SAFE_INTEGER", () => {
		const comprehensifier = new BinaryComprehensifier();
		expect(comprehensifier.comprehensify(Uint8Array.from([255, 255, 255, 255, 255, 255, 255, 255, 255, 255]))).to.equal("11111111111111111111111111111111111111111111111111111111111111111111111111111111");
	});

	it("should encode to large base", () => {
		const comprehensifier = new LargeBaseComprehensifier();
		expect(comprehensifier.comprehensify(Uint8Array.of(0))).to.equal("0");
		expect(comprehensifier.comprehensify(Uint8Array.of(40))).to.equal("40");
		expect(comprehensifier.comprehensify(Uint8Array.of(41))).to.equal("1:0");
	});

	// it("should decode from binary base", () => {
	// 	const comprehensifier = new BinaryComprehensifier();
	// 	expect(comprehensifier.uncomprehensify((0).toString(2))).to.equal(Uint8Array.of(0));
	// 	expect(comprehensifier.uncomprehensify((222).toString(2))).to.equal(Uint8Array.of(222));
	// 	expect(comprehensifier.uncomprehensify((1337).toString(2))).to.equal(Uint8Array.of(1337));
	// });

	// it("should encode to large base", () => {
	// 	const comprehensifier = new LargeBaseComprehensifier();
	// 	expect(comprehensifier.uncomprehensify("0")).to.equal(0);
	// 	expect(comprehensifier.uncomprehensify("40")).to.equal(40);
	// 	expect(comprehensifier.uncomprehensify("1:0")).to.equal(41);
	// });
	//
	// it("should encode large message", () => {
	// 	const comprehensifier = new LargeBaseComprehensifier();
	// 	expect(comprehensifier.uncomprehensify("0")).to.equal(0);
	// 	expect(comprehensifier.uncomprehensify("40")).to.equal(40);
	// 	expect(comprehensifier.uncomprehensify("1:0")).to.equal(41);
	// });
});

class BinaryComprehensifier extends Comprehensifier {
	getWords(): Array<string> {
		return ["0", "1"];
	}

	split(message: string): Array<string> {
		return message.split("");
	}

	join(words: Array<string>): string {
		return words.join("");
	}
}

class LargeBaseComprehensifier extends Comprehensifier {
	getWords(): Array<string> {
		return [
			"0",
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"10",
			"11",
			"12",
			"14",
			"14",
			"15",
			"16",
			"17",
			"18",
			"19",
			"20",
			"21",
			"22",
			"23",
			"24",
			"25",
			"26",
			"27",
			"28",
			"29",
			"30",
			"31",
			"32",
			"33",
			"34",
			"35",
			"36",
			"37",
			"38",
			"39",
			"40"
		];
	}

	split(message: string): Array<string> {
		return message.split(":");
	}

	join(words: Array<string>): string {
		return words.join(":");
	}
}
