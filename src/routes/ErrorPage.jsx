import { useRouteError } from "react-router-dom"

const ErrorPage = () => {
    const error = useRouteError()

  return (
    <div>
      <h1>Ops!</h1>
      <h1>Temos um problema.</h1>
      <p>{error.statusText || error.message}</p>
      <p>{error.error.message}</p>
    </div>
  )
}

export default ErrorPage
