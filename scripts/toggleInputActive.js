import calculateUrlop from "./calculateUrlop.js";
import editDataField from "./editDataField.js";
import showMonthInfo from "./showMonthInfo.js";

const toggleInputActive = (
  board = "",
  spanText = "",
  inputText = "",
  schedule
) => {
  // const activeYear = document.querySelector(".activeYear").textContent;
  // const activeMonthId = document.querySelector(".monthItem").id;

  // const activeMonth = schedule[activeYear].months[activeMonthId];

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
          const ratePrice = input.value;
          console.log(["ratePrice"], ratePrice);

          const span = document.createElement("span");
          span.classList.add(spanText);
          span.textContent = ratePrice;
          editBoard.innerHTML = "";
          editBoard.appendChild(span);

          editDataField(board, ratePrice, schedule);

          const activeYear = document.querySelector(".activeYear").textContent;
          const activeMonthId = document.querySelector(".monthItem").id;
          const activeMonth = schedule[activeYear].months[activeMonthId];

          showMonthInfo(activeMonth);

          board === ".editHolidayDays" ? calculateUrlop(schedule) : "";
        }
      });

      input.addEventListener("blur", () => {
        const ratePrice = input.value;
        const span = document.createElement("span");
        span.classList.add(spanText);
        span.textContent = ratePrice;
        editBoard.innerHTML = "";
        editBoard.appendChild(span);

        editDataField(board, ratePrice, schedule);

        const activeYear = document.querySelector(".activeYear").textContent;
        const activeMonthId = document.querySelector(".monthItem").id;
        const activeMonth = schedule[activeYear].months[activeMonthId];

        showMonthInfo(activeMonth);

        board === ".editHolidayDays" ? calculateUrlop(schedule) : "";
      });
    }
  });
};

export default toggleInputActive;
