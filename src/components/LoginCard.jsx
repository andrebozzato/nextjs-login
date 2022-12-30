export function LoginCard({ onSubmit, title, children }) {
  return (
    <form className="login-card" onSubmit={onSubmit}>
      <h2>{title}</h2>

      {children}
    </form>
  )
}
