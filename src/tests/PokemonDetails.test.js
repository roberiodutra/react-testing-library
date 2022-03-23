import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemon from '../data';

describe('Test the component PokemonDetails', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Test if all pokemon info is shown', () => {
    const { summary } = pokemon[0];
    const detail = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detail);

    const pikachu = screen.getByText('Pikachu Details');
    const heading = screen.getByText('Summary');
    const summaryText = screen.getByText(`${summary}`);
    expect(pikachu && heading && summaryText).toBeInTheDocument();

    const notDetails = screen.queryByText(/More details/i);
    expect(notDetails).not.toBeInTheDocument();
  });
});
