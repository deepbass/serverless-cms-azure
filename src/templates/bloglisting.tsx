import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import {
  Container,
  makeStyles,
  Theme,
  createStyles,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  CardActions,
  Grid,
  Divider
} from '@material-ui/core'
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
    allMdx: {
      edges: AllMdxNode[]
    }
  }
}

interface AllMdxNode {
  node: {
    excerpt: string
    fields: {
      slug: string
    }
    frontmatter: {
      date: string
      title: string
      description: string
    }
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mdxSection: {
      textAlign: 'center'
    },
    blogListingSection: {
      marginTop: theme.spacing(1)
    },
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    readMoreButton: {
      textDecoration: 'none'
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
        <Divider className={classes.divider} variant="middle" />
        <div>
          <Typography variant="h4">Blog Posts:</Typography>
          <Grid className={classes.blogListingSection} container direction="row" justify="space-between" alignItems="stretch" spacing={3}>
            {data.allMdx.edges.map(edge => {
              return (
                <Grid xs={12} sm={6} item>
                  <Card elevation={10}>
                    <CardHeader title={edge.node.frontmatter?.title} subheader={edge.node.frontmatter?.date} />
                    <CardContent>
                      <Typography>{edge.node.excerpt}</Typography>
                    </CardContent>
                    <CardActions>
                      <Link className={classes.readMoreButton} to={edge.node.fields.slug}>
                        <Button variant="outlined">Read More</Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </div>
      </Container>
    </IndexLayout>
  )
}

export default IndexTemplate

export const query = graphql`
  query BlogListingTemplateQuery($slug: String!) {
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
    allMdx(filter: { frontmatter: { layout: { eq: "blogpost" } } }, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
