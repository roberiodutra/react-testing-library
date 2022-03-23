import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Test NotFound page', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });

  it('Test if h2 to be in the document', () => {
    const heading = screen.getByRole('heading', { name: /not found/i, level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('Test if an image is shown', () => {
    const image = screen.getByRole('img', { name: /Pikachu crying/i });
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(image).toBeInTheDocument();
  });
});
