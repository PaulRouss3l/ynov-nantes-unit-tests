function setupGame(nbLignes, nbCases, nbMines) {
  const grid = [
    ["*", ".", ".", "."],
    [".", ".", ".", "."],
    [".", "*", ".", "."],
    [".", ".", ".", "."],
  ];
  return grid;
}

function transformBombsGrid(grid) {
  let i = 0;
  let j = 0;
  grid.forEach((element) => {
    element.forEach((data) => {
      if (data == "*") {
          console.log(grid[i][j])
        grid[i][j] = "0";
      }
      j++
    });
    i++
    j = 0
  });
  return grid;
}

export default { setupGame, transformBombsGrid };
