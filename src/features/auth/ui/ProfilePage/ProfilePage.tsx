import { useGetMeQuery } from '../../api/authApi';
import { meStubResponse } from '../../api/stub';

export const ProfilePage = () => {
  const { data = meStubResponse } = useGetMeQuery();

  return (
    <div>
      <h1>Login: {data?.login}</h1>
      <h1>User Id: {data?.userId}</h1>
    </div>
  );
};
