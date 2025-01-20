import React from 'react'

const Login = () => {
  return (
    <div className='login'>
        <form>
            <input type='text' placeholder='email'/>
            <input type='text' placeholder='password'/>
            <button>Login</button>
        </form>
    </div>
  )
}

export default Login
