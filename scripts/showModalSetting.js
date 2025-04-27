function showModalSetting(e) {
  const parent = e.target.parentElement;
  parent.classList.add("btnSettingCircl");

  setTimeout(() => {
    parent.classList.remove("btnSettingCircl");
  }, 500);

  setTimeout(() => {
    document.querySelector(".settingBlock").classList.add("settingBlockShow");
  }, 300);
}

export default showModalSetting;
