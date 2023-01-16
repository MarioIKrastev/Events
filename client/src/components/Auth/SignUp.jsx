import { Box, Button, FormControl, Grid, Modal, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useFormik } from 'formik'
import { validate } from '../../utils/formValidator'
import { initialValues } from '../../utils/initials'
import { useAuthMutation } from "../../mutations/AuthMutation";
import { useNavigate } from "react-router-dom";
import { styles } from './styles'

import Btn from "../buttons/Btn";
import CardWrapper from "../Cards";
import FormSpinner from "../spinners/FormSpinner";

export default function SignUp() {
  const navigation = useNavigate();
  const theme = useTheme();
  const btn = { "&:hover": { backgroundColor: "transparent", color: '#FFF' }, p: 0, m: 0 };
  const [open, setOpen] = useState(false);
  const openHandler = () => setOpen(true);
  const handleClose = (reason) => { 
    if (reason && reason === "backdropClick"){ return; } 
  }

  const { mutate, reset, isError, isLoading, isSuccess } = useAuthMutation('signup');

  const formik = useFormik({
    initialValues: initialValues.signUp,
    validationSchema: validate('signup'),
    onSubmit: (values, { resetForm }) => {
      mutate(values, {
        onSuccess: async () => {
          resetForm();
        },
        onError: (res) => {
          return res.response.data.message
        }
      });
    },
  })
  return (
    <>
      <Btn text='Sign Up' sx={{ fontSize: '54px' }} variant='outlined' onClick={openHandler}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ alignItems: 'center', display: 'flex', maxWidth: '1440px', margin: '0 auto' }}
      >
        <Grid container justifyContent="center">
          <Grid item md={3} sx={styles.pseudoGrid}>
            {isLoading ? (<Box sx={{ display: 'flex' }} justifyContent="center"><FormSpinner color={theme.palette.primary.dark} bgcolor={theme.palette.primary.light} /></Box>) : (
              <>
                {
                  isSuccess ? (
                    <CardWrapper sx={{ alignItems: 'center', gap: 4 }}>
                      <Typography variant="h4" component="h1" color={theme.palette.secondary.main}>
                        Successful
                      </Typography>
                      <Btn text='Sign In' onClick={()=> navigation('/signin')}/>
                    </CardWrapper>
                  ) : (
                    <CardWrapper>
                      <Box sx={{ display: 'flex', flexDirection: 'row' }} justifyContent='space-between'>
                        <Button
                          disableRipple
                          sx={[btn, { color: theme.palette.primary.dark, alignSelf: 'end', pb: '1.5rem' }]}
                          onClick={() => { setOpen(false); reset(); formik.resetForm() }}>
                          Close
                        </Button>
                        {isError && <Typography variant="body1" component="p" color={theme.palette.error.main}>
                          Email is already in use
                        </Typography>}
                      </Box>
                      <Box
                        component='form'
                        noValidate
                        autoComplete="off"
                        onSubmit={formik.handleSubmit}
                      >
                        <FormControl fullWidth sx={{ gap: { xs: 3, md: 4 }, mb: 4 }}>
                          <TextField
                            id="username"
                            type="text"
                            label="Name"
                            variant="outlined"
                            size="small"
                            {...formik.getFieldProps('username')}
                            helperText={formik.touched.username && formik.errors.username ? formik.errors.username : ''}
                            InputLabelProps={{ shrink: true }}
                          />
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
                          <Btn text='Register' type='submit' />
                          <Btn text='Clear' onClick={() => { reset(); formik.resetForm(); }} />
                        </Box>
                      </Box>
                    </CardWrapper>
                  )}
              </>
            )}
          </Grid>
        </Grid>
      </Modal >
    </>
  )
}
