import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useScrolling } from '../../hooks/useScrolling';

import { IconButton, Stack, Typography as Text, useTheme } from '@mui/material';
import { CarretLeft, ThreeDots } from '../../assets/icons';

interface Props {
  title?: string;
  onOpenMenu?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Header = ({ title, onOpenMenu }: Props) => {
  const direction = useScrolling();
  const navigate = useNavigate();
  const { palette: colors } = useTheme();

  const handleGoBack = () => {
    if (history.state.idx !== 0) navigate(-1);
    else navigate('/');
  };

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        gap: '16px',
        alignItems: 'center',
        position: direction === 'DOWN' ? 'relative' : 'sticky',
        top: 0,
        left: 0,
        right: 0,
        paddingBlock: '20px 10px',
        color: colors.white,
        borderBottom: `1px solid ${direction === 'UP' ? colors.dark : colors.black}`,
        background: colors.black,
        zIndex: 10,
      }}
    >
      <IconButton sx={{ border: `1px solid ${colors.teal}`, color: colors.white }} onClick={handleGoBack}>
        <CarretLeft />
      </IconButton>
      <Text variant="h3" sx={{ textAlign: 'center', flex: 1, fontWeight: '400' }}>
        {title}
      </Text>
      <Stack sx={{ paddingBottom: '4px', visibility: onOpenMenu ? 'visible' : 'hidden' }} onClick={onOpenMenu}>
        <IconButton sx={{ border: `1px solid ${colors.teal}`, color: colors.white }}>
          <ThreeDots />
        </IconButton>
      </Stack>
    </Stack>
  );
};
