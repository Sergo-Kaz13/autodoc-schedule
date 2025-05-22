function setTodayDate(today) {
  console.log(["today"], today);

  const form = document.querySelector("#form");
  const elements = form.elements;

  Array.from(elements).forEach((el) => {
    for (const key in today) {
      if (el.id === key) {
        if (today[key].status) {
          el.checked = true;

          if (el.id === "workDay") {
            document.querySelector("#workDayTime").value = today[key].time;
          } else if (el.id === "addHours100") {
            document.querySelector("#time100").value = today[key].time;
          } else if (el.id === "higherPower") {
            document.querySelector("#higherPowerTime").value = today[key].time;
          } else if (el.id === "addHours50") {
            document.querySelector("#time50").value = today[key].time;
          } else if (el.id === "addHours120") {
            document.querySelector("#time120").value = today[key].time;
          }
        }
      }
    }
  });
}

export default setTodayDate;
