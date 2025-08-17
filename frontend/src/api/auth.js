import api, { TOKEN_KEY } from './client';

export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password });
  const token = data?.token || data?.data?.token;
  if (!token) throw new Error('Token missing from response');
  localStorage.setItem(TOKEN_KEY, token);
  return token;
}

export async function register({ name, email, password, role = 'reception' }) {
  const { data } = await api.post('/auth/register', { name, email, password, role });
  // backend returns { token } (from our code). You can either auto-login or redirect to /login
  const token = data?.token;
  return token;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}
