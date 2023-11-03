import { SearchState } from '../App';

export function setStorageData(state: SearchState) {
  localStorage.setItem('searchText', state.searchText);
  localStorage.setItem('searchData', JSON.stringify(state.searchData));
}

export function getStorageData(): SearchState {
  const store: SearchState = {
    searchText: '',
    searchData: null,
    isLoading: false,
    hasError: false,
  };
  const searchText = localStorage.getItem('searchText');
  const searchData = localStorage.getItem('searchData');

  if (searchText) store.searchText = searchText;
  if (searchData) store.searchData = JSON.parse(searchData);
  return store;
}
