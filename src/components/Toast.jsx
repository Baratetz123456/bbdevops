import React from 'react'
import { CheckCircle, WarningCircle, X } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Toast({ show, message, onClose, type = 'success' }) {
  const isError = type === 'error'

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-20 md:bottom-8 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl border max-w-md"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: isError ? '#E63946' : 'var(--accent-primary)',
            color: 'var(--text-main)',
          }}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              isError
                ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
            }`}
          >
            {isError ? (
              <WarningCircle size={20} weight="fill" />
            ) : (
              <CheckCircle size={20} weight="fill" />
            )}
          </div>
          <div className="text-sm font-medium pr-2">
            {message || (isError ? 'An error occurred. Please try again.' : 'Message sent successfully!')}
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer shrink-0"
            style={{ color: 'var(--text-muted)' }}
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

