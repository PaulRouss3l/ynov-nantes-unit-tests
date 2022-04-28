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
    console.log(fieldTab);

    const superTable = fieldTab.map((ligne) => {
      return Array.from(ligne);
    });

    console.log("superTable", superTable);

    return superTable;
  };

  constructor(height, largeur, mindfield) {
    this.checkErrors(height, largeur);
    this.checkMindefield(mindfield, height, largeur);
    this.height = height;
    this.largeur = largeur;
    this.mindfield = mindfield;
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
