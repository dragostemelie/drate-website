import React, { Suspense, useEffect } from 'react';
import { Box, Stack, Typography as Text, useTheme } from '@mui/material';

import { SearchBox } from '../components/elements/search';
import { SearchList } from '../components/posts/search-list';
import { selectPosts } from '../store/selectors/data';
import { Spinner } from '../components/elements/spinner';

import { useAppDispatch, useAppSelector } from '../store';
import { selectUi } from '../store/selectors/ui';
import { setSearch } from '../store/reducers/ui';
import { Post } from '../models/post';

const Search = () => {
  const ui = useAppSelector(selectUi);
  const { posts } = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();
  const { palette: colors } = useTheme();

  const handleSearch = (value: string) => {
    dispatch(setSearch(value));
  };

  const handleFilter = (post: Post) => {
    const searchValue = ui.posts.search.trim().toLowerCase();
    let result = false;
    // check title
    result = post.title.toLowerCase().includes(searchValue);
    if (result) return true;
    // check topic
    result = post.topic.toLowerCase().includes(searchValue);
    if (result) return true;
    // check tag
    result = post.tag.toLowerCase().includes(searchValue);
    if (result) return true;
    // check excerpt
    result = post.excerpt.toLowerCase().includes(searchValue);
    if (result) return true;
    return false;
  };

  const handleScroll = () => {
    const input = document.querySelector('#search') as HTMLInputElement | undefined;
    input?.setAttribute('readonly', 'true');
  };

  useEffect(() => {
    document.title = 'Search';
    window.visualViewport?.addEventListener('scroll', handleScroll);
    return () => {
      window.visualViewport?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <Stack
        sx={{
          padding: '0 20px 20px',
          width: '100%',
          maxWidth: 800,
          margin: 'auto',
          height: '100%',
          color: colors.white,
        }}
      >
        <SearchBox value={ui.posts.search} onChange={handleSearch} />

        {ui.posts.search.trim() && posts.filter(handleFilter).length === 0 && (
          <Text variant="text" sx={{ padding: '24px 0 0 8px', color: colors.gray }}>
            Nothing found
          </Text>
        )}
        <SearchList posts={ui.posts.search.trim() ? posts.filter(handleFilter) : []} />
      </Stack>
    </Suspense>
  );
};

export default Search;
