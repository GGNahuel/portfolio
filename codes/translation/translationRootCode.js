const defaultLanguage = navigator.language.substring(0, 2) == "es" ? "spanish" : "english"

const addInnerHtmlTextBeforeCurrent = (element, value) => {
  const currentText = element.innerHTML
  element.innerHTML = value + currentText
}

window.addEventListener("load", () => {
  localStorage.setItem("webLanguage", defaultLanguage)
})
