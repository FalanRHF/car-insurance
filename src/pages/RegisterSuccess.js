import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSession } from "../redux/reducers/session"
import { resetForm } from "../redux/reducers/form"
import { Button, Stack } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

const RegisterSuccess = () => {
  const dispatch = useDispatch()
  // const formData = useSelector(state => state.form.value)
  let newUser = useSelector(state => state.session.value?.newUser)

  useEffect(() => {
    if (newUser === true) {
      alert('registration successful')
      newUser = false
    }
    dispatch(setSession({ isRegistering: false, newUser: false }))
    dispatch(resetForm())
  }, [])

  return (
    <>
      <Stack direction='column' height={1} alignItems='center' justifyContent='center' mb={1}>
        <h1>REGISTRATION SUCCESSFUL</h1>
        <RouterLink to="/home"><Button>Back to Home</Button></RouterLink>
      </Stack>
    </>
  )
}

export default RegisterSuccess