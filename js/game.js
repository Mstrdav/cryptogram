// when an input is selected, find all input with the same letter, apply active class
const loadListeners = () => {
  console.log("loading listeners");
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("focus", function () {
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
        console.log("end of the game");
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
