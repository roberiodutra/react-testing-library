import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import userEvent from '@testing-library/user-event';
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

  it('Redirect to Home', () => {
    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    const heading = screen.getByText("Encountered pokémons");
    expect(heading).toBeInTheDocument();
  });
});