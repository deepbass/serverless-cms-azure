import { makeStyles, Theme, createStyles, Popper, Typography, Grow, Paper, ClickAwayListener, MenuList, MenuItem } from '@material-ui/core'
import React from 'react'
import { Link } from 'gatsby'
import { MenuLink } from '../models/SiteMetaData'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      border: '1px solid',
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper
    },
    menuLink: {
      cursor: 'pointer',
      marginRight: theme.spacing(2),
      textDecoration: 'none',
      color: theme.palette.text.primary
    }
  })
)

const DesktopAppMenuItem: React.FC<MenuLink> = props => {
  const { title, url, nestedLinks = [] } = props
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setAnchorEl(null)
    }
  }

  const open = Boolean(anchorEl)
  const id = open ? `submenu-${title.toLowerCase().replace(' ', '-')}` : undefined
  const isNested = nestedLinks && nestedLinks.length > 0
  return isNested ? (
    <>
      <Typography className={classes.menuLink} aria-describedby={id} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {title}
      </Typography>
      <Popper open={open} anchorEl={anchorEl} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {nestedLinks?.map((menuLink: MenuLink) => {
                    return (
                      <MenuItem>
                        <Link className={classes.menuLink} to={menuLink.url as string}>
                          <Typography>{menuLink.title}</Typography>
                        </Link>
                      </MenuItem>
                    )
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  ) : (
    <Link className={classes.menuLink} to={url ?? '/'}>
      <Typography>{title}</Typography>
    </Link>
  )
}

export default DesktopAppMenuItem
