// import { Container } from "@mui/material"
// import { Link as RouterLink } from "react-router-dom"
import React, { useEffect } from 'react'
import { Button, Container, Stack, Paper } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setSession } from "../redux/reducers/session"
import { resetForm } from '../redux/reducers/form'

const Home = () => {
  console.log("home")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetForm())
  }, [])


  const toRegister = () => {
    // await setIsRegistering()
    dispatch(setSession({ isRegistering: true }))
    navigate('/register', { replace: false })
  }

  return (
    <>
      <Container sx={{ height: '100vh' }}>
        <Stack direction="column" height={1} justifyContent='center'>
          <Paper elevation={10} sx={{ height: { md: '70%' }, borderRadius: '20px' }}>
            <Stack direction="column" height={1} alignItems="center" justifyContent="center">
              <h1>CAR INSURANCE APPLICATION</h1>
              <Button onClick={() => toRegister()}>REGISTER</Button>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </>
  )
}

export default Home