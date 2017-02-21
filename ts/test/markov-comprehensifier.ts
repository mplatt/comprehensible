import {expect} from "chai";
import {MarkovComprehensifier} from "../main/markov-comprehensifier";

const seed = "Sun Mercury Venus Earth Mars Jupiter Saturn Uranus Neptune Pluto Ceres Pallas Vesta Hygiea Interamnia Europa Davida Sylvia Cybele Eunomia Juno Euphrosyne Hektor Thisbe Bamberga Patientia Herculina Doris Ursula Camilla Eugenia Iris Amphitrite".toLowerCase().split(" ");

describe("Markov comprehensifier", () => {
	const comprehensifier = new MarkovComprehensifier(seed, 60, 4, 10);

	it("should encode Uint8Array data", () => {
		expect(comprehensifier.comprehensifyUint8Array(Uint8Array.of(0))).to.equal("Uphrosyne");
		expect(comprehensifier.uncomprehensifyUint8Array("Uphrosyne")).to.deep.equal(Uint8Array.of(0));

		expect(comprehensifier.comprehensifyUint8Array(Uint8Array.of(90))).to.equal("Ygiea Atientia");
		expect(comprehensifier.uncomprehensifyUint8Array("Ygiea Atientia")).to.deep.equal(Uint8Array.of(90));
	});


	it("should encode number data", () => {
		expect(comprehensifier.comprehensifyNumber(0)).to.equal("Uphrosyne");
		expect(comprehensifier.uncomprehensifyNumber("Uphrosyne")).to.equal(0);

		expect(comprehensifier.comprehensifyNumber(1337)).to.equal("Eramnia Camilla");
		expect(comprehensifier.uncomprehensifyNumber("Eramnia Camilla")).to.equal(1337);
	});

	it("should encode UUID data", () => {
		expect(comprehensifier.comprehensifyUUID("f81d4fae-7dec-11d0-a765-00a0c91e6bf6")).to.equal("Amnia Milla Milla Atientia Ektor Ercury Jupiter Saturn Interamnia Amnia Genia Ceres Piter Thisbe Saturn Unomia Hitrite Ptune Amilla Unomia Unomia Osyne");
		expect(comprehensifier.uncomprehensifyUUID("Amnia Milla Milla Atientia Ektor Ercury Jupiter Saturn Interamnia Amnia Genia Ceres Piter Thisbe Saturn Unomia Hitrite Ptune Amilla Unomia Unomia Osyne")).to.equal("f81d4fae-7dec-11d0-a765-00a0c91e6bf6");
	});

	it("should refuse initalisation from insufficient seed", () => {
		expect(function () {
			new MarkovComprehensifier(["aba", "bab"], 5000, 4, 10);
		}).to.throw("Can't generate corpus for given specifications. Try reducing the number of words or increasing their length.");
	});
});
