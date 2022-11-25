import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Authorisation() {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        login: "",
        password: "",
        role:"",
        email:""
    });

    const { login, password } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit =  async (e) => {
        e.preventDefault();
//navigate("/admin/main") //todo: удалить заглушку
//navigate("/customer/main") //todo: удалить заглушку
navigate("/staff/main") //todo: удалить заглушку
       /* await fetch("http://localhost:8080/api/auth/authorisation", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {

                if(response.status == 200){
                    navigate("/main")
                    return response.text()
                }
                throw new Error(`${response.status}: ${response.text()}`)
            }).then(data=>{
                window.localStorage.setItem("token", `${data}`)
            }).catch(error => {
                navigate("/error")
                console.log(error)
            })*/
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4" >Authorisation</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="login" className="form-label">
                                Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your name"
                                name="login"
                                value={login}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type={"password"}
                                className="form-control"
                                placeholder="Enter your password"
                                name="password"
                                value={password}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Sign In
                        </button>
                        <div className="container mt-3">
                            <Link to="/registration">
                                Sign Up?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}