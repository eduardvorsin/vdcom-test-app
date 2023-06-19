import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import addMemoryRouter from './tests/helpers/addMemoryRouter';
import wrapWithRedux from './tests/helpers/wrapWithRedux';

describe('Router integration tests', () => {
  it('should render a page with contacts if the URL is /contacts', async () => {
    render(wrapWithRedux(addMemoryRouter({ initialEntries: ['/contacts'] }), {}));

    expect(await screen.findByRole<HTMLHeadingElement>('heading', { name: /total contacts/i })).toBeInTheDocument();
  });

  it('should render the authorization page if the URL is /login', async () => {
    render(wrapWithRedux(addMemoryRouter({ initialEntries: ['/login'] }), {}));

    expect(await screen.findByRole<HTMLHeadingElement>('heading', { name: /crm system/i })).toBeInTheDocument();
  });

  it('should render page 404 if URL is not equal to /login and /contacts', async () => {
    render(wrapWithRedux(addMemoryRouter({ initialEntries: ['/about'] }), {}));

    expect(await screen.findByRole<HTMLHeadingElement>('heading', { name: /404/i })).toBeInTheDocument();
  });
});

describe('App integration tests', () => {
  it('should open the navigation menu when you click on the "open navigation menu" button', async () => {
    const user = userEvent.setup();

    render(wrapWithRedux(addMemoryRouter({ initialEntries: ['/'] }), {}));

    user.click(await screen.findByRole<HTMLButtonElement>('button', {
      name: /open navigation menu/i,
    }));

    expect(await screen.findByRole<HTMLElement>('navigation')).toBeInTheDocument();
  });

  it('should close the navigation menu when you click on the "close navigation" button', async () => {
    const user = userEvent.setup();

    render(wrapWithRedux(addMemoryRouter({ initialEntries: ['/'] }), {}));

    user.click(await screen.findByRole<HTMLButtonElement>('button', {
      name: /open navigation menu/i,
    }));

    user.click(await screen.findByRole<HTMLButtonElement>('button', {
      name: /close navigation/i,
    }));

    await waitForElementToBeRemoved(() => screen.queryByRole<HTMLElement>('navigation'));
    expect(screen.queryByRole<HTMLElement>('navigation')).not.toBeInTheDocument();
  });

  it('should remove the error message if an empty search field with an error has been filled in', async () => {
    const user = userEvent.setup();
    render(wrapWithRedux(addMemoryRouter({ initialEntries: ['/'] }), {}));

    user.click(await screen.findByRole<HTMLButtonElement>('button', { name: /search/i }));

    expect(await screen.findByText<HTMLParagraphElement>('before sending, you need to fill in the search field')).toBeInTheDocument();

    user.type(screen.getByLabelText<HTMLInputElement>(/search/i), 'some value');

    await waitFor(() => {
      expect(screen.queryByText<HTMLParagraphElement>('before sending, you need to fill in the search field')).not.toBeInTheDocument();
    });
  });
});
