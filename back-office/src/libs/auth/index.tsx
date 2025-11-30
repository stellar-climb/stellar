import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { type AdminModel } from '@models';
import { httpClient } from '../http-client';
import { CircularProgress } from '@mui/material';

const authClient = httpClient;

const UserContext = createContext<{
  getUser: () => AdminModel | undefined;
  setUser: (user?: AdminModel) => void;
}>({
  getUser() {
    return undefined;
  },
  setUser() {},
});

async function loadToken(query: () => Promise<{ accessToken: string }>) {
  const { accessToken } = await query();

  if (accessToken) {
    httpClient.setAuthorization(accessToken);
    localStorage.setItem('token', accessToken);
  }

  return !!accessToken;
}

async function unloadToken() {
  localStorage.removeItem('token');
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

  const userContext = useMemo(
    () => ({
      getUser() {
        return user;
      },
      setUser(user?: AdminModel) {
        setUser(user);
      },
    }),
    [user]
  );

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
        .catch((err) => console.log(err))
        .finally(() => setInitialized(true));
    }
  }, [initialized]);

  if (!initialized) {
    return <CircularProgress />;
  }

  return <UserContext.Provider value={userContext}>{children}</UserContext.Provider>;
}

export const useSignInGoogle: () => [(idToken: string) => void, { loading: boolean }] = () => {
  const context = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  return [
    useCallback(
      (idToken: string) => {
        setLoading(true);
        loadToken(() => authClient.post('/auth/token', { googleToken: idToken }))
          .then(async () => context.setUser(await getSelf()))
          .catch((err) => console.log(err))
          .finally(() => setLoading(false));
      },
      [context]
    ),
    { loading },
  ];
};

export function useUser() {
  const context = useContext(UserContext);
  const user = context.getUser();

  return [user!];
}

export function useSignOut() {
  const context = useContext(UserContext);

  return useCallback(() => {
    unloadToken().then(() => context.setUser());
  }, [context]);
}
