export default function ConfirmDialog({ title='Confirm', message='Are you sure?', onConfirm, onCancel }) {
  return (
    <div className="card" style={{maxWidth:480, margin:'0 auto'}}>
      <h3 style={{marginTop:0}}>{title}</h3>
      <p className="helper">{message}</p>
      <div className="row">
        <button className="btn" onClick={onCancel}>Cancel</button>
        <button className="btn danger" onClick={onConfirm}>Yes, delete</button>
      </div>
    </div>
  )
}