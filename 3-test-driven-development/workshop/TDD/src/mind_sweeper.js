class Field {
  checkErrors = (height, largeur) => {
    if (height > 100) {
      throw "Height is too big";
    }
    if (largeur > 100) {
      throw "Largeur is too big";
    }

    if (height <= 0) {
      throw "Height is too low";
    }

    if (largeur <= 0) {
      throw "Largeur is too low";
    }
  };

  checkMindefield = (mindfield, height, width) => {
    const tabField = this.transformMindfieldToTable(mindfield);

    if (!tabField.flat().includes("*")) {
      throw "Must be at least one bomb";
    }

    if (tabField.length !== height) {
      throw "Height not correspond to mindefield";
    }

    tabField.forEach((ligne) => {
      if (ligne.length !== width) {
        throw "Width not correspond to mindefield";
      }
    });
  };

  transformMindfieldToTable = (mindfield) => {
    const splitString = mindfield.split("\n");
    const fieldTab = splitString.map((str) => str.replace(/ /g, ""));

    const superTable = fieldTab.map((ligne) => {
      return Array.from(ligne);
    });

    return superTable;
  };

  constructor(height, largeur, mindfield) {
    this.checkErrors(height, largeur);
    this.checkMindefield(mindfield, height, largeur);
    this.height = height;
    this.largeur = largeur;
    this.mindfield = mindfield;
  }

  transformToPlayableGrid(field){
    const newField = field;
    for(var i =0; i < this.height; i++){
      for (var j = 0; j < this.largeur; j++ ){
        newField[i][j] = this.returnValue(i, j, field);
      }
    }
    return newField;
  }

  returnValue(h, w, newField){    
  if (newField[h][w] != "*")
      {
        var value = 0;
        for(var i = h-1; i <= h+1; i++){
        for (var j = w-1; j <= w+1; j++ ){
          if (i >= 0 && i<this.height && j >= 0 && j<this.largeur)
          {   
            if (newField[i][j] == "*"){
              value +=1;
            }
          }
        }
      }
      return value.toString();
    }
    else {
      return '*';
    }
      
    }
}

class MindSweeper {
  constructor() {
    //TODO
  }
}

module.exports = {
  Field,
  MindSweeper,
};
