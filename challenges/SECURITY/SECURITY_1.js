init();
test();

// Challenge variables
const informations = [
  "amelie.fournier@XXXXXXXX.com:51508e063b774f134c704e96957f63ab7b1541a3985f6c31559c45883bf8744a",
  "icham.dubois@XXXXXXXX.com:df8dd1dcce843a147a547506fec6dae345de2f1687251ec7bc695801fe1d63e6",
  "mila.boyer@XXXXXXXX.com:624939d505d0fc21046d955dee5ad81655f3f675170ef5fd70a20bb1469e6ed1",
  "pierre.schmitt@XXXXXXXX.com:ac1af424573c7db3588e8dbffd007a4c77aaaf1095f51eb9e454a0c3ae9bd0a9",
  "alix.perrot@XXXXXXXX.com:6440369cf544a6578250f005234a12331cc8aa4dd9a5dc47bd50ff28661749ee",
  "gabin.perrot@XXXXXXXX.com:03329d242b08b65b6af7da757c29b9f1435aae2e88a485a85b0d7572fcc0b1b3",
  "walim.mercier@XXXXXXXX.com:28dd44378b7fabc407af7b14cbebca5e721bd4066c4325ef690d9e702f2ec602",
  "emma.lemoine@XXXXXXXX.com:9d3ea18394bd93007be1698fd394d79b9c59d21196cf58af3025578df45a9e45",
  "tiago.dumas@XXXXXXXX.com:7d1b116a463b96ee96f02e0287aaacdc546a88fe522b1a96a6d2699af35376ff",
  "rachida.durand@XXXXXXXX.com:bddf66eabcbec57cdd07bad8b4e81e987363c1a0d0bbf0722b1a8cfd725737bb",
  "catherine.dupont@XXXXXXXX.com:8417e3460c0f92f1ee39ed97296e4983a360188ee38a5fc03a0126410d514d4a",
  "stephane.ganier@XXXXXXXX.com:7258dd363c84d847e3f46d88997a25aa529562320bac562cccfae3406a56448d",
  "manon.mercier@XXXXXXXX.com:3012786c62d3e71ba082c007f9d3746e043770c1708f0bf80fc0b3c4ad29db2c",
  "christian.langlois@XXXXXXXX.com:e749093c7a248b8a18a9d35495ff0802e9df88b755bc1cfffe05541812d80411",
];
async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);

  // hash the message
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

async function solveProblem(informations) {
  return informations
    .map(async (e) => {
      let [mail, cryptedPwd] = e.split(":");
      let [prenom, nom] = mail.replace("@XXXXXXXX.com", "").split(".");

      let pwds = [];

      for (let i = 10; i < 100; i++) {
        for (let char = 65; char < 91; char++) {
          let pwdStr =
            prenom.toLowerCase() +
            nom.slice(0, 3).toUpperCase() +
            "@" +
            i +
            String.fromCharCode(char);
          let pwd = await sha256(pwdStr);
          if (pwd === cryptedPwd) {
            cl(pwdStr, "-", pwd, "-", cryptedPwd);
            pwds.push(pwdStr);
          }
        }
      }

      return {
        cryptedPwd: cryptedPwd,
        pwds: pwds,
      };
    })
    .log()
    .filter((u) => u.pwds?.length > 0)[0]?.pwds[0];
}

console.log(`Answer: 'amelieFOU@16L'`);

async function test() {
  console.log("-".repeat(15) + " Start Test " + "-".repeat(15));

  // STEPS
  // [1/1] sacha.faure@XXXXXXXX.com a oublié de changer son mot de passe par défaut.

  const informations = [
    "sylvie.leroux@XXXXXXXX.com:b3b05e502f3127c1a795556727db857a0597743b58f7408c95d4042c5fb61838",
    "mila.roussel@XXXXXXXX.com:b7a334d476d730536eda38396d4151375481dcc8f65cc25480f092a4d68046ea",
    "leon.durand@XXXXXXXX.com:2977d185117d973f0093f257ca26004d4f3e58a5ebf43cec6515c4b2d281ef73",
    "mohamed.menard@XXXXXXXX.com:f3e28c250b66f7dc77f06a09876955c559e66466d46208c90f100ad48def213c",
    "sacha.faure@XXXXXXXX.com:a0bbc03ec59c0333134e2098c5cf77cd2f86cadf750c1efc291a1f25d8ed34ef",
    "kevin.martin@XXXXXXXX.com:16ba8af788a8b7701d70141def4457cbddc921af59abadad7ed32b1d8e74e833",
    "manon.noel@XXXXXXXX.com:531391a5f1e26a2e9740796c1f0cfcc0c4e869ccad88edea533f1f3027aa3c13",
    "richard.morel@XXXXXXXX.com:3fabd4882489b72458651389d75d6784487396d63633d5e9515f341aa98c309f",
  ];

  const expected = "sachaFAU@50N";

  const result = await solveProblem(informations);
  if (result != expected) {
    console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
  } else {
    console.log(`Test passed ! Got the expected result: ${expected}`);
    console.log(
      "Run the following command to submit:\ntainix submit SECURITY_1"
    );
  }

  console.log("-".repeat(15) + " End Test " + "-".repeat(15));
}

function init() {
  console.log(
    "CHALLENGE_TOKEN: 'ee26b0ffedad1032bb4530a82ee03f654bcc91d8486075d4fd2f78c89dd4d131f0e904b672428b13'"
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
