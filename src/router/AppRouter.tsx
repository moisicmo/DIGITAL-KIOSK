
import { Navigate, Route, Routes } from 'react-router-dom';

/* Rutas */
import { AuthView } from '@/views/auth/Auth';
import { useEffect } from 'react';
import { useAuthStore } from '@/hooks/useAuthStore';
import { LoanView } from '@/views/loans/LoanView';
import { useCredentialStore } from '@/hooks';

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();
  const { userIdentify } = useCredentialStore();
  useEffect(() => {
    checkAuthToken();
  }, []);


  return (
    (status === 'not-authenticated' || !userIdentify) ?
      <AuthView /> :
      <Routes>
        <Route path="/" element={<LoanView />} />
        <Route path="/*" element={<Navigate to={"/"} />} />
      </Routes>
  )
}
