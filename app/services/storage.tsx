export function setStorageData(state: string) {
  window.localStorage.setItem('searchText', state);
}

export function getStorageData(): string {
  let store: string = '';
  // if (!window)
  //   return '';
  const searchText = window.localStorage.getItem('searchText');

  if (searchText) store = searchText;
  return store;
}
