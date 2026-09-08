import React, { useState } from 'react'
import { FolderOpen, Sparkle, Funnel } from '@phosphor-icons/react'
import PageTransition from '../components/PageTransition'
import ProjectCard from '../components/ProjectCard'
import { projectsData } from '../data/projectsData'

const categories = [
  'All',
  'AI & Agentic',
  'Network Automation',
  'Enterprise Workflow',
  'Custom Software',
]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects =
    activeCategory === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory)

  return (
    <PageTransition className="p-5 sm:p-8 lg:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E07A5F]">
          <FolderOpen size={16} weight="fill" />
          <span>Featured Portfolio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
          Flagship Projects & Case Studies
        </h1>
        <p className="text-sm sm:text-base max-w-3xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Production systems spanning autonomous agentic workflows, multi-device enterprise network automation, and AI compliance pipelines with measurable business impact.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mr-2" style={{ color: 'var(--text-muted)' }}>
          <Funnel size={14} weight="bold" />
          <span>Filter:</span>
        </div>
        {categories.map((cat) => {
          const isActive = activeCategory === cat
          const count = cat === 'All' ? projectsData.length : projectsData.filter((p) => p.category === cat).length
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                isActive
                  ? 'text-white shadow-sm'
                  : 'hover:border-[#E07A5F]'
              }`}
              style={{
                backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--bg-card)',
                borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-warm)',
                color: isActive ? '#FFFFFF' : 'var(--text-main)',
              }}
            >
              <span>{cat}</span>
              <span className="ml-1.5 text-[10px] opacity-75">({count})</span>
            </button>
          )
        })}
      </div>

      {/* Projects Grid: 3 columns desktop, 2 col tablet, 1 col mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Bottom Subtext */}
      <div
        className="p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-warm)',
        }}
      >
        <div className="flex items-center gap-3 text-sm">
          <div className="p-2 rounded-xl bg-[#E07A5F]/15 text-[#E07A5F]">
            <Sparkle size={20} weight="fill" />
          </div>
          <div>
            <div className="font-semibold" style={{ color: 'var(--text-main)' }}>
              Need custom network automation or an agentic pipeline?
            </div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              From multi-device verification to autonomous LangChain RAG systems built for enterprise reliability.
            </div>
          </div>
        </div>

        <a
          href="/contact"
          className="px-4 py-2 rounded-xl text-xs font-semibold text-white transition-transform hover:scale-105"
          style={{ backgroundColor: 'var(--accent-primary)' }}
        >
          Discuss a Project
        </a>
      </div>
    </PageTransition>
  )
}
