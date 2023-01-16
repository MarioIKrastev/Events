import { Container, Grid } from "@mui/material";
import Btn from "../buttons/Btn";
import { styles } from "./styles";
import SignUp from "../Auth/SignUp";
import { useNavigate } from "react-router-dom";

export default function Landing() {
const navigate = useNavigate();
  return (
    <Container sx={styles.container}>
      <Grid container justifyContent="center">
        <Grid item md={5} sx={{flexDirection: 'column', display: 'flex', gap: 16}}>
          <SignUp />
          <Btn text='Sign In' sx={{fontSize: '54px'}} variant='outlined' onClick={() => navigate('signin')}/>
        </Grid>
      </Grid>
    </Container >
  );
}
