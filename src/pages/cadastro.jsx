import Link from 'next/link'
import { useState } from 'react'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'

import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { LoginCard } from '../components/LoginCard'

export default function Cadastro() {
  const [user, setUser] = useState({
    name: '',
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
      const response = await fetch(`/api/user/cadastro`, {
        method: 'POST',
        body: JSON.stringify(user),
      })
      const json = await response.json()
      if (response.status !== 201) throw new Error(json)

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
          type="text"
          placeholder="Seu nome"
          required
          value={user.name}
          onChange={(e) => {
            handleChange(e, 'name')
          }}
        />
        <Input
          type="email"
          placeholder="Seu e-mail"
          required
          value={user.email}
          onChange={(e) => {
            handleChange(e, 'email')
          }}
        />
        <Input
          type="password"
          placeholder="Sua senha"
          required
          value={user.password}
          onChange={(e) => {
            handleChange(e, 'password')
          }}
        />

        <Button>Cadastrar</Button>

        {error && <p className="error">{error}</p>}

        <Link href="/login" className="link">
          Já possui conta?
        </Link>
      </LoginCard>
    </div>
  )
}
