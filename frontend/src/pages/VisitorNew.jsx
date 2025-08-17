import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import api from '../api/client.js'
import VisitorForm from '../components/VisitorForm.jsx'

const defaults = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  hostName: '',
  purpose: '',
  accessLevel: 'Visitor',
  status: 'Pre-registered',
  badgeId: '',
  checkInTime: '',
  checkOutTime: '',
}

export default function VisitorNew() {
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (payload) => {
    try {
      setSubmitting(true)
      await api.post('/visitors', payload)
      toast.success('Visitor created')
      navigate('/visitors')
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || 'Create failed')
    } finally {
      setSubmitting(false)
    }
  }

  return <VisitorForm defaultValues={defaults} onSubmit={onSubmit} submitting={submitting} />
}