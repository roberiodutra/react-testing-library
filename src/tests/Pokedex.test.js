import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa a pagina de Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Test if h2 shows "Encountered pokémons" in the document', () => {
    const heading = screen.getByRole('heading', { name: /Encountered/i, level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('Test if "Próximo pokémon" is working', () => {
    const nextPokemon = screen.getByTestId('next-pokemon');
    userEvent.click(nextPokemon);
    const next = screen.getByTestId('pokemon-name');
    expect(next).toHaveTextContent(/Charmander/i);
    expect(nextPokemon.innerHTML).toBe('Próximo pokémon');
    expect(nextPokemon).toBeInTheDocument();
    const seven = 7;

    for (let i = 0; i < seven; i += 1) {
      userEvent.click(nextPokemon);
      if (i === seven) {
        expect(next).toHaveTextContent(/Pikachu/i);
      }
    }
  });

  it('Test if pokemon filter is there', () => {
    ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon',
    ].forEach((type) => {
      expect(screen.getByRole('button', { name: type })).toBeInTheDocument();
    });
  });

  it('Test if "All" Button is visible all-time', () => {
    const all = screen.getByRole('button', { name: /all/i });
    const nextPokemon = screen.getByTestId('next-pokemon');
    const ten = 10;
    for (let i = 0; i <= ten; i += 1) {
      userEvent.click(nextPokemon);
      userEvent.click(all);
      expect(all).toBeVisible();
    }
  });
});
