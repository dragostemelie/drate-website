import React from 'react';
import { Typography as Text, useTheme } from '@mui/material';

import { PaperPlaneFilled } from '../../assets/icons';
import { AuthorNavContainer, Center } from './styles';
import { useScrolling } from '../../hooks/useScrolling';

interface Props {
  onClick: () => void;
}

export const AuthorNav = ({ onClick }: Props) => {
  const direction = useScrolling();
  const { palette: colors } = useTheme();

  return (
    <AuthorNavContainer sx={{ position: direction === 'DOWN' ? 'relative' : 'sticky', color: colors.gray }}>
      <Center sx={{ padding: '16px 20px 20px' }} onClick={onClick}>
        <Text variant="text" flex={1}>
          Leave a message
        </Text>
        <PaperPlaneFilled />
      </Center>
    </AuthorNavContainer>
  );
};
