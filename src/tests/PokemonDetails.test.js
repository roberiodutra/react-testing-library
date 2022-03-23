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

  it('Test if isMap and isLocations', () => {
    const { foundAt } = pokemon[0];
    const detail = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detail);

    const heading = screen.getByText('Game Locations of Pikachu');
    expect(heading).toBeInTheDocument();

    const locations = screen.getAllByAltText('Pikachu location');
    expect(locations).toHaveLength(foundAt.length);

    foundAt.forEach((place, i) => {
      const local = screen.queryByText(place.location);
      expect(local).toBeInTheDocument();

      const map = screen.getAllByAltText('Pikachu location')[i];
      expect(map).toHaveAttribute('src', place.map);
    });
  });

  it('Test if can favorite a poke in details page', () => {
    const detail = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detail);

    const favBtn = screen.getByRole('checkbox', { name: /Pokémon favoritado/i });
    userEvent.click(favBtn);
    expect(favBtn).toBeInTheDocument();

    const starText = screen.getByAltText('Pikachu is marked as favorite');
    expect(starText).toBeInTheDocument();

    userEvent.click(favBtn);
    expect(starText).not.toBeInTheDocument();
  });
});
