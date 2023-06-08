import { render, screen } from '@testing-library/react';
import React from 'react';
import Spinner from './Spinner';

describe('Spinner tests', () => {
  it('should render correctly', () => {
    render(
      <Spinner
        size={50}
        className='spinner'
      />,
    );

    expect(screen.getByRole<HTMLSpanElement>('progressbar')).toBeInTheDocument();
  });

  it('should be 100 px high if the prop size value is 100', () => {
    render(
      <Spinner
        size={100}
      />,
    );

    expect(screen.getByRole<HTMLSpanElement>('progressbar')).toHaveStyle({
      width: '100px',
      height: '100px',
    });
  });

  it('is snapshot with default size', () => {
    render(
      <Spinner />,
    );

    expect(screen.getByTestId<HTMLDivElement>('spinner')).toMatchSnapshot();
  });

  it('is snapshot with custom size', () => {
    render(
      <Spinner
        size={150}
      />,
    );

    expect(screen.getByTestId<HTMLDivElement>('spinner')).toMatchSnapshot();
  });
});
