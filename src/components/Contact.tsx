import { useState, type FormEvent } from 'react'
import { contact, email, FORMSPREE_ENDPOINT } from '../data/content'
import SectionHeading from './SectionHeading'

type Status = 'idle' | 'sending' | 'success' | 'error' | 'mailto'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '')
    const from = String(data.get('email') ?? '')
    const message = String(data.get('message') ?? '')

    if (!FORMSPREE_ENDPOINT) {
      const subject = `${contact.mailtoSubject} ${name}`
      const body = `${message}\n\n${name}\n${from}`
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`
      setStatus('mailto')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!response.ok) throw new Error(`Formspree returned ${response.status}`)
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const statusMessage = {
    idle: '',
    sending: contact.sending,
    success: contact.success,
    error: contact.error,
    mailto: contact.mailtoNotice,
  }[status]

  return (
    <section id="contact" className="section">
      <SectionHeading>Contact</SectionHeading>
      <p className="contact-blurb">{contact.blurb}</p>
      <form className="contact-form" onSubmit={onSubmit}>
        <input
          name="name"
          type="text"
          placeholder={contact.namePlaceholder}
          aria-label={contact.namePlaceholder}
          autoComplete="name"
          required
        />
        <input
          name="email"
          type="email"
          placeholder={contact.emailPlaceholder}
          aria-label={contact.emailPlaceholder}
          autoComplete="email"
          required
        />
        <textarea
          name="message"
          placeholder={contact.messagePlaceholder}
          aria-label={contact.messagePlaceholder}
          required
        />
        <div className="contact-actions">
          <p
            className={`contact-status${status === 'error' ? ' is-error' : ''}`}
            role="status"
          >
            {statusMessage}
          </p>
          <button
            className="bar-link"
            type="submit"
            disabled={status === 'sending'}
          >
            {contact.submit}
          </button>
        </div>
      </form>
    </section>
  )
}
