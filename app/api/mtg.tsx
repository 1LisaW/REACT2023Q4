export enum Color {
  White,
  Blue,
  Black,
  Red,
  Green,
}

export enum ColorIdentity {
  W,
  U,
  B,
  R,
  G,
}
export enum Rarity {
  'Basic Land',
  Common,
  Uncommon,
  'Mythic Rare',
  Timeshifted,
  Masterpiece,
}

export enum Layout {
  normal,
  split,
  flip,
  'double-faced',
  token,
  plane,
  scheme,
  phenomenon,
  leveler,
  vanguard,
}

export enum Legality {
  Legal,
  Banned,
  Restricted,
}

export interface BlockLegality {
  format: string;
  legality: keyof typeof Legality;
}

export interface MTGCardDTO {
  name: string;
  manaCost: string;
  cmc: number;
  colors: (keyof typeof Color)[];
  colorIdentity: (keyof typeof ColorIdentity)[];
  type: string;
  supertypes: string[];
  types: string[];
  subtypes: string[];
  rarity: keyof typeof Rarity;
  set: string;
  setName: string;
  artist: string;
  flavor?: string;
  layout: keyof typeof Layout;
  multiverseid: number;
  imageUrl: string;
  variations: number[];
  printings: string[];
  originalText: string;
  originalType: string;
  legalities: BlockLegality[];
  id: string;
}
