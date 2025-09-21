init();
test();

// Challenge variables
const group = ['TUR', 'ECO', 'FIN', 'BEL', 'RUS', 'ANG', 'REP'];
const scores = ['TUR_ECO_1_4', 'TUR_FIN_0_0', 'TUR_BEL_0_1', 'TUR_RUS_3_0', 'TUR_ANG_0_0', 'TUR_REP_2_1', 'ECO_TUR_1_0', 'ECO_FIN_0_0', 'ECO_BEL_2_0', 'ECO_RUS_2_1', 'ECO_ANG_0_2', 'ECO_REP_0_0', 'FIN_TUR_2_1', 'FIN_ECO_1_1', 'FIN_BEL_2_2', 'FIN_RUS_1_4', 'FIN_ANG_1_0', 'FIN_REP_2_1', 'BEL_TUR_0_0', 'BEL_ECO_0_0', 'BEL_FIN_0_1', 'BEL_RUS_3_1', 'BEL_ANG_0_1', 'BEL_REP_0_0', 'RUS_TUR_3_1', 'RUS_ECO_1_2', 'RUS_FIN_0_0', 'RUS_BEL_0_2', 'RUS_ANG_0_0', 'RUS_REP_2_3', 'ANG_TUR_1_0', 'ANG_ECO_3_2', 'ANG_FIN_0_2', 'ANG_BEL_0_0', 'ANG_RUS_0_4', 'ANG_REP_0_3', 'REP_TUR_1_0', 'REP_ECO_2_0', 'REP_FIN_1_4', 'REP_BEL_4_3', 'REP_RUS_4_0', 'REP_ANG_0_2'];


function solveProblem(group, scores) {
    return scores.map(e => {
        [e1, e2, s1, s2] = e.split("_")
        return { team1: e1, team2: e2, score1: Number(s1), score2: Number(s2) }
    })
        .reduce((acc, cur) => {
            validateAccForKey(acc, cur.team1)
            validateAccForKey(acc, cur.team2)

            if (cur.score1 == cur.score2) {
                acc[cur.team1]++
                acc[cur.team2]++
                return acc
            }

            let winner = cur.score1 > cur.score2 ? cur.team1 : cur.team2
            acc[winner] += 3
            return acc
        }, {})
        .toSortedDescList()
        .map(e => e[0])
        .join('')
}

console.log(`Answer: '${solveProblem(group, scores)}'`);

function test() {
    console.log('-'.repeat(15) + ' Start Test ' + '-'.repeat(15));

    // STEPS


    const group = ['RUS', 'CRO', 'HON', 'UKR'];
    const scores = ['RUS_CRO_3_0', 'RUS_HON_4_1', 'RUS_UKR_1_0', 'CRO_RUS_1_4', 'CRO_HON_0_3', 'CRO_UKR_3_1', 'HON_RUS_2_0', 'HON_CRO_2_1', 'HON_UKR_0_2', 'UKR_RUS_0_1', 'UKR_CRO_0_2', 'UKR_HON_2_2'];

    const expected = 'RUSHONCROUKR'

    const result = solveProblem(group, scores);
    if (result != expected) {
        console.log(`WRONG RESULT: Expected '${expected}', got '${result}'`);
    } else {
        console.log(`Test passed ! Got the expected result: ${expected}`);
        console.log('Run the following command to submit:\ntainix submit FOOTBALL_3')
    }

    console.log('-'.repeat(15) + ' End Test ' + '-'.repeat(15));
}

function init() {
    console.log(
        "CHALLENGE_TOKEN: '07955466c6319208cb13ee402e07608fbff2a62b2cf4b85bfebb9bda1ed66c451445041d20820c6a'"
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

    Object.prototype.log = function (arrName = null) {
        if (arrName == null) console.log("Logging:", this);
        else console.log(`Logging ${arrName}:`, this);
        return this;
    };

    Object.prototype.toSortedDescList = function () {
        return dictionnaryToSortedDescArray(this);
    };

    cl = console.log
}

/**
 * Predefined utility functions
 */

function stringToDictOfCharOccurrences(str) {
    return str.split("").reduce((acc, cur) => {
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

    return items
}

function validateAccForKey(acc, key) {
    if (!(key in acc)) acc[key] = 0;
}
