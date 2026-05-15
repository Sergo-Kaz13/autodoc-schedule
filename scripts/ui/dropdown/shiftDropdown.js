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
            ${schedule.weeks
              .map((week, i) => {
                const isNight = schedule.id === "night";
                const isFirst = week === "1-ша";
                const badgeClass = isNight
                  ? "night"
                  : isFirst
                    ? "green"
                    : "blue";
                return `<div class="badge ${badgeClass}">${schedule.id === "night" ? "☾" : week.slice(0, 1)}</div>`;
              })
              .join("")}            
          </div>
          ${schedule.id === activeShift ? checkeIcon : ""}
        </button>
      `;
    });

    return `
            <div class="dropdown-title">Тип графіку</div>
                ${scheduleButtons.join("")}
                <div class="dropdown-hint">
                  <svg viewBox="0 0 24 24" width="12" height="12">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  Відлік змін з 1-го тижня року
                </div>
            <div class="spacer"></div>
    `;
  }
}
