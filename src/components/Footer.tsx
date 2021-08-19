import React from 'react';
import {
  HeaderMockUp,
  NavHeaderMockUp,
  NavContentMockUp,
  ContentMockUp,
  FooterMockUp,
} from '@mui-treasury/mockup/layout';
import { styled } from '@material-ui/core';

import { getInsetFooter } from '@mui-treasury/layout';
// import { Container } from './styles';
const InsetFooter = getInsetFooter(styled);
const Footer: React.FC = () => {
  return (
    <InsetFooter>
      <FooterMockUp />
    </InsetFooter>
  );
};

export default Footer;
