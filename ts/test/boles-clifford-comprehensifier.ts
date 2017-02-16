import {expect} from "chai";
import {BolesCliffordComprehensifier} from "../main/boles-clifford-comprehensifier";

describe("Boles Clifford comprehensifier", () => {
	it("should encode Uint8Array data with 0 distance", () => {
		const comprehensifier = new BolesCliffordComprehensifier(0);

		expect(comprehensifier.comprehensifyUint8Array(Uint8Array.of(0))).to.equal("a");
		expect(comprehensifier.uncomprehensifyUint8Array("a")).to.deep.equal(Uint8Array.of(0));

		expect(comprehensifier.comprehensifyUint8Array(Uint8Array.of(90))).to.equal("bM");
		expect(comprehensifier.uncomprehensifyUint8Array("bM")).to.deep.equal(Uint8Array.of(90));
	});

	it("should encode Uint8Array data with 5 distance", () => {
		const comprehensifier = new BolesCliffordComprehensifier(5);

		expect(comprehensifier.comprehensifyUint8Array(Uint8Array.of(0))).to.equal("a");
		expect(comprehensifier.uncomprehensifyUint8Array("a")).to.deep.equal(Uint8Array.of(0));

		expect(comprehensifier.comprehensifyUint8Array(Uint8Array.of(90))).to.equal("er");
		expect(comprehensifier.uncomprehensifyUint8Array("er")).to.deep.equal(Uint8Array.of(90));
	});

	it("should encode Uint8Array data with 10 distance", () => {
		const comprehensifier = new BolesCliffordComprehensifier(10);

		expect(comprehensifier.comprehensifyUint8Array(Uint8Array.of(0))).to.equal("f");
		expect(comprehensifier.uncomprehensifyUint8Array("f")).to.deep.equal(Uint8Array.of(0));

		expect(comprehensifier.comprehensifyUint8Array(Uint8Array.of(90))).to.equal("Bf");
		expect(comprehensifier.uncomprehensifyUint8Array("Bf")).to.deep.equal(Uint8Array.of(90));
	});

	it("should encode Uint8Array data with 15 distance", () => {
		const comprehensifier = new BolesCliffordComprehensifier(15);

		expect(comprehensifier.comprehensifyUint8Array(Uint8Array.of(0))).to.equal("A");
		expect(comprehensifier.uncomprehensifyUint8Array("A")).to.deep.equal(Uint8Array.of(0));

		expect(comprehensifier.comprehensifyUint8Array(Uint8Array.of(90))).to.equal("HAHAA");
		expect(comprehensifier.uncomprehensifyUint8Array("HAHAA")).to.deep.equal(Uint8Array.of(90));
	});

	it("should encode Uint8Array data with 20 distance", () => {
		const comprehensifier = new BolesCliffordComprehensifier(20);

		expect(comprehensifier.comprehensifyUint8Array(Uint8Array.of(0))).to.equal("A");
		expect(comprehensifier.uncomprehensifyUint8Array("A")).to.deep.equal(Uint8Array.of(0));

		expect(comprehensifier.comprehensifyUint8Array(Uint8Array.of(90))).to.equal("HAHAA");
		expect(comprehensifier.uncomprehensifyUint8Array("HAHAA")).to.deep.equal(Uint8Array.of(90));
	});
});
