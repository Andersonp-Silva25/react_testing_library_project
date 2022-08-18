import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

describe('Requisito 6 - Teste o componente Pokemon.js ', () => {
  test('Teste se é renderizado um card com as informações do pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe(data[0].name);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe(data[0].type);

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const { averageWeight: { value, measurementUnit } } = data[0];
    const checkWeight = `Average weight: ${value} ${measurementUnit}`;
    expect(pokemonWeight.innerHTML).toBe(checkWeight);

    const image = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Teste se a navegação do card está correto e se tem o icone de favoritos', () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /More details/i });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(history.location.pathname).toBe(`/pokemons/${data[0].id}`);

    const checkFavorite = screen.getByRole('checkbox');
    userEvent.click(checkFavorite);

    const favoriteImage = screen.getByRole('img',
      { name: 'Pikachu is marked as favorite' });
    expect(favoriteImage).toBeInTheDocument();
    expect(favoriteImage).toHaveAttribute('src', '/star-icon.svg');
  });
});
