import React from 'react'
import { Briefcase } from '@phosphor-icons/react'
import PageTransition from '../components/PageTransition'
import ServiceCard from '../components/ServiceCard'
import { servicesData } from '../data/servicesData'

export default function Services() {
  return (
    <PageTransition className="p-5 sm:p-8 lg:p-10 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E07A5F]">
          <Briefcase size={16} weight="fill" />
          <span>Core Capabilities</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
          Services & Expertise
        </h1>
        <p className="text-sm sm:text-base max-w-2xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Comprehensive engineering services from intelligent automation pipelines to robust Python systems.
        </p>
      </div>

      {/* Services Grid (2x2 on desktop, 1-col mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {servicesData.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </PageTransition>
  )
}
