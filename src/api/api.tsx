import { StarshipModel } from "../model/starships";
import { StarshipsDTO } from "./starships";

const API_URL = "https://swapi.dev/api/";
const IMG_URL = "https://starwars-visualguide.com/assets/img/";
export const MOCK_IMG = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";

async function getData(entry: string, options: string):Promise<StarshipsDTO | null> {
  try {
    const response: Response = await fetch(`${API_URL}${entry}?search=${options}`, {
      method: 'GET',
      mode: 'cors'
    });
    if (response.ok) {
      console.log("Got what we wanted")
    } else {
      console.log('Failed to get what I want, got status: ' + response.status);
    }
    return response.json();

  } catch (e) {
    console.log('A real error!');
    return null;
  }
}

async function getStarshipsData(searchText: string):Promise<StarshipsDTO | null>{
	return await getData("starships", searchText);
}

export async function getStarships(searchText: string): Promise<StarshipModel[]| null>{
	const starships = await getStarshipsData(searchText);

	if (!starships)
		return null;
	return starships.results.map((starship) => {
		const {url, ...rest} = starship;

		let img;
		const idxArr = url.match("/([0-9])+/");
		if (!idxArr)
			img = MOCK_IMG;
		else
			img =`${IMG_URL}starships/${idxArr[1]}.jpg`;

		const starshipStore: StarshipModel = {
			...rest,
			img: img
		};

        return starshipStore;
	})
}


