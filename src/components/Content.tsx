import React from 'react';

import { useShowSidebar } from '../context/context';

// import { Container } from './styles';

const Conteudo = props => {
  const { showSidebar } = useShowSidebar();
  return (
    <div className={!showSidebar ? 'Content' : 'Content ShowSidebar'}>
      {props.children}
    </div>
  );
};

export default Conteudo;
