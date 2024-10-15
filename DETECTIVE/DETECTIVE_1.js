init();
test();

// Challenge variables
const indices = [
  "cheveux_not_bleu",
  "poids_not_mince",
  "taille_not_grand",
  "cheveux_is_rouge",
  "poids_not_enrobe",
  "yeux_is_vairons",
  "poids_is_moyen",
  "cheveux_not_chatain",
  "taille_is_moyen",
  "yeux_not_bleus",
  "yeux_not_noir",
  "taille_not_geant",
  "yeux_not_gris",
  "cheveux_not_blonds",
  "poids_not_costaud",
];
const suspects = [
  "nom:Jules,yeux:noir,cheveux:roux,taille:grand,poids:costaud",
  "nom:Sacha,yeux:vairons,cheveux:roux,taille:moyen,poids:enrobe",
  "nom:Mael,yeux:noir,cheveux:bleu,taille:grand,poids:enrobe",
  "nom:Maria,yeux:vairons,cheveux:noirs,taille:petit,poids:costaud",
  "nom:Eve,yeux:gris,cheveux:bruns,taille:moyen,poids:enrobe",
  "nom:Henri,yeux:bleus,cheveux:blanc,taille:moyen,poids:costaud",
  "nom:Jade,yeux:gris,cheveux:vert,taille:grand,poids:costaud",
  "nom:Julia,yeux:verts,cheveux:bleu,taille:grand,poids:moyen",
  "nom:Alice,yeux:vairons,cheveux:blanc,taille:grand,poids:mince",
  "nom:Anna,yeux:marrons,cheveux:vert,taille:moyen,poids:mince",
  "nom:Sylvie,yeux:marrons,cheveux:chatain,taille:petit,poids:mince",
  "nom:Anne,yeux:vairons,cheveux:rouge,taille:moyen,poids:moyen",
  "nom:Claude,yeux:bleus,cheveux:rouge,taille:geant,poids:mince",
  "nom:Lucas,yeux:vairons,cheveux:rouge,taille:geant,poids:moyen",
  "nom:Guillaume,yeux:marrons,cheveux:blanc,taille:petit,poids:moyen",
  "nom:Eden,yeux:vairons,cheveux:chatain,taille:petit,poids:enrobe",
  "nom:Ines,yeux:gris,cheveux:roux,taille:petit,poids:enrobe",
  "nom:Tiago,yeux:bleus,cheveux:blonds,taille:moyen,poids:mince",
  "nom:Manon,yeux:bleus,cheveux:chatain,taille:geant,poids:costaud",
  "nom:Aaron,yeux:gris,cheveux:rouge,taille:grand,poids:costaud",
];

function solveProblem(indices, suspects) {
  let peoples = suspects.map((e) => {
    let caracs = e.split(",");
    return caracs.reduce((acc, cur) => {
      let [carac, valeur] = cur.split(":");
      acc[carac] = valeur;
      return acc;
    }, {});
  });
  let mechant = null;
  let resi = 0;
  indices
    .map((e) => {
      [carac, op, qual] = e.split("_");
      return { carac, op, qual };
    })
    .forEach((clue, i) => {
      cl(
        "step",
        i,
        "peoples:",
        peoples.map((e) => e.nom),
        "res"
      );
      if (peoples.length == 1 && mechant == null) {
        mechant = peoples[0].nom;
        resi = i;
      }
      peoples = peoples.filter((p) => {
        if (clue.op == "is") {
          return p[clue.carac] == clue.qual;
        } else {
          return p[clue.carac] != clue.qual;
        }
      });
    });
  return mechant + "_" + resi;
}

console.log(`Answer: '${solveProblem(indices, suspects)}'`);

function test() {
  console.log("-".repeat(15) + " Start Test " + "-".repeat(15));

  // STEPS
  // [1/7] Indice n°: 1
  // [2/7] On enlève Emma car sa caractéristique de type yeux est verts
  // [3/7] Indice n°: 2
  // [4/7] On enlève Noe car sa caractéristique de type yeux n'est pas bleus
  // [5/7] On enlève Stephane car sa caractéristique de type yeux n'est pas bleus
  // [6/7] Indice n°: 3
  // [7/7] On enlève Juliette car sa caractéristique de type poids n'est pas moyen

  const indices = [
    "cheveux_is_blanc",
    "poids_not_moyen",
    "poids_is_enrobe",
    "yeux_is_verts",
    "taille_is_grand",
  ];
  const suspects = [
    "nom:Audrey,yeux:verts,cheveux:blanc,taille:grand,poids:enrobe",
    "nom:Rose,yeux:verts,cheveux:vert,taille:petit,poids:moyen",
    "nom:Mael,yeux:bleus,cheveux:blonds,taille:grand,poids:enrobe",
    "nom:Beatrice,yeux:gris,cheveux:vert,taille:grand,poids:enrobe",
    "nom:Pauline,yeux:marrons,cheveux:vert,taille:geant,poids:moyen",
  ];

  const expected = "Audrey_1";

  const result = solveProblem(indices, suspects);
  if (result != expected) {
    console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
  } else {
    console.log(`Test passed ! Got the expected result: ${expected}`);
    console.log(
      "Run the following command to submit:\ntainix submit DETECTIVE"
    );
  }

  console.log("-".repeat(15) + " End Test " + "-".repeat(15));
}

function init() {
  console.log(
    "CHALLENGE_TOKEN: '19163c875eaab241da5d7144dd479f9ae12cff21ff1edd4ba8ebd5498cad77a6faeb3a2c4636f4d4'"
  );

  /**
   * Predefined overridings
   */
  Array.prototype.sumUp = function () {
    return this.reduce((acc, cur) => acc + cur, 0);
  };

  Array.prototype.log = function (arrName = null) {
    if (arrName == null) console.log("Logging array:", this);
    else console.log(`Logging array ${arrName}:`, this);
    return this;
  };

  Array.prototype.sortAsc = function () {
    return this.sort((a, b) => a - b);
  };

  Array.prototype.sortDesc = function () {
    return this.sort((a, b) => b - a);
  };

  Array.prototype.max = function () {
    return this.sortDesc()[0];
  };

  Object.prototype.log = function (arrName = null) {
    if (arrName == null) console.log("Logging:", this);
    else console.log(`Logging ${arrName}:`, this);
    return this;
  };

  Object.prototype.toSortedDescList = function () {
    return dictionnaryToSortedDescArray(this);
  };

  Object.prototype.toEntries = function () {
    return Object.entries(this);
  };

  Array.prototype.arrayOfPairToDict = function () {
    return arrayOfPairToDict(this);
  };

  String.prototype.toDictOfCharOccurrences = function (splitter = "") {
    return stringToDictOfCharOccurrences(this, splitter);
  };

  cl = console.log;
}

/**
 * Predefined utility functions
 */

function stringToDictOfCharOccurrences(str, splitter = "") {
  return str.split(splitter).reduce((acc, cur) => {
    if (!(cur in acc)) acc[cur] = 0;
    acc[cur]++;
    return acc;
  }, {});
}

function dictionnaryToSortedDescArray(dict) {
  var items = Object.keys(dict).map(function (key) {
    return [key, dict[key]];
  });

  // Sort the array based on the second element
  items.sort(function (first, second) {
    return second[1] - first[1];
  });

  return items;
}

function validateAccForKey(acc, key) {
  if (!(key in acc)) acc[key] = 0;
}

function arrayOfPairToDict(arrayOfPairs) {
  const dict = {};
  arrayOfPairs.forEach((pair) => {
    const [key, value] = pair;
    dict[key] = value;
  });
  return dict;
}

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

function isNumeric(str) {
  return /^\d+$/.test(str);
}
