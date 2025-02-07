import { scheduleBlock } from "./data.js";

export function showSchedule(schedule, year, month) {
  year = year !== undefined ? (year = year) : new Date().getFullYear();
  month = month !== undefined ? (month = month) : new Date().getMonth();

  const currentYear = schedule[year];
  const activeMonth = currentYear[month];

  const currentMonth = new Date().getMonth();
  const currentDate = new Date().getDate();

  activeMonth.map(({ numberDay, statusDay, dayInfo }, i) => {
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

    if (i + 1 === currentDate && currentMonth === month) {
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

    scheduleBlock.append(div);

    // if (i === 0) {
    //   const div = document.createElement("div");
    //   const span = document.createElement("span");
    //   span.textContent = i + 1;
    //   div.append(span);
    //   div.id = "scheduleItem";
    //   if (
    //     (numberDay === 5 && statusDay === "weekend") ||
    //     (numberDay === 6 && statusDay === "weekend")
    //   ) {
    //     div.classList.add("scheduleItem", "scheduleItemDayOff");
    //     if (i + 1 === currentDate && currentMonth === month) {
    //       div.classList.add("currentDate");
    //     }
    //   } else {
    //     div.classList.add("scheduleItem", "scheduleItemWork");
    //     if (i + 1 === currentDate && currentMonth === month) {
    //       div.classList.add("currentDate");
    //     }
    //   }
    //   scheduleBlock.append(div);
    // } else {
    //   const div = document.createElement("div");
    //   const span = document.createElement("span");
    //   span.textContent = i + 1;
    //   div.append(span);
    //   div.id = "scheduleItem";
    //   if (
    //     (numberDay === 5 && statusDay === "weekend") ||
    //     (numberDay === 6 && statusDay === "weekend")
    //   ) {
    //     div.classList.add("scheduleItem", "scheduleItemDayOff");
    //     if (i + 1 === currentDate && currentMonth === month) {
    //       div.classList.add("currentDate");
    //     }
    //   } else {
    //     div.classList.add("scheduleItem", "scheduleItemWork");
    //     if (i + 1 === currentDate && currentMonth === month) {
    //       div.classList.add("currentDate");
    //     }
    //   }
    //   scheduleBlock.append(div);
    // }
  });
}
