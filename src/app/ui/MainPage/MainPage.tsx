import { useGetMeQuery } from '@/features/auth/api/authApi';
import { meStubResponse } from '@/features/auth/api/stub';

export const MainPage = () => {
  const { data = meStubResponse } = useGetMeQuery();

  return (
    <div>
      <h1>Login: {data?.login}</h1>
      <h1>User Id: {data?.userId}</h1>
    </div>
  );
};
