import LoadingFallback from '@/components/loading-fallback';
import { authApi } from '@/lib/axios';
import type { User } from '@/lib/types/user';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { createContext, useContext, useState } from 'react';

type AuthProviderProps = {
  user: User | null;
  roles?: string[];
};

const AuthContext = createContext<AuthProviderProps>({
  user: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [roles, setRoles] = useState<string[]>([]);
  // const { data: userData, isLoading } = useQuery({
  //   queryKey: ["user"],
  //   queryFn: () => getUser(),
  //   enabled: true,
  // });

  // async function getUser() {
  //   const res = await authApi.get("/auth/profile");
  //   console.log("res.data", res.data);
  //   return res.data?.data;
  // }

  // if (isLoading) {
  //   return <LoadingFallback />;
  // }

  // if (!userData) {
  //   navigate({ to: "/auth/login", search: { redirect: pathname } });
  //   return <LoadingFallback />;
  // }
  return <AuthContext.Provider value={{ user: null, roles }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
