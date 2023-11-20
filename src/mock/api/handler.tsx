import { HttpResponse, http } from 'msw';
import { MTG_API_URL } from '../../api/api';
import mockedData from '../../Result/stubs/stub';

export const handlers = [
  http.get(`${MTG_API_URL}cards`, async () => {
    return HttpResponse.json(mockedData);
  }),
  http.get(`${MTG_API_URL}cards/:id`, async ({ params }) => {
    const { id } = params;
    if (id) {
      return HttpResponse.json({
        card: mockedData.cards.filter((card) => card.id === id)[0],
      });
    } else return undefined;
  }),
];
