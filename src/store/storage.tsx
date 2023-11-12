export function setStorageData(state: string) {
  localStorage.setItem('searchText', state);
}

export function getStorageData(): string {
  let store: string = '';
  const searchText = localStorage.getItem('searchText');

  if (searchText) store = searchText;
  return store;
}
