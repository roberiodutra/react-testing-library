import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Test if a card with info is rendered', () => {
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
});
