import { Field, userInput } from "../mind_sweeper";

describe("Minesweeper", function () {
  it("field has good number of character", function () {
      var field = new Field (5,4); 
      //la ligne 1 doit avoir une longueur de 4
      field.mindfield.forEach(line => {
        expect(line.length).toBe(4);
      });
  });

  it("field respect character", function () {
    var field = new Field (5,4); 
    field.mindfield.forEach(line => {
      line.forEach (element => 
        expect(element).toMatch(/^[\*|\.]*$/) )
    }); 
});

it("height can't be too big", function () {
  expect(() => {
    new Field (50000,4)
  }).toThrowError(/^Height is too big$/);
});

it("width can't be too big", function () {
  expect(() => {
    new Field (4,5000)
  }).toThrowError(/^Largeur is too big$/);
});



});
