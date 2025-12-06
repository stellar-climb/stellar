import { Button, Box, Typography } from '@mui/material';
import { useSignInGoogle } from '@libs';
import { useEffect } from 'react';

export function LoginScreen() {
  // 1. destructure props
  // 2. lib hooks
  const [signInGoogle, { loading }] = useSignInGoogle();

  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // 보안: 같은 origin에서 온 메시지만 처리
      if (event.origin !== window.location.origin) return;

      if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
        const { accessToken } = event.data;
        if (accessToken) {
          signInGoogle(accessToken);
        }
      } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
        console.error('Google authentication error:', event.data.error);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [signInGoogle]);

  // 8. handlers
  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.innerWidth / 2 + window.screenX - width / 2;
    const top = window.innerHeight / 2 + window.screenY - height / 2;

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URL,
      response_type: 'code',
      scope: 'email profile',
      access_type: 'offline',
      prompt: 'consent',
    })}`;

    const popup = window.open(
      authUrl,
      'google-login',
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
    );

    if (!popup) {
      alert('팝업이 차단되었습니다. 팝업 차단을 해제해주세요.');
      return;
    }

    // 팝업이 닫혔는지 주기적으로 체크
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
      }
    }, 1000);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 3,
      }}
    >
      <Typography variant="h4" component="h1">
        Stellar Back Office
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Google 계정으로 로그인하세요
      </Typography>
      <Button variant="contained" size="large" onClick={handleGoogleLogin} disabled={loading} sx={{ minWidth: 300 }}>
        {loading ? '로그인 중...' : 'Google로 로그인'}
      </Button>
    </Box>
  );
}
