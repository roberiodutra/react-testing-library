import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test the component Pokemon', () => {
  it('Test if a card with info is rendered', () => {
    renderWithRouter(<App />);
    const photo = 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png';
    const nextPokemon = screen.getByTestId('next-pokemon');
    userEvent.click(nextPokemon);

    const detail = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detail);

    const charm = screen.getByTestId('pokemon-name');
    expect(charm).toHaveTextContent(/charmander/i);

    const charmType = screen.getByTestId('pokemon-type');
    expect(charmType).toHaveTextContent(/fire/i);

    const charmWeight = screen.getByTestId('pokemon-weight');
    expect(charmWeight).toHaveTextContent('Average weight: 8.5 kg');

    const charmPic = screen.getByRole('img', { name: /Charmander sprite/i });
    expect(charmPic).toHaveAttribute('src', photo);
  });

  it('Test if link is correct', () => {
    const { history } = renderWithRouter(<App />);

    const pikachuLink = screen.getByRole('link', { name: /More details/i });
    expect(pikachuLink).toHaveAttribute('href', '/pokemons/25');
    userEvent.click(pikachuLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Test if pokemon card isFavorited with star', () => {
    renderWithRouter(<App />);
    const pikachuLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(pikachuLink);

    const favBtn = screen.getByRole('checkbox', { name: /Pokémon favoritado/i });
    userEvent.click(favBtn);

    const star = screen.getByRole('img', { name: /marked as favorite/i });
    const starText = screen.getByAltText('Pikachu is marked as favorite');

    expect(star && starText).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
