import { MTGModel } from '../../../app/api/api';

const mockedData: Record<'cards', MTGModel[]> = {
  cards: [
    {
      name: 'Halo Forager',
      manaCost: '{1}{U}{B}',
      cmc: '3.0',
      colors: ['Blue', 'White'],
      type: 'Creature — Faerie Rogue',
      set: 'MOM',
      setName: 'March of the Machine',
      artist: 'Kevin Sidharta',
      imageUrl:
        'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=607285&type=card',
      id: '49918a1c-eab4-5b05-b651-e06992738166',
    },
    {
      name: 'Halo Hopper',
      manaCost: '{3}',
      cmc: '3.0',
      colors: [],
      type: 'Artifact Creature — Frog',
      set: 'MOM',
      setName: 'March of the Machine',
      artist: 'Daniel Ljunggren',
      imageUrl:
        'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=607331&type=card',
      id: 'b03def35-15f3-5775-98a4-f54ab566629a',
    },
    {
      name: 'Halo Forager',
      manaCost: '{1}{U}{B}',
      cmc: '3.0',
      colors: ['Blue', 'White'],
      type: 'Creature — Faerie Rogue',
      set: 'MOM',
      setName: 'March of the Machine',
      artist: 'Kevin Sidharta',
      imageUrl:
        'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=611259&type=card',
      id: '93ec638a-e667-547a-9e68-449640860c22',
    },
    {
      name: 'Halo Fountain',
      manaCost: '{2}{W}',
      cmc: '3.0',
      colors: ['White'],

      type: 'Artifact',
      set: 'PRM',
      setName: 'Magic Online Promos',
      artist: 'Dominik Mayer',
      imageUrl:
        'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=611259&type=card',
      id: '15822c65-1381-56f0-a62a-d06f673fbf02',
    },
    {
      name: 'Halo Fountain',
      manaCost: '{2}{W}',
      cmc: '3.0',
      colors: ['White'],
      type: 'Artifact',
      set: 'PSNC',
      setName: 'Streets of New Capenna Promos',
      artist: 'Anastasia Ovchinnikova',
      imageUrl:
        'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=611259&type=card',
      id: 'd91654ca-be0c-5ffa-91ec-784e54d7e617',
    },
    {
      name: 'Halo Fountain',
      manaCost: '{2}{W}',
      cmc: '3.0',
      colors: ['White'],
      type: 'Artifact',
      set: 'PSNC',
      setName: 'Streets of New Capenna Promos',
      artist: 'Anastasia Ovchinnikova',
      imageUrl:
        'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=611259&type=card',
      id: '7e107222-c684-51a6-a7ab-339a42835066',
    },
    {
      name: 'Halo Fountain',
      manaCost: '{2}{W}',
      cmc: '3.0',
      colors: ['White'],
      type: 'Artifact',
      set: 'SNC',
      setName: 'Streets of New Capenna',
      artist: 'Anastasia Ovchinnikova',
      imageUrl:
        'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=555216&type=card',
      id: '347106a1-4241-5296-bca3-2fb9aa6a0efd',
    },
    {
      name: 'Halo Scarab',
      manaCost: '{2}',
      cmc: '2.0',
      colors: [],
      type: 'Artifact Creature — Insect',
      set: 'SNC',
      setName: 'Streets of New Capenna',
      artist: 'Khurrum',
      imageUrl:
        'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=555440&type=card',
      id: 'ff39b047-eea7-5666-b122-7bf3faa1a377',
    },
    {
      name: 'Halo Fountain',
      manaCost: '{2}{W}',
      cmc: '3.0',
      colors: ['White'],
      type: 'Artifact',
      set: 'SNC',
      setName: 'Streets of New Capenna',
      artist: 'Dominik Mayer',
      imageUrl:
        'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=558419&type=card',
      id: '6620d5aa-2842-56c7-afb1-0edc3691907a',
    },
    {
      name: 'Halo Hunter',
      manaCost: '{2}{B}{B}{B}',
      cmc: '5.0',
      colors: ['Blue'],
      type: 'Creature — Demon',
      set: 'ZEN',
      setName: 'Zendikar',
      artist: 'Chris Rahn',
      imageUrl:
        'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=185752&type=card',
      id: '319ee0df-a9d8-5be8-967d-66f72be6638f',
    },
  ],
};
export default mockedData;
