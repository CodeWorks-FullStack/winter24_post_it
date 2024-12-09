export const dev = window.location.origin.includes('localhost')
// NOTE our baseURL should point to 3000 for our full stack applications
export const baseURL = dev ? 'http://localhost:3000' : ''
export const useSockets = false
export const domain = 'dev-h63x8ohlbl1q2qkp.us.auth0.com'
export const clientId = 'XX15k7a9Be1KE1Usl1aaOrDdzKJwvtUp'
export const audience = 'https://jeremyisaraddude.com'
