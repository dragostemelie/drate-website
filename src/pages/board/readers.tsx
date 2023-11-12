import React, { Suspense, useState } from 'react';
import { Stack, Typography as Text, useTheme } from '@mui/material';

import { Spacer } from '../../components/elements/spacer';
import { Spinner } from '../../components/elements/spinner';
import { PrivateNav } from '../../components/navigation/private-nav';
import { ReaderList } from '../../components/posts/reader-list';

import { useAppDispatch, useAppSelector } from '../../store';
import { selectAuthor, selectReaders } from '../../store/selectors/author';
import { SortBy } from '../../components/elements/sort';
import { setSort } from '../../store/reducers/author';
import { ReadersSortContextMenu } from '../../components/menus/readers-sort-menu';

const Readers = () => {
  const [sortMenuAnchor, setSortMenuAnchor] = useState<HTMLElement | null>(null);

  const { readers, sort } = useAppSelector(selectReaders);
  const dispatch = useAppDispatch();
  const { palette: colors } = useTheme();

  document.title = 'My Readers';

  const handleSort = (option: string) => {
    dispatch(setSort(option));
    setSortMenuAnchor(null);
  };

  const handleOpenSortMenu = (event: React.MouseEvent<HTMLElement>) => {
    setSortMenuAnchor(event.currentTarget);
  };

  const handleCloseSortMenu = () => {
    setSortMenuAnchor(null);
  };

  return (
    <Suspense fallback={<Spinner />}>
      <Stack
        sx={{ padding: '20px', width: '100%', maxWidth: 600, margin: 'auto', minHeight: '100%', color: colors.white }}
      >
        <Spacer height={24} />
        <Text variant="h1">Readers</Text>
        <Spacer height={32} />
        <SortBy label={sort.toUpperCase()} onClick={handleOpenSortMenu}>
          <ReadersSortContextMenu
            anchorEl={sortMenuAnchor}
            open={Boolean(sortMenuAnchor)}
            selected={sort}
            onSelect={handleSort}
            onClose={handleCloseSortMenu}
          />
        </SortBy>
        <Spacer height={20} />
        {readers.length === 0 && (
          <Text variant="text" sx={{ paddingLeft: '8px', color: colors.gray }}>
            You have no readers.
          </Text>
        )}
        <ReaderList readers={readers} />
      </Stack>
      <PrivateNav />
    </Suspense>
  );
};

export default Readers;
