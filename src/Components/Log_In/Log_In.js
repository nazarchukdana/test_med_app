import React, { useState, useEffect } from 'react';
// Apply CSS according to your design theme or the CSS provided in week 2 lab 2
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config'; // Importing the Link component from react-router-dom library
import "./Log_In.css";
function Log_In(){
    const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  // Get navigation function from react-router-dom
  const navigate = useNavigate();
  // Check if user is already authenticated, then redirect to home page
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, []);
  // Function to handle login form submission
  const login = async (e) => {
    e.preventDefault();
    // Send a POST request to the login API endpoint
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    // Parse the response JSON
    const json = await res.json();
    if (json.authtoken) {
      // If authentication token is received, store it in session storage
      sessionStorage.setItem('auth-token', json.authtoken);
      sessionStorage.setItem('email', email);
      // Redirect to home page and reload the window
      navigate('/');
      window.location.reload();
    } else {
      // Handle errors if authentication fails
      if (json.errors) {
        for (const error of json.errors) {
          alert(error.msg);
        }
      } else {
        alert(json.error);
      }
    }
  };

return (
    <div>
        <div className="container" > 
        <div className="log-in-text">
            <h1 className="log-in-heading"><b>Log In</b></h1>
            <div class="not-a-member">
                <div style={{color: "#4c4c4c"}}>Are you a new member?</div>
                <div class="signup" >
                    <Link to="/signup" style={{color: "#4b04e2", textDecoration: "none", fontFamily: "Inter, sansSerif"}}><b>Sign Up</b></Link>
                </div>
            </div>
        </div>
            <div className="login-form"> 
                <form onSubmit={login}>
                    <div className="form-inputs"> 
                    <div className="form-group"> 
                        <label for="email">Email</label> 
                        <input value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  type="email" 
                  name="email" 
                  id="email" 
                  className="form-control" 
                  placeholder="Enter your email" 
                  aria-describedby="helpId" /> 
                    </div>
                    <div className="form-group"> 
                        <label for="password">Password</label> 
                        <input name="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        type="password"
                        
                        id="password" className="form-control" placeholder="Enter your password" aria-describedby="helpId" /> 
                        <a href="#" class="forgot-password">Forgot Password?</a>
                    </div>
                </div>
                    <div className="btn-group"> 
                        <button type="submit" className="btn btn-success">Submit</button> 
                        <button type="reset" className="btn btn-danger">Reset</button> 
                    </div>
                </form> 
            </div>
        
    </div>
    </div>
);
}
export default Log_In;
