import functions from '../src/minesweeper';

describe('setupGame tests', function () {
  it('should return an array', () => {
    expect(functions.setupGame()).toStrictEqual([["*",".",".","."],[".",".",".","."],[".","*",".","."],[".",".",".","."]])
  });
  it('should not have chars like *', ()=> {
    const grid = [["*",".",".","."],[".",".",".","."],[".","*",".","."],[".",".",".","."]]
    expect(functions.transformBombsGrid(grid)).toStrictEqual([["0",".",".","."],[".",".",".","."],[".","0",".","."],[".",".",".","."]])
  });
});