
import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import React from 'react';
import Search from './Search';

describe('Search Tests', () => {
  it('renders correctly', () => {
    const mockFn = jest.fn<void, [e: React.ChangeEvent<HTMLInputElement>]>();
    render(
      <Search
        id='search'
        onChange={mockFn}
        value=''
      />,
    );

    expect(screen.getByTestId<HTMLFormElement>('search-form')).toBeInTheDocument();
    expect(screen.getByRole<HTMLDivElement>('search')).toBeInTheDocument();
  });

  it('should call the mock function when clicking on "Search about documents"', async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn<void, [e: React.ChangeEvent<HTMLInputElement>]>();
    render(
      <Search
        id='search'
        onChange={mockFn}
        value=''
      />,
    );

    user.type(screen.getByRole<HTMLInputElement>('textbox'), 'new');

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(3);
    });
  });

  it('should show an error if the input field is empty when clicking on the submit button', async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn<void, [e: React.ChangeEvent<HTMLInputElement>]>();
    render(
      <Search
        id='search'
        onChange={mockFn}
        value=''
      />,
    );

    user.click(screen.getByRole<HTMLButtonElement>('button'));

    expect(await screen.findByText<HTMLParagraphElement>('before sending, you need to fill in the search field')).toBeInTheDocument();
  });

  it('is a basic snapshot', () => {
    const mockFn = jest.fn<void, [e: React.ChangeEvent<HTMLInputElement>]>();
    render(
      <Search
        id='search'
        onChange={mockFn}
        value=''
      />,
    );

    expect(screen.getByTestId<HTMLFormElement>('search-form')).toMatchSnapshot();
  });

  it('is a snapshot with an error', async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn<void, [e: React.ChangeEvent<HTMLInputElement>]>();
    render(
      <Search
        id='search'
        onChange={mockFn}
        value=''
      />,
    );

    user.click(await screen.findByRole<HTMLButtonElement>('button'));

    await screen.findByText<HTMLParagraphElement>('before sending, you need to fill in the search field');

    expect(screen.getByTestId<HTMLFormElement>('search-form')).toMatchSnapshot();
  });
});
