import React from "react"; // Importing the necessary modules from React library
import { Link } from "react-router-dom"; // Importing the Link component from react-router-dom library
import "./Sign_Up.css";
function Sign_Up(){
return (
    <div>
        <div className="container" > 
        <div className="sign-up-text">
            <h1 className="sign-up-heading"><b>Sign Up</b></h1>
            <div className="already-a-member">
                <div style="color: #4c4c4c;">Already a member?</div>
                <div className="login" >
                    <a href="../Log_In/Log_In.html" style="color: #4b04e2;text-decoration: none; font-family: 'Inter', sans-serif"><b>Login</b></a>
                </div>
            </div>
        </div>
            <div className="signup-form"> 
                <form>
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
                        <input type="text" name="name" id="name" required class="form-control" placeholder="Enter your name" aria-describedby="helpId" /> 
                    </div>
                    <div className="form-group">
                        <label for="phone">Phone</label>
                        <input type="tel" name="phone" id="phone" required class="form-control" placeholder="Enter your phone number" aria-describedby="helpId" pattern="[0-9]{10}" // This pattern ensures the phone number has exactly 10 digits
                  title="Phone number must be exactly 10 digits"/> 
                    </div>
                    <div className="form-group"> 
                        <label for="email">Email</label> 
                        <input type="email" name="email" id="email" required class="form-control" placeholder="Enter your email" aria-describedby="helpId" /> 
                    </div>
                    <div className="form-group"> 
                        <label for="password">Password</label> 
                        <input name="password" id="password" required class="form-control" placeholder="Enter your password" aria-describedby="helpId" /> 
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
