import { parseCSV } from "./csv.helper";

describe("parseCSV", () => {
  it("should parse CSV string into an array of objects correctly", () => {

    const csvString = `id,name,photo
      1,Tokyo,"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/500px-Skyscrapers_of_Shinjuku_2009_January.jpg"
      2,Jakarta,"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Jakarta_Pictures-1.jpg/327px-Jakarta_Pictures-1.jpg"
      3,Delhi,"https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/IN-DL.svg/439px-IN-DL.svg.png"`;

    const expectedOutput = [
      { id: 1, name: "Tokyo", photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/500px-Skyscrapers_of_Shinjuku_2009_January.jpg" },
      { id: 2, name: "Jakarta", photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Jakarta_Pictures-1.jpg/327px-Jakarta_Pictures-1.jpg" },
      { id: 3, name: "Delhi", photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/IN-DL.svg/439px-IN-DL.svg.png" }
    ];

    expect(parseCSV(csvString)).toEqual(expectedOutput);
  });

  it("should convert value to number, if it possible", () => {

    const csvString = `id,price
                        1,1000
                        2,$1500
                        3.5,2000`;

    const expectedOutput = [
      { id: 1, price: 1000 },
      { id: 2, price: "$1500" },
      { id: 3.5, price: 2000 }
    ];

    expect(parseCSV(csvString)).toEqual(expectedOutput);
  });

  it("should trim whitespaces from headers", () => {

    const csvString = `id       ,   name   ,        photo
                        1,Tokyo,"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/500px-Skyscrapers_of_Shinjuku_2009_January.jpg"
                        2,Jakarta,"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Jakarta_Pictures-1.jpg/327px-Jakarta_Pictures-1.jpg"
                        3,Delhi,"https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/IN-DL.svg/439px-IN-DL.svg.png"`;

    const expectedHeaders = ["id", "name", "photo"];

    const actualHeaders = parseCSV(csvString)[0] && Object.keys(parseCSV(csvString)[0]);

    expect(actualHeaders).toEqual(expectedHeaders);
  });

  it("should trim whitespaces from values", () => {

    const csvString = `id,name,description
                        1,Tokyo ,capital of Japan
                        2,Jakarta, capital of Indonesia and second largest urban area in the world after Tokyo
                        3, Delhi, The capital city of India.`;

    const expectedOutput = [
      { id: 1, name: "Tokyo", description: "capital of Japan" },
      { id: 2, name: "Jakarta", description: "capital of Indonesia and second largest urban area in the world after Tokyo" },
      { id: 3, name: "Delhi", description: "The capital city of India." }
    ];

    expect(parseCSV(csvString)).toEqual(expectedOutput);
  });
});
