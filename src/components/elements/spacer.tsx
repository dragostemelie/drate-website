import { Box } from '@mui/material';

interface Props {
  height: number;
}
export const Spacer = ({ height }: Props) => <Box sx={{ height }} />;
