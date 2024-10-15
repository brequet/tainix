init();
test();

// Challenge variables
const blocks = [
  "854591db03_f0cbedcd4c_d59a955ec9_1de26bb82b",
  "f4c0062cc0_8d98346e9f_80b0c4cf1e_4537927c7a",
  "f0e601b072_14d3c8e4e3_8b319b828f_a8f8dcf497",
  "f80ce54583_a4b9ebfe9f_338e78b972_63954bdb4d",
  "72d3a1bbcf_0995769521_bc0bcedbe0_573e873043",
  "bc6751f8fb_0c1b351c3a_1d4a2b1489_8df9df48f6",
  "7a37f9436c_b76a4e63e3_3bb3b5d842_0b65898bfc",
  "835e2cfff8_b1121aa1af_b539ee16ba_04ed44d523",
  "786c33f3e5_2ea9170284_bb3ddd74bf_1eaea10bba",
  "463d0111cb_37620c487c_3de247d9c1_a74246ecd4",
  "df5486bb8b_1ea15b5449_6a197d5221_854591db03",
  "7702e80b55_23585c8468_74e25b256d_c2ca88d9be",
  "9532c4285e_a03227afad_91cd2f4a9d_23983bfcf9",
  "1eb53bdd87_96e8af1fdc_4dabedd918_5f395e9848",
  "a92afbd536_29b3360d42_8f933f3766_7702e80b55",
  "b29e706bad_cc530a0c51_34b4f2d099_5332349db3",
  "63cf45de9b_240b2529bc_98bedd9ea1_1f9e153cf3",
  "045503256f_3c9e6534f2_974348faf2_78a3cd8375",
  "e9425c718a_72c3eb811e_f3c4abd188_176cbde1e5",
  "eb94f8a084_c903b7b818_f97789bab5_127e203653",
  "01ecf0071a_b684f8d792_6cb54631ef_a92afbd536",
  "6df8acf3ca_c06c804d05_db2889d5d3_a1943899fa",
  "4568293bcd_0c3afbbc04_9d5cef4a27_4ad63dd22f",
  "888cd330e7_964c55e33e_b9f8bb21df_8fc0b933f1",
  "ea2bb31df7_31a4bf22de_2d2f7951f9_9e523a73ae",
  "e45d2f13c0_d027e8ec46_8ec7b3a8e1_de1a11b40c",
  "a9101fef69_c3b74353e1_ec45f464c7_e62221ceaf",
  "aa5ec9a9be_eb0d06768a_57f7b14bca_745da14572",
  "4537927c7a_7e9368393e_be80aab37c_4568293bcd",
  "b531fd6e81_851bcb0bac_f4a495e6f1_8d8e8ed950",
  "054b243380_6ffd280c77_d3199cedf8_888cd330e7",
  "0d655e4807_c2fee29e4e_e36bc0260c_035f7ce283",
  "035f7ce283_689e6575e4_87343750d3_a9101fef69",
  "a8c9dde9f6_d2e7679466_5be52b786a_5003071b62",
  "dae5805bd7_e25200351c_e30c0c01ad_362efebce6",
  "89784dbed7_3be9faf995_1aeecd20eb_6bdf64f4f6",
  "3c835322c1_379491315f_8c283f3812_1960b1a341",
  "8e6485cbe4_3f5e538ce6_230e37086f_054b243380",
  "9f71158fd4_bcca98803c_2119fbdd38_649a86eed3",
  "ed4d632691_68a33d2262_e2cf7118ac_6568848636",
  "0a46b54656_cde0cb4a82_095449345b_ab31487702",
  "8b3f32a98a_93fefd0b3c_1139b0a76a_1ccaad705a",
  "4ad63dd22f_b66fce48e6_b108947e99_9532c4285e",
  "6699f97c07_684eb1de7d_4652ac4e90_4fa75275fb",
  "557b74b814_fd53b76b3e_1867d62bc1_42ebdb986d",
  "95665eb97c_eb36520479_e84afd45c1_f8124eddda",
  "7cdc6e402f_cd68e4b4f2_73edd20d63_557b74b814",
  "1aa8f1f853_a2454fc9fb_5ce5efc2a1_df5486bb8b",
  "eee59f2890_e0722b9a8e_85f7a21d71_efc5605560",
  "23983bfcf9_453d25c053_d3cf0cf48b_0d655e4807",
  "ddc9bf0c34_0b28612aa9_378a4123e6_72bfec4321",
  "cdc6328172_d7286e1466_73ef36813e_5a198f3cfb",
  "42ebdb986d_e03b899d79_5ae30f6416_e45d2f13c0",
  "1de26bb82b_aa2f149d64_043b596b71_835e2cfff8",
  "369a62bdb6_66f98ceecf_4c0ac618e2_ec374a22ee",
];

function getChainSize(blocks, block) {
  //   cl("block", block);
  let [id, source] = [...block];
  if (source in blocks)
    return 1 + getChainSize(blocks, [source, blocks[source]]);
  return 1;
}

function solveProblem(blocks) {
  blocks = blocks.reduce((acc, block) => {
    let [id, x, y, source] = block.split("_");
    acc[id] = source;
    return acc;
  }, {});
  return blocks
    .toEntries()
    .map((block) => [block[0], getChainSize(blocks, block)])
    .sort((a, b) => b[1] - a[1])
    .map((a) => a[1] + "_" + a[0])[0];
}

console.log(`Answer: '${solveProblem(blocks)}'`);

function test() {
  console.log("-".repeat(15) + " Start Test " + "-".repeat(15));

  // STEPS
  // [1/1] Le bloc 0031d03319_9e6fcc5155_0352d01ff6_fde22c3487 est au bout de la chaine la + longue, 9 blocs qui se suivent.

  const blocks = [
    "0e9b426007_aa7a5aabb8_a815da1135_a9515e012b",
    "7e3ea70deb_fd83aaa98c_8be74d3eff_d20898f177",
    "3a26227f6b_4cae573d53_a6d5c64695_0887db30b4",
    "cdf9b5c83c_b2ac187458_2610f1aec7_e6460bdd06",
    "b3f2fc9f7a_12df339d8f_aace48d101_091fd74690",
    "067202fe93_615d000b47_fc9fe2bc8d_d66bbe3dff",
    "0ac9f3b627_c693e26216_1997518d22_1e6c3530f5",
    "3c5039b492_595ca70019_128dac41b7_065f150a63",
    "4293c2e1a4_be6e2cb75d_fcaecaf689_67ac1ccd66",
    "6d786354e3_342a24cc91_64085ecea3_fddaf9bc16",
    "12e32e27f2_8a08f6ca5a_20f192c499_674404b503",
    "f7241e493f_bf9fd2d1f6_87d62ca903_b1c766722f",
    "33cc49e102_41c669abb3_4fbbff6840_b9e71e4ff9",
    "22c96cc26a_5f59fdd2e0_9b4c6138c3_4d12e95316",
    "659ad43243_92ff43a32e_63789bc8db_5e309db476",
    "9c0276c923_65defd63c0_057ee4aebd_484178be89",
    "079582be60_9abd964c28_8d67e2b7da_5aa98fabcf",
    "091fd74690_b25d9deb77_ce016c99a6_33cc49e102",
    "115f9d76a8_6fe11466ef_63906866f1_d7fdce4cd6",
    "6f5b7ee0b8_09adbc1f5b_687db7b63e_f584247383",
    "b959cacd1c_ad0fa108e7_62c0e2885e_e960b6ad1f",
    "559957c833_9a03cce24b_7c0cb55e42_b79268d141",
    "ce4bc54873_c91cbde675_1290063dd3_bbf9bbda6f",
    "11150d0f58_13d563a61d_ca131dd5d9_0cccf559ed",
    "bb01e116ca_179bdb1545_ef2cf3e449_7806ad7e7f",
    "67ac1ccd66_76cc3f41f2_f04ea22d35_0ccf1fe31c",
    "a8d1874d23_11b0fab808_e8d5c55f16_f6f24d2c33",
    "b9e71e4ff9_d958028032_64e41976f2_3e7f56c2b5",
    "3e15cd6fca_122b88c0b0_0b3b43ff77_fe95eb75fa",
    "6f5c42e73d_d7ff04aafa_d6a8ed95c3_b0508f707b",
    "34fe4b8acd_c36bd84df2_2fa8651fa0_6d314aaa33",
    "3d192eed3b_eeef3fa027_d5f9abc9c3_4cd54a0680",
    "fde22c3487_f39dcd8119_eb01ca72f5_5610877fe5",
    "484178be89_8dee75428a_3393bafe78_559957c833",
    "0ccf1fe31c_17a5262a94_614f39e51e_346cb8ffa1",
    "08e872e4e1_b9f716904d_25d7695b1a_1236189f12",
    "d6c5d1dbb3_e9cc4bcab6_5d83492446_3277b063c3",
    "a75162a44c_7be9055eb6_8a34020042_a2b6d3eca0",
    "b4eb6905a8_ff707c67e3_5cb5f223a3_d6c5d1dbb3",
    "e6460bdd06_5bd0d8c427_7f599e20c2_3c5039b492",
    "7c7e1d5d87_611805d03f_377ed3f402_d22c3e4191",
    "3aa17a2885_cc47f31d31_d2c287635d_80ce54ac09",
    "3e7f56c2b5_808bb67b3e_70b37d4a1b_6cfff5b0f8",
    "8a0e922cd7_a5554ad99d_acc14a9657_79627b1d48",
    "5610877fe5_8fb269fa0c_2552477d14_8e0a5ffbce",
    "8e0a5ffbce_5264f747e8_3c14c113bb_b3f2fc9f7a",
    "eab43fbd15_98e4bbb3bf_23adb25f58_b4eb6905a8",
    "62a2ab53ea_e2d82a6a5a_78b120fb5b_ed3622094c",
    "be74036244_65d82bd723_aa3b64d62a_a7f968e231",
    "efc46dcde0_40f34a2657_bf2a5aba1a_87d36fca31",
    "526a1df8ca_4716023235_50c2f9fda5_219acad763",
    "4d12e95316_5e12760a2b_476050c7c2_eab43fbd15",
    "0031d03319_9e6fcc5155_0352d01ff6_fde22c3487",
    "71979cfed5_95c17fdcdc_57ff30ec61_49cb12b4ef",
  ];

  const expected = "9_0031d03319";

  const result = solveProblem(blocks);
  if (result != expected) {
    console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
  } else {
    console.log(`Test passed ! Got the expected result: ${expected}`);
    console.log(
      "Run the following command to submit:\ntainix submit DIGITALART_5"
    );
  }

  console.log("-".repeat(15) + " End Test " + "-".repeat(15));
}

function init() {
  console.log(
    "CHALLENGE_TOKEN: '2d864a27838b6b03c04fe538f1e8f9bf6957849701e1527895f4a255bd73a69aa173839f5665bbd3'"
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
