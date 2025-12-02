let quote, author, tag = ""; // on initialise les variables quote, author et tag à une chaîne de caractères vide
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // on initialise la variable alphabet à une chaîne de caractères contenant toutes les lettres de l'alphabet
// remarque sur let et const :
// let est une variable qui peut être modifiée (c'est un peu plus compliqué que ça)
// const est une variable qui ne peut pas être modifiée

const QUOTES = [
    {
        "quote": "La vie est un mystère qu'il faut vivre, et non un problème à résoudre.",
        "author": "Gandhi",
        "tag": "Vie"
    },
    {
        "quote": "Le succès n'est pas la clé du bonheur. Le bonheur est la clé du succès. Si vous aimez ce que vous faites, vous réussirez.",
        "author": "Albert Schweitzer",
        "tag": "Bonheur"
    },
    {
        "quote": "La plus grande gloire n'est pas de ne jamais tomber, mais de se relever à chaque chute.",
        "author": "Confucius",
        "tag": "Persévérance"
    },
    {
        "quote": "Le seul endroit où le succès vient avant le travail, c'est dans le dictionnaire.",
        "author": "Vidal Sassoon",
        "tag": "Travail"
    },
    {
        "quote": "Ne jugez pas chaque jour à la récolte que vous faites, mais aux graines que vous plantez.",
        "author": "Robert Louis Stevenson",
        "tag": "Patience"
    },
    {
        "quote": "La créativité, c'est l'intelligence qui s'amuse.",
        "author": "Albert Einstein",
        "tag": "Créativité"
    },
    {
        "quote": "Le bonheur n'est pas quelque chose de prêt à l'emploi. Il vient de vos propres actions.",
        "author": "Dalaï Lama",
        "tag": "Bonheur"
    },
    {
        "quote": "La vie est 10% ce qui nous arrive et 90% comment nous y réagissons.",
        "author": "Charles R. Swindoll",
        "tag": "Attitude"
    },
    {
        "quote": "L'éducation est l'arme la plus puissante pour changer le monde.",
        "author": "Nelson Mandela",
        "tag": "Éducation"
    },
    {
        "quote": "Le voyage de mille lieues commence par un pas.",
        "author": "Lao Tseu",
        "tag": "Début"
    },
    {
        "quote": "Il n'y a qu'une façon d'échouer, c'est d'abandonner avant d'avoir réussi.",
        "author": "Georges Clémenceau",
        "tag": "Persévérance"
    },
    {
        "quote": "La seule limite à notre épanouissement de demain sera nos doutes d'aujourd'hui.",
        "author": "Franklin D. Roosevelt",
        "tag": "Confiance"
    },
    {
        "quote": "Le plus grand risque est de ne prendre aucun risque.",
        "author": "Mark Zuckerberg",
        "tag": "Courage"
    },
    {
        "quote": "La simplicité est la sophistication suprême.",
        "author": "Leonardo da Vinci",
        "tag": "Simplicité"
    },
    {
        "quote": "La meilleure façon de prédire l'avenir est de le créer.",
        "author": "Peter Drucker",
        "tag": "Avenir"
    },
    {
        "quote": "Le bonheur n'est pas une destination, c'est une façon de voyager.",
        "author": "Margaret Lee Runbeck",
        "tag": "Bonheur"
    },
    {
        "quote": "La vie est trop courte pour être petite.",
        "author": "Benjamin Disraeli",
        "tag": "Vie"
    },
    {
        "quote": "Le courage ne rugit pas toujours. Parfois, le courage est la petite voix à la fin de la journée qui dit : 'Je réessaierai demain.'",
        "author": "Mary Anne Radmacher",
        "tag": "Courage"
    },
    {
        "quote": "Ne regardez pas l'horloge ; faites ce qu'elle fait. Continuez.",
        "author": "Sam Levenson",
        "tag": "Persévérance"
    },
    {
        "quote": "La vie est un défi, relève-le !",
        "author": "Mère Teresa",
        "tag": "Défi"
    }
]

/* GESTION DU THEME (SOMBRE|CLAIR) */
// On récupère le thème dans le local storage
let theme = localStorage.getItem("theme");
if (theme == null) {
    // si le thème n'est pas dans le local storage, on le met à "light" (valeur par défaut)
    theme = "light";
    localStorage.setItem("theme", theme); // on met le thème dans le local storage
}

// Maintenant que le thème est dans le local storage, on l'applique
document.querySelector("html").classList = theme == "light" ? "" : "dark"; // On applique le thème directement sur la balise html (note : pas testé sur Firefox)

// On ajoute un listener sur le bouton toggle, c'est à dire une fonction qui se lance quand on clique sur le bouton
document.querySelector("#toggle").addEventListener("click", function() {
    // on inverse le thème
    if (theme == "light") {
        theme = "dark";
    } else {
        theme = "light";
    }
    // on met le thème dans le local storage
    localStorage.setItem("theme", theme);
    // on applique le thème sur la balise html
    document.querySelector("html").classList = theme == "light" ? "" : "dark";
});

/* GESTION DE LA DIFFICULTE */
// De manière similaire, on récupère la difficulté dans le local storage
let difficulty = localStorage.getItem("difficulty");
if (difficulty == null) {
    // si la difficulté n'est pas dans le local storage, on la met à 8 (valeur par défaut)
    difficulty = 9; // facile
    localStorage.setItem("difficulty", difficulty); // on met la difficulté dans le local storage
}

// Maintenant que la difficulté est dans le local storage, on l'applique
document.querySelector("#difficulty").value = difficulty; // On applique la difficulté sur le select de la page

// On ajoute un listener sur le select de la difficulté, c'est à dire une fonction qui se lance quand on change la valeur du select change
document.querySelector("#difficulty").addEventListener("change", function() {
    difficulty = this.value; // on modifie la variable difficulty, qui est utilisée plus tard
    localStorage.setItem("difficulty", difficulty); // on l'ajoute au local storage
});

/* RECUPERATION DE LA CITATION */
// On utilise une API publique, gratuite et sans clef, pour plusieurs raisons :
// - avoir une citation différente à chaque refresh
// - le code est public, donc pas de clef
// - apprendre à utiliser une API
let quoteAPIURL = "https://quotes.domiadi.com/api";
fetch(quoteAPIURL)
.catch(function(error) {
    // Cette partie est éxécutée s'il y a une erreur
    console.log(error); // Log pour debug
    // On met une citation par défaut
    let randomIndex = Math.floor(Math.random() * QUOTES.length);
    quote = QUOTES[randomIndex].quote; // On met à jour nos variables
    author = QUOTES[randomIndex].author;
    tag = QUOTES[randomIndex].tag;

    // On remplit les éléments du html via l'attribut innerHTML
    document.querySelector('#author').innerHTML = author;
    document.querySelector('#tag').innerHTML = tag;
    document.querySelector('#modal-quote').innerHTML = quote;

    // On met la citation en majuscule
    quote = quote.toUpperCase();

    // On normalise pour remplacer les lettres accentuées par leur équivalent non accentué
    quote = quote.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // source : https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript

    // On crypte la citation grace à la fonction cryptQuote (voir plus bas)
    let [letters, encryptedQuote] = cryptQuote(quote, difficulty);

    // Et on construit l'UI !
    buildUI(letters, encryptedQuote);
})
.then(function(response) {
    // Cette partie est éxécutée si il n'y a pas d'erreur, et on récupère la réponse de l'API
    // On transforme la réponse en JSON, pour pouvoir la manipuler plus facilement (JSON = JavaScript Object Notation)
    return response.json();
}).then(function(data) {
    // Maintenant, on a la réponse de l'API, et on peut la manipuler aisément grâce au format JSON
    quote = data.quote; // On met à jour nos variables
    author = data.from;
    tag = data.tags || "Inconnu"; // Si le tag est vide, on met "Inconnu"
    document.querySelector('#author').innerText = author; // On remplit les éléments du html via l'attribut innerHTML
    document.querySelector('#tag').innerText = tag;
    document.querySelector('#modal-quote').innerText = quote;

    // De la même manière, on met la citation en majuscule
    quote = quote.toUpperCase();

    // On crypte la citation grace à la fonction cryptQuote (voir plus bas)
    let [letters, encryptedQuote] = cryptQuote(quote, difficulty);

    // Et on construit l'UI !
    buildUI(letters, encryptedQuote);
});

/* FONCTION QUI CRYPTE LA CITATION */
// Cette fonction prend en paramètre la citation, et la difficulté
// Elle retourne un tableau de 2 éléments :
// - le tableau des lettres
// - la citation cryptée

// Comment fonctionne cette fonction ?
// - On crée le hash (qui permettra de vérifier que la réponse de l'utilisateur est bonne) :
//      On prend la citation, on la met en majuscule, on la trie, et on la met dans le local storage
// - On crée la citation cryptée :
//      On mélange l'alphabet, et on remplace chaque lettre de la citation par la lettre correspondante dans l'alphabet mélangé
// - On crée le tableau des lettres :
//      Pour chaque lettre de l'alphabet mélangée, on vérifie si elle est dans la citation cryptée, et si oui, on l'ajoute au tableau des lettres
//      On y ajoute le nombre de fois ou elle est présente dans la citation cryptée, et les positions correspondantes
//      Enfin, on y ajoute la lettre d'origine
// - On modifie ce tableau en elevant à certaines lettres leur lettre d'origine, en fonction de la difficulté
// - On retourne le tableau des lettres, et la citation cryptée

function cryptQuote(quote, difficulty = 5) {
    // Fonction de hash simple et rapide à calculer (mais pas très sécurisé)
    // Transforme "Hello World" en "DEHLLLOOORW
    let hash = quote.toUpperCase().split("").filter(char => alphabet.includes(char)).sort().join("");

    // On ajoute le hash au local storage
    localStorage.setItem("hash", hash);

    // On mélange l'alphabet
    let shuffledAlphabet = alphabet.split('').sort(function(){return 0.5-Math.random()}).join('');

    // On crypte la citation
    let encryptedQuote = "";
    for (let letter of quote) {
        // La boucle de type for .. of est privilégiée à la boucle for .. in, car elle permet de parcourir les éléments d'un tableau, et non les indexs
        if (alphabet.includes(letter)) { // Si la lettre est dans l'alphabet, on la crypte, sinon on la laisse telle quelle (pour les espaces, les ponctuations, etc.)
            encryptedQuote += shuffledAlphabet[alphabet.indexOf(letter)];
        } else {
            encryptedQuote += letter;
        }
    }

    // La difficulté est un nombre entre 0 et 8, qui correspond au nombre de lettres à afficher sans les crypter
    // Difficulté 0 : Aucune lettre n'est affichée
    // Difficulté 1 : 1 lettre sur sur tout l'alphabet est affichée

    // Letters est un tableau de lettres, avec pour chaque lettre :
    // - La lettre
    // - Les positions où elle se trouve dans la citation cryptée
    // - La lettre d'origine (pour le cas ou elle n'est pas cyptée)

    let letters = []; // Sera au maximum de taille 26 (le nombre de lettres dans l'alphabet)

    for (let letter of alphabet) {
        // pour chaque lettre de l'alphabet
        let indexes = [];
        let originalLetter = "";
        for (let j = 0; j < encryptedQuote.length; j++) {
            // Ici, il est important d'utiliser une boucle for, et non une boucle for .. of, car on a besoin de l'index j
            if (encryptedQuote[j] == letter) { // Si la lettre est dans la citation cryptée
                indexes.push(j); // On ajoute l'index à la liste des indexes
                originalLetter = quote[j]; // On ajoute la lettre d'origine
            }
        }
        letters.push({
            "letter": letter,
            "indexes": indexes,
            "originalLetter": originalLetter
        }); // note : si la lettre n'est pas dans la citation cryptée, indexes sera vide, et originalLetter sera vide
    }

    // lettersPresent est le tableau des lettres qui sont présentes dans la citation cryptée (on enlève les lettres qui ne sont pas présentes)
    let lettersPresent = letters.filter(function(letter) {
        return letter.indexes.length > 0; // la fonction filter prend un fonction en paramètre, qui doit retourner true ou false, et garde les éléments pour lesquels la fonction retourne true
    });

    // On mélange le tableau des lettres
    lettersPresent = lettersPresent.sort(function(){return 0.5-Math.random()});

    // LettersPresentOriginalRemoved est le tableau des lettres qui sont présentes dans la citation cryptée, mais sans leur lettre d'origine
    // On enlève à certaines lettres leur lettre d'origine, en fonction de la difficulté
    let lettersPresentOriginalRemoved = [];
    let length = lettersPresent.length - difficulty;
    while (lettersPresentOriginalRemoved.length < length) { // tant qu'on a pas enlevé assez de lettres
        let letter = lettersPresent.pop(); // on enlève la dernière lettre du tableau
        letter.originalLetter = ""; // on enlève sa lettre d'origine
        lettersPresentOriginalRemoved.push(letter); // on l'ajoute au tableau des lettres sans leur lettre d'origine
    }

    // On concatène les deux tableaux (les lettres avec leur lettre d'origine (taille = difficulty), et les lettres sans leur lettre d'origine)
    letters = lettersPresentOriginalRemoved.concat(lettersPresent);

    // On supprime les tableaux utilisés, pour ne pas que les utilisateurs puissent les voir
    delete lettersPresent;
    delete lettersPresentOriginalRemoved;

    return [letters, encryptedQuote]; // On retourne le tableau des lettres, et la citation cryptée
}

/* CONSTRUCTION DE L'INTERFACE GRAPHIQUE */
function buildUI(letters, encryptedQuote) {
    // Ici, on va manipuler directement le html, pour construire l'interface graphique
    // On va utiliser la fonction innerHTML, qui permet de remplacer le contenu d'un élément html par du html
    // On va aussi utiliser la fonction querySelector, qui permet de récupérer un élément html à partir de son sélecteur css

    // note : on pourrait utiliser la fonction createElement, qui permet de créer un élément html, et la fonction appendChild, qui permet d'ajouter un élément html à un autre élément html,
    // but lets keep it simple
    let html = "";

    // On enlève le paragraphe dans #quote
    document.querySelector("#quote").removeChild(document.querySelector("#quote p"));

    let lastWasLetter = false; // pour savoir si le caractère précédent était une lettre (pour savoir si on doit ajouter un div.word)
    for (let letter of encryptedQuote) { // Pour chaque caractère de la citation cryptée
        let currentIsLetter = false; // on commence par dire que ce n'est pas une lettre (après tout, personne ne sait ce que c'est)
        if (alphabet.indexOf(letter) >= 0) { // Si le caractère est une lettre,
            currentIsLetter = true; // on dit que c'est une lettre (et oui !)
            let index = letters.findIndex(ltr => ltr.letter == letter); // on récupère l'index de la lettre dans le tableau des lettres
            // on ajoute un input, et on met la lettre d'origine dedans (si elle existe).
            // en particulier, si la lettre a encore sa lettre original, on disable l'input, pour qu'il ne puisse pas être modifié
            // on y ajoute aussi un élément, data-index, qui contient l'index de la lettre dans le tableau des lettres
            // cet attribut sera utilisé pour modifier d'un coup tous les inputs qui ont la même lettre
            // enfin, on ajoute l'attribut required, qui permet de sélectionner tous les inputs vides avec css (via la pseudo-classe :valid, ptit hack trop stylé)
            let disabled = letters[index].originalLetter ? "disabled" : "required"; // on est soit disable soit required, jamais les deux
            // au final, voilà ce que ça donne :
            letter = `<input ${disabled} type="text" maxlength="1" data-index="${index}" value="${letters.find(ltr => ltr.letter == letter).originalLetter}"/><span>${letters[index].letter}</span>`;
        }
        // Maintenant, on va ajouter un div.word autour de chaque mot
        // pour ça, on va regarder si le caractère précédent était une lettre, et si le caractère actuel est une lettre
        if (currentIsLetter && !lastWasLetter) {
            // Début de mot
            html += "<div class='word'>";
        } else if (!currentIsLetter && lastWasLetter) {
            // Fin de mot
            html += "</div>";
        }

        lastWasLetter = currentIsLetter; // on met à jour la variable lastWasLetter
        html += `<span>${letter}</span>`; // on ajoute ce qu'on a construit ! (le caractère, ou l'input)
    }
    document.querySelector('#quote').innerHTML = html; // on remplace le contenu de l'élément html avec l'id quote par le html qu'on a construit

    loadListeners(); // permet de charger les listeners sur les inputs, et donc de lancer la partie !
}

