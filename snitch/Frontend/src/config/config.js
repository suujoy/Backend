if (!import.meta.env.VITE_API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL is not defined')
}


export const config = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL
}