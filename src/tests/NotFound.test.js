import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 4 - Teste o componente NotFound.js', () => {
  test('Testa se a página contem um h2 "Page requested not found"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/achouNão');

    const notFoundTitle = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });

    expect(notFoundTitle).toBeInTheDocument();
  });

  test('Testa se a página exibe a imagem corretamente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/achouNão');

    const img = screen.getByRole('img',
      { name: 'Pikachu crying because the page requested was not found' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
