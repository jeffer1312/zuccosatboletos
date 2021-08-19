import React from 'react';
import Layout, {
  getDrawerSidebar,
  getSidebarTrigger,
  getSidebarContent,
  getCollapseBtn,
  getContent,
  getInsetContainer,
  getInsetSidebar,
} from '@mui-treasury/layout';

import { Navigation } from 'react-minimal-side-navigation/lib';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import styled from 'styled-components';
// import { Container } from './styles';
import { useRouter } from 'next/router';
import Icon from 'awesome-react-icons';

export default function Sidebar() {
  const router = useRouter();
  const DrawerSidebar = getDrawerSidebar(styled);

  const SidebarContent = getSidebarContent(styled);
  const CollapseBtn = getCollapseBtn(styled);

  return (
    <DrawerSidebar sidebarId='primarySidebar'>
      <SidebarContent>
        {/* <NavHeaderMockUp collapsed={sidebar.primarySidebar.collapsed} /> */}

        <Navigation
          // you can use your own router's api to get pathname
          activeItemId='/management/members'
          onSelect={({ itemId }) => {
            if (itemId !== '') {
              router.push('/' + itemId);
            }
          }}
          items={[
            {
              title: 'Zuccosat',
              itemId: '/Dashboard',

              // you can use your own custom Icon component as well
              // icon is optional
              elemBefore: () => <Icon name='inbox' />,
            },
            {
              title: 'Boletos',
              itemId: '',
              elemBefore: () => <Icon name='book' />,
              subNav: [
                {
                  title: 'Criar Boleto',
                  itemId: 'boletos/CriarBoletos',
                  // Requires v1.9.1+ (https://github.com/abhijithvijayan/react-minimal-side-navigation/issues/13)
                  elemBefore: () => <Icon name='calendar' />,
                },
                {
                  title: 'Clientes cadastrados',
                  itemId: '', ///boletos/clintes',
                  elemBefore: () => <Icon name='coffee' />,
                },
              ],
            },
            // {
            //   title: 'Another Item',
            //   itemId: '/another',
            //   subNav: [
            //     {
            //       title: 'Teams',
            //       itemId: '/management/teams',
            //     },
            //   ],
            // },
          ]}
        />
        {/* <NavHeaderMockUp collapsed={sidebar.primarySidebar.collapsed} />
    <NavContentMockUp></NavContentMockUp> */}
      </SidebarContent>
      {/* <CollapseBtn /> */}
    </DrawerSidebar>
  );
}
