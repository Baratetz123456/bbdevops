import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import MainLayout from './layouts/MainLayout'
import TimelineSkeleton from './components/TimelineSkeleton'
import ProjectSkeleton from './components/ProjectSkeleton'
import PageSkeleton from './components/PageSkeleton'
import ScrollToTop from './components/ScrollToTop'

// Route-level code splitting with lazy loading
const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const Services = lazy(() => import('./pages/Services'))
const EmploymentHistory = lazy(() => import('./pages/EmploymentHistory'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const PrivacyPolicy = lazy(() => import('./pages/LegalNotice'))

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="projects"
              element={
                <Suspense fallback={<ProjectSkeleton />}>
                  <Projects />
                </Suspense>
              }
            />
            <Route
              path="services"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Services />
                </Suspense>
              }
            />
            <Route
              path="history"
              element={
                <Suspense fallback={<TimelineSkeleton />}>
                  <EmploymentHistory />
                </Suspense>
              }
            />
            <Route
              path="about"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="contact"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Contact />
                </Suspense>
              }
            />
            <Route
              path="privacy"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <PrivacyPolicy />
                </Suspense>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
