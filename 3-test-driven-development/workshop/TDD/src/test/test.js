import {
  field_one_bomb4x4,
  field_one_bomb5x4,
  field_only_points4x4,
  field_only_points5x4,
  field_multi_bomb4x4
} from "../fields";
import { Field } from "../mind_sweeper";

describe("Minesweeper", function () {
  // Tests for height and width field

  it("height can't be too big", function () {
    expect(() => {
      new Field(50000, 4, field_only_points4x4);
    }).toThrowError(/^Height is too big$/);
  });

  it("width can't be too big", function () {
    expect(() => {
      new Field(4, 5000, field_only_points4x4);
    }).toThrowError(/^Largeur is too big$/);
  });

  it("height should not be 0 or less", function () {
    expect(() => {
      new Field(0, 5, field_only_points4x4);
    }).toThrowError(/^Height is too low$/);
  });

  it("largeur should not be 0 or less", function () {
    expect(() => {
      new Field(5, 0, field_only_points4x4);
    }).toThrowError(/^Largeur is too low$/);
  });

  it("height and width should correspond to the mindfield", () => {
    const field = new Field(5, 4, field_one_bomb5x4);
    const fieldToTable = field.transformMindfieldToTable(
      field_one_bomb5x4,
      5,
      4
    );

    fieldToTable.forEach((ligne) => {
      expect(ligne.length).toBe(4);
    });

    expect(fieldToTable.length).toBe(5);
  });

  it("should throw an error if height not corespond to mindefield", () => {
    expect(() => {
      const field = new Field(6, 4, field_one_bomb5x4);
      field.transformMindfieldToTable(field_one_bomb5x4, 6, 4);
    }).toThrowError(/^Height not correspond to mindefield$/);
  });

  it("should throw an error if width not corespond to mindefield", () => {
    expect(() => {
      const field = new Field(5, 3, field_one_bomb5x4);
      field.transformMindfieldToTable(field_one_bomb5x4, 5, 3);
    }).toThrowError(/^Width not correspond to mindefield$/);
  });

  it("field respect character", function () {
    var field = new Field(5, 4, field_one_bomb5x4);

    const fieldToTable = field.transformMindfieldToTable(
      field_one_bomb5x4,
      5,
      4
    );

    fieldToTable.forEach((ligne) => {
      const tableLigne = ligne;
      tableLigne.forEach((element) => expect(element).toMatch(/^[\*|\.]*$/));
    });
  });

  it("field has at least one bomb", function () {
    var field = new Field(4, 4, field_one_bomb4x4);

    const tabField = field.transformMindfieldToTable(field_one_bomb4x4, 4, 4);
    const isBomb = tabField.flat().includes("*");
    expect(isBomb).toBe(true);
  });

  it("should throw an error if not bomb in field", function () {
    expect(() => {
      var field = new Field(5, 4, field_only_points5x4);
      field.transformMindfieldToTable(field_only_points5x4, 5, 4);
    }).toThrowError(/^Must be at least one bomb$/);
  });

  it("field has at least one bomb", function () {
    var field = new Field(4, 4, field_multi_bomb4x4);

    const tabField = field.transformMindfieldToTable(field_multi_bomb4x4, 4, 4);
    const newGrid = field.transformToPlayableGrid(tabField);
    console.log(newGrid);
  });

});
