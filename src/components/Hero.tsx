import * as React from 'react'
import { Box, Typography, makeStyles, Theme, createStyles, Grid, Container } from '@material-ui/core'
import { graphql, useStaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import Img from 'gatsby-image'
import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hero: {
      width: '100%',
      height: '50vh',
      textAlign: 'center'
    },
    heroImage: {
      height: '50vh',
      width: '100%',
      backgroundPosition: 'top center',
      backgroundRepeat: 'repeat-y',
      backgroundSize: 'cover',
    },
    logoImage: {
      height: '40vh',
      width: '40vh'
    },
    title: {
      fontWeight: 'bold',
      marginBottom: 4,
      color: "white",
      backgroundColor: "rgba(33, 33, 33, 0.8)",
      padding: "5px",
    }
  })
)

type HeroProps = {
  title: string
  subtitle: string
}

const Hero = ({ title, subtitle }: HeroProps) => {
  const data = useStaticQuery(graphql`
    query {
      backgroundImageFileName: file(relativePath: { eq: "images/hero.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 2000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const classes = useStyles()
  return (
    <BackgroundImage className={classes.heroImage} fluid={data.backgroundImageFileName.childImageSharp.fluid} alt="">
      <Grid className={classes.hero} container direction="column" justify="center" alignItems="center" alignContent="center">
        <Typography className={classes.title} variant="h2">{title}</Typography>
        <Typography variant="subtitle1">{subtitle}</Typography>
      </Grid>
    </BackgroundImage>
  )
}

export default Hero
