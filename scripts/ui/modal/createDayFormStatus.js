function createDayFormStatusWork(modalData) {
  console.log(["modalData"], modalData);
  modalData.forEach((group) => {
    const groupElements = group.types.map((type) => {
      console.log(["type"], type);
      return `
        <button class="dayStatusButton">
          <div class="dayStatusCircle"></div>
        </button>
      `;
    });

    document.querySelector(group.element).innerHTML =
      groupElements.join("") || "";

    console.log(["group"], group);
  });
}

export default createDayFormStatusWork;
