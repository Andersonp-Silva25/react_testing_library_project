import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

describe('Requisito 5 - Teste o componente Pokedex.js', () => {
  test('Teste se contém o h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const pokedexTitle = screen.getByRole('heading',
      { level: 2, name: 'Encountered pokémons' });
    expect(pokedexTitle).toBeInTheDocument();
  });

  test('Teste se é exibido o proximo pokemon da lista ao clicar no botão Próximo', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toHaveAttribute('data-testid', 'next-pokemon');

    const arrayPokemons = data.map((pokemon) => pokemon.name);

    arrayPokemons.forEach((pokemon) => {
      const currentPokemon = screen.queryByText(pokemon);
      expect(currentPokemon).toBeInTheDocument();

      userEvent.click(nextButton);

      const checkPokemon = screen.queryByText(pokemon);
      expect(checkPokemon).not.toBeInTheDocument();
    });
  });

  test('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  test('Teste se a Pokédex tem botões de filtro', () => {
    renderWithRouter(<App />);

    const typeButtons = [
      'Electric', 'Fire',
      'Bug', 'Poison',
      'Psychic', 'Normal',
      'Dragon',
    ];

    const filterButtons = screen.getAllByTestId('pokemon-type-button');

    filterButtons.forEach((button, index) => {
      expect(button).toBeInTheDocument();
      expect(button.innerHTML).toBe(typeButtons[index]);
      expect(button).toHaveAttribute('data-testid', 'pokemon-type-button');
    });
  });

  test('Testa se o botão "All" está sempre visivel', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: /all/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
  });

  test('Teste se a Pokédex tem um botão para resetar os filtros', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
    expect(allButton).toBeEnabled();
  });
});
