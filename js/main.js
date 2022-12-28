let quote, author, tag = "";
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// theme
// first, we get the theme from the local storage
let theme = localStorage.getItem("theme");
if (theme == null) {
    theme = "light";
    localStorage.setItem("theme", theme);
}

// we set the theme on html element
document.querySelector("html").classList = theme == "light" ? "" : "dark";

// listener on the theme button
document.querySelector("#toggle").addEventListener("click", function() {
    if (theme == "light") {
        theme = "dark";
    } else {
        theme = "light";
    }
    localStorage.setItem("theme", theme);
    document.querySelector("html").classList = theme == "light" ? "" : "dark";
});

// fisrt, we call the quote API to get the quote data
let quoteAPIURL = "https://api.quotable.io/random";
fetch(quoteAPIURL)
.catch(function(error) {
    console.log(error);
    quote = "Mieux vaut brasser de l'air que couler";
    author = "Isma Geindre";
    tag = "proverbe";
    document.querySelector('#author').innerHTML = author;
    document.querySelector('#tag').innerHTML = tag;

    // to upper case
    quote = quote.toUpperCase();

    // crypt the quote
    let [letters, encryptedQuote] = cryptQuote(quote);

    // build the UI
    buildUI(letters, encryptedQuote);
})
.then(function(response) {
    return response.json();
}).then(function(data) {
    console.log(data);
    quote = data.content;
    author = data.author;
    tag = data.tags[0];
    document.querySelector('#author').innerHTML = author;
    document.querySelector('#tag').innerHTML = tag;

    // to upper case
    quote = quote.toUpperCase();

    // crypt the quote
    let [letters, encryptedQuote] = cryptQuote(quote);

    // build the UI
    buildUI(letters, encryptedQuote);
});

// crypt quote
function cryptQuote(quote, difficulty = 5) {
    // create a hash from quote
    let hash = quote.toUpperCase().split("").filter(char => alphabet.includes(char)).sort().join("");

    // save the hash in the local storage
    localStorage.setItem("hash", hash);

    let shuffledAlphabet = alphabet.split('').sort(function(){return 0.5-Math.random()}).join('');
    let encryptedQuote = "";
    for (let i = 0; i < quote.length; i++) {
        let letter = quote[i];
        let index = alphabet.indexOf(letter);
        if (index >= 0) {
            encryptedQuote += shuffledAlphabet[index];
        } else {
            encryptedQuote += letter;
        }
    }

    // difficulty is the number of letters to show
    // difficulty = 1 means only one letter is shown

    // ecryptedQuote is the encrypted quote
    // quote is the original quote
    // letters is an array of :
    //  - the letter to show
    //  - an array of the indexs of the letter in the encrypted quote
    //  - corresponding letter in the original quote

    let letters = []; // size of the alphabet

    for (let i = 0; i < alphabet.length; i++) {
        let letter = alphabet[i];
        let indexes = [];
        let originalLetter = "";
        for (let j = 0; j < encryptedQuote.length; j++) {
            if (encryptedQuote[j] == letter) {
                indexes.push(j);
                originalLetter = quote[j];
            }
        }
        letters.push({
            "letter": letter,
            "indexes": indexes,
            "originalLetter": originalLetter
        });
    }

    // lettersPresent is the same array as letters, but only with the letters that are present in the encrypted quote
    let lettersPresent = letters.filter(function(letter) {
        return letter.indexes.length > 0;
    });

    // we suffle the lettersPresent array
    lettersPresent = lettersPresent.sort(function(){return 0.5-Math.random()});

    // lettersPresentOriginalRemoved is the same array as lettersPresent, but with the original letter removed for some letters
    // the number of letters to remove is determined by the difficulty
    let lettersPresentOriginalRemoved = [];
    let length = lettersPresent.length - difficulty;
    while (lettersPresentOriginalRemoved.length < length) {
        let letter = lettersPresent.pop();
        letter.originalLetter = "";
        lettersPresentOriginalRemoved.push(letter);
    }

    // we merge the lettersPresentOriginalRemoved and lettersPresent arrays
    letters = lettersPresentOriginalRemoved.concat(lettersPresent);

    return [letters, encryptedQuote, hash];
}

// build the UI
function buildUI(letters, encryptedQuote) {
    console.log(letters);
    let html = "";
    let lastWasLetter = false;
    for (let letter of encryptedQuote) {
        let currentIsLetter = false;
        if (alphabet.indexOf(letter) >= 0) {
            currentIsLetter = true;
            let index = letters.findIndex(ltr => ltr.letter == letter);
            // if letter has original letter, input is disabled
            let disabled = letters[index].originalLetter ? "disabled" : "required"; // required is for selecting all empty input with css
            letter = `<input ${disabled} type="text" maxlength="1" data-index="${index}" value="${letters.find(ltr => ltr.letter == letter).originalLetter}"/><span>${letters[index].letter}</span>`;
        }
        if (currentIsLetter && !lastWasLetter) {
            html += "<div class='word'>";
        } else if (!currentIsLetter && lastWasLetter) {
            html += "</div>";
        }

        lastWasLetter = currentIsLetter;
        html += `<span>${letter}</span>`;
    }
    document.querySelector('#quote').innerHTML = html;

    loadListeners();
}

