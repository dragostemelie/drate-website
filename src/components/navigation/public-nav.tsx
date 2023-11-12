import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useScrolling } from '../../hooks/useScrolling';

import {
  BookmarkOutlined,
  GearOutlined,
  HomeFilled,
  HomeOutlined,
  SearchOutlined,
  SearchFilled,
  BookmarkFilled,
  GearFilled,
} from '../../assets/icons';
import { NavContainer, NavItem, Center } from './styles';
import { useTheme } from '@mui/material';

export const PublicNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const direction = useScrolling();
  const theme = useTheme();

  return (
    <NavContainer sx={{ position: direction === 'DOWN' ? 'relative' : 'sticky' }}>
      <Center>
        <NavItem
          active={location.pathname === '/' ? theme.palette.white : theme.palette.gray}
          onClick={() => navigate('/')}
          title="Home"
        >
          {location.pathname === '/' ? <HomeFilled size={28} /> : <HomeOutlined size={28} />}
        </NavItem>
        <NavItem
          active={location.pathname === '/search' ? theme.palette.white : theme.palette.gray}
          onClick={() => navigate('/search')}
          title="Search"
          theme={theme}
        >
          {location.pathname === '/search' ? <SearchFilled size={28} /> : <SearchOutlined size={28} />}
        </NavItem>
        <NavItem
          active={location.pathname === '/saved' ? theme.palette.white : theme.palette.gray}
          onClick={() => navigate('/saved')}
          title="Saved articles"
          theme={theme}
        >
          {location.pathname === '/saved' ? <BookmarkFilled size={28} /> : <BookmarkOutlined size={28} />}
        </NavItem>
        <NavItem
          active={location.pathname === '/settings' ? theme.palette.white : theme.palette.gray}
          onClick={() => navigate('/settings')}
          title="My preferences"
          theme={theme}
        >
          {location.pathname === '/settings' ? <GearFilled size={28} /> : <GearOutlined size={28} />}
        </NavItem>
      </Center>
    </NavContainer>
  );
};
