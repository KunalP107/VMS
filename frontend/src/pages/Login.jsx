import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login } from '../api/auth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email.trim(), password.trim());
      toast.success('Welcome back');
      navigate('/visitors');
    } catch (err) {
      const msg = err?.response?.data?.msg || err?.response?.data?.message || err.message || 'Login failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="card" style={{ maxWidth: 420, margin: '40px auto' }}>
      <h2 style={{ marginTop: 0 }}>Login</h2>
      <p className="helper">Enter your credentials to continue.</p>
      <div className="row">
        <div>
          <label>Email</label>
          <input className="input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" autoComplete="username" />
        </div>
      </div>
      <div className="row">
        <div>
          <label>Password</label>
          <input type="password" className="input" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" />
        </div>
      </div>
      <div style={{display:'flex', justifyContent:'space-between', gap:10, alignItems:'center'}}>
        <span className="helper">No account? <Link to="/register">Register</Link></span>
        <button type="submit" className="btn primary" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
      </div>
    </form>
  );
}
