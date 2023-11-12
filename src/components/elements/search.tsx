import React from 'react';
import { IconButton, Stack, TextField, useTheme } from '@mui/material';
import { ArrowBack, Close } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBox = ({ value, onChange }: Props) => {
  const { palette: colors } = useTheme();
  const navigate = useNavigate();

  const handleGoBack = () => {
    onChange('');
    if (history.state.idx !== 0) navigate(-1);
    else navigate('/');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleClick = () => {
    const input = document.querySelector('#search') as HTMLInputElement | undefined;
    input?.removeAttribute('readonly');
  };

  const handleClear = () => {
    onChange('');
    const input = document.querySelector('#search') as HTMLInputElement | undefined;
    input?.focus();
  };

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',

        background: colors.black,
        borderBottom: `1px solid ${colors.teal}`,
        paddingTop: '20px',
        position: 'sticky',
        left: 0,
        right: 0,
        top: 0,
      }}
    >
      <IconButton sx={{ padding: '10px', color: colors.gray }} onClick={handleGoBack}>
        <ArrowBack />
      </IconButton>
      <TextField
        id="search"
        placeholder="Search..."
        value={value}
        onChange={handleChange}
        onClick={handleClick}
        fullWidth
        autoFocus
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
      />
      <IconButton
        sx={{ padding: '10px', transition: 'opacity 0.3s ease', opacity: value ? 1 : 0 }}
        onClick={handleClear}
      >
        <Close color={colors.gray} />
      </IconButton>
    </Stack>
  );
};
