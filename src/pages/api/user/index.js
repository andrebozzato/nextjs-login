import { listUsers } from '../../../services/users'

export default function handler(req, res) {
  try {
    const users = listUsers()
    res.status(200).json(users)
  } catch (err) {
    res.status(400).json(err.message)
  }
}
