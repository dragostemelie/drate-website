import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Typography as Text, useTheme } from '@mui/material';
import { AppSelect } from '../elements/select';
import { TextInput } from '../elements/text-input';

import { Spinner } from '../elements/spinner';
import { Spacer } from '../elements/spacer';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectUi } from '../../store/selectors/ui';
import { generateImage } from '../../store/thunks/ui';
import { resetImageGenerator } from '../../store/reducers/ui';

const SIZES = ['Small', 'Medium', 'Large'];

export const ImageGenerator = () => {
  const { imageGenerator } = useAppSelector(selectUi);
  const dispatch = useAppDispatch();
  const { palette: colors } = useTheme();

  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState(imageGenerator?.size || 'Medium');
  const [status, setStatus] = useState<'IDLE' | 'LOADING'>('IDLE');

  const handleSubmit = async () => {
    dispatch(resetImageGenerator());
    setStatus('LOADING');
    await dispatch(generateImage({ prompt, size }));
    setStatus('IDLE');
  };

  return (
    <Stack>
      {imageGenerator?.url !== undefined ? (
        <Stack
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: size === 'Small' ? 256 : size === 'Medium' ? 512 : 1024,
            width: '100%',
            aspectRatio: '7/6',
            borderRadius: '4px',
            position: 'relative',
            background: colors.dark,
            overflow: 'hidden',
            transition: '0.3s ease',
            '& > div': {
              background: 'transparent',
            },
          }}
        >
          {status === 'LOADING' && <Spinner size={64} />}

          {imageGenerator?.url && (
            <Link to={`/image/${crypto.randomUUID()}`} state={imageGenerator.url}>
              <img
                src={imageGenerator.url}
                alt="Generated image"
                onLoad={() => setStatus('IDLE')}
                style={{
                  transition: '0.3s ease',
                  opacity: status === 'LOADING' ? 0.5 : 1,
                  width: size === 'Small' ? 256 : size === 'Medium' ? 512 : '100%',
                  height: size === 'Small' ? 256 : size === 'Medium' ? 512 : '100%',
                }}
              />
            </Link>
          )}

          {imageGenerator?.error && (
            <Text variant="label" sx={{ color: colors.red, textAlign: 'center', paddingInline: '16px' }}>
              {imageGenerator.error}
            </Text>
          )}
        </Stack>
      ) : (
        <Text variant="text" sx={{ color: colors.gray }}>
          Create your image from a description using OpenAI’s Image Generation API:
        </Text>
      )}
      <Spacer height={18} />
      <TextInput
        id={undefined}
        value={prompt}
        placeholder="Ex: cat riding a horse"
        onChange={(val) => setPrompt(val)}
        onSubmit={handleSubmit}
        readonly={status === 'LOADING'}
      />
      <Spacer height={24} />
      <Stack
        sx={{
          gap: '24px',
          '@media (min-width:560px)': {
            flexDirection: 'row',
            alignItems: 'flex-end',
            '& > div': {
              flex: 1,
            },
          },
        }}
      >
        <AppSelect label="Size" selected={size} values={SIZES} onChange={(val) => setSize(val)} />

        <Stack sx={{ width: 'fit-content' }}>
          <Button variant="big" onClick={handleSubmit} disabled={status === 'LOADING'}>
            Generate image
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
