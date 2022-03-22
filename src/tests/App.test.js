import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);
    const navigation = screen.getByRole('navigation');
    expect(navigation).toBeInTheDocument();

    const Home = screen.getByText('Home');
    const About = screen.getByText('About');
    const Favorite = screen.getByText('Favorite Pokémons');

    expect(Home && About && Favorite).toBeInTheDocument();
  });
});