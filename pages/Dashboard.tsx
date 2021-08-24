import { Height } from '@material-ui/icons';
import React from 'react';
import LayoutDash from '../src/components/Layout';
// import { Container } from './styles';

function Dashboard() {
  return (
    <LayoutDash>
      <div style={{ minHeight: '90vh' }}>
        <p>dashboard aqui</p>
      </div>
    </LayoutDash>
  );
}

export default Dashboard;
