import contacts from '../../data/fakeData';
import { fakeDelay } from '../../utils/helpers/helpers';
import { IContact, ContactWithoutId } from '../../models/IContact';

export default class ContactsAPI {
  static async fetchData(token: string): Promise<Response> {
    await fakeDelay(400);

    if (!token) return Response.error();

    const response = new Response(JSON.stringify({
      data: contacts,
    }), {
      headers: {
        'x-auth': token,
      },
    });

    return response;
  }

  static async removeData(token: string, id: number): Promise<Response> {
    await fakeDelay(400);

    if (!token || !id) return Response.error();

    const response = new Response(JSON.stringify({
      data: id,
    }), {
      headers: {
        'x-auth': token,
      },
    });

    return response;
  }

  static async addData(token: string, data: ContactWithoutId): Promise<Response> {
    await fakeDelay(400);

    if (!token || !data) return Response.error();

    const response = new Response(JSON.stringify({
      data,
    }), {
      headers: {
        'x-auth': token,
      },
    });

    return response;
  }

  static async updateData(token: string, data: IContact): Promise<Response> {
    await fakeDelay(400);

    if (!token || !data) return Response.error();

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
