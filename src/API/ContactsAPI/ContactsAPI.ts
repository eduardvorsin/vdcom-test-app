import contacts from '../../data/fakeData';
import { fakeDelay } from '../../helpers/helpers';
import { IContact, ContactWithoutId } from '../../models/IContact';

export default class ContactsAPI {
  static async fetchData(token: string) {
    await fakeDelay(400);

    const response = new Response(JSON.stringify({
      data: contacts,
    }), {
      headers: {
        'x-auth': token,
      },
    });

    return response;
  }

  static async removeData(token: string, id: number) {
    await fakeDelay(400);

    const response = new Response(JSON.stringify({
      data: id,
    }), {
      headers: {
        'x-auth': token,
      },
    });

    return response;
  }

  static async addData(token: string, data: ContactWithoutId) {
    await fakeDelay(400);

    const response = new Response(JSON.stringify({
      data,
    }), {
      headers: {
        'x-auth': token,
      },
    });

    return response;
  }

  static async updateData(token: string, data: IContact) {
    await fakeDelay(400);

    const response = new Response(JSON.stringify({
      data,
    }), {
      headers: {
        'x-auth': token,
      },
    });

    return response;
  }
}
