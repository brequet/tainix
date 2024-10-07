
const playerKey = ''; // env var TANIX_TOKEN
const engineCode = 'GREENOID_3';

apiBaseUrl = 'https://tainix.fr/';


const response = await fetch(apiBaseUrl + 'api/games/start/' + playerKey + '/' + engineCode);
const data = await response.json();

if (!data.success) {
    console.log(data.errors);
    showMessage(data.errors.join(', '));

    return;
}

gameToken = data.token
gameData = data.input

document.getElementById('game-data').innerHTML = JSON.stringify(gameData, null, 4);