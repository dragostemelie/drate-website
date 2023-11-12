import Linkify from 'react-linkify';
import { Typography, useTheme } from '@mui/material';
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types';

const Paragraph = ({ children, node, ...props }: ReactMarkdownProps) => {
  const { palette: colors } = useTheme();

  return (
    <Typography
      variant="text"
      sx={{
        color: colors.gray,
        paddingTop: '12px',
        '& code': {
          padding: '1px 4px',
          borderRadius: '2px',
          color: 'rgba(255,255,255,0.6)',
          background: colors.teal,

          fontSize: 16,
          fontWeight: 500,
          lineHeight: 1,
        },
      }}
      {...props}
    >
      <Linkify
        componentDecorator={(href, text, key) => (
          <a target="_blank" rel="noreferrer" href={href} key={key} style={{ color: colors.blue }}>
            {text}
          </a>
        )}
      >
        {children}
      </Linkify>
    </Typography>
  );
};

export default Paragraph;
