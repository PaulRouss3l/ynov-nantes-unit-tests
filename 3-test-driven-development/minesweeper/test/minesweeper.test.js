import setupGame from '../src/minesweeper';

describe('setupGame tests', function () {
  it('should return an array', () => {
    expect(setupGame()).toBe(2);
  });
});