import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { isAuthed, logout } = useAuth()

  return (
    <nav className="navbar">
      <div className="brand">
        <Link className={`${pathname.startsWith('/dashboard') ? 'primary' : ''}`} to="/dashboard"><span style={{fontSize:'1.2rem'}}>🪪</span> Visitor Management</Link>
      </div>
      <div className="nav-actions">
        <Link className={`btn ${pathname.startsWith('/dashboard') ? 'primary' : ''}`} to="/dashboard">Dashboard</Link>
        {isAuthed && <Link className={`btn ${pathname.startsWith('/visitors') ? 'primary' : ''}`} to="/visitors">Visitors</Link>}
        {!isAuthed && <Link className={`btn ${pathname.startsWith('/login') ? 'primary' : ''}`} to="/login">Login</Link>}
        {!isAuthed && <Link className={`btn ${pathname.startsWith('/register') ? 'primary' : ''}`} to="/register">Register</Link>}
        {isAuthed && <button className="btn" onClick={() => { logout(); navigate('/login'); }}>Logout</button>}
      </div>
    </nav>
  )
}