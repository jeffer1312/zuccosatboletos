import React from 'react';

import Header from './Header';
import Sidebar from './Sidebar';
import Conteudo from './Content';
import Footer from './Footer';

class LayoutDash extends React.Component {
  render() {
    return (
      <div className='App'>
        {/* <div className='wrapper'> */}
        <Header />
        <Sidebar />
        <Conteudo>{this.props.children}</Conteudo>
        <Footer />
      </div>
    );
  }
}

export default LayoutDash;
