import React, { useState, useEffect } from 'react';
import { IconButton, SwipeableDrawer, TextField, Typography as Text, useTheme } from '@mui/material';

import { Puller } from '../elements/puller';
import { PaperPlaneFilled } from '../../assets/icons';
import { resizeDrawerOnVK } from '../../utils/viewport';
import { Spinner } from '../elements/spinner';
import { MessageHeader, MessageInput } from './styles';

interface Props {
  id?: string;
  open: boolean;
  title: string;
  initialValue?: string;
  maxLength?: number;
  noTimeout?: boolean;
  onClose: () => void;
  onSubmit: (message: string) => void;
}

export const MessageDrawer = ({ id, open, initialValue, maxLength, noTimeout, title, onClose, onSubmit }: Props) => {
  const [message, setMessage] = useState('');
  const [warning, setWarning] = useState<string>();
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SENT'>('IDLE');

  const theme = useTheme();
  const { palette: colors } = theme;
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  let pendingUpdate = false;
  const handleViewport = () => {
    if (pendingUpdate) return;
    pendingUpdate = true;
    const root = document.querySelector('#root') as HTMLElement | undefined;
    const drawer = document.querySelector(`#${id ? id : 'drawer'}`) as HTMLElement | undefined;
    requestAnimationFrame(() => {
      pendingUpdate = false;
      root && drawer && resizeDrawerOnVK(root, drawer);
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maxLimit = maxLength !== undefined ? maxLength : 600;
    const warningLimit = maxLimit - 10;
    const text = event.target.value;
    if (text.length > warningLimit) {
      if (text.length >= maxLimit) {
        setWarning('Character limit reached!');
        if (text.length > warningLimit) {
          setMessage(text.slice(0, maxLimit));
          return;
        }
      } else {
        setWarning(`${maxLimit - text.length} characters remaining`);
      }
    } else {
      setWarning(undefined);
    }
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    if (noTimeout) {
      onSubmit(message);
      setStatus('SENT');
      return;
    }
    setStatus('SENDING');
    setTimeout(() => {
      onSubmit(message);
      setStatus('SENT');
    }, 500);
  };

  useEffect(() => {
    if (open) {
      window.visualViewport?.addEventListener('scroll', handleViewport);
      window.visualViewport?.addEventListener('resize', handleViewport);
    }
    return () => {
      window.visualViewport?.removeEventListener('resize', handleViewport);
      window.visualViewport?.removeEventListener('scroll', handleViewport);
    };
  }, []);

  useEffect(() => {
    if (open) {
      const input = document.querySelector('#message') as HTMLTextAreaElement | undefined;
      input?.focus();
    }

    if (status === 'SENT') {
      setStatus('IDLE');
      setMessage('');
      setWarning(undefined);
    }
  }, [open]);

  useEffect(() => {
    if (initialValue) {
      setMessage(initialValue);
    } else {
      setMessage('');
    }
  }, [initialValue]);

  return (
    <SwipeableDrawer
      id={id || 'drawer'}
      open={open}
      onOpen={() => {}}
      onClose={onClose}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      sx={{ zIndex: 1210 }}
    >
      <Puller />
      <MessageHeader>
        <Text variant={warning ? 'h6' : 'text'} sx={{ color: warning ? colors.red : colors.gray, flex: 1 }}>
          {status === 'IDLE' ? (warning ? warning : title) : status === 'SENDING' ? 'Please wait...' : title}
        </Text>
        <IconButton
          disabled={status === 'SENDING' || message.length === 0}
          sx={{ padding: '12px' }}
          onClick={handleSubmit}
        >
          <PaperPlaneFilled color={status === 'IDLE' && message.length !== 0 ? colors.purple : colors.gray} />
        </IconButton>
      </MessageHeader>
      <MessageInput faded={status !== 'IDLE'} theme={theme}>
        <TextField
          id="message"
          placeholder="Type here..."
          value={message}
          onChange={handleChange}
          sx={{ height: '100%' }}
          multiline={true}
          fullWidth
        />
      </MessageInput>
      {status === 'SENDING' && <Spinner size={64} />}
    </SwipeableDrawer>
  );
};
