import React from 'react'
import Hero from './Hero'
import LoginForm from './LoginForm'

const Login = () => {
  return (
    <div>
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
          <Hero />
          <LoginForm />
      

    </div>
    </div>
  )
}

export default Login