import LayoutDash from '../../src/components/Layout';
import React from 'react';

// import { Container } from './styles';

export default function CriarBoletos() {
  return (
    <LayoutDash>
      <div className='flex justify-center px-6 my-12'>
        {/* Row */}
        <div className='w-full xl:w-3/4 lg:w-11/12 flex'>
          {/* Col */}
          <div
            className='w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg'
            style={
              {
                // backgroundImage:
                //   'url("https://source.unsplash.com/Mv9hjnEUHR4/600x800")',
              }
            }
          />
          {/* Col */}
          <div className='w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none'>
            <h3 className='pt-4 text-2xl text-center'>Gerar Boleto</h3>
            <form className='px-8 pt-6 pb-8 mb-4 bg-white rounded'>
              <div className='mb-4 md:flex md:justify-between'>
                <div className='mb-4 md:mr-2 md:mb-0'>
                  <label
                    className='block mb-2 text-sm font-bold text-gray-700'
                    htmlFor='firstName'
                  >
                    Nome
                  </label>
                  <input
                    className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    id='firstName'
                    type='text'
                    placeholder='First Name'
                  />
                </div>
                <div className='md:ml-2'>
                  <label
                    className='block mb-2 text-sm font-bold text-gray-700'
                    htmlFor='lastName'
                  >
                    Sobrenome
                  </label>
                  <input
                    className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    id='lastName'
                    type='text'
                    placeholder='Last Name'
                  />
                </div>
              </div>
              <div className='mb-4'>
                <label
                  className='block mb-2 text-sm font-bold text-gray-700'
                  htmlFor='email'
                >
                  Email
                </label>
                <input
                  className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  id='email'
                  type='email'
                  placeholder='Email'
                />
              </div>
              <div className='mb-4 md:flex md:justify-between'>
                <div className='mb-4 md:mr-2 md:mb-0'>
                  <label
                    className='block mb-2 text-sm font-bold text-gray-700'
                    htmlFor='password'
                  >
                    campo1
                  </label>
                  <input
                    className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    id='password'
                    type='password'
                    placeholder='******************'
                  />
                  <p className='text-xs italic text-red-500'>
                    {/* Please choose a password. */}
                  </p>
                </div>
                <div className='md:ml-2'>
                  <label
                    className='block mb-2 text-sm font-bold text-gray-700'
                    htmlFor='c_password'
                  >
                    campo2
                  </label>
                  <input
                    className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    id='c_password'
                    type='password'
                    placeholder='******************'
                  />
                </div>
              </div>
              <div className='mb-6 text-center'>
                <button
                  className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline'
                  type='button'
                >
                  Criar Boleto
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

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
