// Sélectionne toutes les cases du jeu //
const cells = document.querySelectorAll(".cell");
// Sélectionne l’élément affichant le statut du jeu //
const statusText = document.querySelector(".game-status");
// Sélectionne le bouton de réinitialisation //
const restartButton = document.querySelector(".restart");

// Définit le premier joueur ("X")  //
let currentPlayer = "X"
// Variable pour vérifier si le jeu est actif  //
let activeGame = true;
// Tableau représentant l'état du plateau //
let gameState = ["", "", "", "", "", "", "", "", ""]



const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes 
    [0, 4, 8], [2, 4, 6] // Diagonales  
];

function cellClick(event) {
    let clickedCell = event.target; // Récupère la case cliquée
    let clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index")); // Récupère l’index de la case, parsInt traduit texte a nombre et getAttribute prend attribute de...

    if (gameState[clickedCellIndex] !== "" || !activeGame) {
        return; // Empêche de jouer si la case est déjà remplie ou si le jeu est terminé
    }

    gameState[clickedCellIndex] = currentPlayer; // Met à jour l'état du jeu  
    clickedCell.textContent = currentPlayer; // Affiche le symbole du joueur dans la case  

    WinnersCheck(); // Vérifie si un joueur a gagné 
}

function WinnersCheck () {
    let win = false; // Variable pour vérifier si quelqu’un a gagné 


    // Je vais regarder toutes les combinaisons gagnantes une par une. 
    // Pour chaque combinaison, je prends trois cases du plateau : la première, la deuxième et la troisième.
    //  Ces trois cases sont comme des petits tiroirs dans lesquels on met un X ou un O.
    //  Je vais ensuite vérifier si ces trois cases contiennent la même chose, ce qui voudrait dire que quelqu’un a gagné.
    
    for (let i = 0; i < winningCombinations.length; i++) {
        let winCondition = winningCombinations[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === "" || b === "" || c === "") {
            continue; // Ignore les combinaisons avec des cases vides  
        }
        
        if (a === b && b === c) {
            win = true; // Si les trois cases sont identiques, il y a un gagnant  
            break;
        }
    }

    if (win) {
        statusText.textContent = `Player ${currentPlayer} has won!`; // Affiche le gagnant
        activeGame = false; // Désactive le jeu  
        return;
    }

    let draw = !gameState.includes(""); // Vérifie s'il reste des cases vides
    if (draw) {
        statusText.textContent = "Game ended in a draw!"; // Affiche un message d'égalité
        activeGame = false;
        return;
    }

    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    } // Change de joueur
    statusText.textContent = `It's ${currentPlayer}'s turn!`; // Met à jour le statut 
}


function restartGame() {
    gameState = ["", "", "", "", "", "", "", "", "", ]; // Réinitialise l'état du jeu 
    activeGame = true; // Réactive le jeu 
    currentPlayer = "X"; // Redémarre avec "X" 
    statusText.textContent = `It's ${currentPlayer}'s turn`; // Met à jour l'affichage 
    cells.forEach(cell => cell.textContent = ""); // Efface toutes les cases 
}


// Accordion //



cells.forEach(cell => cell.addEventListener("click", cellClick));
restartButton.addEventListener("click", restartGame);

statusText.textContent = `It's ${currentPlayer}'s turn`;

let one = document.getElementById("one");
let triggerOne = document.getElementById("triggerOne")

function accordion(trigger) {
    if (trigger.classList.contains("active")) {
        trigger.classList.remove("active");
        trigger.style.maxHeight = null;
    } else {
        trigger.classList.add("active");
        trigger.style.maxHeight = trigger.scrollHeight + "px";
    }
}

one.addEventListener("click", function() {
    accordion(triggerOne);
});