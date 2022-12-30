import { cadastro } from '../../../services/users'

export default function handler(req, res) {
  try {
    const newUser = cadastro(JSON.parse(req.body))
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json(err.message)
  }
}
