import React, { useEffect, useState } from 'react';
import { obtenerUsuarios } from '../services/userService';

function UsuarioLista() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await obtenerUsuarios();
        setUsuarios(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsuarios();
  }, []);

  return (
    <ul>
      {usuarios.map((u) => (
        <li key={u._id}>{u.nombre} - {u.telefono}</li>
      ))}
    </ul>
  );
}

export default UsuarioLista;
