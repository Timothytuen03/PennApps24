import '@/styles/globals.css'
import AuthContext from '@/context/useAuth'

export default function App({ Component, pageProps }) {
  return (
    // <AuthContext >
      <Component {...pageProps} />
    // </AuthContext>
  )
}
