Comprehensible
===============

_Comprehensible_ represents arbitrary data in human-readable formats to allow for easier verbal (e.g. reading out an identifier on the telephone) or visual transfer (e.g. capturing an identifier on a paper form).

Input Formats
-------------

### [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Arbitrary data can be encoded using Uint8Array typed arrays representing an array of 8-bit unsigned integers.

### [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

Numbers in the JavaScript _MAX_SAFE_INTEGER_ range (0..2⁵³- 1).

### [UUID](https://tools.ietf.org/html/rfc4122)

UUIDs are treated as 16 hexadecimal octets (leading to negligible wastefulness of available target dictionary size during encoding).

Comprehensifiers
----------------

### Dictionary Comprehensifier

A function that--given a dictionary--encodes arbitrary data to a list of words contained in this dictionary.

E.g.: Represents `11d0a76500a0c91e6bf6` as `Cause Chance Amount Be Substance Substance Question Different Quality Change Sign Wise`.

### Boles/Clifford Comprehensifier

A function using the findings of Boles and Clifford <sup name="a1">[1](#f1)</sup> to represent data in a visually less ambiguous form using a subset of the Latin alphabet.

E.g.: Represents `f81d4fae-7dec-11d0-a765-00a0c91e6bf6` as `fRAQVvVQubOeofxSpyopWuM`.

### Markov Comprehensifier

A function representing data as random words, generated using a [Markov chain](http://en.wikipedia.org/wiki/Markov_chain) based on a corpus provided.

Usage
-----

```javascript
const comprehensible = require("comprehensible");

const bolesCliffordComprehensifier = comprehensible.bolesCliffordComprehensifier();

console.log(bolesCliffordComprehensifier.comprehensifyNumber(777));
// tBN

console.log(bolesCliffordComprehensifier.uncomprehensifyNumber("tBN"));
// 777

console.log(bolesCliffordComprehensifier.comprehensifyUUID("f81d4fae-7dec-11d0-a765-00a0c91e6bf6"));
// DHHYhYRhABfHYrRGGLNDtARLHNrNLBMNR

console.log(bolesCliffordComprehensifier.uncomprehensifyUUID("DHHYhYRhABfHYrRGGLNDtARLHNrNLBMNR"));
// f81d4fae-7dec-11d0-a765-00a0c91e6bf6

console.log(bolesCliffordComprehensifier.comprehensifyUint8Array(Uint8Array.of(222)));
// YN

console.log(bolesCliffordComprehensifier.uncomprehensifyUint8Array("YN"));
// Uint8Array [ 222 ]


const dummyDictionary = ["Amount", "Argument", "Art", "Be", "Beautiful", "Belief", "Cause", "Certain", "Chance", "Change", "Clear", "Common", "Comparison", "Condition", "Connection", "Copy", "Decision", "Degree", "Desire", "Development", "Different", "Do", "Education", "End", "Event", "Examples", "Existence", "Experience", "Fact", "Fear", "Feeling", "Fiction", "Force", "Form", "Free", "General", "Get", "Give", "Good", "Government", "Happy", "Have", "History", "Idea", "Important", "Interest", "Knowledge", "Law", "Let", "Level", "Living", "Love", "Make", "Material", "Measure", "Mind", "Motion", "Name", "Nation", "Natural", "Necessary", "Normal", "Number", "Observation", "Opposite", "Order", "Organization", "Part", "Place", "Pleasure", "Possible", "Power", "Probable", "Property", "Purpose", "Quality", "Question", "Reason", "Relation", "Representative", "Respect", "Responsible", "Right", "Same", "Say", "Science", "See", "Seem", "Sense", "Sign", "Simple", "Society", "Sort", "Special", "Substance", "Thing", "Thought", "True", "Use", "Way", "Wise", "Word", "Work"];
const dictionaryComprehensifier = comprehensible.dictionaryComprehensifier(dummyDictionary);

console.log(dictionaryComprehensifier.comprehensifyNumber(777));
// Certain Motion

console.log(dictionaryComprehensifier.uncomprehensifyNumber("Certain Motion"));
// 777

console.log(dictionaryComprehensifier.comprehensifyUUID("f81d4fae-7dec-11d0-a765-00a0c91e6bf6"));
// Argument Simple Purpose Living Copy Let Event Society Cause Form Sign Different Fact Use Science Education Connection Be Interest Place

console.log(dictionaryComprehensifier.uncomprehensifyUUID("Argument Simple Purpose Living Copy Let Event Society Cause Form Sign Different Fact Use Science Education Connection Be Interest Place"));
// f81d4fae-7dec-11d0-a765-00a0c91e6bf6

console.log(dictionaryComprehensifier.comprehensifyUint8Array(Uint8Array.of(222)));
// Art Decision

console.log(dictionaryComprehensifier.uncomprehensifyUint8Array("Art Decision"));
// Uint8Array [ 222 ]

const dummyCorpus = "Sun Mercury Venus Earth Mars Jupiter Saturn Uranus Neptune Pluto Ceres Pallas Vesta Hygiea Interamnia Europa Davida Sylvia Cybele Eunomia Juno Euphrosyne Hektor Thisbe Bamberga Patientia Herculina Doris Ursula Camilla Eugenia Iris Amphitrite".toLowerCase().split(" ");
const markovComprehensifier = comprehensible.markovComprehensifier(dummyCorpus);

console.log(markovComprehensifier.comprehensifyNumber(777));
// Tuneptunomia Nomillas

console.log(markovComprehensifier.uncomprehensifyNumber("Tuneptunomia Nomillas"));
// 777

console.log(markovComprehensifier.comprehensifyUUID("f81d4fae-7dec-11d0-a765-00a0c91e6bf6"));
// Millas Rthisbercursulas Rsulas Tuneptunomia Las Uropatia Pturosylvidavia Rthisbele Oritrisbele Atunepturosylvia Hisberculintientia Isbele Isberga Ugenterga Eresta Ropatursunomillas Urn Upiteranus Rthisbercursulas Irisbele

console.log(markovComprehensifier.uncomprehensifyUUID("Millas Rthisbercursulas Rsulas Tuneptunomia Las Uropatia Pturosylvidavia Rthisbele Oritrisbele Atunepturosylvia Hisberculintientia Isbele Isberga Ugenterga Eresta Ropatursunomillas Urn Upiteranus Rthisbercursulas Irisbele"));
// f81d4fae-7dec-11d0-a765-00a0c91e6bf6

console.log(markovComprehensifier.comprehensifyUint8Array(Uint8Array.of(222)));
// Arsunomillas Teramberculas

console.log(markovComprehensifier.uncomprehensifyUint8Array("Arsunomillas Teramberculas"));
// Uint8Array [ 222 ]
```

Roadmap
-------

 - More meaningful error messages.
 - Extend visual comprehensifiers to to a bigger character pool (e.g. alphanumeric). 
 - Build a character pool for phonetically easily distinguishable _characters_.
 - Implement [Bubble Babble Binary Data Encoding]()http://wiki.yak.net/589/Bubble_Babble_Encoding.txt)

References
----------

<strong id="f1">1</strong>: Boles, D.B. & Clifford, J.E. Behavior Research Methods, Instruments, & Computers (1989) 21: 579. doi:10.3758/BF03210580
