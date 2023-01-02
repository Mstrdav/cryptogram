// when an input is selected, find all input with the same letter, apply active class
const loadListeners = () => {
  console.log("loading listeners");
  let score = Date.now();
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("focus", function () {
      // scroll to make this input visible, even with keyboard
      this.scrollIntoView({ behavior: "auto", block: "start" });
      // scroll back a little
      window.scrollBy(0, -100);
      

      let letter = this.getAttribute("data-index");
      document
        .querySelectorAll(`input[data-index="${letter}"]`)
        .forEach((input) => {
          // set the span below the input to active
          input.classList.add("active");
          input.nextElementSibling.classList.add("active");
        });
    });

    // on input change, change all others
    input.addEventListener("input", function () {
      let letter = this.getAttribute("data-index");
      document
        .querySelectorAll(`input[data-index="${letter}"]`)
        .forEach((input) => {
          // change the value of the input
          input.value = this.value;
        });

      // go to the next empty input only if the current input is not empty
      // struct : (.word > (span > input + span) * 5)*20
      
      // find all inputs
      let inputs = Array.from(document.querySelectorAll("input"));

      // find the index of the current input
      let index = inputs.indexOf(this);

      // reorder the inputs : start from index and loop
      let reorderedInputs = inputs.slice(index, inputs.length - 1).concat(inputs.slice(0, index - 1));

      // find the next empty input
      index = 0;
      let nextInput = reorderedInputs[0];
      while (nextInput && nextInput.value != "") {
        nextInput = reorderedInputs[++index];
      }

      // if there is a next input, focus on it
      if (nextInput) {
        nextInput.focus();
      } else {
        // check if the user has the right answer
        // we get the hash from the local storage
        let hash = localStorage.getItem("hash");

        // we get the value of the inputs
        let value = "";
        inputs.forEach((input) => {
          value += input.value;
        });

        if (value.split("").sort().join("") == hash) {
          // the user has the right answer
          // we show the modal
          score = Date.now() - score;
          // make score human readable
          score = Math.floor(score / 1000);
          // display the score, with minutes and seconds
          document.querySelector("#modal-score").innerHTML = `${Math.floor(score / 60)} min, ${score % 60} s`;
          document.querySelector("#modal").classList.add("active");
        } else {
          // the user has the wrong answer
          // we shake the screen
          document.querySelector("#quote").classList.add("shake");
          setTimeout(() => {
            document.querySelector("#quote").classList.remove("shake");
          }, 1000);
        }

        //unfocus
        input.blur();
      }
    });

    input.addEventListener("blur", function () {
      let letter = this.getAttribute("data-index");
      document
        .querySelectorAll(`input[data-index="${letter}"]`)
        .forEach((input) => {
          // set the span below the input to active
          input.classList.remove("active");
          input.nextElementSibling.classList.remove("active");
        });
    });
  });
};
