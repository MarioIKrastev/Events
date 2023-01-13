import { Box, Container, FormControl, Grid, TextField } from "@mui/material"
import FormButton from "../buttons/FormButton"
import CardWrapper from "../Cards";
import { useFormik } from "formik";
import { initialValues } from "../../utils/initials";
import { validate } from "../../utils/formValidator";
import { useAuthMutation } from "../../mutations/AuthMutation";
import { useCookies } from 'react-cookie'


export default function SignIn() {
  const { mutate, reset, isError, isLoading, isSuccess } = useAuthMutation();
  const [cookies, setCookie] = useCookies(['Bearer']);

  const formik = useFormik({
    initialValues: initialValues.signIn,
    validationSchema: validate('signin'),
    onSubmit: (values) => {
      mutate(values,{
        onSuccess: (values) => {
          console.log(values);
        },
        onError: (res)=>{
        return res.response.data.message
        }
      });
    }
  })

  return (
    // <FormButton text="Sign In" />
    <>
      <Container sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
        <Grid container justifyContent='center'>
          <Grid item md={5} sx={{ flexDirection: 'column', display: 'flex' }}>
            <CardWrapper sx={{pt:5}}>
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
                    // helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    id="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    size="small"
                    {...formik.getFieldProps('password')}
                    // helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                    InputLabelProps={{ shrink: true }}
                  />
                </FormControl>
                <Box sx={{ width: '100%', display: 'flex' }} justifyContent='space-between'>
                  <FormButton text='Sign in' type='submit' />
                  {/* <FormButton text='Clear' onClick={() => { reset(); formik.resetForm(); }} /> */}
                </Box>
              </Box>
            </CardWrapper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
