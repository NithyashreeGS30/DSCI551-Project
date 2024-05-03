import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../header/header';
import './SignIn.css';

const SignInPage = () => {
  const history = useHistory();
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSignIn = () => {
    // Perform sign-in logic
    // For now, let's assume the user is successfully signed in and their role is determined

    // Simulating logic to determine if the user is an admin
    const userEmail = document.getElementById('email').value;
    if (userEmail === 'admin@gmail.com') {
      setIsAdmin(true);
      history.push('/body1'); // Redirect to admin page
    } else {
      setIsAdmin(false);
      history.push('/body'); // Redirect to user page
    }
  };

  return (
    <div>
      <Header headName={isAdmin ? "Admin" : "User"} />
      <div className="signin">
        <div className="signin__container">
          <h1>Sign In</h1>
          <form onSubmit={handleSignIn}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" />

            <button type="submit" className="signin__signInButton">Sign In</button>
          </form>
          <p>
            By continuing, you agree to ArtisanHub's <a href="/">Conditions of Use</a> and <a href="/">Privacy Notice</a>.
          </p>
          <p>Don't have an account? <a href="/">Register now</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
