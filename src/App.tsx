import './App.css';
import Search from './Search/Search';
import { useEffect, useState } from 'react';
import SearchResult from './Result/SearchResult';
import { StarshipModel } from './model/starships';
import { getStarships } from './api/api';
import { getStorageData } from './store/storage';
import Spinner from './Spinner/Spinner';

export type SearchState = {
  searchText: string;
  searchData: StarshipModel[] | never[];
  isLoading: boolean;
  hasError: boolean;
};

const App = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchData, setSearchData] = useState<StarshipModel[] | null>(null);
  const [isLoading, setIsLoading] =useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const  updateDataFromApi = async (searchText: string) => {
    setIsLoading(true);
    const data = await getStarships(searchText);
    setSearchData([...data]);
    setIsLoading(false);
    setSearchData([...data ]);
  }

 useEffect(() => {
    const dataFromStore = getStorageData();
    if (dataFromStore.searchData)
      setSearchData([...dataFromStore.searchData]);
    else
      updateDataFromApi(searchText);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hasError) throw new Error('Uncaught error:');
  }, [hasError])

  const handleSearchChange = (value: string) => {
    setSearchText(value);
  };

  const handleSearchSubmit = async (searchText: string) => {
    await updateDataFromApi(searchText);
  };

  const handleShowError = () => {
    setHasError(true);
  };

  return (
    <>
      <Search
        searchText={searchText}
        onChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
        onError={handleShowError}
      />
      {isLoading && <Spinner />}
      {isLoading || <SearchResult searchData={searchData} />}
    </>
  );
}

export default App;
