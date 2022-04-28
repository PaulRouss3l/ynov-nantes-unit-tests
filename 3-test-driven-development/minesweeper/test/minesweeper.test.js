import functions from "../src/minesweeper";

describe("setupGame tests", function () {
  it("should return an object", () => {
    expect(typeof functions.setupGame(4,4,2)).toBe("object")
  });
  it("should have bombs position", () => {
    const grid = [
      ["*", ".", ".", "."],
      [".", ".", ".", "."],
      [".", "*", ".", "."],
      [".", ".", ".", "."],
    ];
    expect(functions.getBombsPosition(grid)).toStrictEqual([
      ["0", "0"],
      ["2", "1"],
    ]);
  });
  it("should have transform safe case next to bombs", () => {
    const grid = [
      ["*", ".", ".", "."],
      [".", ".", ".", "."],
      [".", "*", ".", "."],
      [".", ".", ".", "."],
    ];
    const bombsPosition = [
      [0, 0],
      [2, 1],
    ];
    expect(functions.putSafeCaseNextToBomb(grid, bombsPosition)).toStrictEqual([
      ["*", "1", ".", "."],
      ["2", "2", "1", "."],
      ["1", "*", "1", "."],
      ["1", "1", "1", "."],
    ]);
  });
  it("should have transform '.' chars into '0'", () => {
    const grid = [
      ["*", "1", ".", "."],
      ["2", "2", "1", "."],
      ["1", "*", "1", "."],
      ["1", "1", "1", "."],
    ];
    expect(functions.changePointTo0(grid)).toStrictEqual([
      ["*", "1", "0", "0"],
      ["2", "2", "1", "0"],
      ["1", "*", "1", "0"],
      ["1", "1", "1", "0"],
    ]);
  });
});
