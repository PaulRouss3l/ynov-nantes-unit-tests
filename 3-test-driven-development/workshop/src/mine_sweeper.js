var scanf = require('scanf');

//Exemple de grille
var grid = [
    [0, 1, 1, 1, 0],
    [0, 2, 'M', 2, 0],
    [0, 2, 'M', 2, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0]
];

class Cellule {
    constructor() {
        this.estDecouvert = false;
        this.estFlag = false;
    }
};

class Mine extends Cellule {
    constructor() {
        super();
    }

};

class Nombre extends Cellule {
    constructor(value) {
        super();
        this.value = value;
    }

};

class Demineur {
    constructor(tailleChoisi) {

        this.tailleGrille = tailleChoisi; //difficulte * 5;
        this.nombreMines = Math.round((this.tailleGrille * this.tailleGrille) / 10);
        this.counterNombres = (this.tailleGrille * this.tailleGrille) - this.nombreMines;

        //Création de la grille & instanciations de Nombres dans les cases avec valeur par défaut à 0.
        this.grille = new Array(this.tailleGrille);
        for (var x = 0; x < this.tailleGrille; x++) {
            this.grille[x] = new Array(this.tailleGrille);
            for (var y = 0; y < this.tailleGrille; y++) {
                this.grille[x][y] = new Nombre(0);
            }
        }

        //Génération aléatoire de posX et posY, pour placer les mines de façon aléatoire dans la grille (seulement si la cellule n'était pas une mine).
        var posX = 0;
        var posY = 0;
        let counter = this.nombreMines;
        while (counter > 0) {
            posX = getRandomInt(0, this.tailleGrille);
            posY = getRandomInt(0, this.tailleGrille);
            if (this.grille[posX][posY] instanceof Nombre) {
                this.grille[posX][posY] = new Mine;
                counter--;
            }
        }

        //Permet de compter les mines autour d'une cellule quand celle-ci est un Nombre.
        for (var x = 0; x < this.tailleGrille; x++) {
            for (var y = 0; y < this.tailleGrille; y++) {
                if (this.grille[x][y] instanceof Nombre) {
                    this.grille[x][y].value = this.checkMineArround(x, y);
                } else {

                }
            }
        }
    };

    //Fonction checkMineArround (permet de compter le nombre de mine autour d'une cellule pour lui attribué ça valeur.)
    checkMineArround(x, y) {
        var mines = 0;
        if ((x > 0) && (y > 0) && (this.grille[x - 1][y - 1] instanceof Mine)) {
            mines++;
        }
        if ((x > 0) && (this.grille[x - 1][y] instanceof Mine)) {
            mines++;
        }
        if ((x > 0) && (y < this.tailleGrille - 1) && (this.grille[x - 1][y + 1] instanceof Mine)) {
            mines++;
        }
        if ((y < this.tailleGrille - 1) && (this.grille[x][y + 1] instanceof Mine)) {
            mines++;
        }
        if ((x < this.tailleGrille - 1) && (y < this.tailleGrille - 1) && (this.grille[x + 1][y + 1] instanceof Mine)) {
            mines++;
        }
        if ((x < this.tailleGrille - 1) && (this.grille[x + 1][y] instanceof Mine)) {
            mines++;
        }
        if ((x < this.tailleGrille - 1) && (y > 0) && (this.grille[x + 1][y - 1] instanceof Mine)) {
            mines++;
        }
        if ((y > 0) && (this.grille[x][y - 1] instanceof Mine)) {
            mines++;
        }
        return mines;
    };

    //Fonction display (permet d'afficher dans le terminal la grille de notre demineur, en fonction des objets des cellules et de leurs états)
    display() {
        var toDisplay = "";
        for (var y = 0; y < this.tailleGrille; y++) {
            for (var x = 0; x < this.tailleGrille; x++) {
                if (this.grille[x][y].estDecouvert == true) {
                    if (this.grille[x][y] instanceof Mine) {
                        toDisplay += ` M`;
                    } else if (this.grille[x][y] instanceof Nombre) {
                        toDisplay += ` ${this.grille[x][y].value}`;
                    }
                } else {
                    if (this.grille[x][y].estFlag == true) {
                        toDisplay += ` F`;
                    } else {
                        toDisplay += ` #`;
                    }
                }
            }
            if ((x >= this.tailleGrille - 1) && (y < this.tailleGrille)) {
                x = 0;
                toDisplay += `\n`;
            }
        }
        console.log(toDisplay);
    };

    //Fonction reveal (permet de démarquer et de découvrir toutes les cellules, fonction utilisée quand le joueur perd)
    reveal() {
        for (var x = 0; x < this.tailleGrille; x++) {
            for (var y = 0; y < this.tailleGrille; y++) {
                this.grille[x][y].estFlag = false;
                this.grille[x][y].estDecouvert = true;
            }
        }
    };

    //Fonction click (une cellule peut être cliqué si elle n'est pas marquer et si elle n'est pas déjà découverte)
    click(x, y) {
        var etat = 0;
        if (!((this.grille[x][y].estFlag == true) || (this.grille[x][y].estDecouvert == true))) {
            if (this.grille[x][y] instanceof Mine) {
                etat = 1;
            } else if (this.grille[x][y] instanceof Nombre) {
                var test = this.decouvrir(x, y);
                if (test == true) {
                    etat = 2;
                }
            }
        }
        return etat;
    };

    //Fonction flag (pour marquer une cellule qui n'est pas déjà découverte)
    flag(x, y) {
        if (!(this.grille[x][y].estDecouvert == true)) {
            if (this.grille[x][y].estFlag == true) {
                this.grille[x][y].estFlag = false;
            } else {
                this.grille[x][y].estFlag = true;
            }
        }
    };

    //Fonction pour la découverte récursive des cases.
    decouvrir(x, y) {
        this.grille[x][y].estDecouvert = true;
        this.counterNombres--;
        if (this.grille[x][y].value == 0) {
            if ((x > 0) && (y > 0) && (this.grille[x - 1][y - 1].estDecouvert == false)) {
                this.decouvrir(x - 1, y - 1);
            }
            if ((x > 0) && (this.grille[x - 1][y].estDecouvert == false)) {
                this.decouvrir(x - 1, y);
            }
            if ((x > 0) && (y < this.tailleGrille - 1) && (this.grille[x - 1][y + 1].estDecouvert == false)) {
                this.decouvrir(x - 1, y + 1);
            }
            if ((y < this.tailleGrille - 1) && (this.grille[x][y + 1].estDecouvert == false)) {
                this.decouvrir(x, y + 1);
            }
            if ((x < this.tailleGrille - 1) && (y < this.tailleGrille - 1) && (this.grille[x + 1][y + 1].estDecouvert == false)) {
                this.decouvrir(x + 1, y + 1);
            }
            if ((x < this.tailleGrille - 1) && (this.grille[x + 1][y].estDecouvert == false)) {
                this.decouvrir(x + 1, y);
            }
            if ((x < this.tailleGrille - 1) && (y > 0) && (this.grille[x + 1][y - 1].estDecouvert == false)) {
                this.decouvrir(x + 1, y - 1);
            }
            if ((y > 0) && (this.grille[x][y - 1].estDecouvert == false)) {
                this.decouvrir(x, y - 1);
            }
        }
        if (this.counterNombres > 0) {
            return 0;
        } else {
            return true;
        }
    };
}

//Fonction getRandomInt (permet de générer une valeur comprise entre la taille mini de la grille (0) et la taille max (this.tailleGrille-1)).
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

//Fonction qui permet de lancer le jeu. Avec condition de victoire et de défaite.
function play() {
    console.log("Jeu du démineur");
    console.log("Voulez-vous jouer ? (1 : oui; 2 : non)");
    var jouer = scanf('%d');
    if (jouer == 1) {
        console.clear();
        console.log("Jeu du démineur");
        console.log("Veuillez choisir la taille de la grille (min : 5; max : 15)");
        var tailleChoisi = 0;
        while (!((tailleChoisi >= 5) && (tailleChoisi <= 15))) {
            console.clear();
            console.log("Jeu du démineur");
            console.log("Veuillez choisir la taille de la grille (min : 5; max : 15)");
            var tailleChoisi = scanf('%d');
        }
        var demineur = new Demineur(tailleChoisi);
        var gagne = false;
        var perdu = false;
        while (jouer == 1 && perdu == false && gagne == false) {
            console.clear();
            console.log("Jeu du démineur");
            console.log("À vous de jouer ! =)");
            console.log(`Nombre de mines : ${demineur.nombreMines}`);
            console.log(`Cases restantes à découvrir pour gagner : ${demineur.counterNombres}`);
            demineur.display();
            console.log('Que voulez-vous faire ? (1 : cliquer; 2 : marquer)');
            var choixAction = 0;
            while (!((choixAction == 1) || (choixAction == 2))) {
                choixAction = scanf('%d');
            }
            if (choixAction == 1) {
                console.log("Choisissez la cellule à cliquer : ");
                console.log(`X (de 0 à ${demineur.tailleGrille - 1}) = `);
                var abscisse = demineur.tailleGrille + 1;
                while (!((abscisse >= 0) && (abscisse < demineur.tailleGrille))) {
                    abscisse = scanf('%d');
                }
                console.log(`Y (de 0 à ${demineur.tailleGrille - 1}) = `);
                var ordonnee = demineur.tailleGrille + 1;
                while (!((ordonnee >= 0) && (ordonnee < demineur.tailleGrille))) {
                    ordonnee = scanf('%d');
                }
                let test = demineur.click(abscisse, ordonnee);
                if (test == 1) {
                    perdu = true;
                } else if (test == 2) {
                    gagne = true
                }
            } else if (choixAction == 2) {
                console.log("Choisissez la cellule à marquer : ");
                console.log(`X (de 0 à ${demineur.tailleGrille - 1}) = `);
                var abscisse = demineur.tailleGrille + 1;
                while (!((abscisse >= 0) && (abscisse < demineur.tailleGrille))) {
                    abscisse = scanf('%d');
                }
                console.log(`Y (de 0 à ${demineur.tailleGrille - 1}) = `);
                var ordonnee = demineur.tailleGrille + 1;
                while (!((ordonnee >= 0) && (ordonnee < demineur.tailleGrille))) {
                    ordonnee = scanf('%d');
                }
                demineur.flag(abscisse, ordonnee);
            }
        }
        if (perdu == true) {
            console.clear();
            console.log("Jeu du démineur");
            console.log(`Nombre de mines : ${demineur.nombreMines}`);
            demineur.reveal();
            demineur.display();
            console.log("Vous avez perdu :(");
            return 0;
        } else if (gagne == true) {
            console.clear();
            console.log("Jeu du démineur");
            console.log(`Nombre de mines : ${demineur.nombreMines}`);
            demineur.display();
            console.log("Vous avez gagné ! Félicitations !");
            return 0;
        }
    } else if (jouer == 2) {
        console.clear();
        console.log("À bientôt ! =)");
        return 0;
    }
}

play();