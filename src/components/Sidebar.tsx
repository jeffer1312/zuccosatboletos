import React from 'react';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Link from 'next/link';
import { Navigation } from 'react-minimal-side-navigation/lib';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
// import styled from 'styled-components';
// import { Container } from './styles';
import { useRouter } from 'next/router';
import Icon from 'awesome-react-icons';
import { useHandleShowSidebar, useShowSidebar } from '../context/context';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Sidebar() {
  const router = useRouter();
  const { showSidebar } = useShowSidebar();
  const { HandleShowSidebar } = useHandleShowSidebar();
  const classes = useStyles();
  const theme = useTheme();
  function handleSideBar() {
    HandleShowSidebar(value => !value);
  }

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />

        <Drawer
          variant='permanent'
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: showSidebar,
            [classes.drawerClose]: !showSidebar,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: showSidebar,
              [classes.drawerClose]: !showSidebar,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleSideBar}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          {showSidebar ? (
            <div className='flex space-2 items-center border-b-2 pb-4'>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-14 w-14 text-indigo-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>

              <div className='ml-3'>
                <h1 className='text-3xl font-bold text-indigo-600'>ZuccoSat</h1>
                <p className='text-center text-sm text-indigo-600 mt-1 font-serif'>
                  BOLETOS
                </p>
              </div>
            </div>
          ) : (
            ''
          )}

          <Divider />
          {showSidebar ? (
            <Navigation
              // you can use your own router's api to get pathname
              activeItemId='/management/members'
              onSelect={({ itemId }) => {
                if (itemId !== '' && itemId != '#') {
                  router.push('/' + itemId);
                }
              }}
              items={[
                {
                  title: 'Zuccosat',
                  itemId: '/',

                  // you can use your own custom Icon component as well
                  // icon is optional
                  elemBefore: () => <Icon name='inbox' />,
                },
                {
                  title: 'Boletos',
                  itemId: '#',
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
                      itemId: 'boletos/ClientesCadastrados', ///boletos/clintes',
                      elemBefore: () => <Icon name='coffee' />,
                    },
                  ],
                },
                {
                  title: 'Sair',
                  itemId: '5',
                  elemBefore: () => (
                    <div>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6 text-gray-400 hover:text-indigo-600 transition duration-200'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                        />
                      </svg>
                    </div>
                  ),
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
          ) : (
            <List>
              {['Criar Boletos', 'Clientes cadastrados'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {text === 'Criar Boletos' ? (
                      <Link href=''>
                        <a href='/boletos/CriarBoletos'>
                          <Icon name='calendar' />
                        </a>
                      </Link>
                    ) : (
                      <Link href=''>
                        <a href='/boletos/ClientesCadastrados'>
                          <Icon name='coffee' />
                        </a>
                      </Link>
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          )}
        </Drawer>
      </div>
    </>
  );
}
