import React from 'react';

import Header from './Header';
import Sidebar from './Sidebar';
import Conteudo from './Content';
import Footer from './Footer';

import Layout, { Root } from '@mui-treasury/layout';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
const scheme = Layout();
// const Header = getHeader(styled);

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

scheme.configureEdgeSidebar(builder => {
  builder
    .create('primarySidebar', { anchor: 'left' })
    .registerTemporaryConfig('xs', {
      width: 'auto', // 'auto' is only valid for temporary variant
    });
});

scheme.configureInsetSidebar(builder => {
  builder
    .create('secondarySidebar', { anchor: 'right' })
    .registerFixedConfig('md', {
      width: 256,
    });
});
class AdminLayoutHoc extends React.Component {
  render() {
    return (
      <Root scheme={scheme}>
        {({ state: { sidebar } }) => (
          <>
            <CssBaseline />

            {/* <div className='wrapper'> */}
            <Header />
            <Sidebar />
            <Conteudo>{this.props.children}</Conteudo>
            <Footer />
            {/* /div> */}
          </>
        )}
      </Root>
    );
  }
}

// AdminLayoutHoc.propTypes = {
//   contentTitle: PropTypes.string,
//   contentTitleButton: PropTypes.element,
//   nomeUsuario: PropTypes.string,
//   avatarUsuario: PropTypes.string,
//   abrirOS: PropTypes.bool,
// };
export default AdminLayoutHoc;
