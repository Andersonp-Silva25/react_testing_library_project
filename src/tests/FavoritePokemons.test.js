import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../pages';
import data from '../data';

describe('Requisito 3 - Teste o componente FavoritePokemons.js', () => {
  test('Se nenhum pokémon for encontrado, exiba "No favorite pokemon found"', () => {
    const { history } = renderWithRouter(<App />);
    const checkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(checkFavorites);
    expect(history.location.pathname).toBe('/favorites');

    const favoriteTitle = screen.getByRole('heading', {
      level: 2, name: 'Favorite pokémons' });
    expect(favoriteTitle).toBeInTheDocument();

    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  test('Testa se exibe todos os pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons pokemons={ data } />);

    const favoriteTitle = screen.getByRole('heading', {
      level: 2, name: 'Favorite pokémons' });
    expect(favoriteTitle).toBeInTheDocument();

    const favoritesPokemons = screen.getAllByTestId('pokemon-name');
    expect(favoritesPokemons[3]).toHaveTextContent(/Ekans/i);
    expect(favoritesPokemons[8]).toHaveTextContent(/Dragonair/i);
    expect(favoritesPokemons[7]).toHaveTextContent(/Snorlax/i);
    expect(favoritesPokemons[5]).toHaveTextContent(/Mew/i);
  });
});
