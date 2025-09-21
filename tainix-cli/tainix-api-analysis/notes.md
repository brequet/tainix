# Tainix API analysis

## Dedicated game's API

Getting a challenge with dedicated game's API gives problem input, and token to submit result:

```bash
curl https://tainix.fr/api/games/start/$PLAYER_KEY/STARTER_6     
```

Response:

```json
{"input":{"values":[33,45,64,40,77,25,33,57,37,80,27,93,58,75,77,34,10,14,72,95,90,55,82,35,64,79,63,43,47,67]},"token":"41664e4e2453d519927b91b45d77fee50355d76a98b2d1f125ae1a5fb1835468c57e383e57fe8e2c","success":true}
```

## Website API

Challenge page data :

```bash
curl 'https://tainix.fr/challenge/Utilisation-d-une-fonction' `
  -H 'Cookie: PHPSESSID=$PHPSESSID;' `
  --compressed 
```

Response: Challenge page.

- Contains the challenge code, eg: `code du challenge pour résolution via l'API : CHALLENGECODE` or look for `href="/sandbox/play/CHALLENGECODE"
- Example data for resolution with steps:
  - JSON input example in div `div.format.format-json`: `{"values":[48,57,90,34,55,72,83,27,27,33,80,40,16,18,23,45,94,93,73,43,70,50,40,69,12,95,58,91]}`
  - Expected response could located in the `p` element right after the `p.h3.mt-4` element:
    ```html
    <p class="h3 mt-4">Réponse attendue</p>
    <p>90-42-54-63-69-72-51-54-30-36</p>
    ```
  - Explicative steps for the challenge can be found too:
    - First locate the block that could holds the steps if present: `Déroulé étape par étape<\/p>\s*<p><span\s+[\w\s=":;#-]+><\/span>(.*?)<\/p>`
    ```html
    `Déroulé étape par étape</p>
       <p><span style="display: inline-block; background: #8e44ad; width: 13px; height: 13px; border-radius: 10px;"></span> &nbsp; Indice n°: 1<br><span style="display: inline-block; background: #2c7be5; width: 13px; height: 13px; border-radius: 10px;"></span> &nbsp; On enlève Anne car sa caractéristique de type yeux n'est pas vairons<br><span style="display: inline-block; background: #2c7be5; width: 13px; height: 13px; border-radius: 10px;"></span> &nbsp; On enlève Issa car sa caractéristique de type yeux n'est pas vairons<br><span style="display: inline-block; background: #2c7be5; width: 13px; height: 13px; border-radius: 10px;"></span> &nbsp; On enlève Claude car sa caractéristique de type yeux n'est pas vairons<br><span style="display: inline-block; background: #2c7be5; width: 13px; height: 13px; border-radius: 10px;"></span> &nbsp; On enlève Ethan car sa caractéristique de type yeux n'est pas vairons<br></p>`
    ``` 
  - 


WARNING: PHPSESSID probably outdated if page contains "Il semblerait que tu aies rencontré un problème".