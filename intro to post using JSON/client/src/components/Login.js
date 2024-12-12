import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Login() {

    let emailInputRef = useRef();
    let passwordInputRef = useRef();

    let navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect(() => {
        // Check if the token exists in localStorage
        if (localStorage.getItem("token")) {
           sendTokenToServer();
        }
    }, []);

    let sendTokenToServer = async () => {
        const token = localStorage.getItem("token");
    
        const reqOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Set content type as JSON
            },
            body: JSON.stringify({ token }) // Send token as JSON
        };
    
        try {
            const response = await fetch("http://localhost:4567/validateToken", reqOptions);
            const data = await response.json();
    
            console.log(data); // Log to check the response structure
    
            if (!data || data.status !== "success") {
                console.error("Error: Token validation failed");
                alert("Token validation failed");
                return;
            }
    
            if (data.status === "success") {
                alert(data.msg);
            } else {
                localStorage.setItem("token", data.data.token);
                dispatch({ type: "login", data: data.data });
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Failed to fetch:", error);
        }
    };
    
    let onLogin = async () => {
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;

        const reqOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Use JSON content type
            },
            body: JSON.stringify({ email, password }) // Send email and password as JSON
        };

        try {
            const response = await fetch("http://localhost:4567/login", reqOptions);
            const data = await response.json();
            console.log(data);

            if (data.status === "success") {
                localStorage.setItem("token", data.data.token);
                dispatch({ type: "login", data: data.data });
                navigate("/dashboard");
            }else{
                alert(data.msg);
            }
        } catch (error) {
            console.error("Failed to fetch:", error);
        }
    };

    return (
        <div className="App">
            <form>
                <div>
                    <h2>Login</h2>
                    <div>
                        <label>Email</label>
                        <input ref={emailInputRef} type="email" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input ref={passwordInputRef} type="password" />
                    </div>
                    <div>
                        <button type="button" onClick={onLogin}>Login</button>
                    </div>
                </div>
            </form>
            <div>
                <Link to="/signup">Signup</Link>
            </div>
        </div>
    );
}

export default Login;
