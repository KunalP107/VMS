import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().min(6, 'Phone is required'),
  company: z.string().optional().or(z.literal('')),
  hostName: z.string().min(2, 'Host name is required'),
  purpose: z.string().min(2, 'Purpose is required'),
  accessLevel: z.enum(['Visitor', 'Contractor', 'VIP']).default('Visitor'),
  checkInTime: z.string().optional(),
  checkOutTime: z.string().optional(),
  badgeId: z.string().optional().or(z.literal('')),
  status: z.enum(['Checked-in', 'Checked-out', 'Pre-registered']).default('Pre-registered'),
})

export default function VisitorForm({ defaultValues, onSubmit, submitting }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card" style={{maxWidth:800, margin:'0 auto'}}>
      <div className="row">
        <div>
          <label>Full Name</label>
          <input className="input" {...register('fullName')} placeholder="Jane Doe"/>
          {errors.fullName && <span className="helper">{errors.fullName.message}</span>}
        </div>
        <div>
          <label>Phone</label>
          <input className="input" {...register('phone')} placeholder="+61 4xx xxx xxx"/>
          {errors.phone && <span className="helper">{errors.phone.message}</span>}
        </div>
      </div>

      <div className="row">
        <div>
          <label>Email</label>
          <input className="input" {...register('email')} placeholder="jane@example.com"/>
          {errors.email && <span className="helper">{errors.email.message}</span>}
        </div>
        <div>
          <label>Company</label>
          <input className="input" {...register('company')} placeholder="Acme Pty Ltd"/>
        </div>
      </div>

      <div className="row">
        <div>
          <label>Host Name</label>
          <input className="input" {...register('hostName')} placeholder="John Smith"/>
          {errors.hostName && <span className="helper">{errors.hostName.message}</span>}
        </div>
        <div>
          <label>Purpose</label>
          <input className="input" {...register('purpose')} placeholder="Meeting / Delivery / Interview"/>
          {errors.purpose && <span className="helper">{errors.purpose.message}</span>}
        </div>
      </div>

      <div className="row">
        <div>
          <label>Access Level</label>
          <select className="input" {...register('accessLevel')}>
            <option>Visitor</option>
            <option>Contractor</option>
            <option>VIP</option>
          </select>
        </div>
        <div>
          <label>Status</label>
          <select className="input" {...register('status')}>
            <option>Pre-registered</option>
            <option>Checked-in</option>
            <option>Checked-out</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div>
          <label>Badge ID</label>
          <input className="input" {...register('badgeId')} placeholder="B-1032"/>
        </div>
        <div>
          <label>Check-in Time</label>
          <input className="input" type="datetime-local" {...register('checkInTime')}/>
        </div>
        <div>
          <label>Check-out Time</label>
          <input className="input" type="datetime-local" {...register('checkOutTime')}/>
        </div>
      </div>

      <div style={{display:'flex', justifyContent:'flex-end', gap: 10}}>
        <button type="submit" className="btn success" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save Visitor'}
        </button>
      </div>
    </form>
  )
}