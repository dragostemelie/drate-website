import React, { Suspense, useEffect } from 'react';
import { Stack } from '@mui/material';
import { Spinner } from '../components/elements/spinner';

import { useLocation, useNavigate } from 'react-router-dom';

const ViewImage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!location.state) navigate('/', { replace: true });

  useEffect(() => {
    if (!location.state) navigate('/', { replace: true });
    document.title = 'View image';
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <Stack sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <img src={location.state} style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </Stack>
    </Suspense>
  );
};

export default ViewImage;
