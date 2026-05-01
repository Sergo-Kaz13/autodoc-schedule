import initShiftPlan from "../../controllers/initShiftPlan.js";
import { shiftActions, SCHEDULES } from "../../data/shift.js";
import { setSchedule } from "../../db/schedule.js";
import store from "../../store/store.js";
import { showSchedule } from "../showSchedule.js";

console.log(["store"], store.schedule);

export function shiftDropdown() {
  const switchShift = document.querySelector(".shift");
  const shiftDot = switchShift.querySelector(".shiftDot");

  let toggleDropdown = false;
  let activeShift = "a";

  store.onReady((schedule) => {
    const currentYear = new Date().getFullYear();
    activeShift = schedule[currentYear]?.shift ?? "a";
  });

  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown");

  switchShift.addEventListener("click", (e) => {
    if (e.target.closest(".shiftBtn")) {
      e.stopPropagation();
      toggleDropdown = !toggleDropdown;
      if (toggleDropdown) {
        switchShift.appendChild(dropdown);
        dropdown.innerHTML = createShirtDropdown();
      } else {
        dropdown.remove();
      }
      return;
    }

    const option = e.target.closest(".option");
    if (option) {
      const shiftName = document.querySelector(".shiftName");
      const monthItem = document.querySelector(".monthItem");

      if (shiftName) {
        shiftName.textContent = shiftActions[option.dataset.shift] || "";
      }

      // setSchedule();

      activeShift = option.dataset.shift;
      const activeYear = Number(
        document.querySelector(".activeYear").textContent,
      );
      store.schedule[activeYear].shift = activeShift;
      store.schedule[activeYear].months[Number(monthItem.id)].shift =
        activeShift;
      initShiftPlan(store.schedule, activeYear, Number(monthItem.id), true);

      const scheduleBlock = document.querySelector(".schedule");
      scheduleBlock.innerHTML = "";
      showSchedule(store.schedule, activeYear, Number(monthItem.id));

      setSchedule(store.schedule);

      toggleDropdown = false;
      dropdown.remove();
    }
  });

  document.addEventListener("click", (e) => {
    if (toggleDropdown && !switchShift.contains(e.target)) {
      toggleDropdown = false;
      dropdown.remove();
    }
  });

  function createShirtDropdown() {
    const checkeIcon = `<svg class="check" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>`;

    const scheduleButtons = SCHEDULES.map((schedule) => {
      return `
        <button class="option ${schedule.id === activeShift ? "active" : ""}" data-shift="${schedule.id}">
          <span class="dot" style="background-color: ${schedule.dot};"></span>

          <div class="option-content">
            <div class="option-title">${schedule.label}</div>
            <div class="option-sub">${schedule.desc}</div>
          </div>

          <div class="badges">
            ${schedule.weeks.map((week, i) => `<div class="badge ${schedule.id === "night" ? "night" : i % 2 === 0 ? "green" : "blue"}">${schedule.id === "night" ? "☾" : week.slice(0, 1)}</div>`).join("")}            
          </div>
          ${schedule.id === activeShift ? checkeIcon : ""}
        </button>
      `;
    });

    return `
            <div class="dropdown-title">Тип графіку</div>
                ${scheduleButtons.join("")}
            <div class="spacer"></div>
    `;
  }
}
