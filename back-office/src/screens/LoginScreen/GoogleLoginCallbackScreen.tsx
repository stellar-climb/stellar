import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';

export function GoogleLoginCallbackScreen() {
  // 1. destructure props
  // 2. lib hooks
  const [searchParams] = useSearchParams();

  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  const code = searchParams.get('code');
  const errorParam = searchParams.get('error');

  // 7. effect hooks
  useEffect(() => {
    if (errorParam) {
      // OAuth 에러 처리 - 메시지만 보내고 팝업 닫기
      window.opener?.postMessage(
        {
          type: 'GOOGLE_AUTH_ERROR',
          error: errorParam,
        },
        window.location.origin
      );
      // 약간의 딜레이 후 닫기 (에러 메시지 표시 시간 확보)
      setTimeout(() => {
        window.close();
      }, 1000);
      return;
    }

    if (code) {
      // 백엔드 API 호출
      fetch(`${import.meta.env.VITE_CORE_API_URL}/admins/auth/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data?.accessToken) {
            window.opener?.postMessage(
              {
                type: 'GOOGLE_AUTH_SUCCESS',
                idToken: data.data.idToken || data.data.accessToken,
              },
              window.location.origin
            );
            window.close();
          } else {
            throw new Error('Failed to get token');
          }
        })
        .catch((err) => {
          console.error('Auth error:', err);
          window.opener?.postMessage(
            {
              type: 'GOOGLE_AUTH_ERROR',
              error: err.message,
            },
            window.location.origin
          );
          setTimeout(() => {
            window.close();
          }, 1000);
        });
    }
  }, [code, errorParam]);

  // 8. handlers
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
      }}
    >
      {errorParam ? (
        <>
          <Typography color="error">로그인 실패</Typography>
          <Typography variant="body2" color="text.secondary">
            {errorParam}
          </Typography>
        </>
      ) : (
        <>
          <CircularProgress />
          <Typography>로그인 처리 중...</Typography>
        </>
      )}
    </Box>
  );
}
