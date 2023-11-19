import { Color, MTGCardDTO } from './mtg';

export const MOCK_IMG = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';
export const MTG_API_URL = 'https://api.magicthegathering.io/v1/';

type MTGOptions = {
  pageSize: number;
  page: number;
  name: string;
};

async function getMTGData(
  entry: string,
  options: MTGOptions,
): Promise<{ cards: MTGCardDTO[] } | null> {
  try {
    let queryParams =
      Object.entries(options)
        .map((arr) => arr.join('='))
        .join('&') || '';
    if (queryParams) queryParams = `?${queryParams}`;
    const response: Response = await fetch(`${MTG_API_URL}${entry}${queryParams}`, {
      method: 'GET',
      mode: 'cors',
    });
    if (!response.ok) {
      console.log('Failed to get what I want, got status: ' + response.status);
      return null;
    }
    return response.json();
  } catch (e) {
    console.log('An error!');
    return null;
  }
}

async function getMTGDetailData(
  entry: string,
  id: string,
): Promise<{ card: MTGCardDTO } | null> {
  try {
    const response: Response = await fetch(`${MTG_API_URL}${entry}/${id}`, {
      method: 'GET',
      mode: 'cors',
    });
    if (!response.ok) {
      console.log('Failed to get what I want, got status: ' + response.status);
      return null;
    }
    return response.json();
  } catch (e) {
    console.log('An error!');
    return null;
  }
}

export interface MTGModel {
  name: string;
  manaCost: string;
  cmc: string;
  colors: (keyof typeof Color)[];
  type: string;
  set: string;
  setName: string;
  artist: string;
  imageUrl: string;
  id: string;
}

export async function getMTGCards(
  entry: string,
  options: MTGOptions,
): Promise<MTGModel[] | never[]> {
  const MTGCards = await getMTGData(entry, options);

  if (!MTGCards) return [];
  return MTGCards.cards.map((MTGCard) => {
    const MTGCardsStore: MTGModel = {
      name: MTGCard.name,
      manaCost: MTGCard.manaCost,
      cmc: String(MTGCard.cmc),
      colors: MTGCard.colors,
      type: MTGCard.type,
      set: MTGCard.set,
      setName: MTGCard.setName,
      artist: MTGCard.artist,
      imageUrl: MTGCard.imageUrl,
      id: MTGCard.id,
    };

    return MTGCardsStore;
  });
}

export async function getMTGCardsDetail(
  entry: string,
  id: string,
): Promise<MTGModel | null> {
  const MTGCards = await getMTGDetailData(entry, id);

  if (!MTGCards) return null;
  const MTGCardsStore: MTGModel = {
    name: MTGCards.card.name,
    manaCost: MTGCards.card.manaCost,
    cmc: String(MTGCards.card.cmc),
    colors: MTGCards.card.colors,
    type: MTGCards.card.type,
    set: MTGCards.card.set,
    setName: MTGCards.card.setName,
    artist: MTGCards.card.artist,
    imageUrl: MTGCards.card.imageUrl,
    id: MTGCards.card.id,
  };
  return MTGCardsStore;
}

export async function getMTGCardsData(
  options: MTGOptions,
): Promise<MTGModel[] | never[]> {
  return await getMTGCards('cards', options);
}

export async function getMTGCardsDataDetail(id: string): Promise<MTGModel | null> {
  return await getMTGCardsDetail('cards', id);
}
