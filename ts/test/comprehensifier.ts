import {expect} from "chai";
import {Comprehensifier} from "../main/comprehensifier";

describe("Comprehensifier working with Uint8Array data", () => {
	it("should encode to binary base", () => {
		const comprehensifier = new BinaryComprehensifier();
		expect(comprehensifier.comprehensifyUint8Array(Uint8Array.of(0))).to.equal((0).toString(2));
		expect(comprehensifier.comprehensifyUint8Array(Uint8Array.of(222))).to.equal((222).toString(2));
		expect(comprehensifier.comprehensifyUint8Array(Uint8Array.from([1, 0]))).to.equal((256).toString(2));
		expect(comprehensifier.comprehensifyUint8Array(Uint8Array.from([1, 2, 3, 4, 5, 6, 7]))).to.equal((283686952306183).toString(2));
	});

	it("should handle data larger than Number.MAX_SAFE_INTEGER", () => {
		const comprehensifier = new BinaryComprehensifier();
		expect(comprehensifier.comprehensifyUint8Array(Uint8Array.from([255, 255, 255, 255, 255, 255, 255, 255, 255, 255]))).to.equal("11111111111111111111111111111111111111111111111111111111111111111111111111111111");
	});

	it("should encode to large base", () => {
		const comprehensifier = new LargeBaseComprehensifier();
		expect(comprehensifier.comprehensifyUint8Array(Uint8Array.of(0))).to.equal("0");
		expect(comprehensifier.comprehensifyUint8Array(Uint8Array.of(40))).to.equal("40");
		expect(comprehensifier.comprehensifyUint8Array(Uint8Array.of(41))).to.equal("1:0");
	});

	it("should decode from binary base", () => {
		const comprehensifier = new BinaryComprehensifier();
		expect(comprehensifier.uncomprehensifyUint8Array((0).toString(2))).to.deep.equal(Uint8Array.of(0));
		expect(comprehensifier.uncomprehensifyUint8Array((222).toString(2))).to.deep.equal(Uint8Array.of(222));
	});

	it("should encode to large base", () => {
		const comprehensifier = new LargeBaseComprehensifier();
		expect(comprehensifier.uncomprehensifyUint8Array("0")).to.deep.equal(Uint8Array.of(0));
		expect(comprehensifier.uncomprehensifyUint8Array("40")).to.deep.equal(Uint8Array.of(40));
		expect(comprehensifier.uncomprehensifyUint8Array("1:0")).to.deep.equal(Uint8Array.of(41));
	});

	it("should encode large message", () => {
		const comprehensifier = new LargeBaseComprehensifier();
		expect(comprehensifier.uncomprehensifyUint8Array("0")).to.deep.equal(Uint8Array.of(0));
		expect(comprehensifier.uncomprehensifyUint8Array("40")).to.deep.equal(Uint8Array.of(40));
		expect(comprehensifier.uncomprehensifyUint8Array("1:0")).to.deep.equal(Uint8Array.of(41));
	});
});

describe("Comprehensifier working with number data", () => {
	it("should encode and decode to binary base", () => {
		const comprehensifier = new BinaryComprehensifier();

		expect(comprehensifier.comprehensifyNumber(0)).to.equal((0).toString(2));
		expect(comprehensifier.uncomprehensifyNumber((0).toString(2))).to.equal(0);

		expect(comprehensifier.comprehensifyNumber(1337)).to.equal((1337).toString(2));
		expect(comprehensifier.uncomprehensifyNumber((1337).toString(2))).to.equal(1337);

		expect(comprehensifier.comprehensifyNumber(Number.MAX_SAFE_INTEGER)).to.equal((Number.MAX_SAFE_INTEGER).toString(2));
		expect(comprehensifier.uncomprehensifyNumber((Number.MAX_SAFE_INTEGER).toString(2))).to.equal(Number.MAX_SAFE_INTEGER);
	});

	it("should encode and decode to large base", () => {
		const comprehensifier = new LargeBaseComprehensifier();

		expect(comprehensifier.comprehensifyNumber(0)).to.equal("0");
		expect(comprehensifier.uncomprehensifyNumber("0")).to.equal(0);

		expect(comprehensifier.comprehensifyNumber(1337)).to.equal("32:25");
		expect(comprehensifier.uncomprehensifyNumber("32:25")).to.equal(1337);

		expect(comprehensifier.comprehensifyNumber(9007199254740991)).to.equal("27:21:1:1:35:13:3:3:15:32");
		expect(comprehensifier.uncomprehensifyNumber("27:21:1:1:35:13:3:3:15:32")).to.equal(9007199254740991);
	});
});

describe("Comprehensifier working with UUID-like data", () => {
	it("should encode and decode to binary base", () => {
		const comprehensifier = new BinaryComprehensifier();

		expect(comprehensifier.comprehensifyUUID("f81d4fae-7dec-11d0-a765-00a0c91e6bf6")).to.equal("11111000000111010100111110101110011111011110110000010001110100001010011101100101000000001010000011001001000111100110101111110110");
		expect(comprehensifier.uncomprehensifyUUID("11111000000111010100111110101110011111011110110000010001110100001010011101100101000000001010000011001001000111100110101111110110")).to.equal("f81d4fae-7dec-11d0-a765-00a0c91e6bf6");
	});

	it("should encode and decode to binary base", () => {
		const comprehensifier = new LargeBaseComprehensifier();

		expect(comprehensifier.comprehensifyUUID("f81d4fae-7dec-11d0-a765-00a0c91e6bf6")).to.equal("26:22:38:34:1:11:25:39:35:14:11:26:7:5:7:16:33:8:24:12:28:14:32:10");
		expect(comprehensifier.uncomprehensifyUUID("26:22:38:34:1:11:25:39:35:14:11:26:7:5:7:16:33:8:24:12:28:14:32:10")).to.equal("f81d4fae-7dec-11d0-a765-00a0c91e6bf6");
	});
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
			"13",
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
