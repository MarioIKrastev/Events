import { Button, useTheme } from '@mui/material'

export default function Btn({text, ...rest}) {
  const { sx } = rest;
    const theme = useTheme();
    const btn = {"&:hover": {backgroundColor: "transparent", color: '#FFF' }, p: 0, m: 0 }
  return (
    <Button size="medium" disableRipple sx={[btn, sx, {color: theme.palette.primary.dark}]} {...rest}>{text}</Button>
  )
}
