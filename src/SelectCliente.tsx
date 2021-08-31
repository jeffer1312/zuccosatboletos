import { useState, useEffect } from 'react';
import { api } from './services/api/api';
import Select from 'react-select';

import { Cliente } from '../src/types';
export default function SelectCliente({
  setClienteSelecionado,
  value,
  onChange,
}) {
  const [clientes, setClientes] = useState<Array<Cliente>>([]);

  async function LoadClientes() {
    const res = await api.get('/clientesusuario');
    setClientes(res.data);
  }

  useEffect(() => {
    if (value) {
      setClienteSelecionado(
        clientes.filter(cliente => cliente.id === value.value)
      );
    }
  }, [value]);

  useEffect(() => {
    LoadClientes();
  }, []);

  return (
    <Select
      style={{ borderRadius: '10px' }}
      // className={className}
      placeholder='Selecione um Cliente'
      value={value}
      onChange={onChange}
      options={clientes?.map(cliente => ({
        label: cliente.nomepessoa,
        value: cliente.id,
      }))}
    />
  );
}
