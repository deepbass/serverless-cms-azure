import { createMuiTheme } from '@material-ui/core/styles'
import { blue, yellow, red } from '@material-ui/core/colors'

const primary = blue[500]
const secondary = yellow[500]
const white = '#ffffff'
// eslint-disable-next-line @typescript-eslint/no-use-before-define
const error = red[500]

const primaryText = '#444444'
// A custom theme for this app
const theme = createMuiTheme({
  typography: {},
  palette: {
    primary: {
      main: primary
    },
    secondary: {
      main: secondary
    },
    error: {
      main: error
    },
    background: {
      default: white
    },
    text: {
      primary: primaryText
    }
  }
})

export { theme }
