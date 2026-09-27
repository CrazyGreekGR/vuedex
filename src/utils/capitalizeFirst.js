export function capitalizeFirst(text) {
  let capitalizedText = String(text).charAt(0).toUpperCase() + String(text).slice(1)
  return capitalizedText
}
