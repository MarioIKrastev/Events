import { Box, Container, FormControl, Grid, TextField, Typography, useTheme } from "@mui/material"
import Btn from "../buttons/Btn"
import CardWrapper from "../Cards";
import { useFormik } from "formik";
import { initialValues } from "../../utils/initials";
import { validate } from "../../utils/formValidator";
import { useAuthMutation } from "../../mutations/AuthMutation";
import { useCookies } from 'react-cookie'
import FormSpinner from "../spinners/FormSpinner";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { mutate, isError, isLoading } = useAuthMutation('signin');
   /* eslint-disable no-unused-vars */ 
  const [_, setCookie] = useCookies(['Authorization']);
  
  const formik = useFormik({
    initialValues: initialValues.signIn,
    validationSchema: validate('signin'),
    onSubmit: (values) => {
       mutate(values, {
        onSuccess: async (res) => {
          setCookie('Authorization', `Bearer=${res.data.access_token}` , {path: '/', maxAge: 3600})
          return navigate('/home');
        },
        onError: (res) => {
          return  res.response.data.message
        }
      });
    }
  });
  return (
    <>
      <Container sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
        <Grid container justifyContent='center'>
          <Grid item md={5} sx={{ flexDirection: 'column', display: 'flex' }}>
            {isLoading ? (<Box sx={{ display: 'flex' }} justifyContent="center"><FormSpinner color={theme.palette.primary.dark} bgcolor={theme.palette.primary.light} /></Box>) : (
              <CardWrapper sx={{ pt: 5 }}>
                {isError && <Typography variant="body1" component="p" color={theme.palette.error.main}>
                  Wrong credentials
                </Typography>}
                <Box
                  component='form'
                  noValidate
                  autoComplete="off"
                  onSubmit={formik.handleSubmit}
                >
                  <FormControl fullWidth sx={{ gap: { xs: 3, md: 4 }, mb: 4 }}>
                    <TextField
                      id="email"
                      type="email"
                      label="Email"
                      variant="outlined"
                      size="small"
                      {...formik.getFieldProps('email')}
                      helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      id="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      size="small"
                      {...formik.getFieldProps('password')}
                      helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                  <Box sx={{ width: '100%', display: 'flex' }} justifyContent='space-between'>
                    <Btn text='Sign in' type='submit' />
                    {/* <Btn text='Clear' onClick={() => { reset(); formik.resetForm(); }} /> */}
                  </Box>
                </Box>
              </CardWrapper>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
