import LayoutDash from '../../src/components/Layout';
import React, { useState, useEffect } from 'react';
import SelectCliente from '../../src/SelectCliente';
import { useForm, Controller, ChangeHandler } from 'react-hook-form';
import { Cliente } from '../../src/types';
import { api } from '../../src/services/api/api';
import router from 'next/router';

// import { Container } from './styles';
type infoPedido = {
  descricao: string;
  quantidade: number;
  register: string;
};
type item = {
  descricao: string;
  valor: number;
  qtd: number;
};

type respostaCriarBoleto = {
  success: boolean;
  transacao: {
    idtransacao: string;
    datacriacao: string;
    valortotal: number;
    status: number;
    referenciapedido: string;
    datavencimento: string;
    whatsapplink: string;
    boleto: {
      nossonumero: number;
      linhaDigitavel: string;
      codigoDeBarra: string;
      url_slip_pdf: string;
      url_slip: string;
    };
    pix: {
      qrcode: string;
      vencimento: string;
      created_at: string;
    };
  };
};
type requestBoleto = {
  idclienteusuario: number;
  vencimento: Date;
  referenciapedido: string;
  urlnotificacao?: String;
  items: Array<item>;
  aplicardesconto: boolean;
  desconto_valorfixo?: number;
  desconto_porcento?: number;
  aplicarmulta: boolean;
  multa_valor?: number;
  multa_datalimite?: number;
  multa_juros?: number;
  cliente?: {
    //  codigocliente: 0001 (string)
    nomepessoa: string;
    email: string;
    cpf_cnpj: number;
    logradouro: string;
    numero: number;
    complemento: string;
    cep: number;
    bairro: string;
    cidade: string;
    estado: string;
    telefone: number;
  };
};
type items = { descricao: string; valor: number; qtd: number };
export default function CriarBoletos() {
  const { control, register, setValue, handleSubmit, getValues } = useForm();
  const [criarCliente, setCriarCliente] = useState(false);
  const [aplicarMulta, setAplicarMulta] = useState(false);
  const [items, setItems] = useState<Array<items>>();
  const [porcentagem, setPorcentagem] = useState('');
  const [botaoPdf, setBotaoPdf] = useState(false);
  const [aplicarDesconto, setAplicarDesconto] = useState(false);
  const [cadastrarEndereco, setCadastrarEndereco] = useState(true);
  const [clienteSelecionado, setClienteSelecionado] = useState<
    Array<Cliente>
  >();
  const [infoPedido, setInfoPedido] = useState([1]);
  const [valores, setValores] = useState([]);
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
  async function handleCriarBoleto(data) {
    const {
      AddBoleto_Cliente,
      cnpj,
      email,
      nome,
      referencia,
      telefone,
      vencimento,

      limitedias,
      valormultajuros,
      valormulta,
      descontoValor,
      descontoDiasAntes,
      CEP,
      endereco,
      nendereco,
      complemento,
      estado,
      cidade,
      bairro,
    } = data;
    console.log(data);

    let dadosBoleto: requestBoleto = {
      idclienteusuario: AddBoleto_Cliente.value,
      vencimento: vencimento,
      referenciapedido: referencia,
      items: items,
      aplicardesconto: aplicarDesconto,
      desconto_valorfixo: porcentagem === '2' ? descontoValor : undefined,
      desconto_porcento: porcentagem === '1' ? descontoValor : undefined,
      aplicarmulta: aplicarMulta,
      multa_valor: valormulta,
      multa_datalimite: limitedias,
      multa_juros: valormultajuros,
      cliente: criarCliente
        ? {
            nomepessoa: nome,
            email: email,
            cpf_cnpj: cnpj,
            logradouro: endereco,
            numero: nendereco,
            complemento: complemento,
            cep: CEP,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            telefone: telefone,
          }
        : undefined,
    };
    console.log(dadosBoleto);
    const res = await api.post('/transacao/boleto', dadosBoleto);
    console.log(res);
    const resposta: respostaCriarBoleto = res.data;
    if (resposta.success) {
      console.log(resposta.transacao.boleto.url_slip_pdf);
      window.open(resposta.transacao.boleto.url_slip, '_blank');
    }
    // console.log(res);
  }
  function CriarCliente() {
    setClienteSelecionado([]);
    setValue('AddBoleto_Cliente', '');
    setCriarCliente(true);
  }
  useEffect(() => {
    console.log('items', porcentagem);
  }, [infoPedido, porcentagem]);
  useEffect(() => {
    setValorTotal(0);
    setItems([]);
    infoPedido.map((info, index) => {
      let valor = getValues(`Valor${index}`);
      let qt = getValues(`Quantidade${index}`);
      let descricao = getValues(`Descricao${index}`);
      let itemsLocais = {
        descricao,
        qtd: parseInt(qt),
        valor: parseInt(valor),
      };
      if (valor != '') {
        setItems(value => value.concat([itemsLocais]));
        setValorTotal(value => value + parseInt(valor));
      }
    });
  }, [infoPedido]);
  useEffect(() => {
    console.log(clienteSelecionado && clienteSelecionado[0]?.id);
    if (clienteSelecionado && clienteSelecionado[0]?.id !== undefined) {
      setCriarCliente(false);
    }
  }, [clienteSelecionado]);
  function somarValores() {
    setValorTotal(0);
    setItems([]);
    infoPedido.map((info, index) => {
      let valor = getValues(`Valor${index}`);
      let qt = getValues(`Quantidade${index}`);
      let descricao = getValues(`Descricao${index}`);
      let itemsLocais = {
        descricao,
        qtd: parseInt(qt),
        valor: parseInt(valor),
      };
      if (valor != '') {
        setItems(value => value.concat([itemsLocais]));
        setValorTotal(value => value + parseInt(qt) * parseInt(valor));
      }
    });
  }

  useEffect(() => {
    setValorTotal(0);
    console.log(valores);
    valores.map(valor => {
      setValorTotal(value => value + parseInt(valor));
    });
  }, [valores]);
  function handleOnChangeForm(data) {
    console.log('change', data.target);
  }
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
            onChange={handleOnChangeForm}
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
                disabled={!criarCliente}
                className=' form-control w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
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
                disabled={!criarCliente}
                className='form-control w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
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
                disabled={!criarCliente}
                className='form-control w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
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
                disabled={!criarCliente}
                className='form-control w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='telefone'
              />
            </div>
            {criarCliente ? (
              <>
                <div
                  style={{ display: 'flex', justifyContent: 'center' }}
                  className='form-check'
                >
                  <input
                    onClick={() => setCadastrarEndereco(!cadastrarEndereco)}
                    className='form-check-input'
                    type='checkbox'
                  />
                  <label className='form-check-label '>
                    <small>Não cadastrar endereço</small>
                  </label>
                  {/* <a className='btn btn-secondary btn-sm'>?</a> */}
                </div>

                {cadastrarEndereco ? (
                  <>
                    <div className='mb-3 row'>
                      <label htmlFor='nome' className='col-sm-2 col-form-label'>
                        CEP *:
                      </label>
                      <div className='col-sm-10'>
                        <input
                          {...register('CEP')}
                          type='text'
                          className='form-control cep_cadastrarclienteuser'
                          required
                        />
                        <small className='text-danger' />
                      </div>
                    </div>

                    <div className='mb-3 row'>
                      <label htmlFor='nome' className='col-sm-2 col-form-label'>
                        Endereço*:
                      </label>
                      <div className='col-sm-10'>
                        <div className='input-group mb-3'>
                          <input
                            {...register('endereco')}
                            type='text'
                            className='form-control col-lg-8'
                            id='endereco_cadcliente'
                            placeholder='Av São Paulo'
                          />
                          <input
                            {...register('nendereco')}
                            type='text'
                            className='form-control col-lg-4'
                            placeholder='Nº'
                          />
                        </div>
                      </div>
                      <div className='col-sm-12'>
                        <div className='input-group mb-3'>
                          <input
                            {...register('complemento')}
                            type='text'
                            className='form-control col-lg-10'
                            placeholder='Complemento'
                            id='complemento_cadcliente'
                          />
                          <input
                            {...register('bairro')}
                            type='text'
                            className='form-control col-lg-5'
                            placeholder='Bairro'
                            id='bairro_cadcliente'
                          />
                          <input
                            {...register('cidade')}
                            type='text'
                            className='form-control col-lg-4'
                            id='cidade_cadcliente'
                            placeholder='Cidade'
                          />
                          <select
                            {...register('estado')}
                            className='form-control'
                            id='estado_cadcliente'
                          >
                            <option value='AC'>Acre</option>
                            <option value='AL'>Alagoas</option>
                            <option value='AP'>Amapá</option>
                            <option value='AM'>Amazonas</option>
                            <option value='BA'>Bahia</option>
                            <option value='CE'>Ceará</option>
                            <option value='DF'>Distrito Federal</option>
                            <option value='ES'>Espírito Santo</option>
                            <option value='GO'>Goiás</option>
                            <option value='MA'>Maranhão</option>
                            <option value='MT'>Mato Grosso</option>
                            <option value='MS'>Mato Grosso do Sul</option>
                            <option value='MG'>Minas Gerais</option>
                            <option value='PA'>Pará</option>
                            <option value='PB'>Paraíba</option>
                            <option value='PR'>Paraná</option>
                            <option value='PE'>Pernambuco</option>
                            <option value='PI'>Piauí</option>
                            <option value='RJ'>Rio de Janeiro</option>
                            <option value='RN'>Rio Grande do Norte</option>
                            <option value='RS'>Rio Grande do Sul</option>
                            <option value='RO'>Rondônia</option>
                            <option value='RR'>Roraima</option>
                            <option value='SC'>Santa Catarina</option>
                            <option value='SP'>São Paulo</option>
                            <option value='SE'>Sergipe</option>
                            <option value='TO'>Tocantins</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  ''
                )}
              </>
            ) : (
              ''
            )}
            <div className='mb-4'>
              <label
                className='block mb-2 text-sm font-bold text-gray-700'
                htmlFor='email'
              >
                Referencia
              </label>

              <input
                {...register('referencia')}
                className='form-control w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                placeholder='Código que identifica o pedido'
              />
            </div>
            <h3 className='pt-4 text-2xl text-center'>Informaçoes do pedido</h3>
            <table className='table' id='itemstransacao_boleto'>
              <thead>
                <tr>
                  <th scope='col'>Descrição</th>
                  <th scope='col'>Quantidade</th>
                  <th scope='col'>Valor Unitário</th>
                  <th scope='col' />
                </tr>
              </thead>
              <tbody id='text-center'>
                {infoPedido.map((info, index) => (
                  <>
                    <tr key={index} id='tr_default_boleto'>
                      <td scope='row'>
                        <input
                          {...register(`Descricao${index}`)}
                          placeholder='Descrição'
                          type='text'
                          className='form-control descricao_boleto'
                          required
                        />
                      </td>
                      <td>
                        <input
                          {...register(`Quantidade${index}`)}
                          placeholder='Quantidade'
                          min={1}
                          type='number'
                          onBlur={somarValores}
                          className='quantidade_boleto form-control text-center recalcularboletoinput'
                          required
                          defaultValue={1}
                        />
                      </td>
                      <td>
                        <input
                          {...register(`Valor${index}`)}
                          placeholder='Valor'
                          type='text'
                          onBlur={somarValores}
                          // onChange={e => handleValor(e, index)}
                          // pattern='[0-9]+([\,][0-9]+)?'

                          className='valorunitario_boleto form-control recalcularboletoinput input_valorunit text-center'
                          required
                          maxLength={18}
                          autoComplete='off'
                        />
                      </td>
                      <td>
                        <button
                          type='button'
                          className='close btn_remove_from_table_boleto'
                          aria-label='Close'
                          onClick={() =>
                            setInfoPedido(value =>
                              value.filter(value => value !== info)
                            )
                          }
                        >
                          <span aria-hidden='true'>×</span>
                        </button>
                      </td>
                    </tr>
                    {/* 
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
                    </div> */}
                  </>
                ))}
              </tbody>
            </table>
            <button
              onClick={() =>
                setInfoPedido(value => value.concat([value.length + 1]))
              }
              className='btn btn-info btn-sm'
            >
              + Adicionar mais
            </button>

            <div className='form-group row'>
              <label htmlFor='inputEmail3' className='col-lg-12 col-form-label'>
                <strong> Vencimento *:</strong>
              </label>
              <div className='col-sm-4'>
                <input
                  {...register('vencimento')}
                  type='date'
                  className='form-control mb-2 col-lg-6 text-center'
                  required
                  //defaultValue={Date.now()}
                />
              </div>
            </div>

            <div className='input-group mb-3 input-group-md '>
              <div className='input-group-prepend'>
                <div className='input-group-text check-radio'>
                  <label
                    htmlFor='aplicarmultaboleto'
                    className='col-form-label mr-2'
                  >
                    <strong> Aplicar Multa</strong>{' '}
                  </label>
                  <input
                    type='checkbox'
                    onClick={() => setAplicarMulta(!aplicarMulta)}
                    aria-label='Chebox para permitir input text'
                  />
                </div>
              </div>
            </div>
            {aplicarMulta ? (
              <div className='input-group mb-3 input-group-md '>
                <input
                  {...register('valormulta')}
                  type='text'
                  name='multa_valor_Boleto'
                  className='form-control text-center multa_value_boleto'
                  placeholder='Multa'
                  max={20}
                  step='.01'
                  required
                />
                <div className='input-group-append'>
                  <span className='input-group-text'>%</span>
                </div>
                <input
                  {...register('valormultajuros')}
                  type='text'
                  name='multa_juros_Boleto'
                  className='form-control text-center multa_value_boleto'
                  placeholder='Juros ao mês'
                  max={20}
                  step='.01'
                  required
                />
                <div className='input-group-append'>
                  <span className='input-group-text'>%</span>
                </div>
                <input
                  {...register('limitedias')}
                  type='number'
                  className='form-control text-center'
                  min={1}
                  max={60}
                  pattern='\d*'
                  step={1}
                  placeholder='Limite Dias'
                  required
                />
                <div className='input-group-append'>
                  <span className='input-group-text'>dia</span>
                </div>
              </div>
            ) : (
              ''
            )}

            <div className='input-group mb-3 input-group-md'>
              <div className='input-group-prepend'>
                <div className='input-group-text check-radio'>
                  <label
                    htmlFor='aplicardescontoboleto'
                    className='col-form-label mr-2'
                  >
                    <strong>Desconto: </strong>{' '}
                  </label>
                  <input
                    type='checkbox'
                    style={{}}
                    onClick={() => setAplicarDesconto(!aplicarDesconto)}
                    aria-label='Chebox para permitir input text'
                    id='aplicardescontoboleto'
                  />
                  <small style={{ marginLeft: '5px' }}>
                    {' '}
                    Aplicar desconto se pagar antes do vencimento
                  </small>
                </div>
              </div>
            </div>
            {aplicarDesconto ? (
              <div className='input-group mb-3 input-group-md'>
                <select
                  onChange={e => setPorcentagem(e.target.value)}
                  className='form-control text-center col-sm-10'
                >
                  <option value={1}>Porcentagem</option>
                  <option value={2}>Valor Fixo</option>
                </select>

                <input
                  {...register('descontoValor')}
                  type='text'
                  name='desconto_valor_boleto'
                  className='form-control text-center col-sm-10 desconto_valor_boleto'
                  step='.01'
                  placeholder='%'
                  required
                />
                <div className='input-group-append'>
                  <span className='input-group-text' />
                </div>
                <input
                  {...register('descontoDiasAntes')}
                  type='number'
                  pattern='\d*'
                  name='desconto_limiteday_boleto'
                  className='form-control text-center col-sm-10'
                  step={1}
                  min={0}
                  placeholder='Dias antes de vencer'
                  required
                />
                <div className='input-group-append'>
                  <span className='input-group-text'>dia</span>
                </div>
              </div>
            ) : (
              ''
            )}

            <div className='modal-footer justify-content-between'>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Valor Total :R${valorTotal},00</span>
              </div>

              <div>
                <button type='submit' className='btn btn-primary'>
                  Gerar Boleto
                </button>
              </div>
            </div>

            {/* <button
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
            </div> */}
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
