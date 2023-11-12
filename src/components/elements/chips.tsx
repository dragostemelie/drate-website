import { Chip, Stack } from '@mui/material';

interface Props {
  labels: string[];
  selected: string;
  onSelect: (label: string) => void;
}

export const Chips = ({ labels, selected, onSelect }: Props) => (
  <Stack sx={{ flexDirection: 'row', gap: '12px', width: '100%', overflowX: 'auto', paddingBlock: '12px' }}>
    {labels.map((label, index) => (
      <Chip
        key={index}
        label={label}
        variant={label === selected ? 'filled' : 'outlined'}
        onClick={() => onSelect(label)}
      />
    ))}
  </Stack>
);
