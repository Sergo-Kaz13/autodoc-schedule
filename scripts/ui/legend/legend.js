import legendItems from "../../data/legend.js";

const legend = document.querySelector(".legend");
const toogleBtn = document.querySelector(".toogle-right");
const legendToggle = document.querySelector(".legend-header");

console.log(["legendToggle"], legendToggle);

function createLegend() {
  legendToggle.addEventListener("click", () => {
    legend.classList.toggle("expanded");
    toogleBtn.classList.toggle("open");
  });

  const html = legendItems
    .map(
      ({ name }) => `
        <div class="legendItem">
          <span class="legendDot"></span>
          ${name}
        </div>
      `,
    )
    .join("");

  legend.innerHTML = "";
  legend.insertAdjacentHTML("beforeend", html);
}

export default createLegend;
