import * as React from 'react'
import { ThemeProvider } from '@material-ui/core'
import { theme } from '../style/theme'
import '../style/layout.css'

interface LayoutRootProps {
  className?: string
}

const LayoutRoot: React.FC<LayoutRootProps> = ({ children }) => (
  <>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </>
)

export default LayoutRoot
