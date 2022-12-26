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
      // struct : (span > input + span) * 100
      let nextInputParent =
        input.parentElement.nextElementSibling;
        while (!(nextInputParent.querySelector("input")?.value == "") && nextInputParent.nextElementSibling) {
            nextInputParent = nextInputParent.nextElementSibling;
        }

        // if there is no input, check again from the beginning
        if (!nextInputParent.querySelector("input")) {
            nextInputParent = document.querySelector("span");
            while (!(nextInputParent.querySelector("input")?.value == "") && nextInputParent.nextElementSibling) {
                nextInputParent = nextInputParent.nextElementSibling;
            }
        }

        if (nextInputParent.querySelector("input")) {
            // focus on the next input, if current input is not empty
            if (this.value != "") { nextInputParent.querySelector("input").focus(); }
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
