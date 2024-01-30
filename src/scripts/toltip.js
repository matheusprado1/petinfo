export const tolTip = () => {
  const toltip = document.querySelector("#toltip");
  toltip.className = "show";

  setTimeout(() => {
    toltip.className = toltip.className.replace("show", "");
  }, 5000)

}