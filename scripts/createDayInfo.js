"use strict";

function createDayInfo(
  addHours100,
  addHours120,
  addHours50,
  backshift,
  birthday,
  higherPower,
  holiday,
  hospital,
  leaveOnRequest,
  weekend,
  workDay,
  workHoliday,
  dayInfo,
  monthInfoStr,
  salaryDay
) {
  return `
  <thead>
    <th colspan="2">Інформація за ${dayInfo + "." + monthInfoStr}</th>
  </thead>
  <tbody>
    ${
      backshift.status && (workDay.status || addHours100.status)
        ? `
        <tr>
          <td>друга зміна</td>
          <td>14:00 - 22:00</td>
        </tr>
      `
        : ``
    }
    ${
      (workDay.status || addHours100.status) && !backshift.status
        ? `
        <tr>
          <td>перша  зміна</td>
          <td>06:00 - 14:00</td>
        </tr>
      `
        : ``
    }
    ${
      workDay.status
        ? `<tr>
      <td>Робочий день</td>
      <td>${workDay.time} год.</td>
    </tr>`
        : ``
    }
    ${
      weekend.status
        ? `
        <tr>
          <td>вихідний</td>
          <td></td>
        </tr>
      `
        : ``
    }
    ${
      addHours100.status
        ? `
      <tr>
        <td>понаднормові 100%</td>
        <td>${addHours100.time} год.</td>
      </tr>
    `
        : ``
    }
    ${
      holiday.status
        ? `
      <tr>
        <td>святковий вихідний</td>
        <td></td>
      </tr>
    `
        : ``
    }
    ${
      workHoliday.status
        ? `
        <tr>
          <td>відпустка</td>
          <td></td>
        </tr>
      `
        : ``
    }
    ${
      leaveOnRequest.status
        ? `
        <tr>
          <td>відпустка на вимогу</td>
          <td></td>
        </tr>
      `
        : ``
    }
    ${
      birthday.status
        ? `
        <tr>
          <td>вихідний до ДН 🎂🎈</td>
          <td></td>
        </tr>
      `
        : ``
    }
    ${
      hospital.status
        ? `
        <tr>
          <td>лікарняний</td>
          <td></td>
        </tr>
      `
        : ``
    }
    ${
      addHours50.status
        ? `
        <tr>
          <td>понаднормові 50%</td>
          <td>${addHours50.time} год.</td>
        </tr>
      `
        : ``
    }
    ${
      addHours120.status
        ? `
        <tr>
          <td>понаднормові 120%</td>
          <td>${addHours120.time} год.</td>
        </tr>
      `
        : ``
    }
    ${
      higherPower.status
        ? `
        <tr>
          <td>вища сила</td>
          <td>${higherPower.time} год.</td>
        </tr>
      `
        : ``
    }
    <tr class="salaryDay">
      <td>дохід брутто</td>
      <td>${salaryDay} zl</td>
    </tr>
  </tbody>
`;
}

export default createDayInfo;
