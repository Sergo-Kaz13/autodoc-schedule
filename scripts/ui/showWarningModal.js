function showWarningModal(el) {
  const modal = document.createElement("span");
  modal.textContent =
    "Ви не можете ввести число менше кількості використаної відпустки!";
  modal.classList.add("warningModal");
  document.querySelector(el)?.appendChild(modal);

  setTimeout(() => {
    document.querySelector(".warningModal")?.remove();
  }, 3000);
}

export default showWarningModal;
