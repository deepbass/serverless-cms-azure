const netlifyCmsPath = {
  resolve: `gatsby-plugin-netlify-cms-paths`,
  options: {
    cmsConfig: `/static/admin/config.yml`
  }
}

module.exports = {
  siteMetadata: {
    title: 'Bob\'s Website',
    description: 'Expert event and portrait photography',
    keywords: 'photo photography event picture art portrait',
    siteUrl: 'https://www.danielbass.dev',
    author: {
      name: 'Daniel Bass',
      url: 'https://www.danielbass.dev',
      email: 'me@danielbass.dev'
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [`.mdx`, `.md`],

        defaultLayouts: {
          // This entry template will switch the page template based on
          // a frontmatter value provided in the CMS, allowing users to
          // choose different template layouts.
          default: require.resolve(`./src/templates/page.tsx`)
        },
        gatsbyRemarkPlugins: [
          netlifyCmsPath,
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 100,
              backgroundColor: 'transparent',
              linkImagesToOriginal: false,
              withWebp: true,
              showCaptions: ['title'],
              wrapperStyle: () => `text-align: center`
            }
          }
        ]
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data`
      }
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://www.danielbass.dev'
      }
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    netlifyCmsPath,
    'gatsby-plugin-material-ui',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-netlify-cms`
    }
  ]
}
