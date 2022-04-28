class Field {

  createMineField (height, largeur){
    return Array.from(Array(height), () => new Array(largeur).fill("."));
  }

  constructor(height, largeur) {
    if (height >100) {
      throw 'Height is too big';
    }
    if (largeur >100) {
      throw 'Largeur is too big'
    }
    this.height = height;
    this.largeur = largeur;
    this.mindfield = this.createMineField(height, largeur);
  }

}

function BadValue(message = "") {
  this.message = message;
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
