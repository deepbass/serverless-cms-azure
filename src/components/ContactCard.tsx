import { CardHeader, IconButton, Card, CardContent, Typography, Grid, makeStyles, Theme, createStyles } from '@material-ui/core'
import * as React from 'react'
import StarIcon from '@material-ui/icons/Star'
import LaunchIcon from '@material-ui/icons/Launch'
import DriveEtaIcon from '@material-ui/icons/DriveEta'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: '425px',
      width: '425px',
      marginBottom: '5vh',
      position: 'relative'
    },
    bottomSection: {
      position: 'absolute',
      bottom: '10px'
    },
    addressSection: {
      marginBottom: '30px'
    },
    timeInCarSection: {
      marginRight: '30px'
    },
    carLogo: { marginLeft: '5px' }
  })
)

type ContactCardProps = {
  title: string
  link: string
  timeInCarInMinutes: number
  numberOfStars: number
  phoneNumber: string
  firstLineAddress: string
  secondLineAddress: string
  city: string
  postCode: string
}

const Stars = (numberOfStars: number) => {
  const stars = []
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numberOfStars; i++) {
    stars.push(<StarIcon />)
  }
  return <>{stars}</>
}

const ContactCard: React.FC<ContactCardProps> = ({
  title,
  link,
  timeInCarInMinutes,
  numberOfStars,
  phoneNumber,
  firstLineAddress,
  secondLineAddress,
  city,
  postCode
}: ContactCardProps) => {
  const classes = useStyles()
  return (
    <Card className={classes.card} raised>
      <CardHeader
        title={title}
        action={
          link ? (
            <IconButton href={link}>
              <LaunchIcon />
            </IconButton>
          ) : (
              <></>
            )
        }
      />

      <CardContent>
        <address className={classes.addressSection}>
          <Typography>{firstLineAddress}</Typography>
          <Typography>{secondLineAddress}</Typography>
          <Typography>{city}</Typography>
          <Typography>{postCode}</Typography>
          <Typography>
            <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
          </Typography>
        </address>
        <Grid className={classes.bottomSection} item container direction="row" justify="space-between">
          <Grid item>{Stars(numberOfStars)}</Grid>
          <Grid className={classes.timeInCarSection} item>
            <Grid container direction="row">
              {timeInCarInMinutes ? (
                <>
                  <Typography>{timeInCarInMinutes} minutes </Typography> <DriveEtaIcon className={classes.carLogo} />
                </>
              ) : (
                  <Typography />
                )}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ContactCard
