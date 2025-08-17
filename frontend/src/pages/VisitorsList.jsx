import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../api/client.js'
import DataTable from '../components/DataTable.jsx'

export default function VisitorsList() {
  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState([])
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('all')

  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const { data } = await api.get('/visitors')
        setRows(data?.data || data || [])
      } catch (err) {
        console.error(err)
        toast.error(err?.response?.data?.message || 'Failed to load visitors')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    return rows.filter(v => {
      const matchesQ = !query || Object.values(v).join(' ').toLowerCase().includes(query)
      const matchesStatus = status === 'all' || v.status === status
      return matchesQ && matchesStatus
    })
  }, [rows, q, status])

  const columns = [
    { header: 'Name', accessorKey: 'fullName' },
    { header: 'Company', accessorKey: 'company' },
    { header: 'Host', accessorKey: 'hostName' },
    { header: 'Purpose', accessorKey: 'purpose' },
    { header: 'Badge', accessorKey: 'badgeId' },
    { header: 'Status', cell: (r) => <span className={`badge ${r.status==='Checked-in'?'green':r.status==='Checked-out'?'red':'blue'}`}>{r.status}</span> },
  ]

  const remove = async (id) => {
    if (!confirm('Delete this visitor?')) return
    try {
      await api.delete(`/visitors/${id}`)
      setRows(prev => prev.filter(r => (r._id || r.id) !== id))
      toast.success('Deleted')
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || 'Delete failed')
    }
  }

  return (
    <div className="card">
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14}}>
        <h2 style={{margin:0}}>Visitors</h2>
        <div style={{display:'flex', gap:10}}>
          <input className="input" placeholder="Search name, company, host..." value={q} onChange={e=>setQ(e.target.value)} style={{minWidth:260}}/>
          <select className="input" value={status} onChange={e=>setStatus(e.target.value)} style={{minWidth:180}}>
            <option value="all">All statuses</option>
            <option>Pre-registered</option>
            <option>Checked-in</option>
            <option>Checked-out</option>
          </select>
          <Link className="btn primary" to="/visitors/new">+ New</Link>
        </div>
      </div>

      {loading ? <p className="helper">Loading...</p> : (
        <DataTable
          columns={columns}
          data={filtered}
          actions={(row) => (
            <div style={{display:'flex', gap:8, justifyContent:'flex-end'}}>
              <button className="btn" onClick={() => navigate(`/visitors/${row._id || row.id}/edit`)}>Edit</button>
              <button className="btn danger" onClick={() => remove(row._id || row.id)}>Delete</button>
            </div>
          )}
        />
      )}
    </div>
  )
}