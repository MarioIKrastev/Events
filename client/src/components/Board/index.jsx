import jwt_decode from 'jwt-decode';
import { Container, Grid, Typography } from "@mui/material";
import { useCookies } from "react-cookie"
import Btn from "../buttons/Btn"
import CardWrapper from "../Cards";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from 'react';
import Calendar from '../Calendar';
import FormSpinner from '../spinners/FormSpinner'

export default function Board() {
  /* eslint-disable no-unused-vars,no-empty-pattern*/
  const [cookies, { }, removeCookie] = useCookies(['Authorization']);
  const user = jwt_decode(cookies.Authorization);
  console.log(user);
  const ref = useRef();
  const parent = useRef();


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, { scale: 1.3, opacity: 0 }, { scale: 1, opacity: 1, duration: .5, delay: .8 })
    }, parent)
    return () => ctx.revert();
  }, [])

  const signOut = () => {
    removeCookie('Authorization');
    window.location.reload();
  }

  return (
    <Container sx={{ height: '100vh', display: 'flex', alignItems: 'center' }} ref={parent}>
      <Grid container justifyContent="center" ref={ref} sx={{ minHeight: '800px' }}>
        <Grid item md={4}>
          <CardWrapper sx={{
            display: 'grid',
            height: '100%',
            p: 3, 
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
          }}>
            <Typography variant='h4' component='h4' color='primary.dark' textAlign='center' >
              Welcome {user.username}
            </Typography>
            <Btn text='Leave' onClick={signOut} sx={{ justifySelf: 'flex-end', alignSelf: 'end' }} />
          </CardWrapper>
        </Grid>
        <Grid item md={8} >
          <CardWrapper sx={{
            height: '100%',
            pt: 5,
            display: 'block',
            position: 'relative',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
          }}>
            <Calendar />
          </CardWrapper>
        </Grid>
      </Grid>
    </Container>
  )
}
