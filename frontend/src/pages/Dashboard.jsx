import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
  const { isAuthed } = useAuth()
  return (
    <div className="grid">
      <div className="card" style={{gridColumn:'span 7'}}>
        <h2 style={{marginTop:0}}>Welcome 👋</h2>
        <p className="helper">
          This is the Visitor Management System
        </p>
        <hr/>
        <div className="row">
          {isAuthed ? (
            <>
              <Link className="btn primary" to="/visitors">Open Visitors</Link>
              <Link className="btn" to="/visitors/new">Add Visitor</Link>
            </>
          ) : (
            <>
              <Link className="btn primary" to="/login">Login</Link>
              <Link className="btn" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
      <div className="card" style={{gridColumn:'span 5'}}>
        <h2>About</h2>
        <p>
          This is a simple Visitor Management System built with React and Node.js.
          It allows you to manage visitors, check-in and check-out, and view visitor history.
        </p>
        </div>    
      </div>
  )
}