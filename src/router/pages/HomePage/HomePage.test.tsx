import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import wrapWithRedux from '../../../tests/helpers/wrapWithRedux';
import addMemoryRouter from '../../../tests/helpers/addMemoryRouter';

describe('HomePage tests', () => {
  it('renders correctly', async () => {
    render(wrapWithRedux(addMemoryRouter(), {}));

    await waitFor(() => {
      expect(screen.getByRole<HTMLElement>('banner')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByRole<HTMLButtonElement>('button', { name: /open navigation menu/i })).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByRole<HTMLInputElement>('textbox')).toBeInTheDocument();
    });
  });

  it('is a basic snapshot', async () => {
    render(wrapWithRedux(addMemoryRouter(), {}));

    expect(await screen.findByTestId<HTMLDivElement>('home-page')).toMatchSnapshot();
  });

  it('is a snapshot with a screen width greater than 900px', async () => {
    jest.spyOn(window.screen, 'width', 'get').mockReturnValue(1000);
    render(wrapWithRedux(addMemoryRouter(), {}));

    expect(await screen.findByTestId<HTMLDivElement>('home-page')).toMatchSnapshot();
  });
});
