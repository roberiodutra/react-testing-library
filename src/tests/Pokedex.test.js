import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa a pagina de Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />)
  });

  it('Test if h2 shows "Encountered pokémons" in the document', () => {
    const heading = screen.getByRole('heading', { name: /Encountered/i, level: 2 });
    expect(heading).toBeInTheDocument();
  });
});