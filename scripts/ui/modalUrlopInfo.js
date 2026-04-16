function modalUrlopInfo(message) {
  const wrapper = document.querySelector(".wrapper");
  const blindDiv = document.createElement("div");
  const div = document.createElement("div");
  const p = document.createElement("p");
  const btn = document.createElement("button");

  blindDiv.classList.add("blindBlock");
  div.classList.add("modalBlock");
  p.classList.add("modalMessage");
  btn.classList.add("modalBtn");

  btn.addEventListener("click", () => {
    document.querySelector(".blindBlock").remove();
  });

  p.textContent = message;
  btn.textContent = "ok";

  div.append(p);
  div.append(btn);
  blindDiv.append(div);

  wrapper.append(blindDiv);
}

export default modalUrlopInfo;
