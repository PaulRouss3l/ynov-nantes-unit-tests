const regexDotsAndStars = /^[\*|\.]*$/;

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

  checkMinefield = (minefield, height, width) => {
    const tabField = this.transformMinefieldToTable(minefield);

    if (!tabField.flat().includes("*")) {
      throw "Must be at least one bomb";
    }

    if (tabField.length !== height) {
      throw "Height not correspond to minefield";
    }

    tabField.forEach((ligne) => {
      if (ligne.length !== width) {
        throw "Width not correspond to minefield";
      }
    });
  };

  transformMinefieldToTable = (mineField) => {
    const splitString = mineField.split("\n");
    const fieldTab = splitString.map((str) => str.replace(/ /g, ""));
    const superTable = fieldTab.map((ligne) => {
        if (!ligne.match(regexDotsAndStars)){
          throw 'Character not valid';
        }
      return Array.from(ligne);
    });
    return superTable;
  };

  constructor(height, largeur, minefield) {
    this.checkErrors(height, largeur);
    this.checkMinefield(minefield, height, largeur);
    this.height = height;
    this.largeur = largeur;
    this.minefield = this.transformMinefieldToTable(minefield);
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

class MineSweeper {
  constructor() {
    this.fields = [];
  }

  addField(field){
    if (field == undefined)
    {
      throw 'Field is undefined';
    }
    this.fields.push(field);
  }

  transformToPlayableGrid(field){
    const newField = field;
    for(var i =0; i < this.height; i++){
      for (var j = 0; j < this.largeur; j++ ){
        newField[i][j] = this.returnValue(i, j, field);
      }
    }

    return this.doubleDimentionnalArrayToString(newField);
  }

  doubleDimentionnalArrayToString(array){
    var text = "";
    var firstLine = true;
    array.forEach(element => {
      if (!firstLine)
      {
        text+='\n';
      }
      firstLine = false;      
      element.forEach ( char=> {
        text+=char;
      })
    });
    return text;
  }
}

module.exports = {
  Field,
  MineSweeper,
};
