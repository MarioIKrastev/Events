import jwt_decode from 'jwt-decode';
import { Container, Grid, Typography } from "@mui/material";
import { useCookies } from "react-cookie"
import Btn from "../buttons/Btn"
import CardWrapper from "../Cards";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from 'react';

export default function Board() {
  /* eslint-disable no-unused-vars,no-empty-pattern*/
  const [cookies, { }, removeCookie] = useCookies(['Bearer']);
  const user = jwt_decode(cookies.Bearer);
  const ref = useRef();
  const parent = useRef();


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, { scale: 1.3, opacity: 0 }, { scale: 1, opacity: 1, duration: .5 })
    }, parent)
    return () => ctx.revert();
  }, [])

  const signOut = () => {
    removeCookie('Bearer');
    window.location.reload();
  }

  return (
    <Container sx={{ height: '100vh', display: 'flex', alignItems: 'center' }} ref={parent}>
      <Grid container justifyContent="center" ref={ref}>
        <Grid item md={4}>
          <CardWrapper sx={{ p: 3 }}>
            <Typography variant='h4' component='h4' color='primary.dark' textAlign='center' >
              Welcome {user.username}
            </Typography>
          </CardWrapper>
        </Grid>
        <Grid item md={8}>
          <CardWrapper >

          </CardWrapper>
        </Grid>
      </Grid>
      {/* <Btn text='Log Out' onClick={signOut} /> */}
    </Container>
  )
}
