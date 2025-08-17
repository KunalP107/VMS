import { useMemo } from 'react'

export default function DataTable({ columns, data, actions }) {
  const headers = useMemo(() => columns.map(c => c.header), [columns])
  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr>
            {headers.map((h, idx) => <th key={idx}>{h}</th>)}
            {actions ? <th style={{textAlign:'right'}}>Actions</th> : null}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={headers.length + (actions?1:0)} style={{padding:'16px'}}>No records</td></tr>
          ) : data.map((row) => (
            <tr key={row._id || row.id} className="table-row">
              {columns.map((c, idx) => (
                <td key={idx}>{c.cell ? c.cell(row) : row[c.accessorKey]}</td>
              ))}
              {actions ? <td style={{textAlign:'right'}}>{actions(row)}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}