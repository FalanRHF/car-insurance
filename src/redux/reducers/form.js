import { createSlice } from "@reduxjs/toolkit"

const initialStateValue = {}

export const formSlice = createSlice({
  name: "form",
  initialState: { value: initialStateValue },
  reducers: {
    setForm: (state, action) => {
      state.value = {
        ...state.value,
        ...action.payload
      }
    },

    resetForm: (state) => {
      state.value = initialStateValue
    }
  }
})

export const { setForm, resetForm } = formSlice.actions

export default formSlice.reducer