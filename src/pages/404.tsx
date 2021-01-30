import * as React from 'react'
import { Link } from 'gatsby'

import { Container } from '@material-ui/core'
import IndexLayout from '../layouts'

const NotFoundPage = () => (
  <IndexLayout>
    <Container maxWidth="xl">
      <h1>404: Page not found.</h1>
      <p>
        <Link to="/">Go back.</Link>
      </p>
    </Container>
  </IndexLayout>
)

export default NotFoundPage
