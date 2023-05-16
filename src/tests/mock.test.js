import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

describe('Requisito 5', () => {
  it('Testa se existe um formulario na página', () => {
    renderWithRouterAndRedux(<App />);

    screen.getByRole('heading', { name: /login/i });
    screen.getByRole('textbox');
    screen.getByPlaceholderText(/digite seu email/i);
    screen.getByTestId('password-input');
    screen.getByPlaceholderText(/digite sua senha/i);
    screen.getByRole('button', { name: /entrar/i });
  });
  it('Testa se digitado um email valido e senha é redirecionado para pagina carteira', () => {
    renderWithRouterAndRedux(<App />);

    const botao = screen.getByRole('button', { name: /entrar/i });
    expect(botao).toBeDisabled();
    const email = screen.getByRole('textbox');
    userEvent.type(email, 'trybe@email.com');
    const senha = screen.getByTestId('password-input');
    userEvent.type(senha, '123456');
    expect(botao).not.toBeDisabled();
    userEvent.click(botao);
    screen.getByRole('heading', { name: /trybewallet/i });
    screen.getByText(/email: trybe@email\.com/i);
  });
  it('Teste se na página existe uma tabela com o cabeçalho correto', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });
    screen.getByRole('heading', { name: /trybewallet/i });
    screen.getByText(/email: usuario@email\.com/i);
    screen.getByRole('columnheader', { name: /descrição/i });
    screen.getByRole('columnheader', { name: /tag/i });
    screen.getByRole('columnheader', { name: /método de pagamento/i });
    screen.getByRole('columnheader', { name: /câmbio utilizado/i });
    screen.getByRole('columnheader', { name: /valor convertido/i });
    screen.getByRole('columnheader', { name: /moeda de conversão/i });
    screen.getByRole('columnheader', { name: /editar\/excluir/i });
  });
  it('Teste se na página existe um formulario para adicionar uma despesa', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });
    screen.getByRole('heading', { name: /adicione uma despesa/i });
    screen.getByRole('spinbutton');
    screen.getByRole('textbox');
    screen.getByTestId('currency-input');
    screen.getByTestId('method-input');
    screen.getByTestId('tag-input');
    screen.getByRole('button', { name: /adicionar despesa/i });
  });
  it('Teste se é possivel adicionar uma despesa', async () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });
    screen.getByRole('heading', { name: /adicione uma despesa/i });

    const valor = screen.getByRole('spinbutton');
    const descricao = screen.getByRole('textbox');
    const botao = screen.getByRole('button', { name: /adicionar despesa/i });
    const total = screen.getByTestId('total-field');
    const tol = 0.00;
    expect(total).toHaveTextContent(tol);

    userEvent.type(valor, '2');
    userEvent.type(descricao, '2 dolares');
    userEvent.click(botao);
    expect(botao).toBeVisible();
    screen.findByRole('heading', { name: /9\.82/i });
    screen.findByRole('cell', { name: /2 dolares/i });
    screen.findByRole('cell', { name: /alimentação/i });
    screen.findByRole('cell', { name: /dinheiro/i });
    screen.findByRole('cell', { name: /usd 2\.00/i });
    screen.findByRole('cell', { name: /dólar americano\/real brasileiro/i });
    screen.findByRole('cell', { name: /usd 4\.91/i });
    screen.findByRole('cell', { name: /r\$ 9\.82/i });
    screen.findByRole('button', { name: /editar/i });
    screen.findByRole('button', { name: /excluir/i });
  });
  it('', async () => {
    const initialEntries = ['/carteira'];
    const expenses = [
      {
        id: 1,
        description: 'Despesa 1',
        tag: 'Tag 1',
        method: 'Método 1',
        currency: 'USD',
        value: 50,
        exchangeRates: {
          USD: { name: 'Dólar', ask: 5.23 },
        },
      },
      {
        id: 2,
        description: 'Despesa 2',
        tag: 'Tag 2',
        method: 'Método 2',
        currency: 'EUR',
        value: 75,
        exchangeRates: {
          EUR: { name: 'Euro', ask: 1.18 },
        },
      },
    ];
    renderWithRouterAndRedux(<App expenses={ expenses } />, { initialEntries });
    screen.getByRole('heading', { name: /adicione uma despesa/i });

    const soma = screen.getByTestId('total-field');
    const tol = 0.00;
    expect(soma).toHaveTextContent(tol);
    screen.findByText('Despesa 1');
    screen.findByText('Tag 1');
  });
  it('', async () => {
    const initialEntries = ['/carteira'];
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(() => mockData),
    });
    renderWithRouterAndRedux(<App />, { initialEntries });
    expect(global.fetch).toHaveBeenCalledWith(
      'https://economia.awesomeapi.com.br/json/all',
    );
  });
});
