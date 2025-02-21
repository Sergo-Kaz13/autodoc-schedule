import editDataField from "./editDataField.js";

const toggleInputActive = (
  board = "",
  spanText = "",
  inputText = "",
  schedule
) => {
  console.log(["schedule"], schedule);

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
      input.setAttribute("min", "0");
      input.setAttribute("max", "99");

      let height;

      if (e.target.tagName === "TD") {
        height = e.target.offsetHeight;
      } else {
        height = e.target.parentNode.offsetHeight;
      }

      input.style.width = "100%";
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

          editDataField(board, ratePrice, schedule);
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

        editDataField(board, ratePrice, schedule);
      });
    }
  });
};

export default toggleInputActive;
