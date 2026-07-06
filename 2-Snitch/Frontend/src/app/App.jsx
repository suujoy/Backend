import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router'
import { routes } from './app.routes'
import useTheme from '../feature/theme/hooks/useTheme'
import { applyTheme } from '../feature/theme/utils/theme'
import './App.css'

const App = () => {
    const theme = useTheme()

    useEffect(() => {
        applyTheme(theme)
    }, [theme])

    return (
        <RouterProvider router={routes} />
    )
}

export default App