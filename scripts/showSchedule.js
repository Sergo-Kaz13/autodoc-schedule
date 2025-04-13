import calculateUrlop from "./calculateUrlop.js";
import { scheduleBlock } from "./data.js";
import showMonthInfo from "./showMonthInfo.js";

export function showSchedule(schedule, year, month) {
  year = year !== undefined ? (year = year) : new Date().getFullYear();
  month = month !== undefined ? (month = month) : new Date().getMonth();

  const currentYear = schedule[year];
  const activeMonth = currentYear.months[month];

  const currentMonth = new Date().getMonth();
  const currentDate = new Date().getDate();

  let workTime = 0;
  let time100 = 0;
  let time50 = 0;
  let time120 = 0;

  alert(JSON.stringify(activeMonth.days));
  alert(activeMonth.days.length);

  const monthDays = activeMonth.days.map(
    ({ numberDay, statusDay, dayInfo }, i) => {
      workTime += dayInfo.workDay.time;
      time100 += dayInfo.addHours100.time;
      time50 += dayInfo.addHours50.time;
      time120 += dayInfo.addHours120.time;

      if (i === 0) {
        for (let j = 0; j < numberDay; j++) {
          const fakeDay = document.createElement("div");
          scheduleBlock.append(fakeDay);
        }
      }

      const div = document.createElement("div");
      const span = document.createElement("span");
      span.textContent = i + 1;
      div.append(span);
      div.id = "scheduleItem";

      if (
        i + 1 === currentDate &&
        currentMonth === month &&
        year === new Date().getFullYear()
      ) {
        div.classList.add("currentDate");
      }

      if (dayInfo.backshift.status) div.classList.add("backshift");
      if (dayInfo.addHours50.status) div.classList.add("addHours50");
      if (dayInfo.addHours120.status) div.classList.add("addHours120");
      if (dayInfo.higherPower.status) div.classList.add("higherPower");

      switch (statusDay) {
        case "workDay":
          div.classList.add("scheduleItem", "scheduleItemWork");
          break;
        case "addHours100":
          div.classList.add("scheduleItem", "scheduleItem100");
          break;
        case "weekend":
          div.classList.add("scheduleItem", "scheduleItemDayOff");
          break;
        case "holiday":
          div.classList.add("scheduleItem", "scheduleItemHoliday");
          break;
        case "workHoliday":
          div.classList.add("scheduleItem", "scheduleItemWorkHoliday");
          break;
        case "leaveOnRequest":
          div.classList.add("scheduleItem", "scheduleItemLeaveOnRequest");
          break;
        case "hospital":
          div.classList.add("scheduleItem", "scheduleItemL4");
          break;
        case "birthday":
          div.classList.add("scheduleItem", "scheduleItemBirthday");
          break;
      }

      return div;
    }
  );

  console.log(["monthDays"], monthDays);
  alert(JSON.stringify(monthDays));

  const fragment = document.createDocumentFragment();
  monthDays.forEach((day) => fragment.appendChild(day));

  document.querySelector(".schedule").append(fragment);
  showMonthInfo(activeMonth);
  calculateUrlop(schedule);
}
