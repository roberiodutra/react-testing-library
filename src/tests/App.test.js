import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test App component', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Teste nav links', () => {
    const nav = screen.getByRole('navigation');
    const home = screen.getByText('Home');
    const about = screen.getByText('About');
    const favorite = screen.getByText('Favorite Pokémons');
    expect(nav && home && about && favorite).toBeInTheDocument();
  });

  it('Redirect to home "/', () => {
    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    const heading = screen.getByText('Encountered pokémons');
    expect(heading).toBeInTheDocument();
  });

  it('Redirect to /about', () => {
    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);
    const heading = screen.getByText('About Pokédex');
    expect(heading).toBeInTheDocument();
  });

  it('Redirect to /favorites', () => {
    const favBtn = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favBtn);
    const heading = screen.getByText('Favorite pokémons');
    expect(heading).toBeInTheDocument();
  });

  it('Redirect to NotFound', () => {
    const history = createMemoryHistory();
    history.push('/notfound');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const heading = screen.getByText('Page requested not found');
    expect(heading).toBeInTheDocument();
  });
});
