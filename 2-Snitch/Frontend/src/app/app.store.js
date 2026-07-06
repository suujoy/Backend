import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../feature/auth/state/auth.slice'
import themeReducer from '../feature/theme/state/themeSlice'

export const store = configureStore({
    reducer: { auth: authReducer, theme: themeReducer }
})