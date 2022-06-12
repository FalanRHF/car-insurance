import { createSlice } from "@reduxjs/toolkit"

const initialStateValue = {}

export const sessionSlice = createSlice({
  name: "session",
  initialState: { value: initialStateValue },
  reducers: {
    setSession: (state, action) => {
      state.value = {
        ...state.value,
        ...action.payload
      }
    },

    resetSession: (state) => {
      state.value = initialStateValue
    }
  }
})

export const { setSession, resetSession } = sessionSlice.actions

export default sessionSlice.reducer