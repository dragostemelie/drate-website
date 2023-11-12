import { useTheme } from '@mui/material';

const Anchor = ({ ...props }) => {
  const { palette: colors } = useTheme();

  return (
    <a href={props.href} style={{ color: colors.blue }} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
};

export default Anchor;
