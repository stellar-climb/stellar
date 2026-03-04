import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { type AdminModel } from '@models';
import { httpClient } from '../http-client';
import { CircularProgress } from '@mui/material';

const authClient = httpClient;

const UserContext = createContext<{
  user: AdminModel | undefined;
  setUser: (user?: AdminModel) => void;
}>({
  user: undefined,
  setUser: () => {},
});

async function loadToken(query: () => Promise<{ accessToken: string }>) {
  const { accessToken } = await query();

  if (accessToken) {
    httpClient.setAuthorization(`Bearer ${accessToken}`);
    localStorage.setItem('token', accessToken);
  }

  return !!accessToken;
}

function unloadToken() {
  localStorage.removeItem('token');
  httpClient.removeAuthorization();
}

async function getSelf() {
  return authClient.get<AdminModel>('/self');
}

export function AuthProvider({ user: initUser, children }: { user?: AdminModel; children: ReactNode }) {
  // props destructure
  // lib hooks
  // state hooks
  const [initialized, setInitialized] = useState(!!initUser);
  const [user, setUser] = useState<AdminModel | undefined>(initUser);
  const userContext = useMemo(() => ({ user, setUser }), [user]);

  useEffect(() => {
    if (!initialized) {
      loadToken(() =>
        Promise.resolve({
          accessToken: localStorage.getItem('token') || '',
        })
      )
        .then(async (isToken) => {
          if (isToken) {
            setUser(await getSelf());
          }
        })
        .catch((err) => {
          console.error(err);
          unloadToken();
        })
        .finally(() => setInitialized(true));
    }
  }, [initialized]);

  if (!initialized) {
    return <CircularProgress />;
  }

  return <UserContext.Provider value={userContext}>{children}</UserContext.Provider>;
}

export const useSignInGoogle: () => [(accessToken: string) => void, { loading: boolean }] = () => {
  const context = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  return [
    useCallback(
      (accessToken: string) => {
        setLoading(true);
        loadToken(() => Promise.resolve({ accessToken }))
          .then(async () => context.setUser(await getSelf()))
          .catch((err) => {
            console.error(err);
            unloadToken();
          })
          .finally(() => setLoading(false));
      },
      [context]
    ),
    { loading },
  ];
};

export function useUser() {
  const context = useContext(UserContext);
  const user = context.user;

  return [user!];
}

export function useSignOut() {
  const context = useContext(UserContext);

  return useCallback(() => {
    unloadToken();
    context.setUser(undefined);
  }, [context]);
}
