import React, { useState, useEffect } from 'react'
import { Grid, TextField, Button, Typography, Stack } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
// import formatDate from '../components/DateFormatter'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setForm } from '../redux/reducers/form'
import { Container } from '@mui/system'
import { Controller, useForm } from 'react-hook-form'


const PersonalDetails = () => {
  const initialValues = useSelector(state => state.form.value.personalDetails)
  // const [formValues, setFormValues] = useState(initialValues === undefined ? { firstName: '', lastName: '', DOB: '', email: '' } : initialValues)

  const isRegistering = useSelector(state => state.session.value.isRegistering)
  const { register, handleSubmit, control, formState: { errors } } = useForm({ defaultValues: initialValues });

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("initialValues:", initialValues)
    if (!isRegistering) {
      isSessionExpired()
    }
    return () => {
      console.log("Personal details unmounted")
    }
  }, [])

  const isSessionExpired = () => {
    navigate('/home', { replace: true })
  }

  const onSubmit = (data) => {
    console.log('data', data)
    dispatch(setForm({ personalDetails: data }))
    navigate('/register/car', { replace: false })
  }

  // const handleChange = (e) => {
  //   const { name, value } = e.target
  //   setFormValues({ ...formValues, [name]: value })
  // }

  // const handleDateChange = (name, value) => {
  //   setFormValues({ ...formValues, [name]: value })
  // }

  const regexForEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  // console.log(formValues)

  return (
    <>
      <Container sx={{ height: "100%" }}>
        <form style={{ height: "100%" }} onSubmit={handleSubmit((data) => onSubmit(data))}>
          <Stack height={1} direction='column' justifyContent='space-around'>
            <Typography variant='h4' alignSelf='center'>Personal Details</Typography>
            <Stack spacing={1}>
              <Grid container justifyContent='center'>
                <Grid item xs={12} sm={4} sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>First Name*</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    name="firstName"
                    fullWidth
                    {...register("firstName", { required: "Field is required." })}
                    error={!!errors?.firstName}
                    helperText={errors?.firstName?.message}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={4} sx={{ display: "flex", alignItems: "center" }}>
                  <Typography alignSelf='center'>Last Name*</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    name="lastName"
                    fullWidth
                    {...register("lastName", { required: "Field is required." })}
                    error={!!errors?.lastName}
                    helperText={errors?.lastName?.message}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={4} sx={{ display: "flex", alignItems: "center" }}>
                  <Typography alignSelf='center'>Date of Birth*</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Controller
                    control={control}
                    name="DOB"
                    render={({ field, fieldState: { error } }) => (
                      <DatePicker
                        disableFuture
                        inputFormat="DD/MM/yyyy"
                        views={['year', 'month', 'day']}
                        value={field?.value}
                        toolbarPlaceholder="DD/MM/YYYY"
                        // onChange={(value) => handleDateChange("DOB", value.toISOString())}
                        onChange={(value) => field.onChange(value.toISOString())}
                        renderInput={(params) =>
                          <TextField {...params} error={!!error} helperText={error?.message} />
                        }
                      />
                    )}
                    rules={{ required: "Field is required." }}
                    defaultValue=""
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={4} sx={{ display: "flex", alignItems: "center" }}>
                  <Typography alignSelf='center'>Email*</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    name="email"
                    fullWidth
                    {...register("email", {
                      required: "Field is required.",
                      pattern: {
                        value: regexForEmail, message: "Invalid email address"
                      }
                    })}
                    error={!!errors?.email}
                    helperText={errors?.email?.message} />
                </Grid>
              </Grid>
            </Stack>
            <Stack direction='row' justifyContent='flex-end'>
              <Button type='submit' variant="contained">Submit</Button>
            </Stack>
          </Stack>
        </form>
      </Container>
    </>
  )
}

export default PersonalDetails