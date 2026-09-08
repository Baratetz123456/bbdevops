import { useContext } from 'react'
import { ThemeContext } from './theme-context-base'

export const useTheme = () => useContext(ThemeContext)
