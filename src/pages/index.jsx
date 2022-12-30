import { getCookie } from 'cookies-next'
import { verify } from '../services/users'

export default function Home() {
  return (
    <div>
      <h1>Pagina segura - Home</h1>
    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  try {
    const token = getCookie('authorization', { req, res })

    if (!token) throw new Error('Token Inválido')

    verify(token)

    return {
      props: {},
    }
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    }
  }
}
