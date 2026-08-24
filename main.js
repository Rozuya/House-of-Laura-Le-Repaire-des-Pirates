document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MENU MOBILE
    ========================== */

    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", () => {

            navigation.classList.toggle("open");

        });

    }


    /* =========================
       STATISTIQUES
    ========================== */

    const savedData =
        JSON.parse(
            localStorage.getItem("houseOfLauraPirate")
        ) || {
            points: 0,
            solved: 0,
            best: 0
        };


    const points = document.getElementById("homePoints");
    const riddles = document.getElementById("homeRiddles");
    const best = document.getElementById("homeBest");


    if (points) {
        points.textContent = savedData.points || 0;
    }

    if (riddles) {
        riddles.textContent = savedData.solved || 0;
    }

    if (best) {
        best.textContent = savedData.best || 0;
    }

});
