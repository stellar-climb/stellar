import { AuthProvider, queryClient, theme } from '@libs';
import { AppRouter } from '@routes';
import { ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
