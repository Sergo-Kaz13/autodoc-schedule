"use scrict";

const schedule = {
  2024: [
    [
      {
        numberDay: null,
        statusDay: "working", // 'weekend', 'holiday', '100%', '50%'
        dayInfo: {
          dayWork: {
            status: true,
            time: 8,
          },
          100: {
            status: false,
            time: 0,
          },
          50: {
            status: false,
            time: 0,
          },
          120: {
            status: false,
            time: 0,
          },
        },
      },
    ],
  ],
};

function createYearSchedule(year) {}
