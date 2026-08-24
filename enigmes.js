const enigme = {
  question: "Je parle sans bouche et j'entends sans oreilles. Je n'ai pas de corps, mais j'anime les voiles. Que suis-je ?",
  reponse: "vent",
  indices: [
    "Indice 1 : Tu le sens sans jamais le voir.",
    "Indice 2 : Les marins en ont désespérément besoin.",
    "Indice 3 : Il souffle sur l'océan."
  ]
};

let doubloons = parseInt(localStorage.getItem('doubloons') || '0');

function updateDoubloonsDisplay() {
  const el = document.getElementById('doubloon-count');
  if (el) el.textContent = doubloons;
}

function showHint(index) {
  document.getElementById(`indice-${index}`).textContent = enigme.indices[index - 1];
}

function checkAnswer() {
  const input = document.getElementById('answer-input').value.toLowerCase().trim();
  const result = document.getElementById('result-msg');
  
  if (input.includes(enigme.reponse)) {
    result.textContent = "Capitaine ! Bonne réponse, tu gagnes +50 Doubloons ! 🪙";
    result.style.color = "green";
    doubloons += 50;
    localStorage.setItem('doubloons', doubloons);
    updateDoubloonsDisplay();
  } else {
    result.textContent = "Mauvaise réponse, retourne à la bouteille de rhum !";
    result.style.color = "red";
  }
}

document.addEventListener('DOMContentLoaded', updateDoubloonsDisplay);
