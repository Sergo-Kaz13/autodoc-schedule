import calculateUrlop from "./calculateUrlop.js";
import editDataField from "./editDataField.js";
import showMonthInfo from "./showMonthInfo.js";
import showWarningModal from "./showWarningModal.js";

const toggleInputActive = (
  board = "",
  spanText = "",
  inputText = "",
  schedule
) => {
  const editBoard = document.querySelector(board);
  const workHolidayDaysUsed = Number(
    document.querySelector(".workHolidayDaysUsed").textContent
  );

  editBoard.addEventListener("click", (e) => {
    const rateSpan = document.querySelector("." + spanText);
    const calculator = document.getElementById("widthCalculator");

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
        height = e.target.clientHeight;
      } else {
        height = e.target.parentNode.clientHeight;
      }

      editBoard.innerHTML = "";
      editBoard.appendChild(input).focus();

      function resazeInput() {
        calculator.textContent = input.value || "";
        input.style.width = calculator.offsetWidth + 2 + "px";
      }

      resazeInput();
      input.addEventListener("input", resazeInput);
      input.style.height = height + "px";

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          if (input.value < workHolidayDaysUsed) {
            const modal = document.querySelector(".warningModal");
            if (!modal) {
              showWarningModal(".editHolidayDays");
            }
            return;
          }
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
        }
      });

      input.addEventListener("blur", () => {
        if (input.value < workHolidayDaysUsed) {
          const modal = document.querySelector(".warningModal");
          if (!modal) {
            showWarningModal(".editHolidayDays");
          }
          input.focus();
          return;
        }
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
