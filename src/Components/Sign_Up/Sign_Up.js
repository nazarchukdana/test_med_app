import React, { useState } from 'react';
import './Sign_Up.css'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
// Function component for Sign Up form
const Sign_Up = () => {
    // State variables using useState hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');
// State to show error messages
    const navigate = useNavigate(); // Navigation hook from react-router
    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission
        // API Call to register user
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });
        const json = await response.json(); // Parse the response JSON
        if (json.authtoken) {
            // Store user data in session storage
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            // Redirect user to home page
            navigate("/");
            window.location.reload(); // Refresh the page
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    setShowerr(error.msg); // Show error messages
                }
            } else {
                setShowerr(json.error);
            }
        }
    };

return (
    <div>
        <div className="container" > 
        <div className="sign-up-text">
            <h1 className="sign-up-heading"><b>Sign Up</b></h1>
            <div className="already-a-member">
                <div style={{color: "#4c4c4c"}}>Already a member?</div>
                <div className="login" >
                    <Link to="/login" style={{
                  color: "#4b04e2",
                  textDecoration: "none",
                  fontFamily: "Inter, sans-serif",
                }}><b>Login</b></Link>
                </div>
            </div>
        </div>
            <div className="signup-form"> 
            <form method="POST" onSubmit={register}>
                    <div className="form-inputs"> 
                    <div className="form-group">
                        <label for="role">Role</label> 
                        <select name="role" id="role" required class="form-control" > 
                            <option value="" disabled selected>Select your role</option> 
                            <option value="admin">Doctor</option>
                            <option value="editor">Patient</option>
                        </select>
                    </div>
                    <div className="form-group"> 
                        <label for="name">Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="form-control" placeholder="Enter your name" aria-describedby="helpId" />
                    </div>
                    <div className="form-group">
                        <label for="phone">Phone</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" name="phone" id="phone" className="form-control" placeholder="Enter your phone"  aria-describedby="helpId" />
                    </div>
                    <div className="form-group"> 
                        <label for="email">Email</label> 
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="helpId" />
                            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                    </div>
                    <div className="form-group"> 
                        <label for="password">Password</label> 
                        <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="form-control" placeholder="Enter your password" aria-describedby="helpId" />
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
export default Sign_Up;
