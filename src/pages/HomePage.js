// import { Container } from "@mui/material"
// import { Link as RouterLink } from "react-router-dom"
import React, { useEffect } from 'react'
import { Button } from "@mui/material"
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

  const setIsRegistering = () => {
    return new Promise((resolve) => {
      dispatch(setSession({ isRegistering: true }))
      resolve(true)
    })
  }

  return (
    <>
      <h1>CAR INSURANCE APPLICATION</h1>
      <Button onClick={() => toRegister()}>REGISTER</Button>
    </>
  )
}

export default Home