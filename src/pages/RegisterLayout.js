import React, { useState } from 'react'
import { Box, Container, Grid, Paper, Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'

// import PersonalDetails from './PersonalDetails'
// import CarDetails from './CarDetails'


// const steps = ['Enter personal details', 'Enter car details']
// just add into the steps array and it auto add step
// const stepperContents = [<PersonalDetails />, <CarDetails />]

const RegisterLayout = () => {
  return (
    <>
      <Container sx={{ height: '100vh' }}>
        <Stack direction="column" height={1} justifyContent='center'>
          <Paper elevation={10} sx={{ height: { md: '70%' }, borderRadius: '20px' }}>
            <Grid container height={1}>
              <Grid item xs={0} md={4} sx={{ backgroundColor: 'black', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>
              </Grid>
              <Grid item xs={12} md={8} p={1}>
                <Outlet />
              </Grid>
            </Grid>
          </Paper>
        </Stack>
      </Container>
    </>
  )
}

export default RegisterLayout