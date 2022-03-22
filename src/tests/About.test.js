import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Test about page', () => {
  beforeEach(() => render(<About />));

  it('Test about title', () => {
    const heading = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(heading).toBeInTheDocument();
  });

  it('Test if there are two paragraphs', () => {
    const paragraph = screen.getAllByText(/Pokémons/i);
    expect(paragraph[0] && paragraph[1]).toBeInTheDocument();
  });
});
