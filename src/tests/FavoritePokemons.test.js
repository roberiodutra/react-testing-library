import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Test favorites page', () => {
  beforeEach(() => {
    renderWithRouter(<FavoritePokemons />);
  });

  it('Test is(No favorite pokemon found)', () => {
    const noFav = screen.getByText(/No favorite pokemon found/i);
    expect(noFav).toBeInTheDocument();
  });
});
