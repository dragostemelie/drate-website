import '@fontsource/inter';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store';
import { ThemeProvider } from './themes/theme-provider';

function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
