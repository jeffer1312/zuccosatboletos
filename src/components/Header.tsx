import React from 'react';

import Toolbar from '@material-ui/core/Toolbar';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHandleShowSidebar, useShowSidebar } from '../context/context';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';

import clsx from 'clsx';

// import { Container } from './styles';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#f5f5f5',
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
}));

function Sidebar() {
  const { HandleShowSidebar } = useHandleShowSidebar();
  const { showSidebar } = useShowSidebar();
  const classes = useStyles();
  function handleSideBar() {
    HandleShowSidebar(value => !value);
  }
  return (
    <>
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: showSidebar,
        })}
      >
        <Toolbar>
          <IconButton
            color='default'
            aria-label='open drawer'
            onClick={HandleShowSidebar}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: showSidebar,
            })}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* <div
        className={
          showSidebar
            ? 'showingSidebar Header flex-1  flex flex-col'
            : 'Header flex-1  flex flex-col'
        }
      >
        <nav className='px-4 flex justify-between bg-white h-16 border-b-2'>
          {/* top bar left 
          <ul className='flex items-center'>
            {/* add button 
            <li className='h-6 w-6'>
              <div className='menu'>
                <IconButton
                  color='inherit'
                  aria-label='open drawer'
                  onClick={handleSideBar}
                  edge='start'
                  className={clsx(classes.menuButton, {
                    [classes.hide]: showSidebar,
                  })}
                >
                  <MenuIcon />
                </IconButton>
                <GiHamburgerMenu fontSize={25} onClick={handleSideBar} />
              </div>
              {/* <SidebarTrigger sidebarId='primarySidebar' /> 
            </li>
          </ul>
          <ul className='flex items-center'>
            {/* add button 
            <li>
              <h1 className='pl-8 lg:pl-0 text-gray-700'>Svelte</h1>
            </li>
          </ul>
          {/* to bar right  
          <ul className='flex items-center'>
            <li className='pr-6'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={24}
                height={24}
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                className='feather feather-bell'
              >
                <path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' />
                <path d='M13.73 21a2 2 0 0 1-3.46 0' />
              </svg>
            </li>
            <li className='h-10 w-10'>
              <img
                className='h-full w-full rounded-full mx-auto'
                src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                alt='profile woman'
              />
            </li>
          </ul>
        </nav>
      </div>

<Header>
        <Toolbar>
          <SidebarTrigger sidebarId='primarySidebar' />
        </Toolbar>
      </Header> */}
    </>
  );
}

export default Sidebar;
