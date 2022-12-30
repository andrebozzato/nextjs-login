import jwt from 'jsonwebtoken'

let users = [
  {
    name: 'Andre Bozzato',
    email: 'abozzato@gmail.com',
    password: 'Teste123',
  },
]

const secret = process.env.JWT_SECRET

function createToken(user) {
  return jwt.sign({ email: user.email, name: user.name }, secret)
}

function readToken(token) {
  try {
    return jwt.verify(token, secret)
  } catch (err) {
    throw new Error('Token inválido')
  }
}

export function verify(token) {
  return readToken(token)
}

export function cadastro(body) {
  const user = users.find((user) => user.email === body.email)
  if (user) throw new Error('Usuário já cadastrado')

  users.push(body)

  const token = createToken(body)
  return token
}

export function login(body) {
  const user = users.find((user) => user.email === body.email)

  if (!user) throw new Error('Usuário não encontrado')
  if (user.password !== body.password) throw new Error('Senha incorreta')

  const token = createToken(user)
  return token
}

export function listUsers() {
  return users
}
