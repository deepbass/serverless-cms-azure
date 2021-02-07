import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Container, makeStyles, Theme, createStyles } from '@material-ui/core'
import IndexLayout from '../layouts'
import Hero from '../components/Hero'

interface IndexTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: {
          name: string
          url: string
        }
      }
    }
    mdx: {
      body: string
      excerpt: string
      frontmatter: {
        title: string
        description: string
      }
    }
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mdxSection: {
      textAlign: 'center'
    }
  })
)

const IndexTemplate: React.FunctionComponent<IndexTemplateProps> = ({ data }) => {
  const classes = useStyles()
  return (
    <IndexLayout>
      <Hero title={data.mdx.frontmatter.title} subtitle={data.mdx.frontmatter.description} />
      <Container maxWidth="md">
        <MDXRenderer className={classes.mdxSection}>{data.mdx.body}</MDXRenderer>
      </Container>
    </IndexLayout>
  )
}

export default IndexTemplate

export const query = graphql`
  query IndexTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
        }
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt
      frontmatter {
        title
        description
      }
    }
  }
`
