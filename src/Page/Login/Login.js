import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import image from '../../assets/images/login/login.svg'
import SocialLogin from '../../Shared/SocialLogin/SocialLogin';
import { AuthContext } from './Context/AuthProvider/AuthProvider';

const Login = () => {

   const { login } = useContext(AuthContext);
   const location = useLocation();
   const navigate = useNavigate();
 
  const from = location.state?.from?.pathname || '/';
  const handleLogin = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    login(email, password)
    .then( result => {
      const user = result.user;
        
      const currentUser = {
        email: user.email
      }
      console.log(currentUser);
      // get jwt token
      fetch('https://y-lac-xi.vercel.app/jwt', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body:JSON.stringify(currentUser)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // localStorage is the easiest but not secure 
        localStorage.setItem('genius-token', data.token);
      navigate(from, {replace: true})
      })
    })
    .catch(error => console.error(error))
  }
    return (
        <div className="hero min-h-screen  w-full">
        <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <img className='w-3/4' src={image} alt="" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl py-20  bg-base-100">
          <h1 className="text-5xl text-center pt-2 font-bold">Login now!</h1>
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" name='email' placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
               <input className='btn btn-primary' type="submit" value='login' />
              </div>
            </form>
            <p className='text-center'>New To Genius Car <Link className='font-bold text-orange-600' to='/signup'>Sign Up</Link>  </p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    );
};

export default Login;