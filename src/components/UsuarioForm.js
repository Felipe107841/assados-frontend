import { useState } from 'react';
import axios from 'axios';

const UsuarioForm = () => {
  const [form, setForm] = useState({
    nombre: '', apellido: '', direccion: '', referencia: '', telefono: '', email: ''
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', form);
      setMensaje(res.data.mensaje);
    } catch (error) {
      setMensaje(error.response?.data?.mensaje || 'Error al registrar');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {['nombre', 'apellido', 'direccion', 'referencia', 'telefono', 'email'].map(campo => (
        <div key={campo}>
          <input
            type="text"
            name={campo}
            placeholder={campo}
            value={form[campo]}
            onChange={handleChange}
            required={campo !== 'referencia'}
          />
        </div>
      ))}
      <button type="submit">Registrarse</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
};

export default UsuarioForm;
