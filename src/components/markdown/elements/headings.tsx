// @ts-nocheck
import { Typography } from '@mui/material';

const Headings = {
  h1: ({ node, ...props }) => <Typography variant="h2" sx={{ paddingTop: '24px' }} {...props} />,
  h2: ({ node, ...props }) => <Typography variant="h2" sx={{ paddingTop: '24px' }} {...props} />,
  h3: ({ node, ...props }) => <Typography variant="h3" sx={{ paddingTop: '24px' }} {...props} />,
  h4: ({ node, ...props }) => <Typography variant="h4" sx={{ paddingTop: '24px' }} {...props} />,
  h5: ({ node, ...props }) => <Typography variant="h5" sx={{ paddingTop: '24px' }} {...props} />,
  h6: ({ node, ...props }) => <Typography variant="h6" sx={{ paddingTop: '24px' }} {...props} />,
};

export default Headings;
