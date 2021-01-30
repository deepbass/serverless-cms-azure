import * as React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from '../components/Header'
import LayoutRoot from '../components/LayoutRoot'
import { SiteMetaData, MenuLink } from '../models/SiteMetaData'
import Footer from '../components/Footer'
import menuItems from '../data/menuItems.json'

interface StaticQueryProps {
  site: {
    siteMetadata: SiteMetaData
  }
}

interface MenuItems {
  menuItems: MenuLink[]
}

const IndexLayout: React.FC = ({ children }) => (
  <StaticQuery
    query={graphql`
      query IndexLayoutQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => (
      <LayoutRoot>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: data.site.siteMetadata.description },
            { name: 'keywords', content: data.site.siteMetadata.keywords }
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header title={data.site.siteMetadata.title} menuLinks={menuItems.menuItems} />
        {children}
        <Footer />
      </LayoutRoot>
    )}
  />
)

export default IndexLayout
