function setupGame(nbLignes, nbCases, nbMines) {
  let grid = [];
  for (let i = 0; i < nbLignes; i++) {
    let grid2 = [];
    for (let j = 0; j < nbCases; j++) {
      grid2.push(".");
    }
    grid[i] = grid2;
  }

  let randomBombsPosition = [];
  for (let k = 0; k < nbMines; k++) {
    var randomNumber = Math.round(
      Math.random() * (nbLignes * nbCases - 1 + 1) + 1
    );
    let find = randomBombsPosition.find((element) => element == randomNumber);
    if (find == undefined) {
      console.log(find);
      randomBombsPosition[k] = randomNumber;
    } else {
      k = k - 1;
    }
  }

  let i = 0;
  let j = 0;
  let compteur = 1;
  grid.forEach((line) => {
    j = 0;
    line.forEach((row) => {
        let findBombPosition = randomBombsPosition.find(element => element == compteur);
        if(findBombPosition != undefined){
            grid[i][j]="*"
        }
        compteur ++ 
        j++;
    });
    i++;
  });
  console.log("grid :",grid);
  return grid;
}

function getBombsPosition(grid) {
  let i = 0;
  let j = 0;
  let bombsPosition = [];
  grid.forEach((element) => {
    element.forEach((data) => {
      if (data == "*") {
        bombsPosition.push([i.toString(), j.toString()]);
      }
      j++;
    });
    i++;
    j = 0;
  });
  return bombsPosition;
}

function putSafeCaseNextToBomb(grid, bombsPosition) {
  let i = 0;
  let j = 0;
  grid.forEach((line) => {
    j = 0;
    line.forEach((row) => {
      if (row != "*") {
        bombsPosition.forEach((bombPosition) => {
          if (
            (i + 1 == bombPosition[0] ||
              i == bombPosition[0] ||
              i - 1 == bombPosition[0]) &&
            (j + 1 == bombPosition[1] ||
              j == bombPosition[1] ||
              j - 1 == bombPosition[1])
          ) {
            if (grid[i][j] == ".") {
              grid[i][j] = "1";
            } else {
              let int = parseInt(grid[i][j]) + 1;
              grid[i][j] = int.toString();
            }
          }
        });
      }
      j++;
    });
    i++;
  });
  return grid;
}

function changePointTo0(grid) {
  let i = 0;
  let j = 0;
  grid.forEach((line) => {
    j = 0;
    line.forEach((row) => {
      if (row == ".") {
        grid[i][j] = "0";
      }
      j++;
    });
    i++;
  });
  return grid;
}

export default {
  setupGame,
  getBombsPosition,
  putSafeCaseNextToBomb,
  changePointTo0,
};
