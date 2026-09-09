import React from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  LockKey,
  Database,
  Envelope,
  UserCheck,
  TrashSimple,
  ArrowLeft,
  Clock,
} from '@phosphor-icons/react'
import PageTransition from '../components/PageTransition'
import portfolio from '../data/portfolio.json'

export default function PrivacyPolicy() {
  const lastUpdated = 'September 2026'

  const policySections = [
    {
      id: 'collection',
      icon: Envelope,
      title: '1. Information Collected',
      content: [
        'When you submit an inquiry through our contact form, we collect the personal details you explicitly provide: your Full Name, Email Address, and Project Details / Message.',
        'We do not employ third-party tracking pixels, invasive cookies, or advertising trackers. Technical metadata (such as IP addresses and standard HTTP request headers) is processed strictly in real-time by AWS API Gateway and Cloudflare for DDoS mitigation, rate limiting, and network security.',
      ],
    },
    {
      id: 'purpose',
      icon: UserCheck,
      title: '2. Purpose and Legal Basis for Processing',
      content: [
        'We process your submitted personal data exclusively to respond to your technical inquiries, discuss project requirements, deliver engineering estimates, or coordinate consulting engagements.',
        'Processing is conducted based on legitimate interests and your explicit consent given when choosing to submit the contact form.',
      ],
    },
    {
      id: 'architecture',
      icon: LockKey,
      title: '3. Serverless Architecture & Security',
      content: [
        'All communications sent via this website are transmitted over encrypted TLS 1.3 channels.',
        'Our contact service operates on an AWS Serverless architecture: an Amazon API Gateway endpoint invokes an isolated, ephemeral AWS Lambda function that dispatches the message via Amazon Simple Email Service (SES) directly to our secure inbox.',
        'No intermediate or relational database persists your contact message on the web server, minimizing data exposure risks.',
      ],
    },
    {
      id: 'third-party',
      icon: Database,
      title: '4. Third-Party Service Providers',
      content: [
        'We do not sell, rent, trade, or monetize your personal information to any third parties or marketing networks.',
        'Your transmission relies on industry-standard cloud providers strictly acting as data processors: Amazon Web Services (API Gateway, Lambda, SES) and Cloudflare (DNS and edge routing). Each adheres to SOC 2, ISO 27001, and GDPR compliance standards.',
      ],
    },
    {
      id: 'retention',
      icon: TrashSimple,
      title: '5. Retention & Your Rights (GDPR & Data Privacy Act)',
      content: [
        'We retain messages in our private email archives solely for the duration required to evaluate, execute, or document ongoing business interactions.',
        'Under applicable laws (including the EU GDPR and the Philippine Data Privacy Act of 2012 / RA 10173), you have the right to request access to the personal data we hold about you, request corrections, or request immediate and permanent deletion of your emails and contact details.',
      ],
    },
    {
      id: 'contact',
      icon: ShieldCheck,
      title: '6. Contact & Data Controller',
      content: [
        `If you have questions regarding this Privacy Policy or wish to exercise your data protection rights, please contact:`,
      ],
      customContact: true,
    },
  ]

  return (
    <PageTransition className="p-4 sm:p-8 lg:p-10 max-w-6xl mx-auto space-y-8">
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E07A5F] hover:underline"
        >
          <ArrowLeft size={14} weight="bold" />
          <span>Back to Contact</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E07A5F]">
          <ShieldCheck size={16} weight="fill" />
          <span>Transparency & Data Security</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base max-w-2xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          We respect your privacy and protect your communication. This document outlines how your data is handled when you reach out through BBDevOps.
        </p>
        <div className="flex items-center gap-2 text-xs pt-1" style={{ color: 'var(--text-muted)' }}>
          <Clock size={14} weight="fill" className="text-[#D4A373]" />
          <span>Last updated: {lastUpdated}</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {policySections.map((section) => {
          const IconComponent = section.icon
          return (
            <div
              key={section.id}
              className={`card-warm p-6 sm:p-7 space-y-3 ${
                section.id === 'architecture' || section.id === 'contact' ? 'md:col-span-2' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#E07A5F]/15 text-[#E07A5F] shrink-0">
                  <IconComponent size={20} weight="fill" />
                </div>
                <h2 className="font-semibold text-base sm:text-lg" style={{ color: 'var(--text-main)' }}>
                  {section.title}
                </h2>
              </div>

              <div className="space-y-2 text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {section.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}

                {section.customContact && (
                  <div className="pt-2">
                    <div
                      className="p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      style={{
                        backgroundColor: 'var(--bg-badge)',
                        borderColor: 'var(--border-warm)',
                      }}
                    >
                      <div>
                        <div className="font-semibold text-sm" style={{ color: 'var(--text-main)' }}>
                          {portfolio.personal.name}
                        </div>
                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          DevOps Engineer & AI Automation Specialist • {portfolio.personal.location}
                        </div>
                      </div>
                      <a
                        href={`mailto:${portfolio.personal.email}?subject=Privacy%20Inquiry`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-transform hover:scale-105"
                        style={{ backgroundColor: 'var(--accent-primary)' }}
                      >
                        <Envelope size={14} weight="bold" />
                        <span>{portfolio.personal.email}</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </PageTransition>
  )
}
