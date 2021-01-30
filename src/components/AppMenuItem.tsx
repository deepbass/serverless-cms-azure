/* eslint-disable react/no-array-index-key */
import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'

import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import { Link } from 'gatsby'
import { MenuLink } from '../models/SiteMetaData'

const useStyles = makeStyles(theme =>
  createStyles({
    menuItem: {},
    menuItemIcon: {
      color: '#97c05c'
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.text.primary
    }
  })
)

const AppMenuItem: React.FC<MenuLink> = props => {
  const { title, url, nestedLinks = [] } = props
  const classes = useStyles()
  const isExpandable = nestedLinks && nestedLinks.length > 0
  const [open, setOpen] = React.useState(false)

  function handleClick(event) {
    setOpen(!open)
    event.stopPropagation()
  }

  const MenuItemRoot = (
    <ListItem button className={classes.menuItem} onClick={handleClick}>
      <ListItemText
        primary={
          isExpandable ? (
            <>{title}</>
          ) : (
              <Link className={classes.link} to={url}>
                {title}
              </Link>
            )
        }
        inset
      />
      {/* Display the expand menu if the item has children */}
      {isExpandable && !open && <IconExpandMore />}
      {isExpandable && open && <IconExpandLess />}
    </ListItem>
  )

  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Divider />
      <List component="div" disablePadding>
        {nestedLinks.map((item, index) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <AppMenuItem {...item} key={index} />
        ))}
      </List>
    </Collapse>
  ) : null

  return (
    <>
      {MenuItemRoot}
      {MenuItemChildren}
    </>
  )
}

export default AppMenuItem
