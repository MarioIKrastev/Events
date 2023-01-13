import { Card } from "@mui/material";
import { styles } from './styles';

export default function CardWrapper({ children, ...rest }) {
  const { sx } = rest;
  return (
    <Card sx={[styles.card, sx]}>{children}</Card>
  )
}
