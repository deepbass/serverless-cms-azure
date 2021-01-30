import * as React from 'react'
import { Container } from '@material-ui/core'

interface LayoutMainProps {
  className?: string
}

const LayoutMain: React.FC<LayoutMainProps> = ({ children, className }) => (
  <Container maxWidth="xl" className={className}>
    {children}
  </Container>
)

export default LayoutMain
