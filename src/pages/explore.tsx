import React, { Suspense } from 'react';
import { Stack, Typography as Text, useTheme } from '@mui/material';

import { Chips } from '../components/elements/chips';
import { PostList } from '../components/posts/post-list';
import { SortBy } from '../components/elements/sort';
import { SortContextMenu } from '../components/menus/sort-menu';
import { Spacer } from '../components/elements/spacer';
import { Spinner } from '../components/elements/spinner';

import { useAppDispatch, useAppSelector } from '../store';
import { selectUi } from '../store/selectors/ui';
import { selectPosts } from '../store/selectors/data';
import { setFilter, setSort } from '../store/reducers/ui';
import { PublicNav } from '../components/navigation/public-nav';

const Explore = () => {
  const [sortMenuAnchor, setSortMenuAnchor] = React.useState<HTMLElement | null>(null);

  const ui = useAppSelector(selectUi);
  const { sort, filter } = ui.posts;
  const { posts, categories } = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();
  const { palette: colors } = useTheme();

  const handleFilter = (category: string) => {
    dispatch(setFilter(category));
  };

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

  document.title = 'Drate Tech Blog';

  return (
    <Suspense fallback={<Spinner />}>
      <Stack
        sx={{ padding: '20px', width: '100%', maxWidth: 800, margin: 'auto', minHeight: '100%', color: colors.white }}
      >
        <Spacer height={24} />
        <Text variant="h1">Explore</Text>
        <Spacer height={28} />
        <Chips labels={categories} selected={filter} onSelect={handleFilter} />
        <Spacer height={28} />
        <SortBy label={sort.toUpperCase()} onClick={handleOpenSortMenu}>
          <SortContextMenu
            anchorEl={sortMenuAnchor}
            open={Boolean(sortMenuAnchor)}
            onSelect={handleSort}
            onClose={handleCloseSortMenu}
          />
        </SortBy>
        <Spacer height={24} />
        <PostList posts={posts} />
      </Stack>
      <PublicNav />
    </Suspense>
  );
};

export default Explore;
