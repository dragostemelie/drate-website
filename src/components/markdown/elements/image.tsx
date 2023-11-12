import { Link } from 'react-router-dom';

const Image = ({ ...props }) => {
  const getStyle: () => React.CSSProperties = () => {
    try {
      const regex = /....$|ddd/;
      const found = props.alt.match(regex)[0];
      if (found)
        return {
          maxWidth: found.slice(1) + 'px',
        };
    } catch {
      return { maxWidth: '100%' };
    }
    const regex = /....$|ddd/;
    const found = props.alt.match(regex)[0];
    if (found) return found.slice(1);
    return { maxWidth: '100%' };
  };

  return (
    <Link to={`/image/${crypto.randomUUID()}`} state={props.src}>
      <img src={props.src} alt={props.alt} style={getStyle()} />
    </Link>
  );
};

export default Image;
