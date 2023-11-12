import React from 'react';

import { IconButton, Stack, TextField, useTheme } from '@mui/material';
import { Close } from '../../assets/icons';

interface Props {
  id?: string;
  placeholder?: string;
  type?: string;
  value: string;
  readonly?: boolean;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
}

export const TextInput = ({ id, value, readonly, placeholder, type, onChange, onSubmit }: Props) => {
  const { palette: colors } = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleClick = () => {
    if (id) {
      const input = document.querySelector(`#${id}`) as HTMLInputElement | undefined;
      input?.removeAttribute('readonly');
    }
  };

  const handleKeypress = (event: any) => {
    if (onSubmit && event.key === 'Enter') {
      onSubmit(event.target.value as string);
    }
  };

  const handleClear = () => {
    onChange('');
    if (id) {
      const input = document.querySelector(`#${id}`) as HTMLInputElement | undefined;
      input?.focus();
    }
  };

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        background: colors.black,
        border: `1px solid ${colors.teal}`,
        position: 'sticky',
        left: 0,
        right: 0,
        top: 0,
        borderRadius: '24px',
        padding: '0 4px',
        '&:focus-within button.MuiButtonBase-root': {
          display: 'inline-flex',
        },
      }}
    >
      <TextField
        id={id}
        placeholder={placeholder || 'Type here...'}
        value={value}
        type={type ? type : 'text'}
        onChange={handleChange}
        onClick={handleClick}
        onKeyDown={handleKeypress}
        InputProps={{
          readOnly: readonly,
        }}
        fullWidth
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
      />
      <IconButton
        tabIndex={-1}
        sx={{ display: 'none', padding: '10px', transition: 'opacity 0.3s ease', opacity: value ? 1 : 0 }}
        onClick={handleClear}
      >
        <Close color={colors.gray} />
      </IconButton>
    </Stack>
  );
};
