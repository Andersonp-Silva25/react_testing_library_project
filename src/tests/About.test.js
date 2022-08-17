import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 2 - Teste o componente About.js', () => {
  test('Teste se a pagina contem as informações sobre a Pokedex', () => {
    const { history } = renderWithRouter(<App />);
    const checkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(checkAbout);
    expect(history.location.pathname).toBe('/about');

    const aboutTitle = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(aboutTitle).toBeInTheDocument();

    const aboutFirstInfo = screen.getByText(/This application simulates a Pokédex/i);
    expect(aboutFirstInfo).toBeInTheDocument();

    const aboutSecondInfo = screen.getByText(/One can filter Pokémons by type/i);
    expect(aboutSecondInfo).toBeInTheDocument();

    const img = screen.getByRole('img', { name: 'Pokédex' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
