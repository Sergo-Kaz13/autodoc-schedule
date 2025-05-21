function setTodayDate(today) {
  console.log(["today"], today);

  const form = document.querySelector("#form");
  const elements = form.elements;

  Array.from(elements).forEach((el) => {
    // console.log(["el.id"], el.id);
    console.log(["el.id"], el.id);

    for (const key in today) {
      console.log(["key"], key);

      // console.log(el.id === key);

      if (el.id === key) {
        console.log(today[key].status);
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

  console.log(["form"], form);
  console.log(["elements"], elements);

  console.log("message");
}

export default setTodayDate;
