import React from 'react';
import Layout, { getHeader, getSidebarTrigger } from '@mui-treasury/layout';
import Toolbar from '@material-ui/core/Toolbar';

import styled from 'styled-components';
const SidebarTrigger = getSidebarTrigger(styled);
// import { Container } from './styles';

const scheme = Layout();
scheme.configureHeader(builder => {
  builder
    .create('appHeader')
    .registerConfig('xs', {
      position: 'sticky',
      initialHeight: 56,
    })
    .registerConfig('md', {
      position: 'relative', // won't stick to top when scroll down
      initialHeight: 64,
    });
});
const Header = getHeader(styled);
function components() {
  return (
    <Header>
      <Toolbar>
        <SidebarTrigger sidebarId='primarySidebar' />
      </Toolbar>
    </Header>
  );
}

export default components;
