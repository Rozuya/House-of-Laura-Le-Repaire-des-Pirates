const riddles = [

    {
        title: "Le voyageur immobile",

        text:
`Je peux faire le tour du monde
sans bouger de ma place.

Je peux rester dans une boîte,
mais personne ne peut me capturer.

Qui suis-je ?`,

        hints: [
            "Je voyage grâce aux autres.",
            "On me colle souvent sur quelque chose.",
            "On peut me trouver sur une enveloppe."
        ],

        answers: [
            "timbre",
            "un timbre"
        ]

    },


    {
        title: "Le compagnon du pirate",

        text:
`Je montre le chemin sans avoir de jambes.

Je possède une aiguille,
mais je ne peux pas coudre.

Qui suis-je ?`,

        hints: [
            "Je suis très utile aux navigateurs.",
            "Je peux indiquer une direction.",
            "Je possède une aiguille."
        ],

        answers: [
            "boussole",
            "une boussole"
        ]

    },


    {
        title: "Le coffre mystérieux",

        text:
`Je possède des clés,
mais aucune ne peut ouvrir un coffre.

Je peux faire entendre une mélodie
sans avoir de bouche.

Qui suis-je ?`,

        hints: [
            "On me joue avec les doigts.",
            "Je possède souvent des touches noires et blanches.",
            "On peut me trouver dans une taverne."
        ],

        answers: [
            "piano",
            "un piano"
        ]

    }

];


let currentRiddle = 0;
let hintIndex = 0;


const riddleTitle =
    document.getElementById("riddleTitle");

const riddleText =
    document.getElementById("riddleText");

const answer =
    document.getElementById("answer");

const form =
    document.getElementById("riddleForm");

const result =
    document.getElementById("riddleResult");

const hintButton =
    document.getElementById("hintButton");

const hintText =
    document.getElementById("hintText");

const nextButton =
    document.getElementById("nextRiddle");


function getData() {

    return JSON.parse(
        localStorage.getItem("houseOfLauraPirate")
    ) || {
        points: 0,
        solved: 0,
        best: 0
    };

}


function saveData(data) {

    localStorage.setItem(
        "houseOfLauraPirate",
        JSON.stringify(data)
    );

}


function loadRiddle() {

    const riddle =
        riddles[currentRiddle];

    riddleTitle.textContent =
        riddle.title;

    riddleText.textContent =
        riddle.text;

    answer.value = "";

    result.textContent = "";

    hintText.textContent =
        "Aucun indice utilisé.";

    hintIndex = 0;

    hintButton.disabled = false;

    hintButton.textContent =
        "💡 OBTENIR UN INDICE";

    nextButton.classList.add("hidden");

}


hintButton.addEventListener("click", () => {

    const riddle =
        riddles[currentRiddle];


    if (hintIndex < riddle.hints.length) {

        hintText.textContent =
            "💡 " + riddle.hints[hintIndex];

        hintIndex++;

        if (
            hintIndex <
            riddle.hints.length
        ) {

            hintButton.textContent =
                `💡 INDICE ${hintIndex + 1}`;

        } else {

            hintButton.textContent =
                "💡 TOUS LES INDICES";

            hintButton.disabled = true;

        }

    }

});


form.addEventListener("submit", event => {

    event.preventDefault();


    const riddle =
        riddles[currentRiddle];


    const userAnswer =
        answer.value
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");


    const correct =
        riddle.answers.some(
            accepted =>
                accepted
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                === userAnswer
        );


    if (correct) {

        const data = getData();


        const reward =
            Math.max(
                40,
                120 - (hintIndex * 25)
            );


        data.points += reward;

        data.solved++;

        data.best =
            Math.max(
                data.best,
                data.points
            );


        saveData(data);


        result.textContent =
            `🏆 BRAVO ! +${reward} DOUBLONS`;


        result.style.color =
            "#456c29";


        answer.disabled = true;

        hintButton.disabled = true;

        nextButton.classList.remove("hidden");


    } else {

        result.textContent =
            "💀 Mauvaise réponse... Cherche encore !";

        result.style.color =
            "#7c1d27";

    }

});


nextButton.addEventListener("click", () => {

    currentRiddle++;

    if (
        currentRiddle >=
        riddles.length
    ) {

        currentRiddle = 0;

    }

    answer.disabled = false;

    loadRiddle();

});


loadRiddle();
