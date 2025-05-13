// src/services/userService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/usuarios';

export const crearUsuario = async (datos) => {
  try {
    const response = await axios.post(API_URL, datos);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

export const obtenerUsuarios = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};
