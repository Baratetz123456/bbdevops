import React from 'react'
import { Sun, Moon } from '@phosphor-icons/react'
import { useTheme } from '../context/useTheme'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} warm mode`}
      className={`p-2.5 rounded-full transition-all duration-300 border flex items-center justify-center cursor-pointer ${
        theme === 'dark'
          ? 'bg-[#2B211D] border-[#3E3029] text-[#E07A5F] hover:bg-[#382B25] hover:scale-105'
          : 'bg-[#FFF8F0] border-[#EBDDCD] text-[#E07A5F] hover:bg-[#FFF2E2] hover:scale-105 shadow-sm'
      } ${className}`}
    >
      {theme === 'dark' ? (
        <Sun size={20} weight="fill" className="transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon size={20} weight="fill" className="transition-transform duration-300 -rotate-12 hover:rotate-0" />
      )}
    </button>
  )
}
