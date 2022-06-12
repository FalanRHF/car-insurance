import { configureStore } from "@reduxjs/toolkit"
import sessionReducer from './reducers/session'
import formReducer from './reducers/form'

const store = configureStore({
  reducer: {
    session: sessionReducer,
    form: formReducer,
  }
})

export default store