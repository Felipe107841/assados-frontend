// src/Register.js
import React, { useState } from 'react';
import api from './api';

const Register = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    telefono: '',
    direccion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/registro', form);
      console.log('Usuario registrado:', response.data);
    } catch (error) {
      console.error('Error al registrar el usuario', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
      <input type="text" name="apellido" placeholder="Apellido" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
      <input type="text" name="telefono" placeholder="Teléfono" onChange={handleChange} required />
      <input type="text" name="direccion" placeholder="Dirección" onChange={handleChange} required />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default Register;
