/* eslint-disable no-shadow */
import * as React from 'react'
import { Link } from 'gatsby'
import {
  List,
  AppBar,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Toolbar,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Button,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { MenuLink } from '../models/SiteMetaData'
import AppMenuItem from './AppMenuItem'
import DesktopAppMenuItem from './DesktopAppMenuItem'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    title: {
      flexGrow: 1
    },
    appBar: {
      backgroundColor: theme.palette.background.default
    },
    menuLink: {
      cursor: 'pointer',
      marginRight: theme.spacing(2),
      textDecoration: 'none',
      color: theme.palette.text.primary
    },
    homeLink: {
      flexGrow: 1,
      textDecoration: 'none',
      color: theme.palette.text.primary
    },
    drawerLink: {
      textDecoration: 'none',
      color: theme.palette.grey[900]
    },
    user: {
      textAlign: 'right'
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    list: {
      width: '250px'
    },
    active: {
      color: theme.palette.primary.main
    }
  })
)

interface HeaderProps {
  title: string
  menuLinks: MenuLink[]
}

const Header: React.FC<HeaderProps> = ({ title, menuLinks }) => {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false)

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return
    }

    setDrawerOpen(open)
  }
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  const theme = useTheme()
  const biggerThanMobile = useMediaQuery(theme.breakpoints.up('md'))

  const mobileMenuDrawer = (links: MenuLink[]) => (
    <div className={classes.list} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {links.map(menuLink => (
          <AppMenuItem title={menuLink.title} url={menuLink.url} nestedLinks={menuLink.nestedLinks} />
        ))}
      </List>
    </div>
  )

  const mobileAppBar = ({ title, menuLinks }: HeaderProps) => (
    <AppBar className={classes.appBar} position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} aria-haspopup="true" aria-label="menu" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Link className={classes.homeLink} to="/">
          <Typography className={classes.title} variant="h6">
            {title}
          </Typography>
        </Link>
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {mobileMenuDrawer(menuLinks)}
      </Drawer>
    </AppBar>
  )

  const desktopAppBar = ({ title, menuLinks }: HeaderProps) => (
    <AppBar className={classes.appBar} position="static">
      <Toolbar>
        <Link className={classes.homeLink} to="/">
          <Typography className={classes.title} variant="h6">
            {title}
          </Typography>
        </Link>

        {menuLinks.map(menuLink => {
          return <DesktopAppMenuItem title={menuLink.title} url={menuLink.url} nestedLinks={menuLink.nestedLinks} />
        })}
      </Toolbar>
    </AppBar>
  )

  return biggerThanMobile ? desktopAppBar({ title, menuLinks }) : mobileAppBar({ title, menuLinks })
}

export default Header
