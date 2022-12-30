import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { setCookie } from 'cookies-next'

import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { LoginCard } from '../components/LoginCard'

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const router = useRouter()

  function handleChange(e, name) {
    setUser({ ...user, [name]: e.target.value })
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault()
      const response = await fetch(`/api/user/login`, {
        method: 'POST',
        body: JSON.stringify(user),
      })
      const json = await response.json()
      if (response.status !== 200) throw new Error(json)

      setCookie('authorization', json)
      router.push('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="layout">
      <LoginCard title="Crie sua conta" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Seu e-mail"
          value={user.email}
          onChange={(e) => {
            handleChange(e, 'email')
          }}
          required
        />
        <Input
          type="password"
          placeholder="Sua senha"
          value={user.password}
          onChange={(e) => {
            handleChange(e, 'password')
          }}
          required
        />

        <Button>Entrar</Button>

        {error && <p className="error">{error}</p>}

        <Link href="/cadastro" className="link">
          Ainda não possui conta?
        </Link>
      </LoginCard>
    </div>
  )
}
