import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
  container: {
    gutter: {
      xs: "16px",
      md: "64px",
    },
  },
});

theme = createTheme(theme, {
  palette: {
    primary: {
      main: "#73A1C7",
      dark: "#2B6DA3",
      light: "#B5D0E0",
    },
    secondary: {
      main: "#FFFFFF",
    },
    tertiary: {
      main: "#D8E6E9",
    },
    error: {
      main: '#FE6A4C'
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          'label': {
            color: "#2B6DA3",
            fontSize: '1.125rem',
            fontWeight: '500',
            lineHeight: '1.28',
            letterSpacing: '0px',
          },
          '& .MuiInputLabel-root, fieldset': {
            fontSize: '1.1rem',
          },
          '&:hover label': {
            color: "#2B6DA3",
          },
          '&:hover label.Mui-error': {
            color: '#eb5439',
          },
          '& label.Mui-error.Mui-focused': {
            color: '#eb5439',
          },
          '& label.Mui-focused': {
            color: "#2B6DA3",
          },
          '& label.Mui-disabled': {
            color: '#005450',
            opacity: 0.2,
          },
          '& .MuiInputBase-root.Mui-disabled': {
            '& > fieldset': {
              borderColor: '#005450',
              opacity: 0.2,
            },
          },
          '& .MuiInputBase-root.Mui-error': {
            '& > fieldset': {
              borderColor: '#005450',
              color: '#eb5439',
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          'borderRadius': '5px',
          'borderWidth': '1px',
          'color': "#2B6DA3",
          'paddingRight': '0',
          'fieldset': {
            'borderColor': "#2B6DA3",
            'borderWidth': '1px',
            'color': "#2B6DA3",
            'fontSize': '1.125rem',
            'fontWeight': '500',
            'lineHeight': '1.28',
            'letterSpacing': '0px',
            '& .Mui-focused': {
              borderWidth: '1px',
            }
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: "#CCE4FB",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'none'
          }
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          position: 'absolute',
          top: '2.5rem',
          bottom: '-1rem',
          margin: 0,
          color: '#FE6A4C'
        }
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(to right top,rgba(43, 109, 163, 0.3),rgba(255, 255, 255, 0.1))',
          backdropFilter: 'blur(50px)',
        }
      }
    }
  },
});
export default theme;
