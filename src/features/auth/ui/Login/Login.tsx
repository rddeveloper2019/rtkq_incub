import { useLoginMutation } from '../../api/authApi';

export const Login = () => {
  const [login] = useLoginMutation();

  const loginHandler = () => {
    const redirectUri = `${import.meta.env.VITE_DOMAIN}/oauth/callback`;
    const url = `${import.meta.env.VITE_BASE_URL}auth/oauth-redirect?callbackUrl=${redirectUri}`;

    const receiveMessage = (ev: MessageEvent) => {
      window.removeEventListener('message', receiveMessage);
      const { code } = ev.data;
      console.log('(**) => ev: ', ev);
      if (ev.origin != import.meta.env.VITE_DOMAIN) {
        return;
      }

      if (!code) {
        return;
      }

      login({ code, redirectUri, rememberMe: false });
    };

    window.open(url, 'oauthPopup', 'width=500 height=500');
    window.addEventListener('message', receiveMessage);
  };

  return (
    <button type={'button'} onClick={loginHandler}>
      login
    </button>
  );
};
