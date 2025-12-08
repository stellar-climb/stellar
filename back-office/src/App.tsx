import { AuthProvider, queryClient, theme } from '@libs';
import { AppRouter } from '@routes';
import { ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
            <AppRouter />
          </SnackbarProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
