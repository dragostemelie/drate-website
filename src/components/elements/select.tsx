import React from 'react';

import { MenuItem, Select, SelectChangeEvent, Stack, Typography as Text, Theme, useTheme } from '@mui/material';
import { Caret } from '../../assets/icons';

interface Props {
  id?: string;
  label?: string;
  selected: string;
  values: string[];
  onChange: (selected: string) => void;
}

export const AppSelect = ({ id, selected, values, label, onChange }: Props) => {
  const theme = useTheme();
  const colors = theme.palette;

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <Stack sx={{ gap: '8px' }}>
      {label && (
        <Text variant="label" sx={{ color: colors.white, paddingLeft: '12px' }}>
          {label}
        </Text>
      )}
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
          height: '47px',
          padding: '0 4px',
          '& .MuiSelect-select': {
            background: 'transparent !important',
          },
        }}
      >
        <Select
          id={id}
          value={selected}
          label={label}
          onChange={handleChange}
          IconComponent={({ className }) => (
            <Caret
              open={className.toString().includes('iconOpen')}
              style={{
                position: 'absolute',
                right: '14px',
                top: 'calc(50% - 12px)',
                zIndex: -1,
                color: theme.palette.gray,
              }}
            />
          )}
        >
          {values.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </Stack>
  );
};
