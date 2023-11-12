import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { Statistic } from '../../models/statistics';
import { Caret } from '../../assets/icons';
import { format } from 'date-fns';

interface Props {
  data: Statistic[];
}

export default function StatisticsTable({ data }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>User</TableCell>
            <TableCell align="center">Last seen</TableCell>
            <TableCell align="center">Device</TableCell>
            <TableCell align="center">Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.guid} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const Row = ({ row }: { row: Statistic }) => {
  const [open, setOpen] = React.useState(false);

  const { palette: colors } = useTheme();

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            <Caret open={open} style={{ color: colors.gray }} />
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.displayName}
        </TableCell>
        <TableCell align="center">{format(new Date(row.lastSeen), 'dd MMM yyyy')}</TableCell>
        <TableCell align="center">{row.os || ' - '}</TableCell>
        <TableCell align="center">{row.country || ' - '}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" sx={{ marginBlock: '8px' }}>
              <TableBody>
                {row.history.map((historyRow) => (
                  <TableRow key={historyRow.createdAt}>
                    <TableCell component="td" scope="row">
                      <Stack sx={{ gap: '8px' }}>
                        <Typography variant="description">
                          {historyRow.url?.replace('http://localhost:3000/', '') || ' - '}
                        </Typography>
                        <Stack sx={{ flexDirection: 'row', gap: '8px' }}>
                          <Typography variant="small">{historyRow.browser || ' - '}</Typography>
                          <Typography variant="small">
                            {format(new Date(historyRow.createdAt), 'dd MMM yyyy')}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
