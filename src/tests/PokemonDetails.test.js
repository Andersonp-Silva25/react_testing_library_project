import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

describe('Requisito 7 - Teste o componente PokemonDetails.js', () => {
  test('Teste se as informações detalhadas do pokémon é mostrada na tela', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);

    const pokemonName = screen.getByRole('heading',
      { level: 2, name: `${data[0].name} Details` });
    expect(pokemonName).toBeInTheDocument();

    const summary = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(summary).toBeInTheDocument();

    const summaryText = screen.getByText(/This intelligent Pokémon roasts hard /i);
    expect(summaryText).toBeInTheDocument();

    const location = screen.getByRole('heading',
      { level: 2, name: /game locations of pikachu/i });
    expect(location).toBeInTheDocument();

    const locationsImage = screen.getAllByRole('img', { name: /pikachu location/i });

    locationsImage.forEach((checkLocation) => {
      expect(checkLocation).toBeInTheDocument();
    });

    data[0].foundAt.forEach((urlLocation, index) => {
      expect(urlLocation.map).toContain(locationsImage[index].src);
    });

    const favoritePokemon = screen.getByText(/Pokémon favoritado?/i);
    expect(favoritePokemon).toBeInTheDocument();
  });
});
