import React from "react"; // Importing the necessary modules from React library
import { Link } from "react-router-dom"; // Importing the Link component from react-router-dom library
import "./Log_In.css";
function Log_In(){
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
                <form>
                    <div className="form-inputs"> 
                    <div className="form-group"> 
                        <label for="email">Email</label> 
                        <input type="email" name="email" id="email" required class="form-control" placeholder="Enter your email" aria-describedby="helpId" /> 
                    </div>
                    <div className="form-group"> 
                        <label for="password">Password</label> 
                        <input name="password" id="password" required class="form-control" placeholder="Enter your password" aria-describedby="helpId" /> 
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
