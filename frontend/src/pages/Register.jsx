import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { register } from '../api/auth';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [role, setRole] = useState('reception'); // or 'admin'/'security'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await register({ name: name.trim(), email: email.trim(), password: password.trim(), role });
      toast.success('Account created. Please login.');
      navigate('/login');
    } catch (err) {
      const msg = err?.response?.data?.msg || err?.response?.data?.message || err.message || 'Registration failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="card" style={{ maxWidth: 420, margin: '40px auto' }}>
      <h2 style={{ marginTop: 0 }}>Register</h2>
      <p className="helper">Create an account to continue.</p>

      <div className="row">
        <div>
          <label>Name</label>
          <input className="input" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your full name" />
        </div>
      </div>

      <div className="row">
        <div>
          <label>Email</label>
          <input className="input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
      </div>

      <div className="row">
        <div>
          <label>Password</label>
          <input type="password" className="input" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" />
        </div>
      </div>

      <div className="row">
        <div>
          <label>Role</label>
          <select className="input" value={role} onChange={(e)=>setRole(e.target.value)}>
            <option value="reception">Reception</option>
            <option value="security">Security</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div style={{display:'flex', justifyContent:'space-between', gap:10, alignItems:'center'}}>
        <span className="helper">Already have an account? <Link to="/login">Login</Link></span>
        <button type="submit" className="btn primary" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
      </div>
    </form>
  );
}
