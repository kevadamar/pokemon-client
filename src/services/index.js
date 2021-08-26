import { getDataLocalStorage } from '../helpers';

const bidPokemon = async ({ pokemon_id, token }) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/pokemon/${pokemon_id}/bid`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const result = await response.json();

    return result;
  } catch (error) {
    return error;
  }
};

const getPokemon = async ({ name }) => {
  try {
    const token = getDataLocalStorage({ key: 'token' });
    const response = await fetch(
      `http://localhost:5000/api/v1/pokemon/${name}/detail`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const result = await response.json();

    return result;
  } catch (error) {
    return error;
  }
};

const getAllPokemon = async ({ page }) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/pokemon?page=${page}`,
    );
    const result = await response.json();

    return result;
  } catch (error) {
    return error;
  }
};

const getAllMyPokemon = async ({ token }) => {
  try {
    const response = await fetch('http://localhost:5000/api/v1/pokemon/user', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    return error;
  }
};

const login = async ({ payload }) => {
  try {
    const response = await fetch('http://localhost:5000/api/v1/login', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...payload }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    return error;
  }
};

const register = async ({ payload }) => {
  try {
    const response = await fetch('http://localhost:5000/api/v1/register', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...payload }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    return error;
  }
};

export const services = {
  getPokemon,
  getAllPokemon,
  login,
  register,
  getAllMyPokemon,
  bidPokemon,
};
