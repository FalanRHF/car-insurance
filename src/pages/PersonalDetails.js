import React, { useState, useEffect } from 'react'
import { Grid, TextField, Button, Typography, Stack } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
// import formatDate from '../components/DateFormatter'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setForm } from '../redux/reducers/form'
import { Container } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'


const PersonalDetails = () => {
  const initialValues = useSelector(state => state.form.value.personalDetails)
  // const [formValues, setFormValues] = useState(initialValues === undefined ? { firstName: '', lastName: '', DOB: '', email: '' } : initialValues)
  let todayMinus18Years = new Date()
  todayMinus18Years.setFullYear(todayMinus18Years.getFullYear() - 18)
  let todayMinus100Years = new Date()
  todayMinus100Years.setFullYear(todayMinus100Years.getFullYear() - 100)

  const [dateDifference, setDateDifference] = useState(0)
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

  // const regexForEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  const regexForEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i

  //86400000

  const calculateDateDifference = (date) => {
    const DOB = new Date(date)
    const today = new Date()
    const difference = ((today.getFullYear() * 10000) + ((today.getMonth() + 1) * 100) + today.getDate()) - ((DOB.getFullYear() * 10000) + ((DOB.getMonth() + 1) * 100) + DOB.getDate())
    setDateDifference(difference)
  }

  return (
    <>
      <Container sx={{ height: "100%" }}>
        <form style={{ height: "100%" }} onSubmit={handleSubmit((data) => onSubmit(data))}>
          <Stack height={1} direction='column' justifyContent='space-around'>
            <Typography variant='h4' alignSelf='center'>Personal Details</Typography>
            <Stack spacing={1}>
              <Grid container justifyContent='center'>
                <Grid item xs={12} sm={4} sx={{ display: "flex", alignItems: "center" }}>
                  <Stack direction="row" justifyContent="flex-start">
                    <Typography>First Name</Typography>
                    <Typography color="red">*</Typography>
                  </Stack>
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
                  <Stack direction="row" justifyContent="flex-start">
                    <Typography>Last Name</Typography>
                    <Typography color="red">*</Typography>
                  </Stack>
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
                  <Stack direction="row" justifyContent="flex-start">
                    <Typography>Date of Birth</Typography>
                    <Typography color="red">*</Typography>
                  </Stack>
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
                        onChange={(value) => {

                          field.onChange(value.toISOString())
                        }}
                        renderInput={(params) =>
                          // <TextField {...params} error={!!error} helperText={!!error ? error?.message : (dateDifference < 180000 ? 'Must be more than 18 years old' : (dateDifference > 1000000 ? ' Must be less than 100 years old' : ''))} />
                          <TextField {...params} error={!!error} helperText={error?.message} />
                        }
                      />
                    )}
                    rules={{
                      required: "Field is required.",
                      max: {
                        value: todayMinus18Years.toISOString(),
                        message: "Age must be more than 18 years."
                      },
                      min: {
                        value: todayMinus100Years.toISOString(),
                        message: "Age must be less than 100 years."
                      }
                    }}
                    defaultValue=""
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={4} sx={{ display: "flex", alignItems: "center" }}>
                  <Stack direction="row" justifyContent="flex-start">
                    <Typography>Email</Typography>
                    <Typography color="red">*</Typography>
                  </Stack>
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