init();
test();

// Challenge variables
const capsules = [
  "ETSQ-46",
  "OCGQ-19",
  "KULY-32",
  "OKCH-32",
  "PLOP-34",
  "DVCQ-42",
  "OCGQ-51",
  "MFML-45",
  "KPQM-19",
  "IWUL-12",
  "BRIN-17",
  "RJXH-28",
  "LRUR-22",
  "GNSX-47",
  "ERKB-21",
  "ONVC-14",
  "LRUR-39",
  "ABTI-46",
  "MFML-35",
  "IVBE-40",
  "QOXB-33",
  "CBIH-10",
  "QOXB-15",
];
const objets = [
  "HGIUNSWUCBFR-229",
  "JXUQTDOI-285",
  "QVULKRAI-218",
  "XMTCTQHFWO-319",
  "XEOOXVER-249",
  "SXLSOKY-464",
  "KCLGJKBQEU-261",
  "LCVQSVKSIQ-547",
  "UVJGXXIBNGNM-137",
  "DEFCFDSAK-438",
  "OSHILGJNSDQ-545",
  "AAJAJCDONOG-185",
  "RIQHAS-289",
  "JTPQRJNKCAT-141",
  "RLBIJBF-524",
  "TKAEFFAWWQX-167",
  "OKELKMIOUOU-229",
  "SGULIIOJR-213",
  "TDJCUJR-506",
  "VHJPUORYFLY-475",
  "FJVKZCNNBIZ-540",
  "MSRLKJDYGW-452",
  "AIIJZEVVJX-232",
  "PLHKZOP-348",
  "LLJIJFOIG-311",
  "KUMYXYLY-323",
  "CLBLVOREBS-209",
  "ERWZKB-212",
  "JLJXHBQWQO-143",
  "ONPYSWSVC-145",
  "CNEVHBQGBHN-114",
  "YMEOOOASGDI-190",
  "YBDCWAIDKIIE-396",
  "QOSJHIDLWXB-330",
  "MVNZIIGKTN-380",
  "LRDWMZHVXQUR-390",
  "FTTAOQHFYYC-137",
  "KUBIDRYPVZKC-114",
  "RGZBFIP-460",
  "BQAFYUPA-290",
  "SBUFHARJFKK-353",
  "CDOORGX-390",
  "MORJYF-291",
  "RSXHLB-385",
  "UVOHZIZKS-466",
  "MTZFXYUDR-110",
  "GMBVWK-349",
  "ZOPYVL-195",
  "PFBGBXEDI-545",
  "SYYLDXIY-187",
  "CZEMLTUIZGMN-526",
  "UYJGAYZATC-488",
  "XJNZBAP-291",
  "VQWIFSCTT-121",
  "YFLEZG-455",
  "OCYHHMGQ-511",
  "ETXRAPD-319",
  "CLZBHQMMV-319",
  "SIPEAVCME-404",
  "UDBPLODF-269",
  "SHTXHAYRKSJ-484",
  "PXGUXJU-552",
  "MFIQYLHBGVML-355",
  "FDBPCCNUZGS-493",
  "QCSQIOHL-505",
  "MROGDIBXVPDD-238",
  "INOXWG-259",
  "BBTQAAQSQ-232",
  "MHBXIWWB-160",
  "VUUQYV-346",
  "EMMADDIGU-138",
  "TAZYUUQDRLY-211",
  "RGDABOXCDHN-201",
  "BBAMOEYSFV-464",
  "BBSHOQXSSH-358",
  "SJPMOC-353",
  "TSYGWMR-520",
  "BCSFPFEXLPBU-382",
  "LEQKVOVMAZ-296",
  "PIRBWT-374",
  "NAYDGNYMIS-431",
  "OUHGHB-472",
  "RGDRFHTIYYD-467",
  "AEIMCKOGBP-291",
  "OVFFQRHLNIG-389",
  "NIBGFUHEG-280",
  "USTTPFHMC-259",
  "IULHST-120",
  "UTZQUL-263",
  "ENTHQPWVE-409",
  "GGUCKKSVLIF-323",
  "NNHHCQMSCGYM-206",
  "EWQWLEOX-266",
  "GYUGKQWHBLSH-223",
  "HNRPYU-552",
  "NGROPER-445",
  "RHQMBUQRP-521",
  "GIIMGHW-324",
  "NMXONLGLVN-109",
  "RJPPXH-283",
];

function solveProblem(objets, capsules) {
  return objets
    .map((e) => {
      [n, w] = e.split("-");
      m = n.slice(0, 2) + n.slice(n.length - 2, n.length);
      return { name: m, weight: parseInt(w) };
    })
    .filter((e) => capsules.map((e2) => e2.split("-")[0]).includes(e.name))
    .map((e) => e.weight)
    .sumUp();
}

console.log(`Answer: '${solveProblem(objets, capsules)}'`);

function test() {
  console.log("-".repeat(15) + " Start Test " + "-".repeat(15));

  // STEPS
  // [1/5] La capsule 1 => LKVJ-49 correspond à l'objet LKOMPVJ-494 de poids : 494.
  // [2/5] La capsule 2 => HFCZ-28 correspond à l'objet HFFJLCZ-281 de poids : 281.
  // [3/5] La capsule 3 => BDRL-55 correspond à l'objet BDUMOYJTMRL-553 de poids : 553.
  // [4/5] La capsule 8 => VURO-51 correspond à l'objet VUKYPRO-517 de poids : 517.
  // [5/5] Le poids total des objets est de : 1845.

  const objets = [
    "VPYZIIFNMH-105",
    "BDUMOYJTMRL-553",
    "VUKYPRO-517",
    "OYQBUHLZLB-333",
    "QWKXQRYSHAXS-124",
    "MPGTTFWVMZNE-307",
    "ASFFBOSKEOJ-382",
    "WVHRXELEV-269",
    "FPZWSMFWCXM-235",
    "VPUUZWYOZZZM-103",
    "KQGQHZUGKFFP-546",
    "LJDNYZNFOTOQ-295",
    "QKBGAASPEJX-538",
    "WIZXJKT-222",
    "ACCPRHIIO-357",
    "VXKYYKLTCHLX-393",
    "DZUPCXK-174",
    "LRGEHAKJ-478",
    "HNLKHXR-293",
    "HRXXDS-119",
    "CATDNPCLH-500",
    "SQQNUXX-519",
    "UTKNIDVUMOTN-255",
    "TQFJORAIAWUS-176",
    "KMTYZNBOAITC-377",
    "UVAYKMWPNCRQ-398",
    "MHLXMI-362",
    "LJHLQTSRJWY-217",
    "NGJMPCWWR-505",
    "CLVZOEIO-309",
    "BKTHOGHKB-521",
    "YOVBAMQSEGBU-367",
    "GAINZL-310",
    "TZQJOVGPGI-424",
    "HYMUOT-419",
    "ENKMHRPKXFC-293",
    "SZOZLQODX-458",
    "FPFYVR-175",
    "LDFZZDZSRJZ-282",
    "YROZEUMQUEYR-338",
    "GNHFQIOO-130",
    "RGJMUPDSMQF-369",
    "NOBXSTEHLEW-287",
    "HPLCGJNJLXLR-118",
    "DVSWFPO-236",
    "PAPVGMMC-157",
    "CHLUSRWC-304",
    "SWTYBIMEH-452",
    "HFFJLCZ-281",
    "UFOTUASLXLKK-555",
    "ZHDKJLYRV-146",
    "YPMKFAJ-397",
    "LKOMPVJ-494",
    "XRNITWUWK-171",
    "PTNYJJETD-175",
    "SRURERMNBBN-210",
    "UDGRCIFYGTR-269",
    "EKPJDRTFKTZ-466",
    "AXPYRGCEG-125",
    "VEEXYKJU-336",
    "TZWGKAXBGGG-141",
    "MTGCHSTBF-314",
    "GLPVWLY-296",
    "YRCMGJ-439",
    "XVILQZNREB-233",
    "XDDDFLMJAV-364",
    "YFIZKPWPX-335",
    "JGKTKCNV-536",
    "BWGETFY-208",
    "VUYSEQC-150",
  ];
  const capsules = [
    "RMTW-55",
    "LKVJ-49",
    "HFCZ-28",
    "BDRL-55",
    "SAVC-35",
    "BDRL-40",
    "GDAT-25",
    "VJAH-46",
    "VURO-51",
  ];

  const expected = "1845";

  const result = solveProblem(objets, capsules);
  if (result != expected) {
    console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
  } else {
    console.log(`Test passed ! Got the expected result: ${expected}`);
    console.log("Run the following command to submit:\ntainix submit DBZ_2");
  }

  console.log("-".repeat(15) + " End Test " + "-".repeat(15));
}

function init() {
  console.log(
    "CHALLENGE_TOKEN: '5c82e8f76402235b75a26356f0cbc53d850d1d9ba6bc202d1d34d2fa7fa90a53bf51634f04e1dc9c'"
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
