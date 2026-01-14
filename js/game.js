// Cette fonction permet de charger les listeners sur les inputs
// Elle est appelée à chaque fois qu'on change de quote
// C'est pour ça qu'elle est dans un fichier séparé
// On peut aussi la mettre dans le fichier index.js
// Mais ça fait un peu trop de code dans un seul fichier
const loadListeners = () => {
  console.log("loading listeners"); // on peut voir dans la console que cette fonction est appelée à chaque fois qu'on change de quote
  let score = Date.now(); // on initialise le score à la date actuellle (en millisecondes). On va le soustraire à la date actuelle à la fin du jeu pour avoir le temps écoulé
  
  document.addEventListener("keydown", (event) => {
    if (event.key === "left" || event.key === "ArrowLeft") {
      // focus previous input
      allFocusable = Array.from(document.querySelectorAll("input"));
      let focusedElement = document.activeElement;
      let index = allFocusable.indexOf(focusedElement);
      if (index > 0) {
        allFocusable[index - 1].focus();
      } else {
        allFocusable[allFocusable.length - 1].focus();
      }
    } else if (event.key === "right" || event.key === "ArrowRight") {
      // focus next input
      allFocusable = Array.from(document.querySelectorAll("input"));
      let focusedElement = document.activeElement;
      let index = allFocusable.indexOf(focusedElement);
      if (index < allFocusable.length - 1) {
        allFocusable[index + 1].focus();
      } else {
        allFocusable[0].focus();
      }
    }
  });
  
  document.querySelectorAll("input").forEach((input) => {
    // l'intérieur de cette boucle est exécuté pour chaque input

    // premièrement, on ajoute un listener sur le focus de l'input.
    // c'est à dire quand on clique sur l'input, ou qu'on y entre en faisant tab
    input.addEventListener("focus", function () {
      input.select(); // on sélectionne le texte de l'input, pour que l'utilisateur puisse directement taper une lettre sans avoir à effacer l'ancienne

      // on récupère la lettre de l'input.
      // on a mis cette lettre dans un attribut data-index, dans la fonction buildUI
      let letter = this.getAttribute("data-index");
      // on récupère tous les inputs qui ont la même lettre
      document
        .querySelectorAll(`input[data-index="${letter}"]`)
        .forEach((input) => {
          // Cette boucle est exécutée pour chaque input qui a la même lettre

          // Chaque input qui a la même lettre est mis en 'actif', via l'ajout d'une classe.
          input.classList.add("active"); // Cette classe active change la couleur de fond de l'input, et la couleur du texte du span
          // On ajoute aussi une classe au span qui suit l'input, grace à nextElementSibling
          input.nextElementSibling.classList.add("active");
        });
    });

    // deuxièmement, on ajoute un listener sur le changement de valeur de l'input
    // c'est à dire quand on tape une lettre, qu'on colle du texte, ou qu'on efface
    input.addEventListener("input", function () {
      // si la valeur de l'input n'est pas une lettre, ou si la valeur de l'input est plus longue qu'une seule lettre, on efface la valeur de l'input
      if (alphabet.indexOf(this.value.toUpperCase()) < 0 || this.value.length > 1) {
        this.value = ""; // on efface la valeur de l'input
        this.classList.add("shake"); // on ajoute une classe shake à l'input, qui va faire trembler l'input (voir le fichier css)
        setTimeout(() => {
          this.classList.remove("shake"); // on enlève la classe shake après 500ms
        }, 500); // setTimeout est une fonction qui permet d'exécuter une fonction après un certain temps
      } else {
        // cette partie du code est exécutée si la valeur de l'input est bien une lettre
        this.value = this.value.toUpperCase(); // on met la valeur de l'input en majuscule

        let letter = this.getAttribute("data-index"); // on récupère la lettre de l'input, de la même manière que précédemment
        document
          .querySelectorAll(`input[data-index="${letter}"]`)
          .forEach((input) => {
            input.value = this.value; // on met la valeur de l'input dans tous les inputs qui ont la même lettre
          });

        // Partie compliquée, qui permet de passer à l'input suivant, si l'input actuel n'est pas vide

        // On commence par récupérer tous les inputs du document (le select en haut à droite n'est pas un input)
        let inputs = Array.from(document.querySelectorAll("input"));

        // On récupère l'index de l'input actuel dans le tableau des inputs
        let index = inputs.indexOf(this);

        // On réordonne le tableau des inputs, pour que l'input actuel soit en premier, et que ceux qui le précèdent soient à la fin du tableau
        let reorderedInputs = inputs
          .slice(index, inputs.length - 1) // slice : "tranche", récupère une sous partie du tableau
          .concat(inputs.slice(0, index - 1)); // concat : concatène deux tableaux, ici avec la deuxième sous partie du tableau

        // Ensuite, on cherche le premier input qui est vide
        index = 0;
        let nextInput = reorderedInputs[0]; // On commence par celui ou on est. Note : s'il est vide, pas besoin de chercher plus loin, on ne passera pas dans le while
        while (nextInput && nextInput.value != "") { // tant qu'il y a un input, et que la valeur de l'input n'est pas vide, on loop
          nextInput = reorderedInputs[++index]; // on passe à l'input suivant (index++ est équivalent à index = index + 1, et permet d'accéder à l'élément à cet index tout en incrémentant l'index)
        }

        // quand on est sorti de ce while, soit nextInput est vide, soit il n'y a plus d'input

        // On regarde alors laquelle de ces raisons a fait sortir de la boucle
        if (nextInput) {
          // Si nextInput est défini, c'est qu'il est vide, on peut donc lui donner le focus
          nextInput.focus();
        } else {
          // Sinon, c'est qu'il n'y a plus d'input, on peut donc vérifier si l'utilisateur a la bonne réponse
          // On va récupérer la valeur du hash de la solution (TODO: implémenter une fonction de hashage)
          let hash = localStorage.getItem("hash"); // le LocalStorage permet de stocker des données dans le navigateur, même après la fermeture de la page

          // Ensuite, on va récupérer la valeur de tous les inputs, et les concaténer pour comparer avec le hash
          let value = "";
          inputs.forEach((input) => {
            value += input.value;
          });

          // value.split("").sort("").join("") est l'actuelle fonction de hash.
          // On split la valeur en un tableau de caractères, on le trie, et on le rejoint en une chaîne de caractères
          // Cela permet de passer d'une phrase comme "hello world" à "dehllloorw" (plus difficile à deviner, tout en restant rapide à calculer)
          if (value.split("").sort().join("") == hash) {
            // Si la valeur de l'input est la bonne, on affiche le modal
            // On commence par calculer le score
            score = Date.now() - score;
            // On arrondit le score à la seconde
            score = Math.floor(score / 1000);
            // On affiche le score dans le modal, en minutes et secondes (note, si le score est supérieur à 60 minutes, il n'y a pas de conversion en heures)
            document.querySelector("#modal-score").innerHTML = `${Math.floor(
              score / 60
            )} min, ${score % 60} s`;
            document.querySelector("#modal").classList.add("active"); // on ajoute la classe active au modal, qui va l'afficher (voir le css)
          } else {
            // Si la valeur de l'input n'est pas la bonne, on ajoute la classe shake au quote, qui va faire trembler le texte
            // L'utilisateur peut alors voir qu'il s'est trompé
            document.querySelector("#quote").classList.add("shake");
            setTimeout(() => {
              document.querySelector("#quote").classList.remove("shake"); // Il s'agit de la même animation shake que quand l'utilisateur entre une valeur incorrecte dans un input
            }, 1000);
          }
        }
      }
    });

    // Enfin, on ajoute un event listener sur l'input, pour supprimer la classe active sur le span, quand l'utilisateur clique ailleurs sur la page
    // L'event "blur" est déclenché quand l'utilisateur clique ailleurs sur la page (qu'il unfocus l'input)
    input.addEventListener("blur", function () {
      let letter = this.getAttribute("data-index"); // on récupère la lettre de l'input
      document
        .querySelectorAll(`input[data-index="${letter}"]`)
        .forEach((input) => {
          // on enlève la classe active sur tous les inputs qui ont la même lettre
          input.classList.remove("active");
          input.nextElementSibling.classList.remove("active"); // on enlève la classe active sur tous les spans qui ont la même lettre
        });
    });
  });
};
