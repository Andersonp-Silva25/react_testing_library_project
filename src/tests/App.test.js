import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 1 - Teste o componente App.js', () => {
  test('Teste se contém um conjunto fixo de links de navegação', () => {
    const links = ['Home', 'About', 'Favorite Pokémons'];
    renderWithRouter(<App />);
    links.map((link) => (
      expect(screen.getByRole('link', { name: link })).toBeDefined()
    ));
  });

  test('Testa se o Link Home está sendo redirecionado corretamente', () => {
    const { history } = renderWithRouter(<App />);

    const checkHome = screen.getByRole('link', { name: 'Home' });
    expect(checkHome).toBeDefined();
    userEvent.click(checkHome);

    expect(history.location.pathname).toBe('/');
  });

  test('Testa se o Link About está sendo redirecionado corretamente', () => {
    const { history } = renderWithRouter(<App />);

    const checkAbout = screen.getByRole('link', { name: 'About' });
    expect(checkAbout).toBeDefined();
    userEvent.click(checkAbout);

    expect(history.location.pathname).toBe('/about');
  });

  test('Testa se o Link Pokémons Favoritos está sendo redirecionado corretamente', () => {
    const { history } = renderWithRouter(<App />);

    const checkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(checkFavorites).toBeDefined();
    userEvent.click(checkFavorites);

    expect(history.location.pathname).toBe('/favorites');
  });

  test('Testa se a aplicação vai para a tela de NotFound caso não encontre a URL', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/HakunaMatata');

    const titleNotFound = screen.getByRole('heading', { level: 2, name: /not found/i });

    expect(titleNotFound).toBeInTheDocument();
  });
});
