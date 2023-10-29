import { Component } from "react";
import Card from "./Card";
import { StarshipModel } from "../model/starships";

type SearchResultProps = {
  searchData: StarshipModel[] | null
}

class SearchResult extends Component<SearchResultProps>{
	constructor(props: SearchResultProps){
		super(props);
	  }

	render(){
			return(
				<>
				{
					this.props && this.props.searchData && this.props.searchData.map((item: StarshipModel) => {
				    return (
					  <Card {...item} key={item.name} />
          )})}
				  </>
		)
	}
}

export default SearchResult
