import calculateUrlop from "./calculateUrlop.js";
import editDataField from "./editDataField.js";
import modifyCalendarData from "./modifyCalendarData.js";
import showWarningModal from "./showWarningModal.js";
import showMonthInfo from "./showMonthInfo.js";

const toggleInputActive = (
  board = "",
  spanText = "",
  inputText = "",
  schedule
) => {
  const editBoard = document.querySelector(board);
  const blockClickEdit = editBoard.parentElement;

  blockClickEdit.addEventListener("click", (e) => {
    const rateSpan = document.querySelector("." + spanText);
    if (!rateSpan) return;

    const calculator = document.getElementById("widthCalculator");

    const input = document.createElement("input");
    input.type = "number";
    input.classList.add(inputText);
    input.id = inputText;
    input.value = rateSpan.innerText || "0";
    input.min = "0";
    input.max = "0";

    let height = editBoard.clientHeight + "px";

    editBoard.innerHTML = "";
    editBoard.appendChild(input);
    input.focus();

    function resazeInput() {
      calculator.textContent = input.value || "";
      input.style.width = calculator.offsetWidth + 10 + "px";
    }

    resazeInput();
    input.style.height = height;
    input.addEventListener("input", resazeInput);

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const workHolidayDaysUsed = Number(
          document.querySelector(".workHolidayDaysUsed").textContent
        );
        if (
          inputText === "holidayDaysInput" &&
          input.value < workHolidayDaysUsed
        ) {
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

        modifyCalendarData(input.value, inputText, schedule);
        editDataField(board, ratePrice, schedule);
        showMonthInfo(schedule);

        board === ".editHolidayDays" ? calculateUrlop(schedule) : "";
      }
    });

    input.addEventListener("blur", () => {
      const workHolidayDaysUsed = Number(
        document.querySelector(".workHolidayDaysUsed").textContent
      );
      if (
        inputText === "holidayDaysInput" &&
        input.value < workHolidayDaysUsed
      ) {
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

      modifyCalendarData(input.value, inputText, schedule);
      editDataField(board, ratePrice, schedule);
      showMonthInfo(schedule);

      board === ".editHolidayDays" ? calculateUrlop(schedule) : "";
    });
  });
};

export default toggleInputActive;
