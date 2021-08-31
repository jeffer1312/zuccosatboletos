import { useCallback, useEffect, useState } from 'react';
import LayoutDash from '../../src/components/Layout';
import { api } from '../../src/services/api/api';
import moment from 'moment';
import 'moment/locale/pt-br';
import Icon from 'awesome-react-icons';
moment.locale('pt-br');

import { Cliente } from '../../src/types';
function ClientesCadastrados() {
  const [clientes, setClientes] = useState<Array<Cliente>>([]);

  const LoadClientes = useCallback(async () => {
    const res = await api.get('/clientesusuario');
    console.log(res);
    setClientes(res.data);
  }, []);

  useEffect(() => {
    LoadClientes();
  }, [LoadClientes]);
  return (
    <LayoutDash>
      <main className='flex-1 overflow-x-hidden overflow-y-auto bg-gray-200'>
        <div className='flex flex-col mt-8'>
          <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
            <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200'>
              <table className='min-w-full'>
                <thead>
                  <tr>
                    <th className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                      Nome
                    </th>
                    <th className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                      Cnpj/Cpf
                    </th>
                    <th className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                      Telefone
                    </th>
                    <th className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                      Data do cadastro
                    </th>
                    <th className='px-6 py-3 border-b border-gray-200 bg-gray-50' />
                  </tr>
                </thead>
                <tbody className='bg-white'>
                  {clientes.map(cliente => {
                    return (
                      <tr key={cliente.id}>
                        <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
                          <div className='flex items-center'>
                            <div className='flex-shrink-0 h-10 w-10'>
                              <Icon name='user' />
                            </div>
                            <div className='ml-4'>
                              <div className='text-sm leading-5 font-medium text-gray-900'>
                                {cliente.nomepessoa}
                              </div>
                              <div className='text-sm leading-5 text-gray-500'>
                                {cliente.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
                          <div className='text-sm leading-5 text-gray-900'>
                            {cliente.cpf_cnpj}
                          </div>
                          <div className='text-sm leading-5 text-gray-500'></div>
                        </td>
                        <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
                          <span className='px-2 inline-flex text-xs leading-5   '>
                            {cliente.telefone}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500'>
                          {moment(cliente.created_at).format('LL')}
                        </td>
                        <td className='px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium'>
                          <a
                            href='#'
                            className='text-indigo-600 hover:text-indigo-900'
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </LayoutDash>
  );
}

export default ClientesCadastrados;
