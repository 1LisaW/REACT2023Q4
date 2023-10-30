import Card from './Card/Card';
import { StarshipModel } from '../model/starships';

type SearchResultProps = {
  searchData: StarshipModel[] | null;
};

const SearchResult = (props: SearchResultProps) => {
  return (
    <>
      { props.searchData &&
        props.searchData.map((item: StarshipModel) => {
          return <Card {...item} key={item.name} />;
        })}
    </>
  );
}

export default SearchResult;
