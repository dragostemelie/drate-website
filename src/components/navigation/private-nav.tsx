import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useScrolling } from '../../hooks/useScrolling';

import { GearOutlined, UsersOutlined, CommentOutlined, ThreeLayers, Plus } from '../../assets/icons';
import { NavContainer, NavItem, Center, NewPost } from './styles';
import { useTheme } from '@mui/material';

export const PrivateNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const direction = useScrolling();
  const theme = useTheme();

  return (
    <NavContainer sx={{ position: direction === 'DOWN' ? 'relative' : 'sticky' }}>
      <Center>
        <NavItem
          active={location.pathname === '/author/board/readers' ? theme.palette.white : theme.palette.gray}
          onClick={() => navigate('/author/board/readers')}
          title="Home"
        >
          <UsersOutlined size={28} />
        </NavItem>
        <NavItem
          active={location.pathname === '/author/board/messages' ? theme.palette.white : theme.palette.gray}
          onClick={() => navigate('/author/board/messages')}
          title="Search"
          theme={theme}
        >
          <CommentOutlined size={28} />
        </NavItem>
        <NewPost>
          <Plus size={32} color="#FFFFFF" />
        </NewPost>
        <NavItem
          active={location.pathname === '/author/board/posts' ? theme.palette.white : theme.palette.gray}
          onClick={() => navigate('/author/board/posts')}
          title="Saved articles"
          theme={theme}
        >
          <ThreeLayers size={28} />
        </NavItem>
        <NavItem
          active={location.pathname === '/author/board/settings' ? theme.palette.white : theme.palette.gray}
          onClick={() => navigate('/author/board/settings')}
          title="My preferences"
          theme={theme}
        >
          <GearOutlined size={28} />
        </NavItem>
      </Center>
    </NavContainer>
  );
};
