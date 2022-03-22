import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Test favorites page', () => {
  it('Test is(No favorite pokemon found)', () => {
    renderWithRouter(<FavoritePokemons />)
    const noFav = screen.getByText(/No favorite pokemon found/i);
    expect(noFav).toBeInTheDocument();
  });

  it('Test if favorite Pokemon cards are displayed', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    // Trilha do usuário da home até salvar os favoritos //
    const detail = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detail);

    const favorited = screen.getByRole('checkbox');
    userEvent.click(favorited);

    const pokeName = screen.getByTestId('pokemon-name');

    const favorites = screen.getByRole('link', { name: /Favorite pokémons/i });
    userEvent.click(favorites);

    const favoritePokemon = screen.getByText(pokeName.textContent);
    expect(favoritePokemon).toBeInTheDocument();
  });
});
