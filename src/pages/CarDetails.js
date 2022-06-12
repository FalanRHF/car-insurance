import React, { useState, useEffect } from 'react'
import { Grid, TextField, Button, Stack, Typography } from '@mui/material'
import { Radio, RadioGroup } from '@mui/material'
import { FormControl, FormControlLabel, Select, MenuItem } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setForm } from '../redux/reducers/form'

const CarDetails = () => {
  const initialValues = useSelector(state => state.form.value.carDetails)
  const [formValues, setFormValues] = useState(initialValues === undefined ? { plateNumber: '', claim: '', licenseYears: '', carMake: '', carModel: '', manuDate: (new Date()).toISOString() } : initialValues)
  // const [value, setValue] = React.useState('female');

  const isRegistering = useSelector(state => state.session.value.isRegistering)

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

  const handleSubmit = () => {
    console.log("handle submit")
    dispatch(setForm({ carDetails: formValues }))
    navigate('/register/success', { replace: false })
  }


  const handleChange = (key, value) => {
    setFormValues({ ...formValues, [key]: value })
  }

  console.log(formValues)

  return (
    <>
      <Stack height={1} direction='column' justifyContent='space-around'>
        <Typography variant='h4' alignSelf='center'>Car Details</Typography>
        <Stack spacing={1}>
          <Grid container>
            <Grid item xs={12} sm={4} sx={{ display: "flex", alignItems: "center" }}>
              Plate Number*
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                value={formValues.plateNumber}
                required
                fullWidth
                onChange={(e) => handleChange("plateNumber", e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} sm={4} sx={{ display: "flex", alignItems: "center" }}>
              Do you made any Claims in last 5 years?*
            </Grid>
            <Grid item xs={6} sm={8}>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  value={formValues.claim}
                  onChange={(e) => handleChange("claim", e.target.value)}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} sm={4} sx={{ display: "flex", alignItems: "center" }}>
              How many Years do you have Driving Licence?*
            </Grid>
            <Grid item xs={6} sm={8}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  fullWidth
                  value={formValues.licenseYears}
                  onChange={(e) => handleChange("licenseYears", e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="0">0</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5+">5+</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={4} sx={{ display: "flex", alignItems: "center" }}>
              Car Make*
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                value={formValues.carMake}
                required
                fullWidth
                onChange={(e) => handleChange("carMake", e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={4} sx={{ display: "flex", alignItems: "center" }}>
              Car Model*
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                value={formValues.carModel}
                required
                fullWidth
                onChange={(e) => handleChange("carModel", e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container><Grid item xs={12} sm={4} sx={{ display: "flex", alignItems: "center" }}>
            Car Manufacturer Date*
          </Grid>
            <Grid item xs={12} sm={8}>
              <DatePicker
                disableFuture
                inputFormat="DD/MM/yyyy"
                views={['year', 'month', 'day']}
                toolbarPlaceholder="dd/mm/yyyy"
                value={formValues.DOB}
                onChange={(value) => handleChange("DOB", value.toISOString())}
                renderInput={(params) =>
                  <TextField {...params} fullWidth />
                }
              />
            </Grid>
          </Grid>
        </Stack>
        <Stack direction='row' justifyContent='flex-end' spacing={1}>
          <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
          <Button variant="contained" onClick={() => handleSubmit()}>Submit</Button>
        </Stack>
      </Stack>
    </>
  )
}

export default CarDetails