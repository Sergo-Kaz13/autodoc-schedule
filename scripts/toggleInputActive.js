const toggleInputActive = (board = "", spanText = "", inputText = "") => {
  const editBoard = document.querySelector(board);

  editBoard.addEventListener("click", (e) => {
    const rateSpan = document.querySelector("." + spanText);

    if (rateSpan) {
      const ratePrice = rateSpan.innerText;
      const input = document.createElement("input");
      input.type = "number";
      input.classList.add(inputText);
      input.id = inputText;
      input.value = ratePrice;
      input.setAttribute("max", "99");
      input.setAttribute("min", "0");

      let width;
      let height;

      if (e.target.tagName === "TD") {
        width = e.target.offsetWidth;
        height = e.target.offsetHeight;
      } else {
        width = e.target.parentNode.offsetWidth;
        height = e.target.parentNode.offsetHeight;
      }

      input.style.width = width + "px";
      input.style.height = height + "px";

      editBoard.innerHTML = "";
      editBoard.appendChild(input).focus();

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const rateInput = document.querySelector("." + inputText);
          const ratePrice = rateInput.value;

          const span = document.createElement("span");
          span.classList.add(spanText);
          span.textContent = ratePrice;
          editBoard.innerHTML = "";
          editBoard.appendChild(span);
        }
      });

      input.addEventListener("blur", () => {
        const rateInput = document.querySelector("." + inputText);
        const ratePrice = rateInput.value;

        const span = document.createElement("span");
        span.classList.add(spanText);
        span.textContent = ratePrice;
        editBoard.innerHTML = "";
        editBoard.appendChild(span);
      });
    }
  });
};

export default toggleInputActive;
