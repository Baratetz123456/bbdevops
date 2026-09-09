import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Envelope,
  PaperPlaneRight,
  GithubLogo,
  LinkedinLogo,
  MapPin,
  Clock,
} from '@phosphor-icons/react'
import confetti from 'canvas-confetti'
import PageTransition from '../components/PageTransition'
import Toast from '../components/Toast'
import portfolio from '../data/portfolio.json'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    _gotcha: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastState, setToastState] = useState({
    show: false,
    message: '',
    type: 'success',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return

    // Honeypot anti-spam check
    if (formData._gotcha) {
      setIsSubmitting(false)
      setFormData({ name: '', email: '', message: '', _gotcha: '' })
      setToastState({
        show: true,
        message: 'Thank you! Your message has been received.',
        type: 'success',
      })
      return
    }

    setIsSubmitting(true)
    const contactApiUrl = import.meta.env.VITE_CONTACT_API_URL

    if (!contactApiUrl) {
      // Fallback if API is not deployed yet: trigger direct mailto link
      const subject = encodeURIComponent(`Project Inquiry from ${formData.name}`)
      const body = encodeURIComponent(
        `${formData.message}\n\n---\nSender: ${formData.name}\nEmail: ${formData.email}`
      )
      window.location.href = `mailto:${portfolio.personal.email}?subject=${subject}&body=${body}`
      setIsSubmitting(false)
      setToastState({
        show: true,
        message: `Opening your email client to message ${portfolio.personal.email} directly.`,
        type: 'success',
      })
      setTimeout(() => setToastState((prev) => ({ ...prev, show: false })), 6000)
      return
    }

    try {
      const response = await fetch(contactApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _gotcha: formData._gotcha,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok && data.success) {
        setFormData({ name: '', email: '', message: '', _gotcha: '' })
        setToastState({
          show: true,
          message: 'Thank you! Your message has been sent directly to Jayson.',
          type: 'success',
        })

        // Celebratory confetti
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#E07A5F', '#D4A373', '#FAF3EA'],
        })
      } else {
        const errorMsg =
          data.error ||
          `Unable to deliver message. Please reach out directly to ${portfolio.personal.email}`
        setToastState({
          show: true,
          message: errorMsg,
          type: 'error',
        })
      }
    } catch (err) {
      console.error('Contact submission error:', err)
      setToastState({
        show: true,
        message: `Network error. Please email ${portfolio.personal.email} directly.`,
        type: 'error',
      })
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setToastState((prev) => ({ ...prev, show: false })), 6000)
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <PageTransition className="p-4 sm:p-8 lg:p-10 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E07A5F]">
          <Envelope size={16} weight="fill" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
          Let's Build Something Together
        </h1>
        <p className="text-sm sm:text-base max-w-2xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Whether you need intelligent AI automations, network tooling, or custom Python engineering — let's connect.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Contact Form */}
        <div className="md:col-span-7 card-warm p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: 'var(--text-main)' }}
              >
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Alex Rivera"
                className="w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
                style={{
                  backgroundColor: 'var(--bg-badge)',
                  borderColor: 'var(--border-warm)',
                  color: 'var(--text-main)',
                }}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: 'var(--text-main)' }}
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@company.com"
                className="w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
                style={{
                  backgroundColor: 'var(--bg-badge)',
                  borderColor: 'var(--border-warm)',
                  color: 'var(--text-main)',
                }}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: 'var(--text-main)' }}
              >
                Project Details
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Briefly describe your project, timeline, or engineering goals..."
                className="w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#E07A5F] resize-none"
                style={{
                  backgroundColor: 'var(--bg-badge)',
                  borderColor: 'var(--border-warm)',
                  color: 'var(--text-main)',
                }}
              />
            </div>

            {/* Honeypot field for spam prevention (hidden from human users) */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              value={formData._gotcha}
              onChange={handleChange}
              className="hidden"
              aria-hidden="true"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                backgroundColor: 'var(--accent-primary)',
                boxShadow: '0 8px 24px -4px rgba(224, 122, 95, 0.4)',
              }}
            >
              {isSubmitting ? (
                <span>Sending message...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <PaperPlaneRight size={16} weight="bold" />
                </>
              )}
            </button>

            {/* Privacy Policy Consent Notice */}
            <p className="text-[11px] text-center pt-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              By submitting, you agree to our{' '}
              <Link to="/privacy" className="underline hover:text-[#E07A5F] transition-colors">
                Privacy Policy
              </Link>
              . Your details are kept strictly confidential.
            </p>
          </form>
        </div>

        {/* Sidebar Info & Socials */}
        <div className="md:col-span-5 space-y-4">
          <div className="card-warm p-6 space-y-4">
            <h3 className="font-semibold text-base" style={{ color: 'var(--text-main)' }}>
              Direct Contact
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#E07A5F]/15 text-[#E07A5F] shrink-0">
                  <MapPin size={16} weight="fill" />
                </div>
                <div>
                  <div className="font-semibold" style={{ color: 'var(--text-main)' }}>Location</div>
                  <div style={{ color: 'var(--text-muted)' }}>
                    {portfolio.personal.location} ({portfolio.personal.timeZone}) • {portfolio.personal.remotePreference}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#D4A373]/15 text-[#D4A373] shrink-0">
                  <Clock size={16} weight="fill" />
                </div>
                <div>
                  <div className="font-semibold" style={{ color: 'var(--text-main)' }}>Response Time</div>
                  <div style={{ color: 'var(--text-muted)' }}>Within 24 business hours</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#E07A5F]/15 text-[#E07A5F] shrink-0">
                  <Envelope size={16} weight="fill" />
                </div>
                <div>
                  <div className="font-semibold" style={{ color: 'var(--text-main)' }}>Direct Email</div>
                  <a
                    href={`mailto:${portfolio.personal.email}`}
                    className="hover:underline transition-colors break-all"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    {portfolio.personal.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social Presence Card */}
          <div className="card-warm p-6 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Connect Online
            </h4>
            <div className="flex items-center gap-3">
              <a
                href={portfolio.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="flex-1 py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: 'var(--bg-badge)',
                  borderColor: 'var(--border-warm)',
                  color: 'var(--text-main)',
                }}
              >
                <GithubLogo size={18} weight="fill" className="text-[#E07A5F]" />
                <span>GitHub</span>
              </a>
              <a
                href={portfolio.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="flex-1 py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: 'var(--bg-badge)',
                  borderColor: 'var(--border-warm)',
                  color: 'var(--text-main)',
                }}
              >
                <LinkedinLogo size={18} weight="fill" className="text-[#E07A5F]" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Toast
        show={toastState.show}
        message={toastState.message}
        type={toastState.type}
        onClose={() => setToastState((prev) => ({ ...prev, show: false }))}
      />
    </PageTransition>
  )
}
