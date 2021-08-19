import React from 'react';
import { getContent, getInsetContainer } from '@mui-treasury/layout';
import styled from 'styled-components';
const Content = getContent(styled);
const InsetContainer = getInsetContainer(styled);
// import { Container } from './styles';

const Conteudo = props => {
  return <div style={{ minWidth: '97vh' }}>{props.children}</div>;
};

export default Conteudo;
