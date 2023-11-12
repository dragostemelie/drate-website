import { RootState } from '..';

export const selectUi = (state: RootState) => {
  const ui = state.ui;
  return ui;
};
