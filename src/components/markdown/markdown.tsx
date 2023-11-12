import React, { lazy, memo, Suspense } from 'react';
// import ReactMarkdown from 'react-markdown';
import type { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';

import p from './elements/paragraph';
import code from './elements/code';
import a from './elements/anchor';
import img from './elements/image';
import headings from './elements/headings';

import { MarkdownWrapper } from './style';
import { Spinner } from '../elements/spinner';

const ReactMarkdown = lazy(() => import('react-markdown'));

export const Markdown = memo((props: ReactMarkdownOptions) => {
  const { h1, h2, h3, h4, h5, h6 } = headings;
  return (
    <Suspense fallback={<Spinner />}>
      <MarkdownWrapper>
        <ReactMarkdown components={{ h1, h2, h3, h4, h5, h6, p, code, a, img }}>{props.children}</ReactMarkdown>
      </MarkdownWrapper>
    </Suspense>
  );
});
