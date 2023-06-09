import { render, screen } from '@testing-library/react';
import React from 'react';
import Profile from './Profile';
import ProfileImg from '../../../assets/images/profile.jpg';

describe('Profile tests', () => {
  it('should render correctly', () => {
    render(
      <Profile
        alt='Ralph James avatar'
        name='Ralph James'
        role='CEO'
        src={ProfileImg}
      />,
    );

    expect(screen.getByTestId<HTMLDivElement>('profile')).toBeInTheDocument();
  });

  it('should correctly apply className to the element', () => {
    render(
      <Profile
        alt='Ralph James'
        name='Ralph James avatar'
        role='CEO'
        src={ProfileImg}
        className='profile'
      />,
    );

    expect(screen.getByTestId<HTMLDivElement>('profile')).toHaveClass('profile');
  });

  it('should correctly display the passed values for the role and name propses', () => {
    render(
      <Profile
        alt='Sam Evans avatar'
        role='Manager'
        name='Sam Evans'
        src={ProfileImg}
      />,
    );

    expect(screen.getByText<HTMLParagraphElement>('Sam Evans')).toBeInTheDocument();
    expect(screen.getByText<HTMLParagraphElement>('Manager')).toBeInTheDocument();
  });

  it('should correctly display the image with the passed src address', () => {
    render(
      <Profile
        alt='Sam Evans avatar'
        role='Manager'
        name='Sam Evans'
        src={ProfileImg}
      />,
    );

    expect(screen.getByAltText<HTMLImageElement>('Sam Evans avatar')).toBeInTheDocument();
  });

  it('is a basic snapshot', () => {
    render(
      <Profile
        alt='Adam Richards avatar'
        role='Designer'
        name='Adam Richards'
        src={ProfileImg}
      />,
    );

    expect(screen.getByTestId<HTMLDivElement>('profile')).toMatchSnapshot();
  });
});
