import { Result } from 'postcss';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import image from '../../assets/images/login/login.svg';
import { setToken } from '../../Auth/Auth';
import { AuthContext } from '../Login/Context/AuthProvider/AuthProvider';
const SignUp = () => {
    const {createUser} = useContext(AuthContext)
    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            setToken(user);
        })
        .catch(err => console.err(err));
      }
    return (
        <div className="hero min-h-screen  w-full">
        <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <img className='w-3/4' src={image} alt="" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl py-20  bg-base-100">
          <h1 className="text-5xl text-center pt-2 font-bold">Sign Up!</h1>
            <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name='name' placeholder="name" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" name='email' placeholder="email" className="input input-bordered"  required/>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name='password' placeholder="password" className="input input-bordered" required/>
                
              </div>
              <div className="form-control mt-6">
               <input className='btn btn-primary' type="submit" value='Sign Up' />
              </div>
            </form>
            <p className='text-center'>Already Have an Account ?<Link className='font-bold text-orange-600' to='/login'>Log in</Link>  </p>
          </div>
        </div>
      </div>
    );
};

export default SignUp;