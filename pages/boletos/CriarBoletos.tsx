import LayoutDash from '../../src/components/Layout';
import React, { useState, useEffect } from 'react';
import SelectCliente from '../../src/SelectCliente';
import { useForm, Controller } from 'react-hook-form';
import { Cliente } from '../../src/types';

// import { Container } from './styles';
type infoPedido = {
  descricao: string;
  quantidade: number;
  register: string;
};
type requestBoleto = {
  idclienteusuario: number;
  vencimento: Date;
  referenciapedido: string;
  urlnotificacao: String;
  items: [{ descricao: string; valor: number; qtd: number }];
  aplicardesconto: boolean;
  desconto_valorfixo: number;
  desconto_porcento: number;
  aplicarmulta: boolean;
  multa_valor: number;
  multa_datalimite: number;
  multa_juros: number;
};
export default function CriarBoletos() {
  const { control, register, setValue, handleSubmit, getValues } = useForm();
  const [clienteSelecionado, setClienteSelecionado] = useState<
    Array<Cliente>
  >();
  const [infoPedido, setInfoPedido] = useState([1]);
  const [valorTotal, setValorTotal] = useState(0);
  useEffect(() => {
    console.log(clienteSelecionado);
    if (clienteSelecionado) {
      console.log(clienteSelecionado);
      setValue('nome', clienteSelecionado[0]?.nomepessoa);
      setValue('telefone', clienteSelecionado[0]?.telefone);
      setValue('email', clienteSelecionado[0]?.email);
      setValue('cnpj', clienteSelecionado[0]?.cpf_cnpj);
      // setValue('nome', clienteSelecionado[0].nomepessoa);
    }
  }, [clienteSelecionado]);
  function handleCriarBoleto(data) {
    console.log(data);
  }
  function CriarCliente() {
    setClienteSelecionado([]);
    setValue('AddBoleto_Cliente', '');
  }
  useEffect(() => {
    setValorTotal(0);
    infoPedido.map((info, index) => {
      let valor = getValues(`Valor${index}`);
      if (valor != '') {
        setValorTotal(value => value + parseInt(valor));
      }
    });
  }, [infoPedido]);
  return (
    <LayoutDash>
      {/* <div className='flex justify-center my-12'> */}
      {/* Row */}
      <div className='w-full  flex'>
        {/* Col */}
        {/* <div
            className='w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg'
            style={
              {
                // backgroundImage:
                //   'url("https://source.unsplash.com/Mv9hjnEUHR4/600x800")',
              }
            }
          /> */}
        {/* Col */}

        <div className='w-full bg-white p-5 rounded-lg lg:rounded-l-none'>
          <h3 className='pt-4 text-2xl text-center'>Gerar Boleto</h3>
          <form
            onSubmit={handleSubmit(handleCriarBoleto)}
            className='px-8 pt-6 pb-8 mb-4 bg-white rounded'
          >
            <div className='mb-4 md:mr-2 md:mb-0'>
              <Controller
                name='AddBoleto_Cliente'
                defaultValue=''
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SelectCliente
                    setClienteSelecionado={setClienteSelecionado}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <div className='mb-6'>
                <button onClick={CriarCliente} className='btnCriarCliente'>
                  Criar Novo Cliente
                </button>
              </div>
            </div>
            {/* {clienteSelecionado ? '' : } */}
            <div className='mb-4 md:mr-2 md:mb-0'>
              <label
                className='block mb-2 text-sm font-bold text-gray-700'
                htmlFor='Nome'
              >
                Nome
              </label>
              <input
                {...register('nome')}
                className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='Nome'
              />
            </div>
            <div className='mb-4 md:mr-2 md:mb-0'>
              <label
                className='block mb-2 text-sm font-bold text-gray-700'
                htmlFor='Nome'
              >
                Email
              </label>
              <input
                {...register('email')}
                className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                type='email'
                placeholder='email'
              />
            </div>
            <div className='mb-4 md:mr-2 md:mb-0'>
              <label
                className='block mb-2 text-sm font-bold text-gray-700'
                htmlFor='Nome'
              >
                Cpf/Cnpj*
              </label>
              <input
                {...register('cnpj')}
                className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='cnpj'
              />
            </div>
            <div className='mb-4 md:mr-2 md:mb-0'>
              <label
                className='block mb-2 text-sm font-bold text-gray-700'
                htmlFor='Nome'
              >
                Telefone
              </label>
              <input
                {...register('telefone')}
                className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='telefone'
              />
            </div>

            <div className='mb-4'>
              <label
                className='block mb-2 text-sm font-bold text-gray-700'
                htmlFor='email'
              >
                Referencia
              </label>
              <input
                {...register('referencia')}
                className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                placeholder='Referencia'
              />
            </div>
            <h3 className='pt-4 text-2xl text-center'>Informaçoes do pedido</h3>
            {infoPedido.map((info, index) => (
              <div
                key={index}
                className='md:flex flex-row md:space-x-4 w-full text-xs infoPedido'
              >
                <div className='mb-3 space-y-2 w-full text-xs'>
                  <label className='font-semibold text-gray-600 py-2'>
                    Descrição
                  </label>
                  <input
                    {...register(`Descrição${index}`)}
                    placeholder='Descrição'
                    className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4'
                    type='text'
                  />
                </div>
                <div className='mb-3 space-y-2 w-full text-xs'>
                  <label className='font-semibold text-gray-600 py-2'>
                    Quantidade
                  </label>
                  <input
                    {...register(`Quantidade${index}`)}
                    placeholder='Quantidade'
                    className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4'
                    type='number'
                  />
                </div>
                <div className='mb-3 space-y-2 w-full text-xs'>
                  <label className='font-semibold text-gray-600 py-2'>
                    Valor unitario
                  </label>
                  <input
                    {...register(`Valor${index}`)}
                    placeholder='Valor'
                    className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4'
                    type='number'
                    step='any'
                  />
                </div>
              </div>
            ))}
            {valorTotal !== 0 ? (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h5>Valor Total</h5>
                <span style={{ fontWeight: 'bold' }}>R${valorTotal},00</span>
              </div>
            ) : (
              ''
            )}
            <button
              onClick={() =>
                setInfoPedido(value => value.concat([value.length + 1]))
              }
              style={{ margin: '10px' }}
              className='px-4 py-2 font-bold text-white bg-blue-500  hover:bg-blue-700 focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Adicionar Mais
            </button>
            <button
              onClick={() =>
                setInfoPedido(value =>
                  value.filter(value => value !== infoPedido.length)
                )
              }
              style={{ margin: '10px' }}
              className='px-4 py-2 font-bold text-white bg-blue-500  hover:bg-blue-700 focus:outline-none focus:shadow-outline'
            >
              Remover
            </button>

            <div className='mb-6 text-center'>
              <button
                className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Criar Boleto
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* </div> */}

      {/* <div className='form'>
        <div className='col-12 col-md-6'>
          <div className='form-group'>
            <label>Nome da Cliente</label>
            <input
              type='text'
              className='form-control'
              name='NomeEmpresa'
              // value={this.state.empresa.NomeEmpresa}
              // onChange={e => this.updateField(e)}
              placeholder='Digite o nome da empresa: '
            ></input>
          </div>
        </div>
        <div className='col-12 col-md-6'>
          <div className='form-group'>
            <label>Data </label>
            <input
              type='date'
              className='form-control'
              name='DataFundação'
              // value={this.state.empresa.DataFundação}
              // onChange={e => this.updateField(e)}
              placeholder='Digite a data de fundação: '
            ></input>
          </div>
        </div>
        <div className='col-12 col-md-6'>
          <div className='form-group'>
            <label>valor</label>
            <input
              type='text'
              className='form-control'
              name='FormaJurídica'
              // value={this.state.empresa.FormaJurídica}
              // onChange={e => this.updateField(e)}
              placeholder='Digite a  '
            ></input>
          </div>
        </div>
        <div className='col-12 col-md-6'>
          <div className='form-group'>
            <label>Área de atuação</label>
            <input
              type='text'
              className='form-control'
              name='ÁreaAtuação'
              // value={this.state.empresa.ÁreaAtuação}
              // onChange={e => this.updateField(e)}
              placeholder='Digite a : '
            ></input>
          </div>
        </div>
        <div className='col-12 col-md-6'>
          <div className='form-group'>
            <label>Porte da empresa</label>
            <input
              type='text'
              className='form-control'
              name='PorteEmpresa'
              // value={this.state.empresa.PorteEmpresa}
              // onChange={e => this.updateField(e)}
              placeholder='Digite o  '
            ></input>
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className='col-12 d-flex justify-content-end'>
            <button className='btn btn-primary' onClick={e => this.save(e)}>
              salvar
            </button>
            <button
              className='btn btn-secundary ml-2'
              // onClick={e => this.clear(e)}
            >
              cancelar
            </button>
          </div>
        </div>
      </div> */}
    </LayoutDash>
  );
}
