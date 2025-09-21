/**
 * Tainix Challenge: meurtre-syntheria (DETECTIVE)
 *
 * Problem:
 * You can find the problem description on the Tainix website.
 *
 * No steps found for this challenge.
 */

// Example of the data you will receive:
const exampleData = {"indices":["taille_is_petit","poids_is_enrobe","poids_not_mince","cheveux_is_chatain","yeux_is_vairons"],"suspects":["nom:Sylvie,yeux:vairons,cheveux:chatain,taille:petit,poids:enrobe","nom:Rachida,yeux:vairons,cheveux:blanc,taille:moyen,poids:enrobe","nom:Alix,yeux:noir,cheveux:bleu,taille:petit,poids:moyen","nom:Mohamed,yeux:bleus,cheveux:roux,taille:petit,poids:enrobe","nom:Fatou,yeux:noir,cheveux:vert,taille:grand,poids:enrobe"]};

// --- Your implementation below ---

function solve(data: typeof exampleData): string | number {
  console.log('Received data:', data);
  
  // TODO: Implement your solution here
  const result = 0;
  
  return result;
}

// --- Tests ---

const result = solve(exampleData);
console.log(`Your result is: ${result}`);

const expectedOutput = `Sylvie_4`;
console.log(`Expected output is: ${expectedOutput}`);

if (String(result) === String(expectedOutput)) {
    console.log("✅ Success!");
} else {
    console.log("❌ Failed!");
}
