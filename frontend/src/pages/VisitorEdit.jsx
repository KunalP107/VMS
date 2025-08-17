import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../api/client.js'
import VisitorForm from '../components/VisitorForm.jsx'

export default function VisitorEdit() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [values, setValues] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/visitors/${id}`)
        setValues(data?.data || data)
      } catch (err) {
        console.error(err)
        toast.error('Failed to load visitor')
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  const onSubmit = async (payload) => {
    try {
      setSubmitting(true)
      await api.put(`/visitors/${id}`, payload)
      toast.success('Visitor updated')
      navigate('/visitors')
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || 'Update failed')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p className="helper">Loading...</p>
  if (!values) return <p className="helper">Record not found</p>

  return <VisitorForm defaultValues={values} onSubmit={onSubmit} submitting={submitting} />
}