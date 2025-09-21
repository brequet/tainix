class Game {
  /**
   * URL de l'API
   *
   * @type {string}
   */
  apiBaseUrl = "https://tainix.fr/";

  /**
   * Code du challenge
   *
   * @type {string}
   */
  engineCode;

  /**
   * Key d'identification du joueur
   *
   * @type {string}
   */
  playerKey;

  /**
   * Token du jeu
   *
   * @type {string}
   */
  gameToken;

  /**
   * Data du jeu
   *
   * @type {object}
   */
  gameData;

  /**
   * Constructeur
   *
   * @param {string} key
   * @param {string} engineCode
   */
  constructor(playerKey, engineCode) {
    this.playerKey = playerKey;
    this.engineCode = engineCode;

    document.getElementById("engine-code").innerHTML = this.engineCode;
  }

  /**
   * Lance le jeu
   */
  async start() {
    try {
      const response = await fetch(
        this.apiBaseUrl +
          "api/games/start/" +
          this.playerKey +
          "/" +
          this.engineCode
      );
      const data = await response.json();

      if (!data.success) {
        console.log(data.errors);
        this.showMessage(data.errors.join(", "));

        return;
      }

      this.gameToken = data.token;
      this.gameData = data.input;

      document.getElementById("game-data").innerHTML = JSON.stringify(
        this.gameData,
        null,
        4
      );
    } catch (error) {
      console.log(error);
      this.showErrorMessage();
    }
  }

  /**
   * Envoi des data du joueur
   *
   * @param {*} playerResponse
   */
  async output(playerResponse) {
    try {
      const base64EncodedPlayerResponse = btoa(JSON.stringify(playerResponse));

      const response = await fetch(
        this.apiBaseUrl +
          "api/games/response/" +
          this.gameToken +
          "/" +
          base64EncodedPlayerResponse
      );
      const data = await response.json();

      if (!data.success) {
        console.log(data.errors);
        this.showMessage(data.errors.join(", "));

        return;
      }

      console.log(data);
      this.showMessage(data.game_message);
    } catch (error) {
      console.log(error);
      this.showErrorMessage();
    }
  }

  /**
   * Affichage d'un message
   *
   * @param {string} message
   */
  showMessage(message) {
    document.getElementById("message").innerHTML = `${message}`;
  }

  /**
   * Affichage d'un message d'erreur
   */
  showErrorMessage() {
    this.showMessage("Une erreur est survenue.");
  }
}
