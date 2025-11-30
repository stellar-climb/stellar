import { AuthProvider, theme } from '@libs';
import { AppRouter } from '@routes';
import { ThemeProvider } from '@mui/material';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
