const defaultLanguage = navigator.language.substring(0, 2) == "es" ? "spanish" : "english"
let selectedLanguage = null
const changeLanguageButton = document.getElementById("changeLanguage_button")

window.addEventListener("load", () => {
  if (!localStorage.getItem("webLanguage")) {
    localStorage.setItem("webLanguage", /* defaultLanguage */ "spanish")
  }
  selectedLanguage = localStorage.getItem("webLanguage")
  if (changeLanguageButton != null)
    changeLanguageButton.querySelector("input").checked = localStorage.getItem("webLanguage") == "english"
})
