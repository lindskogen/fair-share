export function getLocalStorage(name, value) {
  let v = window.localStorage.getItem(name);
  return v == null ? value : JSON.parse(v);
}

export function setLocalStorage(name, value) {
  window.localStorage.setItem(name, JSON.stringify(value));
}