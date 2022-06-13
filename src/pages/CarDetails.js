import React, { useEffect } from 'react'
import { Grid, TextField, Button, Stack, Typography, FormHelperText } from '@mui/material'
import { Radio, RadioGroup } from '@mui/material'
import { FormControl, FormControlLabel, Select, MenuItem } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setForm } from '../redux/reducers/form'
import { setSession } from '../redux/reducers/session'
import { Container } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

const CarDetails = () => {
  const initialValues = useSelector(state => state.form.value.carDetails)
  // const [formValues, setFormValues] = useState(initialValues === undefined ? { plateNumber: '', claim: '', licenseYears: '', carMake: '', carModel: '', manuDate: (new Date()).toISOString() } : initialValues)

  const isRegistering = useSelector(state => state.session.value.isRegistering)

  const { register, handleSubmit, control, formState: { errors } } = useForm({ defaultValues: initialValues });

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("isRegistering:", isRegistering)
    if (!isRegistering) {
      isSessionExpired()
    }
    return () => {
      console.log("Car details unmounted")
    }
  }, [])

  const isSessionExpired = () => {
    navigate('/home', { replace: true })
  }

  // const handleSubmit = () => {
  //   console.log("handle submit")
  //   dispatch(setForm({ carDetails: formValues }))
  //   navigate('/register/success', { replace: false })
  // }


  // const handleChange = (key, value) => {
  //   setFormValues({ ...formValues, [key]: value })
  // }

  const onSubmit = (data) => {
    console.log('data', data)
    dispatch(setForm({ carDetails: data }))
    dispatch(setSession({ newUser: true }))
    navigate('/register/success', { replace: true })
  }

  return (
    <>
      <Container sx={{ height: "100%" }}>
        <form style={{ height: "100%" }} onSubmit={handleSubmit((data) => onSubmit(data))}>
          <Stack height={1} direction='column' justifyContent='space-around'>
            <Typography variant='h4' alignSelf='center'>Car Details</Typography>
            <Stack spacing={1}>
              <Grid container>
                <Grid item xs={12} sm={4} sx={{ display: "flex", alignItems: "center" }}>
                  <Stack direction="row" justifyContent="flex-start">
                    <Typography>Plate Number</Typography>
                    <Typography color="red">*</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    name="plateNumber"
                    fullWidth
                    {...register("plateNumber", { required: "Field is required." })}
                    error={!!errors?.plateNumber}
                    helperText={errors?.plateNumber?.message}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} sm={4} pr={2} sx={{ display: "flex", alignItems: "center" }}>
                  <Stack direction="row" justifyContent="flex-start">
                    <Typography>Do you made any Claims in last 5 years?</Typography>
                    <Typography color="red">*</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={8}>
                  <Controller
                    rules={{ required: "Field is required." }}
                    defaultValue=""
                    control={control}
                    name="claim"
                    render={({ field, fieldState: { error } }) => (
                      <FormControl error={!!error}>
                        <RadioGroup
                          row
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          {...field}
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                        <FormHelperText>
                          {error?.message}
                        </FormHelperText>
                      </FormControl>
                    )} />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} sm={4} pr={2} sx={{ display: "flex", alignItems: "center" }}>
                  <Stack direction="row" justifyContent="flex-start">
                    <Typography> How many Years do you have Driving License?</Typography>
                    <Typography color="red">*</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={8}>
                  <Controller
                    rules={{ required: "Field is required." }}
                    defaultValue=""
                    control={control}
                    name="licenseYears"
                    render={({ field, fieldState: { error } }) => (
                      <FormControl sx={{ minWidth: 120 }} error={!!error}>
                        <Select
                          fullWidth
                          displayEmpty
                          inputProps={{ 'aria-label': 'Without label' }}
                          {...field}
                        >
                          <MenuItem value="0">0</MenuItem>
                          <MenuItem value="1">1</MenuItem>
                          <MenuItem value="2">2</MenuItem>
                          <MenuItem value="3">3</MenuItem>
                          <MenuItem value="4">4</MenuItem>
                          <MenuItem value="5+">5+</MenuItem>
                        </Select>
                        <FormHelperText>
                          {error?.message}
                        </FormHelperText>
                      </FormControl>
                    )} />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={4} sx={{ display: "flex", alignItems: "center" }}>
                  <Stack direction="row" justifyContent="flex-start">
                    <Typography>Car Make</Typography>
                    <Typography color="red">*</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    name="carMake"
                    fullWidth
                    {...register("carMake", { required: "Field is required." })}
                    error={!!errors?.carMake}
                    helperText={errors?.carMake?.message}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={4} sx={{ display: "flex", alignItems: "center" }}>
                  <Stack direction="row" justifyContent="flex-start">
                    <Typography>Car Model</Typography>
                    <Typography color="red">*</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    name="carModel"
                    fullWidth
                    {...register("carModel", { required: "Field is required." })}
                    error={!!errors?.carModel}
                    helperText={errors?.carModel?.message}
                  />
                </Grid>
              </Grid>
              <Grid container><Grid item xs={12} sm={4} sx={{ display: "flex", alignItems: "center" }}>
                <Stack direction="row" justifyContent="flex-start">
                  <Typography>Car Manufacturer Date</Typography>
                  <Typography color="red">*</Typography>
                </Stack>
              </Grid>
                <Grid item xs={12} sm={8}>
                  <Controller
                    control={control}
                    name="manuDate"
                    render={({ field, fieldState: { error } }) => (
                      <DatePicker
                        disableFuture
                        inputFormat="DD/MM/yyyy"
                        views={['year', 'month', 'day']}
                        toolbarPlaceholder="dd/mm/yyyy"
                        value={field?.value}
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
            </Stack>
            <Stack direction='row' justifyContent='flex-end' spacing={1}>
              <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
              <Button type="submit" variant="contained" onClick={() => handleSubmit()}>Submit</Button>
            </Stack>
          </Stack>
        </form>
      </Container>
    </>
  )
}

export default CarDetails