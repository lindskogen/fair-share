export function getLocalStorage<T>(name: string, defaultValue: T): T {
  let v = window.localStorage.getItem(name);
  return v == null ? defaultValue : JSON.parse(v);
}

export function setLocalStorage(name: string, value: unknown) {
  window.localStorage.setItem(name, JSON.stringify(value));
}