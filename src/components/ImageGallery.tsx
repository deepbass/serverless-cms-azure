import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper
    },
    gridList: {
      width: '100%'
    }
  })
)
type ImageGalleryProps = {
  images: GalleryImage[]
}

type GalleryImage = {
  title: string
  image: string
  cols: number
}
export default function ImageGallery({ images }: ImageGalleryProps) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <GridList cellHeight={500} className={classes.gridList} cols={3}>
        {images.map(tile => (
          <GridListTile key={tile.image} cols={tile.cols || 1}>
            <img src={tile.image} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}
