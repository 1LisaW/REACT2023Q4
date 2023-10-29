import { Component } from 'react';
import './App.css';
import Search from './Search/Search';
import React from 'react';
import SearchResult from './Result/SearchResult';
import { StarshipModel } from './model/starships';
import { getStarships } from './api/api';
import { getStorageData, setStorageData } from './storage';
import Spinner from './Spinner/Spinner';

export type SearchState = {
  searchText: string,
  searchData: StarshipModel[] | null,
  isLoading: boolean,
  hasError: boolean,
}

class App extends Component< Record<string, never>, SearchState> {
  state: { searchText: string, searchData: StarshipModel[] | null, isLoading: boolean, hasError: boolean } = {
    searchText: "",
    searchData: null,
    isLoading: false,
    hasError: false
  };

  componentDidMount(): void {
    const dataFromStore = getStorageData();
    if (dataFromStore.searchData)
      this.setState({...getStorageData()})
    else
      this.update_data_from_api(this.state.searchText);
  }

  componentDidUpdate(): void {
    if (this.state.hasError)
     throw new Error("Uncaught error:");
  }

  handleSearchChange = (value: string) => {
    this.setState({
      searchText: value,
    });
  }

  private async update_data_from_api(searchText: string){
    this.setState({isLoading: true});
    const data = await getStarships(searchText);
    this.setState({
      searchData: data,
      isLoading: false
    });
    setStorageData({...this.state, searchData: data});
  }

  handleSearchSubmit = async (searchText: string) => {
   await this.update_data_from_api(searchText);
  }

  handleShowError = () => {
    this.setState({hasError: true});
  }

  render(){
    return (
      <React.Fragment>
        <Search searchText={this.state.searchText} onChange={this.handleSearchChange} onSubmit={this.handleSearchSubmit} onError = {this.handleShowError}/>
        {this.state.isLoading && <Spinner/>}
        {this.state.isLoading || <SearchResult searchData = {this.state.searchData}/>}
      </React.Fragment>
    )
    }
}

export default App;
