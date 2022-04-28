import {
  field_one_bomb4x4,
  field_one_bomb5x4,
  field_only_points4x4,
  field_only_points5x4,
  field_multi_bomb4x4,
  field_multi_bomb4x4_with_error
} from "../fields";
import { Field, MineSweeper } from "../mine_sweeper";


const regexDotsAndStars = /^[\*|\.]*$/;
const regexNumberAndStars = /^[\*|0-9|\n]*$/;

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

  it("height and width should correspond to the minefield", () => {
    const field = new Field(5, 4, field_one_bomb5x4);
    field.minefield.forEach((ligne) => {
      expect(ligne.length).toBe(4);
    });

    expect(field.minefield.length).toBe(5);
  });

  it("should throw an error if height not corespond to minefield", () => {
    expect(() => {
     new Field(6, 4, field_one_bomb5x4);
    }).toThrowError(/^Height not correspond to min.efield$/);
  });

  it("should throw an error if width not corespond to minefield", () => {
    expect(() => {
      new Field(5, 3, field_one_bomb5x4);
    }).toThrowError(/^Width not correspond to minefield$/);
  });

  it("field respect character", function () {
    var field = new Field(5, 4, field_one_bomb5x4);

    field.minefield.forEach((ligne) => {
      const tableLigne = ligne;
      tableLigne.forEach((element) => expect(element).toMatch(regexDotsAndStars));
    });
  });

  it("field should return error if is unrecognized character", function () { 
    expect(() => {
      new Field(5, 4, field_multi_bomb4x4_with_error);
    }).toThrowError(/^Character not valid$/);
  });

  it("field has at least one bomb", function () {
    var field = new Field(4, 4, field_one_bomb4x4);
    const isBomb = field.minefield.flat().includes("*");
    expect(isBomb).toBe(true);
  });

  it("should throw an error if not bomb in field", function () {
    expect(() => {
      new Field(5, 4, field_only_points5x4);
    }).toThrowError(/^Must be at least one bomb$/);
  });

  // it("field should display field with number", function () {
  //   var field = new Field(4, 4, field_multi_bomb4x4);
  //   const newGrid = field.transformToPlayableGrid();
  //   expect(newGrid).toMatch(regexNumberAndStars);
  // });

  it("MineSweeper add fields properly", function () {
    var field1 = new Field(4, 4, field_multi_bomb4x4);
    var field2 = new Field(5, 4, field_one_bomb5x4);
    const mineSweeper = new MineSweeper
    mineSweeper.addField(field1);
    mineSweeper.addField(field2);

    expect(mineSweeper.fields.length).toBe(2);
  });

  it("MineSweeper should return error if added field is undefined", function () {


    expect(() => {
      var field1 = new Field();
      const mineSweeper = new MineSweeper
      mineSweeper.addField(field1);
    }).toThrowError(/^Field is undefined$/);
  });


});
