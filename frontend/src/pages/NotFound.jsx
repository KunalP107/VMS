import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="card" style={{maxWidth:600, margin:'60px auto', textAlign:'center'}}>
      <h2>404 — Not Found</h2>
      <p className="helper">The page you’re looking for doesn’t exist.</p>
      <Link className="btn" to="/">Go Home</Link>
    </div>
  )
}