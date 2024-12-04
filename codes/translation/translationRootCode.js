const defaultLanguage = navigator.language.substring(0, 2) == "es" ? "spanish" : "english"
let selectedLanguage = null
const changeLanguageButton = document.getElementById("changeLanguage_button")

window.addEventListener("load", () => {
  if (!localStorage.getItem("webLanguage")) {
    localStorage.setItem("webLanguage", defaultLanguage)
  }
  selectedLanguage = localStorage.getItem("webLanguage")
  changeLanguageButton.querySelector("input").checked = localStorage.getItem("webLanguage") == "english"
})
