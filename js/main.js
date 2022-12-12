let quote, author = "";
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// fisrt, we call the quote API to get the quote data
let quoteAPIURL = "https://api.quotable.io/random";
fetch(quoteAPIURL)
.catch(function(error) {
    console.log(error);
})
.then(function(response) {
    return response.json();
}).then(function(data) {
    console.log(data);
    quote = data.content;
    author = data.author;
    document.querySelector('#author').innerHTML = author;

    // to upper case
    quote = quote.toUpperCase();

    // crypt the quote
    let encryptedQuote = cryptQuote(quote);
    document.querySelector('#quote').innerHTML = encryptedQuote;
});

// crypt quote
function cryptQuote(quote) {
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

    return encryptedQuote;
}

// build the UI
function buildUI(encryptedQuote) {
    let html = "";
    for (let i = 0; i < encryptedQuote.length; i++) {
        let letter = encryptedQuote[i];
        html += `<span>${letter}</span>`;
    }
    document.querySelector('#quote').innerHTML = html;
}
