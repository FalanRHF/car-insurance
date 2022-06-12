import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSession } from "../redux/reducers/session"
import { resetForm } from "../redux/reducers/form"

const RegisterSuccess = () => {
  const dispatch = useDispatch()
  const formData = useSelector(state => state.form.value)

  useEffect(() => {
    console.log("formData:", formData)
    dispatch(setSession({ isRegistering: false, newUser: true }))
    dispatch(resetForm())
    return () => {
    }
  }, [])

  return (
    <>
      <h1>Success</h1>
    </>
  )
}

export default RegisterSuccess