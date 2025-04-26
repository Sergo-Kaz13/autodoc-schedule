function showForm() {
  const blockHidden = document.querySelector(".formBlockHidden");

  if (blockHidden.classList.contains("formBlockShow")) {
    blockHidden.style.height = blockHidden.scrollHeight + "px";
    requestAnimationFrame(() => {
      blockHidden.style.height = "0";
      blockHidden.classList.remove("formBlockShow");
    });
  } else {
    blockHidden.style.height = blockHidden.scrollHeight + "px";
    blockHidden.classList.add("formBlockShow");

    blockHidden.addEventListener("transitionend", function handler() {
      blockHidden.style.height = "auto";
      blockHidden.removeEventListener("transitionend", handler);
    });
  }
}

export default showForm;
